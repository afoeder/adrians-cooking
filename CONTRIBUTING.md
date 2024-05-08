# Contributing

## Style guide

Style is checked using [Grazie (Pro)](https://plugins.jetbrains.com/plugin/16136-grazie-pro/) along with
[custom style guides](https://plugins.jetbrains.com/plugin/16136-grazie-pro/docs/project-style-guides.html#custom)
that are defined in [`.grazie.en.yaml`](.grazie.en.yaml).

### Units and measurements

In accordance to the SI standard a value and unit should be separated by a narrow no-break space (`NNBSP`),
in HTML/MD this would be done with `&#x202F;`.
This only applies to SI units like 120&#x202F;g and 10&#x202F;%.
Cups or Tablespoons would have simple `NBSP`.
Since a line-break is unlikely, a standard white space is also acceptable then.

Minutes/seconds or inches etc. should be represented with the actual Prime[^prime], i.e. ′ or ″ respectively: 45′ and 30″.

Fraction numbers must be represented by their unicode “vulgar fraction” counterparts[^vulgfract], e.g., ⅛, ¼, ½, ⅔, ¾, ⅒

[^prime]: https://en.wikipedia.org/wiki/Prime_(symbol)
[^vulgfract]: https://en.wikipedia.org/wiki/Number_Forms#List_of_characters
