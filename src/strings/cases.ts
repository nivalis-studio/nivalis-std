import { capitalize } from './capitalize';

const wordSplitRegex = /(?=[A-Z])|[\s._-]/;
const numberSplitRegex = /[a-z]\d/i;
const dashSplitRegex = /[\s._-]/;

/**
 * Formats the given string in camel case fashion
 *
 * camel('hello world')   -> 'helloWorld'
 * camel('va va-VOOM') -> 'vaVaVoom'
 * camel('helloWorld') -> 'helloWorld'
 * @param {string} str The String to format
 * @returns {string} The formatted String
 */
export const camel = (str: string): string => {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(wordSplitRegex)
      .map(x => x.toLowerCase()) ?? [];

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return parts.reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`;
  }, '');
};

/**
 * Formats the given string in snake case fashion
 *
 * snake('hello world')   -> 'hello_world'
 * snake('va va-VOOM') -> 'va_va_voom'
 * snake('helloWord') -> 'hello_world'
 * @param {string} str The String to format
 * @param {object} options Options
 * @param {boolean} options.splitOnNumber Whether to split on numbers
 * @returns {string} The formatted String
 */
export const snake = (
  str: string,
  options?: {
    splitOnNumber?: boolean;
  },
): string => {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      .split(wordSplitRegex)
      .map(x => x.toLowerCase()) ?? [];

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0];
  }

  const result = parts.reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`;
  }, '');

  return options?.splitOnNumber === false
    ? result
    : result.replace(numberSplitRegex, val => `${val[0]}_${val[1]}`);
};

/**
 * Formats the given string in dash case fashion
 *
 * dash('hello world')   -> 'hello-world'
 * dash('va va_VOOM') -> 'va-va-voom'
 * dash('helloWord') -> 'hello-word'
 * @param {string} str The String to format
 * @returns {string} The formatted String
 */
export const dash = (str: string): string => {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(wordSplitRegex)
      .map(x => x.toLowerCase()) ?? [];

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return parts.reduce((acc, part) => {
    return `${acc}-${part.toLowerCase()}`;
  }, '');
};

/**
 * Formats the given string in pascal case fashion
 *
 * pascal('hello world') -> 'HelloWorld'
 * pascal('va va boom') -> 'VaVaBoom'
 * @param {string} str The String to format
 * @returns {string} The formatted String
 */
export const pascal = (str: string): string => {
  const parts = str?.split(dashSplitRegex).map(x => x.toLowerCase()) ?? [];

  if (parts.length === 0) {
    return '';
  }

  return parts
    .map(substring => substring.charAt(0).toUpperCase() + substring.slice(1))
    .join('');
};

/**
 * Formats the given string in title case fashion
 *
 * title('hello world') -> 'Hello World'
 * title('va_va_boom') -> 'Va Va Boom'
 * title('root-hook') -> 'Root Hook'
 * title('queryItems') -> 'Query Items'
 * @param {string} str The String to format
 * @returns {string} The formatted String
 */
export const title = (str: string | null | undefined): string => {
  if (!str) {
    return '';
  }

  return str
    .split(wordSplitRegex)
    .map(char => char.trim())
    .filter(char => Boolean(char))
    .map(char => capitalize(char.toLowerCase()))
    .join(' ');
};
