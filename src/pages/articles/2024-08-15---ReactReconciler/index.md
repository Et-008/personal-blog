---
layout: post
draft: true
path: '/posts/react-reconciler'
tags:
  - 'React'
title: React fiber reconciler
date: '2024-08-20T14:02:03.284Z'
description: "React fiber Reconciler - If you're learning react, you probably would have heard about this. React uses it under the hood, but what does it exactly do."
category: 'react'
---

In simple terms "Reconcilation" is the process by which react synchronizes its internal virtual DOM with the browser's real DOM.

So to understand Reconcilation, we have to know the basics about the Virtual DOM and it's building components React fiber.

What exactly is a fiber reconciler?

What exactly is a fiber object?

The fiber object is a Plain old JavaScript object(POJO) that contains information about a component, its input, and its output.

It stores crucial information about the component it represents.

    export type Fiber = {
      tag: WorkTag,
      key: null | string,
      elementType: any,
      type: any,
      stateNode: any,
      return: Fiber | null,
      child: Fiber | null,
      sibling: Fiber | null,
      index: number,
      ref:
      | null
      | (((handle: mixed) => void) & {\_stringRef: ?string, ...})
      | RefObject,
      refCleanup: null | (() => void),
      pendingProps: any,
      memoizedProps: any,
      updateQueue: mixed,
      memoizedState: any,
      dependencies: Dependencies | null,
      mode: TypeOfMode,
      flags: Flags,
      subtreeFlags: Flags,
      deletions: Array<Fiber> | null,
      lanes: Lanes,
      childLanes: Lanes,
      alternate: Fiber | null,
      actualDuration?: number,
      actualStartTime?: number,
      selfBaseDuration?: number,
      treeBaseDuration?: number,
    };
