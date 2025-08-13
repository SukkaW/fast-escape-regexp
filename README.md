# fast-escape-regexp

**Fastest** (_2x to 3x faster than other libraries!_), plain JavaScript-based, HTML escaping library for JavaScript, works in all JavaScript Runtime (including browser and Node.js).

## Installation

```bash
npm install fast-escape-regexp
yarn add fast-escape-regexp
pnpm add fast-escape-regexp
```

## Usage

```ts
import { escapeRegexp } from 'fast-escape-regexp';

// and you are good to go!
const escaped = escapeRegexp('https://skk.moe');
```

By default, all `-` characters in the input will be escaped with `\x2d`. This is to ensure compatibility with Unicode patterns (JavaScript RegExp with `u` flag), PCRE, and MongoDB. But this can sometimes cause trouble with other runtimes, languages, regex engines. You can disable escaping `-` with a second argument:

```ts
import { escapeRegexp } from 'fast-escape-regexp';

const escaped = escapeRegexp('-', /** Unicode Mode */ false); // returns "-" instead of "\x2d"
```

## Benchmark

The benchmark uses [`mitata`](https://www.npmjs.com/package/mitata) against realworld regular expressions to measure performance.

```bash
# Before running the benchmark, build the dist
# The benchmark cases are run against the built files instead of the source files
pnpm i && pnpm run build

# Run the benchmark
pnpm run bench
# On supported platforms, you can use "sudo" to enable hardware counter
# https://github.com/evanwashere/mitata#hardware-counters
sudo pnpm run bench
```

```
clk: ~3.22 GHz
cpu: Apple M2 Max
runtime: node 24.5.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• ascii puntuation pattern (copied from an older version of prettier source code) - !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
------------------------------------------- -------------------------------
foxts/escape-string-regexp   232.57 ns/iter 248.76 ns    █        ▄
                    (200.65 ns … 308.04 ns) 276.59 ns   ▆█▇▆▂    ▄█▇▆▂
                    (656.08  b … 998.98  b) 839.92  b ▁██████▇▆▄▃█████▅▅▂▂▁
                  4.80 ipc (  0.94% stalls)  99.62% L1 data cache
         736.61 cycles   3.54k instructions  29.39% retired LD/ST (  1.04k)

hexo-util                    564.00 ns/iter 594.90 ns                 █
                    (479.42 ns … 682.18 ns) 627.43 ns      ▂       ▆▇██
                    (689.19  b …   1.07 kb) 896.23  b ▂▃▆█▇█▇▃▅█▆▆▄█████▅▃▂
                  6.23 ipc (  1.18% stalls)  99.60% L1 data cache
          1.74k cycles  10.85k instructions  35.19% retired LD/ST (  3.82k)

escape-string-regexp         558.39 ns/iter 566.62 ns   █
                      (497.75 ns … 1.35 µs) 851.55 ns  ██▅
                    (759.21  b …   1.25 kb)   1.06 kb ▃████▄▄▅▃▂▁▁▁▁▁▁▁▁▁▁▁
                  6.08 ipc (  1.60% stalls)  99.56% L1 data cache
          1.82k cycles  11.06k instructions  35.51% retired LD/ST (  3.93k)

escape-regexp                551.08 ns/iter 559.84 ns   ▄█ ▂▂
                    (515.25 ns … 658.15 ns) 631.84 ns   █████▅
                    (603.50  b …   1.17 kb) 904.52  b ▄▅████████▆▂▂▂▂▅▂▄▂▁▂
                  6.39 ipc (  1.23% stalls)  99.59% L1 data cache
          1.88k cycles  12.04k instructions  34.80% retired LD/ST (  4.19k)

lodash.escaperegexp          499.95 ns/iter 509.05 ns         ▅▃█
                    (464.97 ns … 555.72 ns) 539.25 ns     ▅██████▇█▇
                    (833.77  b …   1.05 kb) 840.96  b ▃▃▄▆████████████▆▄▄▂▄
                  6.11 ipc (  1.18% stalls)  99.66% L1 data cache
          1.69k cycles  10.31k instructions  34.97% retired LD/ST (  3.61k)

regex-escape                 498.82 ns/iter 505.44 ns    █▆
                    (477.67 ns … 564.82 ns) 539.69 ns    ██▂ ▄
                    (770.43  b … 896.61  b) 895.65  b ▁▁▂█████▆▆▅▆▄▃▂▂▃▃▂▁▂
                  6.36 ipc (  1.21% stalls)  99.60% L1 data cache
          1.70k cycles  10.81k instructions  35.24% retired LD/ST (  3.81k)

• unix filesystem path - /var/folders/32/dt2h19+n4y7.55gya_b550l114514gn/T/tmp+dir/
------------------------------------------- -------------------------------
foxts/escape-string-regexp   151.90 ns/iter 154.57 ns  ▆▂▇█
                    (141.46 ns … 277.17 ns) 187.91 ns  █████▅
                    ( 71.70  b … 664.24  b) 392.45  b ▇███████▆▄▃▂▂▂▁▂▂▂▂▂▂
                  5.21 ipc (  0.72% stalls)  99.64% L1 data cache
         516.88 cycles   2.69k instructions  24.58% retired LD/ST ( 662.37)

hexo-util                    440.82 ns/iter 446.93 ns   █
                    (412.32 ns … 774.97 ns) 545.79 ns   ██▇█▂
                    (670.36  b …   0.99 kb) 920.16  b ▅▆█████▅▃▂▂▂▂▁▂▁▁▁▁▁▁
                  6.03 ipc (  1.37% stalls)  99.53% L1 data cache
          1.49k cycles   8.96k instructions  34.33% retired LD/ST (  3.08k)

escape-string-regexp         262.59 ns/iter 267.63 ns    █▃▅▂▄
                    (246.81 ns … 302.01 ns) 294.22 ns    ██████▇▄
                    (273.90  b … 500.27  b) 312.68  b ▆▆▇████████▇▆▅▃▁▂▂▂▂▂
                  6.00 ipc (  0.81% stalls)  99.69% L1 data cache
         900.56 cycles   5.40k instructions  34.43% retired LD/ST (  1.86k)

escape-regexp                445.22 ns/iter 451.17 ns   █      ▂▆
                    (426.87 ns … 497.53 ns) 473.54 ns   ██▄  ▇▅██▇
                    (690.42  b …   1.07 kb) 920.59  b ▁▂██████████▅▆▇▅▅▁▃▁▂
                  6.01 ipc (  1.33% stalls)  99.54% L1 data cache
          1.52k cycles   9.16k instructions  34.11% retired LD/ST (  3.13k)

lodash.escaperegexp          264.88 ns/iter 268.78 ns     █▃
                    (251.16 ns … 313.19 ns) 291.54 ns    ▂███
                    ( 82.50  b … 404.25  b) 200.48  b ▃▄▂████████▄▃▅▂▂▁▂▂▁▂
                  5.88 ipc (  0.50% stalls)  99.84% L1 data cache
         905.56 cycles   5.33k instructions  32.79% retired LD/ST (  1.75k)

regex-escape                 455.36 ns/iter 443.40 ns  █
                      (414.93 ns … 1.33 µs)   1.06 µs ▄█
                    (670.59  b … 970.00  b) 920.04  b ██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  5.94 ipc (  1.32% stalls)  99.53% L1 data cache
          1.51k cycles   8.96k instructions  34.32% retired LD/ST (  3.08k)

• hostname - https://blog.skk.moe
------------------------------------------- -------------------------------
foxts/escape-string-regexp    81.18 ns/iter  82.32 ns  ▃ █
                     (74.87 ns … 144.73 ns) 106.32 ns  ████▅
                    (139.12  b … 458.15  b) 296.50  b ▅█████▇▄▂▂▂▂▂▂▂▁▂▁▁▁▁
                  5.44 ipc (  1.10% stalls)  99.49% L1 data cache
         277.53 cycles   1.51k instructions  28.35% retired LD/ST ( 427.85)

hexo-util                    218.37 ns/iter 221.56 ns    █
                    (205.42 ns … 276.74 ns) 248.81 ns    █  ▂
                    ( 27.24  b … 376.24  b) 216.10  b ▂▁▂█████▆▅▄▂▃▂▂▁▁▂▁▁▁
                  6.20 ipc (  0.77% stalls)  99.75% L1 data cache
         739.09 cycles   4.58k instructions  35.73% retired LD/ST (  1.64k)

escape-string-regexp         199.19 ns/iter 201.37 ns    █
                    (188.83 ns … 236.77 ns) 228.97 ns    █▆▂
                    (201.90  b … 430.27  b) 272.49  b ▁▁▄███▇▇▄▃▂▂▁▁▁▁▂▁▁▁▁
                  6.27 ipc (  0.91% stalls)  99.71% L1 data cache
         675.86 cycles   4.24k instructions  36.46% retired LD/ST (  1.54k)

escape-regexp                256.46 ns/iter 260.62 ns    █ ▄
                    (242.88 ns … 299.41 ns) 285.79 ns    █▆█▅▆▄▄
                    (262.18  b … 628.31  b) 448.16  b ▃▅▄███████▇▄▃▃▂▂▂▁▂▁▁
                  6.20 ipc (  1.15% stalls)  99.67% L1 data cache
         874.60 cycles   5.42k instructions  35.45% retired LD/ST (  1.92k)

lodash.escaperegexp          197.20 ns/iter 199.82 ns  █ ▄
                    (189.64 ns … 249.64 ns) 219.58 ns  ███▆█▆▂
                    (  7.36  b … 354.12  b) 160.36  b ▁████████▇▅▄▃▂▂▂▁▁▁▁▁
                  6.04 ipc (  0.60% stalls)  99.85% L1 data cache
         670.44 cycles   4.05k instructions  34.82% retired LD/ST (  1.41k)

regex-escape                 219.16 ns/iter 223.45 ns    █▅▅
                    (205.19 ns … 259.71 ns) 251.04 ns    ██████
                    ( 63.61  b … 434.11  b) 216.43  b ▇▇████████▇▆▅▃▂▂▂▂▁▁▁
                  6.19 ipc (  0.78% stalls)  99.76% L1 data cache
         740.71 cycles   4.58k instructions  35.72% retired LD/ST (  1.64k)

• url with query - https://api.example.com/file/upload?name=foo.txt&decompress=false
------------------------------------------- -------------------------------
foxts/escape-string-regexp   181.91 ns/iter 184.62 ns    █▄▃▄
                    (169.97 ns … 239.65 ns) 212.53 ns   █████▇
                    (201.59  b … 649.75  b) 488.55  b ▄▇███████▆▅▃▃▂▂▂▂▁▂▂▁
                  5.48 ipc (  0.63% stalls)  99.74% L1 data cache
         621.90 cycles   3.41k instructions  24.34% retired LD/ST ( 829.55)

hexo-util                    390.84 ns/iter 394.93 ns  ▄█▅
                    (363.33 ns … 782.84 ns) 528.18 ns  ███▇▂
                    (281.86  b … 683.36  b) 496.20  b ▃█████▄▂▁▂▁▁▁▁▁▁▁▁▁▁▁
                  5.96 ipc (  1.00% stalls)  99.62% L1 data cache
          1.30k cycles   7.78k instructions  33.99% retired LD/ST (  2.64k)

escape-string-regexp         311.77 ns/iter 316.40 ns    ▄▃▂ █
                    (293.31 ns … 389.13 ns) 345.75 ns    ███████▃
                    (250.44  b … 796.33  b) 544.21  b ▃▄▆████████▇▆▃▂▃▃▂▃▂▂
                  6.03 ipc (  1.17% stalls)  99.60% L1 data cache
          1.05k cycles   6.34k instructions  34.22% retired LD/ST (  2.17k)

escape-regexp                482.61 ns/iter 489.37 ns       ▃█▃▂▇
                    (454.04 ns … 546.76 ns) 520.09 ns     ▃██████▆ ▂
                    (654.62  b …   0.98 kb) 927.91  b ▃▇▅▄██████████▅▅▃▅▃▃▂
                  6.01 ipc (  1.28% stalls)  99.51% L1 data cache
          1.64k cycles   9.83k instructions  33.96% retired LD/ST (  3.34k)

lodash.escaperegexp          309.11 ns/iter 316.29 ns   ▃▅█▇▆█▄▂▂
                    (290.89 ns … 359.02 ns) 343.23 ns ▅▃██████████▃
                    ( 83.75  b … 652.41  b) 432.24  b █████████████▄█▆▂▂▂▃▁
                  5.85 ipc (  0.92% stalls)  99.73% L1 data cache
          1.05k cycles   6.12k instructions  33.17% retired LD/ST (  2.03k)

regex-escape                 383.97 ns/iter 391.35 ns      █
                    (360.71 ns … 474.80 ns) 427.82 ns    ▅██▅▃▃
                    (121.46  b … 699.36  b) 496.21  b ▃▇███████▇▇▆▅▅▅▃▂▂▃▁▂
                  5.96 ipc (  1.00% stalls)  99.63% L1 data cache
          1.30k cycles   7.77k instructions  34.00% retired LD/ST (  2.64k)
```
