import { describe, it } from 'mocha';
import { expect } from 'expect';
import { escapeRegexp } from '.';

describe('escapeRegexp', () => {
  it('should work', () => {
    expect(escapeRegexp(String.raw`\ ^ $ * + ? . ( ) | { } [ ]`)).toBe(String.raw`\\ \^ \$ \* \+ \? \. \( \) \| \{ \} \[ \]`);
  });

  it('escapes `-` in a way compatible with PCRE', () => {
    expect(escapeRegexp('foo - bar')).toBe(String.raw`foo \x2d bar`);
  });

  it('escapes `-` in a way compatible with the Unicode flag', () => {
    expect(new RegExp(escapeRegexp('-'), 'u').test('-')).toBe(true);
  });

  it('do not escapes `-` when unicode flag is disabled', () => {
    expect(escapeRegexp('foo - bar', false)).toBe(String.raw`foo - bar`);
  });
});
