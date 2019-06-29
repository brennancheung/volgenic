# Learn Newest React

## Motivation

The purpose of this experiment is to get familiar with the latest React API's
and discover new design patterns.

React hooks seem to be the way the community is going.  I have some concerns
about them because they break many of the functional programming paradigms.
They seem to sacrifice purity and refenential transparency for pragmatism.

I am concerned that the new React hooks do not compose as nicely as previous
patterns because they don't seem to obey any of the monodial category theory
laws.  Discovering patterns of composition that work with hooks is a primary
concern.

The API's I want to experiment with are `useState`, `useContext`, `useEffect`,
and `useMemo`.

Additionally, I want to investigate what React Suspense is, how it works and
what benefit it might provide.

I will work towards my transistor logic game as the basic idea for the application.

## Requirements

* Document steps to create new React project with my customizations.
* Store application state in the global `context`.
* Pull context out using `useContext`.
* Store local "component" state using `useState`.
* Perform side effects with `useEffect`.

## Discoveries

`setInterval` does not work inside of `useEffect`.  It's rather complicated why.
This is further evidence IMO of why React hooks are such a bad design.  I found
several articles talking about it and am going to include the utility hook (`useInterval`)
from a blog article (https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

## Steps to create a new React project

1.  Upgrade `create-react-app` using `npm i -g create-react-app`.
2.  Create the project.
3.  Switch to `npm` using `npm i`.
4.  Install linting plugins (`npm i -D eslint-config-standard eslint-config-standard-react eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard standard`)
5.  Copy over the existing `.eslintrc` from this repo.
6.  Make sure `eslint` is installed globally so Vim and the `ALE` plugin can perform linting.
7.  Open Vim and verify there are linting errors in `src/App.js` due to not using `Standard`.
8.  Add `let g:ale_linters = {'javascript': ['eslint'], 'jsx': ['eslint']}` to your `.vimrc`

## Troubleshooting

* `ALE` did not seem to be linting.  I took the following steps.  I'm not sure what fixed it.
* `npm i -g eslint`
* `eslint src/App.js`

I suspect the Vim was not communicating with eslint.  I'm not sure if it couldn't find it
because it wasn't install or if it was just some temporary issue.

I also created errors in the `App.js`, used `eslint` on it, then opened it with Vim to see the errors.

After some experimenting and using `:ALEInfo` it looked like `eslint` was available but
it was not using it.  I manually added it to `g:ale_linters` and it started working.

## Next steps
