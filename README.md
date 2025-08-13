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
clk: ~3.26 GHz
cpu: Apple M2 Max
runtime: node 24.5.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• ascii puntuation pattern (copied from an older version of prettier source code) - !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
------------------------------------------- -------------------------------
foxts/escape-string-regexp   217.61 ns/iter 222.29 ns    █▂
                    (200.00 ns … 294.92 ns) 273.37 ns  ▅▆███▆▂
                    (640.30  b …   1.12 kb) 840.32  b ▄███████▅▅▃▃▂▂▂▂▂▁▁▁▁
                  4.77 ipc (  0.97% stalls)  99.60% L1 data cache
         741.44 cycles   3.54k instructions  29.39% retired LD/ST (  1.04k)

hexo-util                    533.68 ns/iter 528.23 ns  █
                      (478.17 ns … 1.33 µs) 975.18 ns  █▆
                    (561.44  b …   1.19 kb) 896.24  b ▄██▃▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  6.23 ipc (  1.18% stalls)  99.59% L1 data cache
          1.74k cycles  10.85k instructions  35.17% retired LD/ST (  3.82k)

escape-string-regexp         541.54 ns/iter 550.33 ns    ▂▄▄ ▅█
                    (506.33 ns … 616.03 ns) 595.49 ns    ███████▄  ▃
                    (737.38  b …   1.25 kb)   1.06 kb ▄▅█████████▇▇█▇▄▅▃▄▂▂
                  6.06 ipc (  1.54% stalls)  99.55% L1 data cache
          1.83k cycles  11.06k instructions  35.51% retired LD/ST (  3.93k)

escape-regexp                556.76 ns/iter 565.58 ns   ▃▂█▇▄
                    (516.02 ns … 668.65 ns) 651.98 ns   █████▇▃
                    (681.85  b …   1.09 kb) 904.52  b ▄▃████████▅▅▃▁▄▂▁▂▃▂▂
                  6.37 ipc (  1.23% stalls)  99.59% L1 data cache
          1.89k cycles  12.05k instructions  34.80% retired LD/ST (  4.19k)

lodash.escaperegexp          504.92 ns/iter 510.62 ns      █▆▃
                    (478.56 ns … 728.70 ns) 567.34 ns  ▂▄█████
                    (833.77  b …   1.02 kb) 840.90  b ██████████▇▄▃▄▃▂▁▁▁▁▁
                  6.02 ipc (  1.19% stalls)  99.69% L1 data cache
          1.71k cycles  10.31k instructions  34.97% retired LD/ST (  3.61k)

regex-escape                 502.87 ns/iter 509.54 ns   ▃   ▅▃█▃▃
                    (485.27 ns … 549.00 ns) 532.99 ns ▂███▆▅█████▃▂
                    (778.43  b … 896.61  b) 895.59  b █████████████▆▆▄▄▄▆▃▂
                  6.31 ipc (  1.19% stalls)  99.60% L1 data cache
          1.71k cycles  10.82k instructions  35.23% retired LD/ST (  3.81k)

• unix filesystem path - /var/folders/32/dt2h19+n4y7.55gya_b550l114514gn/T/tmp+dir/
------------------------------------------- -------------------------------
foxts/escape-string-regexp   154.67 ns/iter 157.12 ns    █▄
                    (143.17 ns … 259.40 ns) 185.98 ns    ███▄▃
                    (101.70  b … 656.12  b) 392.46  b ▅▅▆█████▇▄▃▂▂▂▂▁▁▂▂▁▁
                  5.11 ipc (  0.69% stalls)  99.68% L1 data cache
         526.95 cycles   2.69k instructions  24.58% retired LD/ST ( 662.20)

hexo-util                    435.97 ns/iter 442.01 ns  █   ▂
                    (418.75 ns … 516.49 ns) 489.34 ns ▆█▄▅▇█▅▃
                    (686.36  b … 995.96  b) 920.18  b ████████▇▅▃▄▂▃▂▁▃▂▂▁▁
                  6.09 ipc (  1.37% stalls)  99.53% L1 data cache
          1.47k cycles   8.96k instructions  34.33% retired LD/ST (  3.08k)

escape-string-regexp         257.25 ns/iter 260.28 ns    █
                    (245.14 ns … 309.75 ns) 285.70 ns    █▃█
                    (269.77  b … 500.27  b) 312.64  b ▂▁▁████▇▇▇▄▃▂▁▁▁▂▁▁▁▁
                  6.15 ipc (  0.82% stalls)  99.69% L1 data cache
         873.70 cycles   5.38k instructions  34.45% retired LD/ST (  1.85k)

escape-regexp                436.98 ns/iter 442.22 ns ▃▅█
                    (424.44 ns … 493.41 ns) 465.25 ns ███▆▇▄█▆▅ ▃
                    (654.67  b … 985.98  b) 920.07  b ███████████▇▅▅▅▄▃▃▃▂▃
                  6.13 ipc (  1.35% stalls)  99.54% L1 data cache
          1.49k cycles   9.12k instructions  34.13% retired LD/ST (  3.11k)

lodash.escaperegexp          264.70 ns/iter 267.98 ns  █
                    (256.55 ns … 303.15 ns) 292.28 ns ▅█▅▄▂▂▂
                    (107.92  b … 356.25  b) 200.48  b ███████▆█▅▅▂▃▃▂▂▂▁▁▂▁
                  5.92 ipc (  0.50% stalls)  99.84% L1 data cache
         899.79 cycles   5.33k instructions  32.79% retired LD/ST (  1.75k)

regex-escape                 433.79 ns/iter 438.80 ns    ▅▄▇▃▅█
                    (418.72 ns … 480.44 ns) 466.27 ns ▆▆▇██████▆▂
                    (678.61  b … 987.99  b) 920.14  b ████████████▆▄▅▅▃▄▂▁▂
                  6.06 ipc (  1.36% stalls)  99.53% L1 data cache
          1.48k cycles   8.96k instructions  34.33% retired LD/ST (  3.08k)

• hostname - https://blog.skk.moe
------------------------------------------- -------------------------------
foxts/escape-string-regexp    80.29 ns/iter  81.16 ns   █
                     (75.03 ns … 148.65 ns) 102.35 ns   ██▆
                    ( 93.53  b … 466.15  b) 296.35  b ▂▅████▅▄▂▁▁▁▁▁▁▁▁▁▁▁▁
                  5.51 ipc (  1.01% stalls)  99.56% L1 data cache
         274.01 cycles   1.51k instructions  28.36% retired LD/ST ( 427.87)

hexo-util                    217.13 ns/iter 220.09 ns    █
                    (205.01 ns … 271.88 ns) 247.48 ns    █▂
                    (129.48  b … 386.99  b) 216.42  b ▁▂▂█████▅▄▂▃▂▂▂▁▁▁▁▁▁
                  6.21 ipc (  0.78% stalls)  99.75% L1 data cache
         737.71 cycles   4.58k instructions  35.73% retired LD/ST (  1.64k)

escape-string-regexp         202.71 ns/iter 205.60 ns   █
                    (190.51 ns … 249.81 ns) 233.63 ns   ████▇▄
                    (192.02  b … 456.14  b) 272.52  b ▂▂███████▅▄▃▃▃▂▂▂▁▁▁▁
                  6.21 ipc (  0.92% stalls)  99.71% L1 data cache
         682.62 cycles   4.24k instructions  36.45% retired LD/ST (  1.54k)

escape-regexp                258.08 ns/iter 262.15 ns  █
                    (247.80 ns … 298.86 ns) 286.61 ns  █▅▃▇▆▃▂
                    (199.31  b … 628.31  b) 448.16  b ▆████████▆▆▃▂▃▃▃▂▂▁▁▁
                  6.18 ipc (  1.16% stalls)  99.66% L1 data cache
         878.33 cycles   5.43k instructions  35.45% retired LD/ST (  1.92k)

lodash.escaperegexp          197.37 ns/iter 199.88 ns    █
                    (186.04 ns … 240.10 ns) 223.98 ns    █▄▆▅▅
                    ( 53.72  b … 324.23  b) 160.40  b ▂▂▄█████▇▆▄▃▂▂▂▂▂▁▁▁▁
                  6.05 ipc (  0.65% stalls)  99.83% L1 data cache
         670.09 cycles   4.05k instructions  34.82% retired LD/ST (  1.41k)

regex-escape                 219.73 ns/iter 223.58 ns    █  ▂
                    (205.65 ns … 267.03 ns) 246.10 ns    █▄▄██▅▃
                    ( 55.61  b … 400.61  b) 216.40  b ▂▂▃█████████▅▃▃▂▂▁▂▂▁
                  6.19 ipc (  0.78% stalls)  99.76% L1 data cache
         740.58 cycles   4.58k instructions  35.72% retired LD/ST (  1.64k)

• url with query - https://api.example.com/file/upload?name=foo.txt&decompress=false
------------------------------------------- -------------------------------
foxts/escape-string-regexp   176.87 ns/iter 178.69 ns   ▄██
                    (166.13 ns … 236.76 ns) 216.59 ns  █████▂
                    (335.38  b … 649.75  b) 488.55  b ▃██████▆▄▂▃▂▃▁▂▁▁▂▁▁▁
                  5.67 ipc (  0.65% stalls)  99.73% L1 data cache
         600.59 cycles   3.41k instructions  24.34% retired LD/ST ( 829.39)

hexo-util                    385.73 ns/iter 391.48 ns   ▃▆█▃ ▄ ▃
                    (367.82 ns … 436.77 ns) 417.72 ns   ████████▇ ▂
                    (285.98  b … 683.36  b) 496.20  b ▁▂███████████▄▆▅▃▁▂▁▂
                  5.93 ipc (  0.99% stalls)  99.62% L1 data cache
          1.31k cycles   7.78k instructions  33.99% retired LD/ST (  2.64k)

escape-string-regexp         311.13 ns/iter 314.71 ns   █
                    (297.70 ns … 369.42 ns) 343.33 ns   █▇▆▆▄▃
                    (270.53  b … 788.34  b) 544.21  b ▁▃██████▇▆▆▂▃▃▃▂▂▂▂▁▂
                  6.01 ipc (  1.17% stalls)  99.60% L1 data cache
          1.06k cycles   6.34k instructions  34.22% retired LD/ST (  2.17k)

escape-regexp                486.56 ns/iter 492.42 ns  ▅▇▂█▇
                    (463.71 ns … 590.86 ns) 552.44 ns ▇██████▃
                    (656.55  b …   1.09 kb) 928.48  b ████████▇▇▄▅▃▃▄▃▂▄▂▂▂
                  6.00 ipc (  1.30% stalls)  99.51% L1 data cache
          1.65k cycles   9.87k instructions  33.93% retired LD/ST (  3.35k)

lodash.escaperegexp          306.53 ns/iter 311.55 ns    █ ▃ ▄▇▂
                    (288.00 ns … 346.84 ns) 335.65 ns    █▄█████▆▄▂
                    ( 81.87  b … 627.33  b) 432.24  b ▃▂▂██████████▄▄▅▃▂▂▂▂
                  5.88 ipc (  0.89% stalls)  99.72% L1 data cache
          1.04k cycles   6.12k instructions  33.16% retired LD/ST (  2.03k)

regex-escape                 385.56 ns/iter 390.46 ns   ▂█ ▂█▅
                    (371.61 ns … 419.57 ns) 417.46 ns ▃▄██▇███▄▂▃▂
                    ( 97.46  b … 691.36  b) 496.21  b ████████████▄▄▄▄▂▁▂▁▂
                  5.93 ipc (  1.00% stalls)  99.62% L1 data cache
          1.31k cycles   7.78k instructions  33.99% retired LD/ST (  2.64k)
```
