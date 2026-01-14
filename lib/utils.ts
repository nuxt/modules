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

export function deduplicateCompatibilityRanges(ranges: string[]): string {
  if (ranges.length === 0) return ''
  if (ranges.length === 1) return ranges[0]!

  // Split compound ranges (those with ||) into individual ranges
  const allRanges: string[] = []
  for (const range of ranges) {
    allRanges.push(...range.split('||').map(r => r.trim()))
  }

  // Normalize and validate ranges
  const validRanges = allRanges
    .map((r) => {
      const normalized = semver.validRange(r)
      return normalized || null
    })
    .filter((r): r is string => r !== null)

  // Remove exact duplicates
  const uniqueRanges = Array.from(new Set(validRanges))

  if (uniqueRanges.length === 0) return ''
  if (uniqueRanges.length === 1) return uniqueRanges[0]!

  // Test versions across major releases to determine which ranges are most permissive
  const testVersions = [
    '2.0.0', '2.15.0', '2.16.0', '2.99.99',
    '3.0.0-rc.1', '3.0.0-rc.3', '3.0.0', '3.10.0', '3.19.0', '3.99.99',
    '4.0.0', '4.1.0', '4.99.99',
    '5.0.0',
  ]

  // For each range, determine which test versions it satisfies
  const rangeSatisfactions = uniqueRanges.map((range) => {
    const satisfiedVersions = new Set<string>()
    for (const version of testVersions) {
      try {
        if (semver.satisfies(version, range)) {
          satisfiedVersions.add(version)
        }
      }
      catch {
        // Invalid range, skip
      }
    }
    return { range, satisfiedVersions, minVersion: semver.minVersion(range) }
  })

  // Remove ranges that are completely covered by other ranges
  const filteredRanges = rangeSatisfactions.filter((current, _, all) => {
    // Keep this range if no other range is a superset of it
    return !all.some((other) => {
      if (current.range === other.range) return false

      // Check if other range satisfies all versions that current range does (and potentially more)
      const isSubset = Array.from(current.satisfiedVersions).every(v =>
        other.satisfiedVersions.has(v),
      )

      // Only remove if other is strictly larger (not equal)
      if (isSubset && other.satisfiedVersions.size > current.satisfiedVersions.size) {
        return true
      }

      return false
    })
  })

  // Try to merge or simplify ranges using semver utilities
  if (filteredRanges.length > 1) {
    // Find the union of all satisfied versions
    const allSatisfiedVersions = new Set<string>()
    for (const r of filteredRanges) {
      for (const v of r.satisfiedVersions) {
        allSatisfiedVersions.add(v)
      }
    }

    // Try simplified patterns that might cover the same versions
    const simplifiedPatterns = generateSimplifiedPatterns(filteredRanges, testVersions)

    for (const pattern of simplifiedPatterns) {
      const patternSatisfied = new Set<string>()
      for (const version of testVersions) {
        try {
          if (semver.satisfies(version, pattern)) {
            patternSatisfied.add(version)
          }
        }
        catch {
          continue
        }
      }

      // Check if pattern covers exactly the same versions
      if (setsEqual(patternSatisfied, allSatisfiedVersions)) {
        return pattern
      }
    }
  }

  // Sort by how many versions they satisfy (most permissive first) and then by min version for consistent output
  filteredRanges.sort((a, b) => {
    // First sort by coverage (descending)
    if (b.satisfiedVersions.size !== a.satisfiedVersions.size) {
      return b.satisfiedVersions.size - a.satisfiedVersions.size
    }
    // Then by minimum version (ascending) for stability
    if (a.minVersion && b.minVersion) {
      return semver.compare(a.minVersion, b.minVersion)
    }
    return 0
  })

  return filteredRanges.map(r => r.range).join(' || ')
}

function generateSimplifiedPatterns(rangeSatisfactions: Array<{ range: string, satisfiedVersions: Set<string>, minVersion: semver.SemVer | null }>, _testVersions: string[]): string[] {
  const patterns: string[] = []

  // Find min and max major versions covered
  const majorVersions = new Set<number>()
  for (const r of rangeSatisfactions) {
    for (const v of r.satisfiedVersions) {
      const parsed = semver.parse(v)
      if (parsed) {
        majorVersions.add(parsed.major)
      }
    }
  }

  const sortedMajors = Array.from(majorVersions).sort((a, b) => a - b)
  if (sortedMajors.length === 0) return patterns

  const minMajor = sortedMajors[0]!

  // Find the actual minimum version covered across all ranges
  const allMinVersions = rangeSatisfactions
    .map(r => r.minVersion)
    .filter((v): v is semver.SemVer => v !== null)
    .sort((a, b) => semver.compare(a, b))

  const absoluteMinVersion = allMinVersions[0]

  if (absoluteMinVersion) {
    const minVersionStr = absoluteMinVersion.version

    // Try >=minVersion (this is the most permissive single range)
    patterns.push(`>=${minVersionStr}`)

    // For single major version coverage, try ^X pattern
    if (sortedMajors.length === 1) {
      patterns.push(`^${minMajor}`)
      patterns.push(`>=${minMajor}.0.0`)
      patterns.push(`~${minMajor}.0.0`)
    }

    // For multiple major versions, try combined patterns
    if (sortedMajors.length > 1) {
      // Try >=minMajor.0.0 (covers all majors)
      patterns.push(`>=${minMajor}.0.0`)

      // Try ^X || ^Y pattern for each major
      const caretPatterns = sortedMajors.map(m => `^${m}`)
      patterns.push(caretPatterns.join(' || '))

      // Try >=X.0.0 pattern for each major combined
      const gtePatterns = sortedMajors.map(m => `>=${m}.0.0`)
      patterns.push(gtePatterns.join(' || '))

      // Check if ranges are consecutive majors - if so, might simplify to single >=
      const areConsecutive = sortedMajors.every((major, i) => {
        if (i === 0) return true
        return major === sortedMajors[i - 1]! + 1
      })

      if (areConsecutive) {
        // For consecutive majors like 3,4,5 we can often just use >=3.0.0
        patterns.push(`>=${minMajor}.0.0`)
      }

      for (let i = 0; i < sortedMajors.length - 1; i++) {
        const locked = sortedMajors.slice(0, i + 1).map(m => `^${m}`)
        const open = `>=${sortedMajors[i + 1]}.0.0`
        patterns.push([...locked, open].join(' || '))
      }
    }
  }

  return patterns
}

function setsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false
  for (const item of a) {
    if (!b.has(item)) return false
  }
  return true
}
