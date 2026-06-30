| Item | Description
|---|---|
| [`function nameReplacerArgs`](-export-function-namereplacerargs-groupnames-extends-string-unknown-unknown-) | Turns the arguments of a replacer function in `String.replace` and `String.replaceAll` into an object with useful names.|
| [`interface NamedReplacerArgs`](-export-interface-namedreplacerargs-) | Return type of <a href="#-export-function-namereplacerargs-groupnames-extends-string-unknown-unknown-">`nameReplacerArgs`</a>. |
| &nbsp;[`match`](-match-string-) | The matched substring. |
| &nbsp;[`ps`](-ps-string-) | The strings found by capture groups. |
| &nbsp;[`offset`](-offset-number-) | The offset of the matched substring within the whole string being examined. |
| &nbsp;[`string`](-string-string-) | The whole string being examined. |
| &nbsp;[`groups`](-groups-groupstype-groupnames-) | An object whose keys are the used group names, and whose values are the matched portions. |
| [`type GroupsType`](-export-type-groupstype-groupnames-groupnames-extends-string-) | Type of <a href="#-groups-groupstype-groupnames-">`NamedReplacerArgs.groups`</a>, basically `Record<string, string \| undefined> \| undefined`. |


<div id="-export-function-namereplacerargs-groupnames-extends-string-unknown-unknown-"></div>

# `function nameReplacerArgs`

```ts
export function nameReplacerArgs<GroupNames extends string | unknown = unknown>(
  args: unknown[],
): NamedReplacerArgs<GroupNames> 
```

Turns the arguments of a replacer function in `String.replace` and
`String.replaceAll` into an object with useful names.
The replacer functions' parameters are defined as:
```EBNF
parameters = match "," p1 {"," pn} "," offset "," string ["," groups];
```
> [!NOTE]  
> The number of parameters depends on the number of capturing groups as well
> as the presence of named capturing groups.
- *@param* `args` &mdash; The arguments passed to the replacer function in
`String.replace` and `String.replaceAll`.
- *@typeParam* `GroupNames` - (optional) Names of named groups. Pass multiple as
union (e.g. `'firstName' | 'lastName'`)
- *@returns*  &mdash; An object with keys corresponding the replacer functions arguments'
meaning.
- *@example* 
```js
'hello'.replace(/^(?<initial>.)(?<rest>.*)/, (...args) => {
  const namedArgs = nameReplacerArgs<'initial' | 'rest'>(args)
  return `~${namedArgs.groups.initial}~${namedArgs.groups.rest}`
})
```
- *@see* <a href="#-export-interface-namedreplacerargs-">`NamedReplacerArgs`</a>

<div id="-export-interface-namedreplacerargs-"></div>

# `interface NamedReplacerArgs`

```ts
export interface NamedReplacerArgs<
  GroupNames extends string | unknown = unknown,
>
```

Return type of <a href="#-export-function-namereplacerargs-groupnames-extends-string-unknown-unknown-">`nameReplacerArgs`</a>.
- *@typeParam* `GroupNames` - Names of named groups.

<div id="-match-string-"></div>

## `match`

```ts
match: string
```

The matched substring.

<div id="-ps-string-"></div>

## `ps`

```ts
ps: string[]
```

The strings found by capture groups.

<div id="-offset-number-"></div>

## `offset`

```ts
offset: number
```

The offset of the matched substring within the whole string being examined.

<div id="-string-string-"></div>

## `string`

```ts
string: string
```

The whole string being examined.

<div id="-groups-groupstype-groupnames-"></div>

## `groups`

```ts
groups: GroupsType<GroupNames>
```

An object whose keys are the used group names, and whose values are the
matched portions.
- *@see* <a href="#-export-type-groupstype-groupnames-groupnames-extends-string-">`GroupsType`</a>

<div id="-export-type-groupstype-groupnames-groupnames-extends-string-"></div>

# `type GroupsType`

```ts
type GroupsType<GroupNames>
```

Type of <a href="#-groups-groupstype-groupnames-">`NamedReplacerArgs.groups`</a>, basically
`Record<string, string | undefined> | undefined`.
- *@typeParam* `GroupNames` - Names of named groups as keys or `unknown`.
If keys are defined, the `groups` property type can be narrowed to
`Record<GroupNames, string | undefined>`.