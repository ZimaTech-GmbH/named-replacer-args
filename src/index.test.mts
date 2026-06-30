import assert from 'node:assert'
import { before, suite, test } from 'node:test'
import { nameReplacerArgs } from './index.mjs'

suite('Functionality tests', () => {
  let namedArgs: ReturnType<typeof nameReplacerArgs<'name'>>
  before(() => {
    'Simone says: Hello World!'.replace(/(Hello) (?<name>\w+)!?/, (...args) => {
      namedArgs = nameReplacerArgs<'name'>(args)
      return namedArgs.match
    })
  })

  test('.match equals whole match', () => {
    assert.strictEqual(namedArgs.match, 'Hello World!')
  })
  test('.ps equals capturing groups', () => {
    assert.strictEqual(namedArgs.ps.length, 2)
    assert.strictEqual(namedArgs.ps[0], 'Hello')
    assert.strictEqual(namedArgs.ps[1], 'World')
  })
  test('.offset equals match offset within whole string', () => {
    assert.strictEqual(namedArgs.offset, 13)
  })
  test('.string equals whole examined string', () => {
    assert.strictEqual(namedArgs.string, 'Simone says: Hello World!')
  })
  test('.groups equals named capturing groups', () => {
    assert.deepEqual(namedArgs.groups, {
      name: 'World',
    })
  })
})

suite('Code examples', () => {
  // The simplest form to define the replacer function is using `(...args)`.
  // This gives TypeScript enough information to determine the overload of
  // `String.replace` being used and makes it infer `args` as tuple.
  // The replacer function can be defined using `(...args)`, that's the simplest
  // form still giving TypeScript enough information to correctly infer types.
  test('Using only spread parameter', () => {
    assert.strictEqual(
      'hello'.replace(/^./, (...args) => {
        const namedArgs = nameReplacerArgs(args)
        return `~${namedArgs.match}~`
      }),
      '~h~ello',
    )
  })
  // If you insist in not using `any` anywhere, you can type the rest parameter
  // as `unknown[]`.
  test('Using multiple parameters', () => {
    assert.strictEqual(
      'hello'.replace(/^./, (substring, ...args: unknown[]) => {
        const namedArgs = nameReplacerArgs([substring, ...args])
        return `~${namedArgs.match}~`
      }),
      '~h~ello',
    )
  })
  // `nameReplacerArgs` will not assume the presence of named groups, hence the
  // `groups` property could be undefined.
  test('Named groups without type hint', () => {
    assert.strictEqual(
      'hello'.replace(/^(?<initial>.)(?<rest>.*)/, (...args) => {
        const namedArgs = nameReplacerArgs(args)
        return `~${namedArgs.groups?.initial}~${namedArgs.groups?.rest}`
      }),
      '~h~ello',
    )
  })
  // Using a generic, group names can be passed as union. This tells TypeScript
  // the `groups` property is populated and allows it to auto-complete its
  // fields.
  test('Named groups with type hint', () => {
    assert.strictEqual(
      'hello'.replace(/^(?<initial>.)(?<rest>.*)/, (...args) => {
        const namedArgs = nameReplacerArgs<'initial' | 'rest'>(args)
        return `~${namedArgs.groups.initial}~${namedArgs.groups.rest}`
      }),
      '~h~ello',
    )
  })
})
