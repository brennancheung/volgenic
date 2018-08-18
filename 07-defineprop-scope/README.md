# defineProp style scope experiment

## Motivation

`async` scope variables were not working due to the fact that proxy object setters
will not return a promise.

This experiment attempted to use `Object.defineProperty` setters in the hopes that 
they would allow me to return a promise.

## Discoveries

What I discovered is that JS short-circuits the return value from the setter
and just returns the `rvalue` immediately.  This means I'm not able to wait until
a variable is set before contiuing.

I was able to work around this issue by using a method called `set` instead of
the `=` assignment operator.

I discovered an issue with using Snabbdom in that it did not have any concept
of promises.  My options then are to wait for all variables to resolve before
rendering or to experience weird behavior.

I was seeing things mounting and unmounting more than necessary due to async
nature of things.  I'm not exactly sure the reason and was not able to figure
out more.

## Next steps

Based on my discoveries so far, I believe the next step is to look into having
a VDOM that can handle promises.  In the case where the value to be rendered
is a promise, it should just treat it as `null` and not render anything.  Once
it resolves then re-render.

I can do some more investigation to see if there are VDOM implementations that
support promises.  If not, I might have to implement my own.  This might not be
that bad as it would allow me to gain knowledge and further insights.

There's also the question about whether I should wait for something to resolve
first before rendering.

There's also the possibility of some layer in front that translates all the
values first.

For example, instead of getting a value and waiting, what if I could just
get the value and if it doesn't exist yet, it returns `null` and then
once it resolves, it triggers the change?
