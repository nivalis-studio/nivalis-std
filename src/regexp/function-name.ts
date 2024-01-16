/**
 * Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
 *
 * Regular expression: `/^\s*function\s*([^(]*)/i`
 *
 * -   `/^\s*`
 *     -   Match zero or more spaces at beginning
 *
 * -   `function`
 *     -   Match the word `function`
 *
 * -   `\s*`
 *     -   Match zero or more spaces after the word `function`
 *
 * -   `()`
 *     -   Capture
 *
 * -   `[^(]*`
 *     -   Match anything except a left parenthesis `(` zero or more times
 *
 * -   `/i`
 *     -   ignore case
 */
export const RE_FUNCTION_NAME = /^\s*function\s*([^(]*)/i;
