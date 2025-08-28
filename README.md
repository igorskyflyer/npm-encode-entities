<div align="center">
  <img src="https://raw.githubusercontent.com/igorskyflyer/npm-encode-entities/main/media/encode-entities.png" alt="Icon of Encode Entities" width="256" height="256">
  <h1>Encode Entities</h1>
</div>

<br>

<h4 align="center">
  🏃‍♂️ Fast and simple Map and RegExp based HTML entities encoder. 🍁
</h4>

<br>
<br>

## 📃 Table of Contents

- [Features](#-features)
- [Usage](#-usage)
- [API](#-api)
- [Changelog](#-changelog)
- [Support](#-support)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

<br>
<br>

## 🤖 Features

- ⚡ Instant HTML encoding for special characters
- 🛠 Add your own custom encoding rules
- ♻ Reset back to default rules anytime
- ✏️ Update individual rules on the fly
- ❌ Remove unwanted rules easily
- 📊 See exactly how many rules are active
- 🚀 Single‑pass, high‑performance replacement engine (powered by [`@igorskyflyer/mapped-replacer`](https://www.npmjs.com/package/@igorskyflyer/mapped-replacer))

<br>

> 🛡 **SECURITY**
>
> Encoding of special characters into HTML entities helps mitigate XSS risks in the textual layer by ensuring user‑supplied content is treated as text, not executable code.
>
> **Note: not a full XSS solution, usage of other XSS-prevention techniques is still required.**
>

<br>
<br>

## 🕵🏼 Usage

Install it by executing any of the following, depending on your preferred package manager:

```bash
pnpm add @igorskyflyer/encode-entities
```

```bash
yarn add @igorskyflyer/encode-entities
```

```bash
npm i @igorskyflyer/encode-entities
```

<br>
<br>

## 🤹🏼 API

> 💡 **TIP**
>
> *Encoded by default:*
> **<**, **>**, **"**, **'**, **&**, **=**, `**,** **!**, **@**, **\$**, **%**, **(**, **)**, **+**, **{**, **}**, **[**, **]**.
>
> You can however remove any of these rules and/or add your own.
>

<br>


### resetRules(): void

_Resets the rules to the default ones._

```ts
import { Encoder } from '@igorskyflyer/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRule('😀', '<')
encoder.addRule('😂', '>')
encoder.resetRules()

console.log(encoder.encode('<strong>')) // outputs '&#60;strong&#62;'
```

<br>

### addRule(key: string, value: string): boolean

_Adds a new rule for entities encoding. Returns true if the rule was added successfully or false if not._

```ts
import { Encoder } from '@igorskyflyer/encode-entities'

const encoder: Encoder = new Encoder()
encoder.addRule('&#8594;', '→')

console.log(encoder.encode('<a href="#">→</a>')) // outputs '&#60;a href&#61;&#34;#&#34;&#62;&#8594;&#60;/a&#62;'
```

<br>

### updateRule(replaceWith: string, searchFor: string): boolean

_Updates an existing rule for entity encoding. Returns true if the rule was updated successfully or false if not._

```ts
import { Encoder } from '@igorskyflyer/encode-entities'

const encoder: Encoder = new Encoder()
encoder.addRule('&#8592;', '→')
encoder.updateRule('&#8594;', '→')

console.log(encoder.encode('<a href="#">→</a>')) // outputs '&#60;a href&#61;&#34;#&#34;&#62;&#8594;&#60;/a&#62;'
```

<br>

### addRules(rules: Object): boolean

_Adds rules for entity encoding._<br>
_Passed object is a simple key-value object, i.e. **{ '<': '\&#60;', '>': '\&#62;' }**_<br>
_Returns true if the rules were added successfully or false if not._

```ts
import { Encoder } from '@igorskyflyer/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRules({
  '&#120139;':'𝕋'
  '&#8776;':'≈'
  '&#120113;':'𝔱'
})

console.log(encoder.encode('<span>𝕋 ≈ 𝔱</span>')) // outputs '&#60;span&#62;&#120139; &#8776; &#120113;&#60;/span&#62;'
```

<br>

### removeRule(key: string): boolean

_Removes the rule that matches the provided key._
_Returns true if the rule was removed successfully or false if not._

```ts
import { Encoder } from '@igorskyflyer/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRules({
  '&#120139;': '𝕋',
  '&#8776;': '≈',
  '&#120113;': '𝔱'
})
encoder.removeRule('≈')

console.log(encoder.rulesCount()) // outputs 20
```

<br>

### rulesCount(): number

_Gets the number of rules for entity encoding._

```ts
import { Encoder } from '@igorskyflyer/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRules({
  '&#120139;': '𝕋',
  '&#8776;': '≈',
  '&#120113;': '𝔱',
})

console.log(encoder.rulesCount()) // outputs 21
```

<br>

### encode()

_Encodes special characters in the given string to HTML entities._

```ts
import { Encoder } from '@igorskyflyer/encode-entities'

const encoder: Encoder = new Encoder()

console.log(encoder.encode('<strong>')) // outputs '&#60;strong&#62;'
```

<br>
<br>

## 📝 Changelog

📑 The changelog is available here, [CHANGELOG.md](https://github.com/igorskyflyer/npm-encode-entities/blob/main/CHANGELOG.md).

<br>
<br>

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-encode-entities/blob/main/LICENSE).

<br>
<br>

## 💖 Support

<div align="center">
  I work hard for every project, including this one and your support means a lot to me!
  <br>
  Consider buying me a coffee. ☕
  <br>
  <br>
  <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="180" height="46"></a>
  <br>
  <br>
  <em>Thank you for supporting my efforts!</em> 🙏😊
</div>

<br>
<br>

## 🧬 Related

[@igorskyflyer/str-is-in](https://www.npmjs.com/package/@igorskyflyer/str-is-in)

> _🧵 Provides ways of checking whether a String is present in an Array of Strings using custom Comparators. 🔍_

[@igorskyflyer/aria](https://www.npmjs.com/package/@igorskyflyer/aria)

> _🧬 Meet Aria, an efficient Adblock filter list compiler, with many features that make your maintenance of Adblock filter lists a breeze! 🗡_

[@igorskyflyer/pathexists](https://www.npmjs.com/package/@igorskyflyer/pathexists)

> _🧲 Provides ways of properly checking if a path exists inside a given array of files/directories both on Windows and UNIX-like operating systems. 🗺_

[@igorskyflyer/chars-in-string](https://www.npmjs.com/package/@igorskyflyer/chars-in-string)

> _🪐 Provides ways of testing whether an array of chars is present inside a given String. ☄_

[@igorskyflyer/valid-path](https://www.npmjs.com/package/@igorskyflyer/valid-path)

> _🧰 Provides ways of testing whether a given value can be a valid file/directory name. 🏜_

<br>
<br>
<br>

## 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
