import { describe, expect, test } from 'bun:test';
import { htmlEscape, htmlUnescape } from './escape';

describe('htmlEscape', () => {
  test('should escape all relevant characters', () => {
    const input = `Hello & "World" <'test'>`;
    const expected = 'Hello &amp; &quot;World&quot; &lt;&#39;test&#39;&gt;';

    expect(htmlEscape(input)).toBe(expected);
  });

  test('should escape ampersands correctly', () => {
    const input = 'Fish & Chips';
    const expected = 'Fish &amp; Chips';

    expect(htmlEscape(input)).toBe(expected);
  });

  test('should escape double quotes correctly', () => {
    const input = 'She said "Hello"';
    const expected = 'She said &quot;Hello&quot;';

    expect(htmlEscape(input)).toBe(expected);
  });

  test('should escape single quotes correctly', () => {
    const input = "It's a test";
    const expected = 'It&#39;s a test';

    expect(htmlEscape(input)).toBe(expected);
  });

  test('should escape less than and greater than signs correctly', () => {
    const input = '<div>Hello</div>';
    const expected = '&lt;div&gt;Hello&lt;/div&gt;';

    expect(htmlEscape(input)).toBe(expected);
  });
});

describe('htmlUnescape', () => {
  test('should unescape all relevant characters', () => {
    const input = 'Hello &amp; &quot;World&quot; &lt;&#39;test&#39;&gt;';
    const expected = `Hello & "World" <'test'>`;

    expect(htmlUnescape(input)).toBe(expected);
  });

  test('should unescape ampersands correctly', () => {
    const input = 'Fish &amp; Chips';
    const expected = 'Fish & Chips';

    expect(htmlUnescape(input)).toBe(expected);
  });

  test('should unescape double quotes correctly', () => {
    const input = 'She said &quot;Hello&quot;';
    const expected = 'She said "Hello"';

    expect(htmlUnescape(input)).toBe(expected);
  });

  test('should unescape single quotes correctly', () => {
    const input = 'It&#39;s a test';
    const expected = "It's a test";

    expect(htmlUnescape(input)).toBe(expected);
  });

  test('should unescape less than and greater than signs correctly', () => {
    const input = '&lt;div&gt;Hello&lt;/div&gt;';
    const expected = '<div>Hello</div>';

    expect(htmlUnescape(input)).toBe(expected);
  });

  test('should handle mixed numeric and named entities correctly', () => {
    const input = 'It&#39;s &quot;complicated&quot; &amp; messy';
    const expected = `It's "complicated" & messy`;

    expect(htmlUnescape(input)).toBe(expected);
  });

  test('should handle multiple consecutive escaped characters correctly', () => {
    const input = '&lt;&lt;&gt;&gt;&quot;&quot;&amp;&amp;';
    const expected = '<<>>""&&';

    expect(htmlUnescape(input)).toBe(expected);
  });
});
