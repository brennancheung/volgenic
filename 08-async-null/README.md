# defineProp style scope experiment

## Motivation

This experiment attempts to discover patterns for using async state with a VDOM.


## Discoveries

At first I was worried that I would need to implement a new VDOM that supports
promises.  Luckily, VDOM works just fine when returning `null` for a variable.

I modified the scope so that if it is an `async` value it does not return a
`Promise` and instead it will immediately return `null` or the `initialValue`.

This works surprisingly well in the VDOM.  However, another issue arises outside
the VDOM when I actually want a promise so that I can use it with code that
depends on the value.

To "resolve" that I introduced multiple ways of getting a `scope` variable.

I added a nested scope that is identical to the parent scope but returns
`Promise`s instead.

If I want the immediate value I can use:

`scope.foo`

If I want to wait for the value to `resolve` I can use:

`await scope.promise.foo`

## Next steps

I implemented `Promise`s for server `scope` but there might be instances where
this is needed for local `scope` as well.  I don't have a use case for it right
now so I will move on to other explorations.

I'm fairly confident there will be no architectural challenges or surprises when
I actually implement real server-side `scope` so I'm not going to worry about
implementing it right now.

I want to move on to exploring other possibilities like in-browser AST editing.
