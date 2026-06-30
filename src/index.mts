/**
 * Turns the arguments of a replacer function in `String.replace` and
 * `String.replaceAll` into an object with useful names.
 * The replacer functions' parameters are defined as:
 * ```EBNF
 * parameters = match "," p1 {"," pn} "," offset "," string ["," groups];
 * ```
 * > [!NOTE]
 * > The number of parameters depends on the number of capturing groups as well
 * > as the presence of named capturing groups.
 * @param args - The arguments passed to the replacer function in
 * `String.replace` and `String.replaceAll`.
 * @typeParam GroupNames - (optional) Names of named groups. Pass multiple as
 * union (e.g. `'firstName' | 'lastName'`)
 * @returns An object with keys corresponding the replacer functions arguments'
 * meaning.
 * @example
 * 'hello'.replace(/^(?<initial>.)/, (...args) => {
 *   const namedArgs = nameReplacerArgs<'initial'>(args)
 *   return `~${namedArgs.groups.initial}~`
 * })
 * @see {@link NamedReplacerArgs}
 */
export function nameReplacerArgs<GroupNames extends string | unknown = unknown>(
  args: unknown[],
): NamedReplacerArgs<GroupNames> {
  // copy args array so the function doesn't mutate input
  const _args = [...args]
  // at runtime, whether `groups` includes `undefined` depends on the input
  // regular expression
  let groups: GroupsType<GroupNames> = undefined as GroupsType<GroupNames>
  if (typeof _args.at(-1) === 'object') {
    groups = _args.pop() as GroupsType<GroupNames>
  }
  const string = _args.pop() as string
  const offset = _args.pop() as number
  const match = _args.shift() as string
  const ps = _args as string[]
  const obj: NamedReplacerArgs<GroupNames> = {
    match,
    ps,
    offset,
    string,
    groups,
  }
  return obj
}

/**
 * Return type of {@link nameReplacerArgs}.
 * @typeParam GroupNames - Names of named groups.
 */
export interface NamedReplacerArgs<
  GroupNames extends string | unknown = unknown,
> {
  /** The matched substring. */
  match: string
  /** The strings found by capture groups. */
  ps: string[]
  /**
   * The offset of the matched substring within the whole string being examined.
   */
  offset: number
  /** The whole string being examined. */
  string: string
  /**
   * An object whose keys are the used group names, and whose values are the
   * matched portions.
   * @see {@link GroupsType}
   */
  groups: GroupsType<GroupNames>
}

/**
 * Type of {@link NamedReplacerArgs.groups}, basically
 * `Record<string, string | undefined> | undefined`.
 * @typeParam GroupNames - Names of named groups as keys or `unknown`.
 * If keys are defined, the `groups` property type can be narrowed to
 * `Record<GroupNames, string | undefined>`.
 */
export type GroupsType<GroupNames> = GroupNames extends string
  ? Record<GroupNames, string | undefined>
  : Record<string, string | undefined> | undefined
