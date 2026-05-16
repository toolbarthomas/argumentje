export type V = boolean | number | string | undefined | null
export type Response = Record<string, V>
export type Parser = (value?: string[]) => Response

/**
 * Simple Command Line Interface parser for Node.js
 *
 * - Boolean
 * - Null
 * - Number
 * - Flag
 * - String
 */
const coerce = (v: string): V => {
  if (v === 'null') return null
  if (v.toLowerCase() === 'true') return true
  if (v.toLowerCase() === 'false') return false
  if (!isNaN(Number(v)) && v.trim() !== '') return Number(v)
  return v
}

export const parse = <T = Response>(value?: string[]) => {
  //@ts-ignore
  const args = value || process.argv.slice(2).reverse()
  const response = {} as any

  try {
    for (let i = args.length; i--; ) {
      let current = args[i]

      if (!current) {
        continue
      }

      const eqIndex = current.indexOf('=')
      let name: string | undefined
      let v: any

      if (eqIndex >= 0) {
        name = current.slice(0, eqIndex).replace(/^-+/, '')
        v = current.slice(eqIndex + 1)
      } else if (current.startsWith('-')) {
        name = current.replace(/^-+/, '')
        v = true
      } else {
        if (current && typeof current === 'string') {
          response[current] = coerce(current)
        }

        continue
      }

      if (typeof v === 'string') {
        v = coerce(v)
      }

      if (name) {
        response[name as any] = v
      }
    }
  } catch (exception) {
    if (exception) {
      return {} as T
    }
  }

  return response as T
}

export default {
  parse
}
