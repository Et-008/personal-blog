---
layout: post
draft: false
path: '/posts/react-memory-leak/'
tags:
  - 'React'
  - 'Learning to write'
title: Memory Leak in a React app
date: '2022-03-10T22:12:03.284Z'
description: 'When I started as a React developer, I went through a learning curve. And memory leak is a issue, I faced at a early stage of my career. Looking back it looks so obvious, silly me 😅.'
category: 'react'
---

If you have used React hooks, you would have come across this issue.

#### Why it happens?

React components that perform state updates and run asynchronous operations can cause memory leak issues if the state is updated after the component is unmounted.

Here is a normal scenario that causes this memory leak issue:

```js
useEffect(
  () => {
    if (searchValue.length > 3) {
      const results = getSearchResultsFor(searchValue)
      if (results) {
        setResults(results)
      }
    }
  },
  [searchValue]
)
```

The user types on search input and fetchResults triggers an event handler to fetch data from an API.
After that, a user clicks on a link, which navigates to another page before fetchResults is complete.
Now, the first action completes and passes the data retrieved from the API and tries to update the state.

Since the component was unmounted it causes memory leak issue -- and in the console, you'll get a warning.

#### How to fix it?

To prevent memory leaks, everything must be disposed when lifecycle of a hook ends (like ComponentWillUnmount). For example, with the empty array of dependency, the returned function will be called after component unmounts.

```js
useEffect(() => {
  //do something using count

  // fnc_cleanUp will cancel all subscriptions and asynchronous tasks (ex. : clearInterval)
  return cleanUp_function
}, [])
```
