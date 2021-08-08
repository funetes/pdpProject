## 3 August 2021

I refactored the server to follow the ducks structure pattern. I will also add the https://github.com/erikras/ducks-modular-redux link for future reference when I add redux to the codebase.

P.S strictly speaking ducks is a pattern for structuring redux folders but I will be using it to describe the modular approach it advocates. The broader and more accurate term would be the law of Demeter that I previously mentioned https://en.wikipedia.org/wiki/Law_of_Demeter.

## 8 August 2021

I read some articles about redux toolkit, to try and understand how it is configured in conjuction with redux saga. As a side note, I think I am a person that can equally advocate for boilerplate or full on "magic" when it comes to code, but what I dislike is magic that instead of hiding the problem it fixes, seemingly transforms it into a non problem. This came to my mind when I saw redux toolkit library allowing things like:

```js
state.todos[3].completed = true;
```

which at first glance is a mutation of the redux store, but because redux toolkit under the hood uses the `immer` library, it ends up being an immutable operation. I think this is a bit misleading and can easily confuse some people, the reason for the latter being that many developers (juniors or not) prefer to jump into the code first and read the documentation later, meaning that many developers know how to write code, but not necessarily how this code works. An unsuspecting developer can see projects using `immer` implementing the above snipper and completely skip the concept of object immutability, which of course becomes a concern for situations when (for any reason) redux toolkit and immer are not available or not preffered. I guess what I mean to say is that "magic" is only useful when you understand the steps it allows you to skip.

Anyways....

my aim for today is to read about redux toolkit and see some examples, preferably ones that also implement `redux-saga`, in order to add both dependencies. The order I have in mind is the following:

-   `redux`, `@reduxjs/toolkit`
-   `redux-saga`
-   `jest`
-   `apollo-client`

My reasoning boils down to incrementary additions. `redux` and `@reduxjs/toolkit` can be considered a single paltform evolution step, because they are essentialy redux + redux quality of life functions. `redux-saga` requires the previous two, but can be understood as a separate concern, since it is by all means a way to handle something in a different way, when you think `redux` you do not necessarily think of `redux-saga`, it comes (naturally) later when you have to think of handling complex async logic, thus it can be understood as a separate entity. The order of adding `jest` and `apollo-client` is interchangeable to be honest and by all means the two dependencies are not part of "redux + hanlding async logic via it" step of platform evolution, but since the driving force behing setting up redux now is configuring the network layer of my project and since this means actually writing code and not configuration files, testing this code is the next logical step, hence why I included these two packages in this step.

So, I will be reading the `@reduxjs/toolkit` documentation (https://redux-toolkit.js.org/) to familiarize myself with what is offers, then proceed as described above.

My first simple example will be to create a simple "app state" reducer, that will have a boolean `running` property, initially set to false, that will be set to true as soon as the main `App.tsx` component mounts.

Then, I will add `redux-saga` and refactor the above code to work with sagas.

Since this is going to be a simple proof of concept example, I will create the necessary files directly under the `store` directory, that is to say I will not try to follow the ducks pattern so I can take it one step at a time.

After adding the first two dependencies and configuring the individual files, I tried to wrap my `App` component with the store provider. At this point the realization hits me, there is no centralized `App` component because I am using `NextJS`. How do I provide a centralized `store` to all the different pages?

Going back to the docs it seems the main idea is that if the page is SSG or SSR, the client receives a server side created store which is a new store instance every time, in other cases the client gets the same store. The way to provide a centralized store throught the application is by overriding the (under the hood) `App` component with one of my own.

The official example is here: https://github.com/vercel/next.js/tree/canary/examples/with-redux.

btw: https://github.com/vercel/next.js/tree/canary/examples/with-redux-toolkit-typescript WOW!!!! (The whole repo is a text book case on how to scale your product by providing community working examples using a multitude of tools.)