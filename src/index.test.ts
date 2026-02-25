import { describe, it } from 'mocha';
import { expect } from 'earl';
import { escapeRegexp } from '.';

describe('escapeRegexp', () => {
  it('should work', () => {
    expect(escapeRegexp(String.raw`\ ^ $ * + ? . ( ) | { } [ ]`)).toEqual(String.raw`\\ \^ \$ \* \+ \? \. \( \) \| \{ \} \[ \]`);
  });

  it('escapes `-` in a way compatible with PCRE', () => {
    expect(escapeRegexp('foo - bar')).toEqual(String.raw`foo \x2d bar`);
  });

  it('escapes `-` in a way compatible with the Unicode flag', () => {
    expect(new RegExp(escapeRegexp('-'), 'u').test('-')).toEqual(true);
  });

  it('do not escapes `-` when unicode flag is disabled', () => {
    expect(escapeRegexp('foo - bar', false)).toEqual(String.raw`foo - bar`);
  });
});
