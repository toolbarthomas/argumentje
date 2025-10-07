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
          response[current] = current
        }

        continue
      }

      if (typeof v === 'string') {
        if (v === 'null') {
          v = null
        } else if (v.toLowerCase() === 'true') {
          v = true
        } else if (v.toLowerCase() === 'false') {
          v = false
        } else if (!isNaN(Number(v)) && v.trim() !== '') {
          v = Number(v)
        }
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
