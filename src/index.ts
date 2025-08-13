const rR = /[$()*+.?[\\\]^{|}]/;
const rU = /[$()*+.?[\\\]^{|}-]/;

/**
 * Escape characters with special meaning either inside or outside character sets.
 * Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
 *
 * When the `unicodeMode` is `true` (default), the `-` character is escaped as `\x2d` to ensure compatibility with Unicode patterns, PCRE, and MongoDB.
 *
 * You should only disable this option if you are escaping regular expressions that will later be consumed by runtimes w/o unicode flag support.
 */
export function escapeRegexp(str: string, unicodeMode = true) {
  const match = (unicodeMode ? rU : rR).exec(str);

  if (match === null) {
    return str;
  }

  // we hoist this condition out of the loop for better performance
  // eslint-disable-next-line sukka/unicorn/prefer-string-raw -- performance
  const unicodeEscapeForDash = unicodeMode ? '\\x2d' : '-';

  let escape = '';
  let regexp = '';

  let index = match.index;
  let lastIndex = 0;

  // iterate from the first match
  for (const len = str.length; index < len; index++) {
    /* eslint-disable sukka/unicorn/prefer-string-raw -- performance */
    switch (str.charCodeAt(index)) {
      case 94: // ^ // this almost happens first if there is any
        escape = '\\^';
        break;
      case 46: // .
        escape = '\\.';
        break;
      case 42: // *
        escape = '\\*';
        break;
      case 43: // +
        escape = '\\+';
        break;
      case 63: // ?
        escape = '\\?';
        break;
      case 40: // (
        escape = '\\(';
        break;
      case 41: // )
        escape = '\\)';
        break;
      case 91: // [
        escape = '\\[';
        break;
      case 93: // ]
        escape = '\\]';
        break;
      case 123: // {
        escape = '\\{';
        break;
      case 125: // }
        escape = '\\}';
        break;
      case 92: // \
        escape = '\\\\';
        break;
      case 124: // |
        escape = '\\|';
        break;
      case 45: // -
        escape = unicodeEscapeForDash;
        break;
      case 36: // $ // this almost happens last if there is any
        escape = '\\$';
        break;
      default:
        continue;
    }
    /* eslint-enable sukka/unicorn/prefer-string-raw */

    if (lastIndex !== index) {
      regexp += str.slice(lastIndex, index);
    }

    lastIndex = index + 1;
    regexp += escape;
  }

  if (lastIndex !== index) {
    regexp += str.slice(lastIndex, index);
  }

  return regexp;
};
