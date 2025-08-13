/* eslint-disable @typescript-eslint/no-restricted-imports -- benchmark */
// eslint-disable-next-line import-x/no-unresolved -- only exist after build
import { escapeRegexp } from '../dist';
import { escapeRegExp as hexoUtilEscapeRegExp } from 'hexo-util';
import escapeStringRegexpSindresorhus from 'escape-string-regexp';
import escapeRegExp from 'escape-regexp';
import lodashEscapeRegExp from 'lodash.escaperegexp';
import RegexEscape from 'regex-escape';

(async () => {
  const { bench, group, run } = await import('mitata');

  const fns = [
    ['foxts/escape-string-regexp', escapeRegexp],
    ['hexo-util', hexoUtilEscapeRegExp],
    ['escape-string-regexp', escapeStringRegexpSindresorhus],
    ['escape-regexp', escapeRegExp],
    ['lodash.escaperegexp', lodashEscapeRegExp],
    ['regex-escape', RegexEscape]
  ] as const;

  const fixtures = [
    ['ascii puntuation pattern (copied from an older version of prettier source code)', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'],
    ['unix filesystem path', '/var/folders/32/dt2h19+n4y7.55gya_b550l114514gn/T/tmp+dir/'],
    ['hostname', 'https://blog.skk.moe'],
    ['url with query', 'https://api.example.com/file/upload?name=foo.txt&decompress=false']
  ] as const;

  fixtures.forEach(([fixtureName, fixture]) => {
    group(fixtureName + ' - ' + fixture, () => {
      fns.forEach(([name, fn]) => {
        bench(name, () => fn(fixture));
      });
    });
  });

  run();
})();
