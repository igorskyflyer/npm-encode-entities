// Author: Igor Dimitrijević (@igorskyflyer)

import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

export class Encoder {
  #replacer: MappedReplacer

  constructor() {
    this.#replacer = new MappedReplacer()
    this.resetRules()
  }

  /**
   * Resets the rules to the default ones.
   */
  resetRules(): void {
    this.#replacer.clearRules()
    this.#replacer.addRules({
      '&#60;': '<',
      '&#62;': '>',
      '&#34;': '"',
      '&#39;': "'",
      '&#38;': '&',
      '&#61;': '=',
      '&#96;': '`',
      '&#33;': '!',
      '&#64;': '@',
      '&#36;': '$',
      '&#37;': '%',
      '&#40;': '(',
      '&#41;': ')',
      '&#43;': '+',
      '&#123;': '{',
      '&#125;': '}',
      '&#91;': '[',
      '&#93;': ']'
    })
  }

  /**
   * Adds a new rule for entity encoding.
   */
  addRule(replaceWith: string, searchFor: string): boolean {
    return this.#replacer.addRule(replaceWith, searchFor)
  }

  /**
   * Updates an existing rule for entity encoding.
   */
  updateRule(replaceWith: string, searchFor: string): boolean {
    return this.#replacer.updateRule(replaceWith, searchFor)
  }

  /**
   * Adds rules for entity encoding.
   *
   * Passed object is a simple key-value object, i.e. { '\&#60;': '<', '&#62;': '>' }
   */
  addRules(rules: { [replaceWith: string]: string }): boolean {
    return this.#replacer.addRules(rules)
  }

  /**
   * Removes the rule that matches the provided key.
   */
  removeRule(key: string) {
    return this.#replacer.removeRule(key)
  }

  /**
   * Gets the number of rules for entity encoding.
   */
  rulesCount(): number {
    return this.#replacer.rulesCount()
  }

  /**
   * Encodes special characters in the given string to HTML entities.
   */
  encode(input: string): string {
    return this.#replacer.replace(input)
  }
}
