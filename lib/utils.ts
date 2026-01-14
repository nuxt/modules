import { resolve } from 'node:path'
import { ofetch } from 'ofetch'
import semver from 'semver'
import type { Packument } from '@npm/types'

export const rootDir = resolve(__dirname, '..')
export const modulesDir = resolve(rootDir, 'modules')
export const distDir = resolve(rootDir)
export const distFile = resolve(distDir, 'modules.json')

export const userAgent = 'sync-script for https://nuxt.com/modules'

export function fetchPKG(name: string) {
  return ofetch<Packument>('https://registry.npmjs.org/' + name, {
    responseType: 'json',
    headers: {
      'user-agent': userAgent,
    },
  })
}

export function fetchRawGithub(path: string) {
  return ofetch('https://raw.githubusercontent.com/' + path, {
    responseType: 'json',
    headers: {
      'user-agent': userAgent,
    },
  })
}

export function fetchGithubPkg(repo: string) {
  let path: string
  // HEAD will be the default branch
  [repo, path = 'HEAD'] = repo.split('#') as [string, string?]

  return fetchRawGithub(repo + '/' + path + '/' + 'package.json')
}

export async function fetchModuleJson(npmPackage: string, version: string) {
  try {
    return await ofetch(`https://unpkg.com/${npmPackage}@${version}/dist/module.json`, {
      responseType: 'json',
      headers: {
        'user-agent': userAgent,
      },
    })
  }
  catch {
    return null
  }
}

export async function getMajorVersions(npmPackage: string): Promise<string[]> {
  const pkgData = await fetchPKG(npmPackage)
  const majorVersionMap = new Map<number, string>()

  for (const version in pkgData.versions) {
    // Skip pre-release versions
    if (version.includes('-')) continue

    const match = version.match(/^(\d+)\./)
    if (!match || !match[1]) continue

    const major = Number.parseInt(match[1], 10)
    const current = majorVersionMap.get(major)

    // Keep the highest version for each major
    if (!current || semver.compare(version, current) > 0) {
      majorVersionMap.set(major, version)
    }
  }

  return Array.from(majorVersionMap.values()).sort((a, b) => semver.compare(b, a))
}

export function uniq<T>(items: T[]) {
  return Array.from(new Set(items))
}

interface ParsedRange {
  original: string
  type: 'gte' | 'caret' | 'tilde' | 'exact' | 'complex'
  major: number
  minor: number
  patch: number
  prerelease: string | null
  // For open-ended ranges (>=), hasUpperBound is false
  hasUpperBound: boolean
}

function parseRangeComponent(range: string): ParsedRange | null {
  const trimmed = range.trim()

  // Check if it's a valid semver range first
  if (!semver.validRange(trimmed)) {
    return null
  }

  // Try to parse common patterns

  // >=X.Y.Z or >=X.Y.Z-prerelease
  const gteMatch = trimmed.match(/^>=\s*(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([a-z0-9.-]+))?$/i)
  if (gteMatch) {
    return {
      original: trimmed,
      type: 'gte',
      major: Number.parseInt(gteMatch[1]!, 10),
      minor: gteMatch[2] ? Number.parseInt(gteMatch[2], 10) : 0,
      patch: gteMatch[3] ? Number.parseInt(gteMatch[3], 10) : 0,
      prerelease: gteMatch[4] || null,
      hasUpperBound: false,
    }
  }

  // ^X.Y.Z or ^X
  const caretMatch = trimmed.match(/^\^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([a-z0-9.-]+))?$/i)
  if (caretMatch) {
    return {
      original: trimmed,
      type: 'caret',
      major: Number.parseInt(caretMatch[1]!, 10),
      minor: caretMatch[2] ? Number.parseInt(caretMatch[2], 10) : 0,
      patch: caretMatch[3] ? Number.parseInt(caretMatch[3], 10) : 0,
      prerelease: caretMatch[4] || null,
      hasUpperBound: true,
    }
  }

  // ~X.Y.Z
  const tildeMatch = trimmed.match(/^~(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([a-z0-9.-]+))?$/i)
  if (tildeMatch) {
    return {
      original: trimmed,
      type: 'tilde',
      major: Number.parseInt(tildeMatch[1]!, 10),
      minor: tildeMatch[2] ? Number.parseInt(tildeMatch[2], 10) : 0,
      patch: tildeMatch[3] ? Number.parseInt(tildeMatch[3], 10) : 0,
      prerelease: tildeMatch[4] || null,
      hasUpperBound: true,
    }
  }

  // Exact version X.Y.Z
  const exactMatch = trimmed.match(/^(\d+)\.(\d+)\.(\d+)(?:-([a-z0-9.-]+))?$/i)
  if (exactMatch) {
    return {
      original: trimmed,
      type: 'exact',
      major: Number.parseInt(exactMatch[1]!, 10),
      minor: Number.parseInt(exactMatch[2]!, 10),
      patch: Number.parseInt(exactMatch[3]!, 10),
      prerelease: exactMatch[4] || null,
      hasUpperBound: true,
    }
  }

  // Complex range - we can still get minVersion from it
  const minVersion = semver.minVersion(trimmed)
  if (minVersion) {
    return {
      original: trimmed,
      type: 'complex',
      major: minVersion.major,
      minor: minVersion.minor,
      patch: minVersion.patch,
      prerelease: minVersion.prerelease.length > 0 ? minVersion.prerelease.join('.') : null,
      hasUpperBound: true, // Assume complex ranges have upper bounds
    }
  }

  return null
}

/**
 * Check if range A is completely covered by range B
 * (i.e., every version satisfying A also satisfies B)
 */
function isRangeCoveredBy(a: ParsedRange, b: ParsedRange): boolean {
  // An open-ended >= range covers another range if its minimum is <= the other's minimum
  if (b.type === 'gte' && !b.hasUpperBound) {
    const aMin = semver.minVersion(a.original)
    const bMin = semver.minVersion(b.original)
    if (aMin && bMin && semver.gte(aMin, bMin)) {
      // b starts at or before a, and b has no upper bound
      // So if a has an upper bound, b covers all of a's range and more
      // If a also has no upper bound, they overlap from a's min onward
      return true
    }
  }

  // A caret range ^X covers another caret ^X.Y.Z if X matches and Y.Z >= the other's Y.Z
  if (a.type === 'caret' && b.type === 'caret' && a.major === b.major) {
    if (b.minor < a.minor || (b.minor === a.minor && b.patch <= a.patch)) {
      return true
    }
  }

  return false
}

/**
 * Compare version tuples for sorting
 */
function compareVersionTuple(a: ParsedRange, b: ParsedRange): number {
  if (a.major !== b.major) return a.major - b.major
  if (a.minor !== b.minor) return a.minor - b.minor
  if (a.patch !== b.patch) return a.patch - b.patch

  // Handle prereleases - non-prerelease comes after prerelease
  if (a.prerelease && !b.prerelease) return -1
  if (!a.prerelease && b.prerelease) return 1
  if (a.prerelease && b.prerelease) {
    return a.prerelease.localeCompare(b.prerelease)
  }

  return 0
}

/**
 * Format a version as a clean string
 */
function formatVersion(major: number, minor: number, patch: number, prerelease: string | null): string {
  let version = `${major}.${minor}.${patch}`
  if (prerelease) {
    version += `-${prerelease}`
  }
  return version
}

/**
 * Merge multiple Nuxt compatibility ranges into the maximum allowable range.
 *
 * Examples:
 * - ['>=3.0.0', '>=4.0.0'] => '>=3.0.0' (>=3.0.0 already includes >=4.0.0)
 * - ['^2.16.0', '>=3.0.0'] => '^2.16.0 || >=3.0.0' (disjoint major versions)
 * - ['>=3.0.0-rc.9', '>=3.7.0'] => '>=3.0.0-rc.9' (rc.9 is more permissive)
 * - ['^3.0.0', '^3.5.0'] => '^3.0.0' (^3.0.0 includes ^3.5.0)
 */
export function mergeCompatibilityRanges(ranges: string[]): string {
  if (ranges.length === 0) return ''

  // Split compound ranges (those with ||) into individual ranges
  // Also handle invalid space-separated compound ranges like ">=3.0.0 >=4.0.0"
  // But NOT valid ranges like ">=3.0.0 <5.0.0" which is a single range with upper bound
  const allRangeStrings: string[] = []
  for (const range of ranges) {
    // First split on || which is the standard OR separator
    const orParts = range.split(/\s*\|\|\s*/).map(r => r.trim()).filter(Boolean)

    for (const part of orParts) {
      // Check if this part looks like invalid space-separated ranges
      // e.g., ">=3.0.0 >=4.0.0" should become [">=3.0.0", ">=4.0.0"]
      // But ">=3.0.0 <5.0.0" should stay as-is (valid range with upper bound)
      // The pattern for invalid space-separated: multiple >= or ^
      const spaceSeparatedMatch = part.match(/^(>=\S+)\s+(>=\S.*)$/)
      if (spaceSeparatedMatch) {
        // Recursively split in case there are more
        const subParts = [spaceSeparatedMatch[1]!, spaceSeparatedMatch[2]!]
        for (const subPart of subParts) {
          const furtherSplit = subPart.match(/^(>=\S+)\s+(>=\S.*)$/)
          if (furtherSplit) {
            allRangeStrings.push(furtherSplit[1]!, furtherSplit[2]!)
          }
          else {
            allRangeStrings.push(subPart)
          }
        }
      }
      else {
        allRangeStrings.push(part)
      }
    }
  }

  if (allRangeStrings.length === 0) return ''
  if (allRangeStrings.length === 1) {
    // Single range - validate and return
    const valid = semver.validRange(allRangeStrings[0]!)
    return valid ? allRangeStrings[0]! : ''
  }

  // Parse all ranges
  const parsedRanges: ParsedRange[] = []
  for (const rangeStr of allRangeStrings) {
    const parsed = parseRangeComponent(rangeStr)
    if (parsed) {
      parsedRanges.push(parsed)
    }
  }

  if (parsedRanges.length === 0) return ''
  if (parsedRanges.length === 1) return parsedRanges[0]!.original

  // Group ranges by major version
  const byMajor = new Map<number, ParsedRange[]>()
  for (const range of parsedRanges) {
    const existing = byMajor.get(range.major) || []
    existing.push(range)
    byMajor.set(range.major, existing)
  }

  const mostPermissivePerMajor: ParsedRange[] = []

  for (const [_major, rangesForMajor] of byMajor) {
    // Sort by version (ascending) - lowest minimum version is most permissive
    rangesForMajor.sort(compareVersionTuple)

    // The first one (lowest minimum) is the most permissive for this major
    let mostPermissive = rangesForMajor[0]!

    // If there's an open-ended >= range, prefer it over caret ranges
    for (const range of rangesForMajor) {
      if (range.type === 'gte' && !range.hasUpperBound) {
        // Check if this >= range starts at or before the current most permissive
        if (compareVersionTuple(range, mostPermissive) <= 0) {
          mostPermissive = range
        }
      }
    }

    mostPermissivePerMajor.push(mostPermissive)
  }

  // Now check if any range covers others across major versions
  // (e.g., >=3.0.0 covers >=4.0.0 since it has no upper bound)
  const finalRanges: ParsedRange[] = []

  // Sort by major version ascending
  mostPermissivePerMajor.sort((a, b) => a.major - b.major)

  for (const range of mostPermissivePerMajor) {
    // Check if this range is already covered by an existing range in finalRanges
    let isCovered = false
    for (const existing of finalRanges) {
      if (isRangeCoveredBy(range, existing)) {
        isCovered = true
        break
      }
    }

    if (!isCovered) {
      finalRanges.push(range)
    }
  }

  // Format the output
  // Sort by major version for consistent output
  finalRanges.sort((a, b) => a.major - b.major)

  // Try to simplify to a single >= range if possible
  if (finalRanges.length > 1) {
    // Check if all ranges are consecutive majors and we can use a single >= range
    const firstRange = finalRanges[0]!
    if (firstRange.type === 'gte' && !firstRange.hasUpperBound) {
      // Already handled by coverage check above
    }
  }

  return finalRanges.map((r) => {
    // Prefer clean formatting
    if (r.type === 'gte') {
      return `>=${formatVersion(r.major, r.minor, r.patch, r.prerelease)}`
    }
    if (r.type === 'caret') {
      if (r.minor === 0 && r.patch === 0 && !r.prerelease) {
        return `^${r.major}.0.0`
      }
      return `^${formatVersion(r.major, r.minor, r.patch, r.prerelease)}`
    }
    // For other types, use the original
    return r.original
  }).join(' || ')
}

// Keep the old name as an alias for backwards compatibility
export const deduplicateCompatibilityRanges = mergeCompatibilityRanges

/**
 * Check if a compatibility range includes Nuxt 4.x
 */
export function isNuxt4Compatible(range: string): boolean {
  if (!range) return false
  try {
    // Test against a Nuxt 4 version
    return semver.satisfies('4.0.0', range)
  }
  catch {
    return false
  }
}

export function isRealDocsUrl(url: string): boolean {
  if (!url) return false
  return !url.includes('github.com')
}
