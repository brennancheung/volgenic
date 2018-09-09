# In-browser realtime transpilation

## Motivation

My long term vision is to have an in-browser editor that has its own AST that
compiles down to the actual program.

I have decided that LLVM is too low level so I will stick with JS and Babel
for now.

This experiment is a POC of creating a Babel AST, compiling it, and reloading
it all from within the browser.


## Discoveries

AST compilation was surprisingly easy using `@babel/types`
and `@babel/generator`.  The AST generator functions are a bit verbose; I may
want to create helpers for them with easier syntax.  Of course, creating a
structured editor that makes it easy to edit an AST is kind of the point of what
I'm trying to do.

I had difficulty trying to integrate with the module system.  It seems like
there is no way to get a `module` to be imported dynamically and have its
`exports` available.  Anything exposed in the scope from `eval` did not seem to
be available in the function scope from the `webpack` generated code.

I ultimately just attached to `window.vexports` and read it from the `webpack`
code.  It seemed to work just fine.

That actually got me thinking that perhaps the module system is a waste of time
for what I'm trying to do.  If everything is going to be in an editor
environment and compiled to a single file, is there really any point of modules?
I can separate things with namespaces and scopes just fine.  There's no need to
complicate things.  All those `import` and `export`s probably represent 20% of
the code sometimes in traditional React apps.  They also account for such a
waste of time trying to figure out where they are, path to import them, where
the file is in the editor, etc.

## Next steps

Next up I need to figure out what the AST will look like.  The AST I previously
generated was Babel's AST but I need my own that has more stuff in it.  The
Babel AST will be the "backend" as far as I'm concerned.

I think creating an AST and showing some different views would be a good next
step.  The editing can come later.

One thing on the back of my mind is whether I will need to create my own
keyboard driver.  I know that I want lots of chords and keyboard shortcuts in
my editor and the normal `keypress` events are not as rich as the `keydown`
events.  Also, I can't get the repeat rate faster.

I also want input coming from other browsers, devices, and modalities as well
so those need to be translated into events as well.  Perhaps an input manager
is something I should work on as well but I think I can punt on that for a
little bit.
