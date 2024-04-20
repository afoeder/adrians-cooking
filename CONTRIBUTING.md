# Contributing

## Style guide

### Units and measurements

In accordance to the SI-standard a value and unit should be separated by a narrow no-break space (NNBSP), in HTML/MD this would be done with `&#x202F;`. This only applies to SI units like 120&#x202F;g and 10&#x202F;%. Cups or Tablespoons would have simple NBSP. Since a line-break is unlikely, a standard white space is also acceptable then.

Minutes/seconds or inches etc. should be represented with the actual Prime[^prime], i.e. ′ or ″ respectively: 45′ and 30″.

Fraction numbers must be represented by their unicode "vulgar fraction" counterparts[^vulgfract], e.g. ⅛, ¼, ½, ⅔, ¾, ⅒

[^prime]: https://en.wikipedia.org/wiki/Prime_(symbol)
[^vulgfract]: https://en.wikipedia.org/wiki/Number_Forms#List_of_characters

## Semantic

I'm still not sure about how to denote semantics. What I'm currently trying out is to denote "ingredients" in lists by making them a task list, similar to a shopping list:

* [ ] 100&#x202F;g Bread,
* [ ] 1 egg
* [ ] ½ cup buttermelk
* pinch of salt
* ground pepper
* [ ] 2 tbsp powdered gelatene

Items that are expected to be in a standard pantry like salt, oil, butter, are not part of this list. I am totally unsure of where to draw the line, though. Let's try.
