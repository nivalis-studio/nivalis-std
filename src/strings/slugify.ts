/* eslint-disable sonarjs/slow-regex */
/**
 * Formats the given string in slug url compatible fashion
 *
 * slugify('hello world')   -> 'hello-world'
 * slugify('va va_VOOM') -> 'va-va-voom'
 * slugify('bonjour l\'Amérique !') -> 'bonjour-lamerique'
 * slugify('helloWord 11') -> 'hello-word-11'
 * @param {string} text The string to format
 * @returns {string} The formatted String
 */
export const slugify = (text: string) => {
  return text
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .trim()
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^\w-]+/g, '')
    .replaceAll(/-{2,}/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
