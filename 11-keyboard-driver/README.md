# Keyboard driver

## Motivation

The interface I envision has lots of keyboard chords and Vim like modes.  I
also want to take advantage of the difference between keydown and keypress.

## Discoveries

There's a lot of inherit complexity to basic keyboard functionality.  I managed
to get basic keyboard repeating, pressing modifiers having different logic, and
double click key presses.

I had a problem with sending `KeyboardEvent`s to an `input` field.  I'm either
doing something wrong or the browser just ignores them for security reasons.
I'm not sure why because I can set `inputElement.value = 'foo'` just fine.

There's still some work to be done but I'm confident the keyboard will work fine.

I was debating if I need to create my own low level components with its own
event bubbling, capture, focus, blur, etc.  As of right now I think I can get
what I need just using the existing browser functionality for input fields.

## Next steps

* Get keyboard driver working with setting `element.value` from the keydown
and repeat events.

* Add functionality for registering chords and executing a function.
