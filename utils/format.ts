import millify from 'millify'

export function numberFormatter (num: number, options = { precision: 1 }) {
  return millify(num || 0, options)
}
