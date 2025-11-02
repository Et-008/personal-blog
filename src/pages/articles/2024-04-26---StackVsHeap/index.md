---
layout: post
draft: false
path: '/posts/stackVsHeap'
tags:
  - 'Javascript'
  - 'Memory'
title: Stack memory vs Heap memory
date: '2024-04-26T14:02:03.284Z'
description: "Javascript in general has two different memories - stack and heap. What's the difference? Why two different memories? What do they store?"
category: 'javascript'
---

What's the difference? Why two different memories? What do they store?

First let's start with the "Why".

### Why two different memories? Is it a browser standard to have two different memories to manage?

Stack and heap memory is a common concept of memory management not just in javascript, but across multiple programming languages.

- A Fixed memory (stack) - to store local variables, function calls and its arguments.

- A Dynamic memory (heap) - to store complex data structures, with longer lifetime and dynamically varying size.

Low level languages like `C, C++` manually manages memory, developers have to specify when to allocate memory and when to de-allocate and free up memory.
In High level languages like `Java, Python, JS etc...` memory management is maintained by their respective runtime environments.

    `JVM` for Java,
    `Pyhon Interpreter + PVM` for Python
    `V8/SpiderMonkey/JSCore` for Javascript.

Like I mentioned this is maintained by their respective runtime, so browsers don't really have a say in this. It's the JS engine that makes and manages these two memories inside a browser.

Now let's see the differences

### Stack Memory

Stack memory if a fixed size memory to store local variables aka primitive type variables, reference to non-primitives that exist in the heap.

![](./stack-memory.png)

Since stack memory is fixed or static, there is limit on how big a stack type can be. This stack size differs between different JS engines.

| Browser      | _Engine_           | Typical Stack Limit  |
| ------------ | ------------------ | -------------------- |
| Chrome/Edge  | **V8**             | **~ 0.5 MB to 2 MB** |
| Node.js (V8) | **V8**             | **~ 0.5 MB to 2 MB** |
| Firefox      | **SpiderMonkey**   | **~ 1 MB**           |
| Safari       | **JavaScriptCore** | **~ 0.5 MB – 2 MB**  |

Stack memory follows Last in First out method. Since the stack is of fixed size and folows the LIFO method, memory allocation is extremely fast compared to Heap.

All the local variables gets cleared from memory once the function returns.

    function sample() {
      let name = "Arun"
      return null
    }
    "name" gets cleared from memory, once function "sample"
     returns.

## Heap Memory

Heap memory is dynamic, un-structured, long-lived and larger compared to stack.

Since its unstructured, memory allocation is slower compared to stack.

Heap is where objects, arrays, functions, and other non-primitive values are stored. Memory allocation for these data is determined during run-time.

Even though Heap memory is dynamic, there is a maximum limit per tab set by the javascript engine to avoid system crash (running out of system memory), site becoming unresponsive and laggy **(larger memory === longer GC operations)**.

| Browser      | _Engine_           | Typical Heap Limit |
| ------------ | ------------------ | ------------------ |
| Chrome/Edge  | **V8**             | **~ 4GB**          |
| Node.js (V8) | **V8**             | **~ 4GB to 8GB**   |
| Firefox      | **SpiderMonkey**   | **~ 4GB**          |
| Safari       | **JavaScriptCore** | **~ 4GB**          |

_System capabilities plays a role in this limit as well_

## Let's be more clear

Stack - primitives; Heap - non-primitives;

#### What about functions?

A function as a whole is stored in Heap memory, function's code and its properties . The variable that stores its reference exists in stack memory or in heap memory - in case of a function stored within an object.

![StackVsHeap](./stack-heap-pointers.png)

When a function is called, a stack frame is created for that function, with all the local variables, function's arguments and any non-primitive references available in scope.
This stack frame is then pushed onto the top of the stack.

Once the function completes and returns, the stack frame gets popped off and along with it, all the local variable's memory and function argument's memory gets freed up.

#### What about a non-primitive value which consists of a primitive value?

In the below example the `user object` is stored in heap, and it's values which are `string` and `number` types are also stored in the heap within the user object.

But the `variable "const user"` that holds the reference to the `user object` exists in the stack.

    const user = {
      name: "Alice",
      age: 30
    };

    // user object Non-Primitive: Stored in the Heap.
    {
      name: "Alice", // Primitive: Stored in the Heap, inside the user object's memory.
      age: 30        // Primitive: Stored in the Heap, inside the user object's memory.
    };

    const user // Holds reference to the non-primitive user object: Stored in the Stack.

Consider this post as a entry to JS memory basics, Memory management is a process taken care by Garbage collector which is discussed in detail in a seperate post.

 <!-- [here](memoryManagement). -->
