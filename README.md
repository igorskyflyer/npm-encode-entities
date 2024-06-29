# 🏃‍♂️ Encode Entities 🍁

<br>

🏃‍♂️ Fast and simple Map and RegExp based HTML entities encoder. 🍁

<br>
<br>

<div align="center">
	<blockquote>
		<h4>💖 Support further development</h4>
		<span>I work hard for every project, including this one and your support means a lot to me!
		<br>
		Consider buying me a coffee. ☕
		<br>
		<strong>Thank you for supporting my efforts! 🙏😊</strong></span>
		<br>
		<br>
		<a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="150"></a>
		<br>
		<br>
		<a href="https://github.com/igorskyflyer"><em>@igorskyflyer</em></a>
		<br>
		<br>
	</blockquote>
</div>

<br>

Fast and simple Map and RegExp based HTML entities encoder. In order to overcome different methods of possible XSS attacks, it by default encodes the following characters: **<**, **>**, **"**, **'**, **&**, **=**, `**,** **!**, **@**, **\$**, **%**, **(**, **)**, **+**, **{**, **}**, **[**, **]**.<br>_You can however remove any of these rules and/or add your own._

<br>

> Uses the [@igor.dvlpr/mapped-replacer](https://www.npmjs.com/package/@igor.dvlpr/mapped-replacer) package.

<br>

## 🕵🏼 Usage

Install it by executing:

```shell
npm i "@igor.dvlpr/encode-entities"
```

<br>

## 🤹🏼 API

### resetRules(): void

_Resets the rules to the default ones._

```ts
import { Encoder } from '@igor.dvlpr/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRule('<', '😀')
encoder.addRule('>', '😂')
encoder.resetRules()

console.log(encoder.encode('<strong>')) // outputs '&#60;strong&#62;'
```

<br>

### addRule(key: string, value: string): boolean

_Adds a new rule or updates the existing rule for entities encoding. Returns true if the rule was added successfully or false if not._

```ts
import { Encoder } from '@igor.dvlpr/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRule('→', '&#8594;')
console.log(encoder.encode('<a href="#">→</a>')) // outputs '&#60;a href&#61;&#34;#&#34;&#62;&#8594;&#60;/a&#62;'
```

<br>

### addRules(rules: Object): boolean

_Adds rules or updates the existing rules for entity encoding._<br>
_Passed object is a simple key-value object, i.e. **{ '<': '\&#60;', '>': '\&#62;' }**_<br>
_Returns true if the rules were added successfully or false if not._

```ts
import { Encoder } from '@igor.dvlpr/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRules({
  '𝕋': '&#120139;',
  '≈': '&#8776;',
  '𝔱': '&#120113;',
})

console.log(encoder.encode('<span>𝕋 ≈ 𝔱</span>')) // outputs '&#60;span&#62;&#120139; &#8776; &#120113;&#60;/span&#62;'
```

<br>

### removeRule(key: string): boolean

_Removes the rule that matches the provided key._
_Returns true if the rule was removed successfully or false if not._

```ts
import { Encoder } from '@igor.dvlpr/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRules({
  '𝕋': '&#120139;',
  '≈': '&#8776;',
  '𝔱': '&#120113;',
})
encoder.removeRule('≈')

console.log(encoder.rulesCount()) // outputs 20
```

<br>

### rulesCount(): number

_Gets the number of rules for entity encoding._

```ts
import { Encoder } from '@igor.dvlpr/encode-entities'

const encoder: Encoder = new Encoder()

encoder.addRules({
  '𝕋': '&#120139;',
  '≈': '&#8776;',
  '𝔱': '&#120113;',
})

console.log(encoder.rulesCount()) // outputs 21
```

<br>

### encode()

_Encodes special characters in the given string to HTML entities._

```ts
import { Encoder } from '@igor.dvlpr/encode-entities'

const encoder: Encoder = new Encoder()

console.log(encoder.encode('<strong>')) // outputs '&#60;strong&#62;'
```

---

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-encode-entities/blob/main/LICENSE).

---

## 🧬 Related

[@igor.dvlpr/str-is-in](https://www.npmjs.com/package/@igor.dvlpr/str-is-in)

> _🧵 Provides ways of checking whether a String is present in an Array of Strings using custom Comparators. 🔍_

[@igor.dvlpr/aria](https://www.npmjs.com/package/@igor.dvlpr/aria)

> _🧬 Meet Aria, an efficient Adblock filter list compiler, with many features that make your maintenance of Adblock filter lists a breeze! 🗡_

[@igor.dvlpr/pathexists](https://www.npmjs.com/package/@igor.dvlpr/pathexists)

> _🧲 Provides ways of properly checking if a path exists inside a given array of files/directories both on Windows and UNIX-like operating systems. 🗺_

[@igor.dvlpr/chars-in-string](https://www.npmjs.com/package/@igor.dvlpr/chars-in-string)

> _🪐 Provides ways of testing whether an array of chars is present inside a given String. ☄_

[@igor.dvlpr/valid-path](https://www.npmjs.com/package/@igor.dvlpr/valid-path)

> _🧰 Provides ways of testing whether a given value can be a valid file/directory name. 🏜_

<br>
<br>

>
> Provided by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
>
