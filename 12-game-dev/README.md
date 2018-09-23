# Game development

## Motivation

I want to make a simple game and to see what is still needed.  When I was a kid
I used to just write video game code without thinking too much about every
little detail.  I just would have a rough concept of what I wanted to build and
start building it.

My hope is that by building something more complete I will know what still needs
to be build.  It's also been a long time since I've just programmed in a pure
creative mode.  That's what I want to do here.

I want to do something that is sort of like a Tower Defense, RTS, crafting, and
management game.

The concept is establishing a base on Mars and the Tower Defense phases are
asteroids raining down from the sky.

## Discoveries

It's a pain to define new scope variables for every little thing.  It is easier
to just create one giant game state object and update it manually.  Normally,
to trigger repaints I would need to update it recursively for deeply nested
variables.  However, it is not necessary to update on every little change.
Instead, I can just treat state as an ordinary javascript variable and just
update the VDOM once every `requestAnimationFrame`.

I was taking a naive approach to re-rendering.  I was basically rendering every
`requentAnimationFrame`.  That was eating up a lot of unnecessary CPU.

So for development purposes, I just did a naive `setInterval` for re-rendering
and made it slower for development.  It felt a bit laggy on `mouseEnter` events.

## Next steps

Updating VDOM should only update (`requestAnimationFrame`) on state changes.
In order to do that, I can have an `update` function that has a `debounce` in
it.

`context` was another issue that I ran into.  I'm so used to React's `context`
that I immediately thinking in those terms.  However, I'm not bound by the
normal React limitations.  I didn't investigate it much because I didn't really
need `context` but I think in future 
