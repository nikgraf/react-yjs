# react-yjs

React hook for Yjs.

The hook automatically subscribes to changes in the Yjs data-structure and re-renders the component when the data changes. In addition it returns the result of the `.toJSON` from the Yjs data-structure.

```bash
npm install react-yjs
```

```tsx
import { useY } from "react-yjs";

export const MyComponent = ({ yArray }) => {
  const names = useY(yArray)

  return (
    …
  )
}

```

## Simple Usage

```tsx
import { useY } from 'react-yjs';
import * as Y from 'yjs';

const yDoc = new Y.Doc();
const yNames = doc.getArray<string>('names');

export const MyComponent = () => {
  const names = useY(yNames);

  return (
    {names.map(name => <div>{name}</div>)}
  )
}
```

## More Examples

### Listening to a nested Yjs data-structure

```tsx
const yDoc = new Y.Doc();
const yTodos = yDoc.getArray<Y.Map<string | boolean>>("todos");

// Any change of the todos (e.g. change checked) will trigger a re-render
const todos = useY(yTodos);
```

Change Todos:

```tsx
// add a Todo
const todo = new Y.Map<string | boolean>();
todo.set("checked", false);
todo.set("text", newTodo);
yTodos.push([todo]);

// update the first Todo
yTodos.get(0).set("checked", true);
```

See the working example at [https://react-yjs-example.vercel.app/](https://react-yjs-example.vercel.app/).
The code is available at [examples/app/src/components/Todos.tsx](./examples/app/src/components/Todos.tsx).

### Listening to a subset of a Yjs data-structure

```tsx
const yDoc = new Y.Doc();
const yPosts = yDoc.getArray<Y.Map<string | Y.Array<string>>>("posts");
const yPost = new Y.Map<string | Y.Array<string>>();
yPosts.push([yPost]);
yPost.set("title", "Notes");
const yTags = new Y.Array<string>();
yTags.push(["cooking", "vegetables"]);
yPost.set("tags", yTags);

// Makes sure to listen only to changes of the tags of the first post
const yTagsOfFirstPost = yPosts.get(0).get("tags") as Y.Array<string>;
const tagsOfFirstPost = useY(yTagsOfFirstPost);
```

Remove a tag on the first post:

```tsx
const tags = yPosts.get(0).get("tags") as Y.Array<string>;
tags.delete(index);
```

See the working example at [https://react-yjs-example.vercel.app/](https://react-yjs-example.vercel.app/).
The code is available at [examples/app/src/components/DeepStructure.tsx](./examples/app/src/components/DeepStructure.tsx).

## Architecture Decisions

The `useY` hook

The goals for this project are

- trigger a re-render when the Yjs data changes
- make use of `useSyncExternalStore` to avoid [tearing](https://github.com/reactwg/react-18/discussions/69)
- allow listening to a subset of the Yjs data-structure
- allow listening to deeply nested data-structures
- simple API

This resulted in creating a single hook that does a `observeDeep` the Yjs data-structure. This allows to expose one single hook to listen to deeply nested data-structures.

Still by passing in only a specific selector of a Yjs data-structure, the hook will only listen to that specific part of the data-structure.

### Why not listen directly to the Y.Doc?

Yjs doesn't provide the APIs to do this on the Doc level. It would be possible to work around that, but sticking to the Yjs philosophy felt like a better option.

### Types

The Yjs types could be much better https://github.com/yjs/yjs/pull/614. Once this is release we can improve the types.

## Sponsorship

Please contribute to the project financially - especially if your company relies
on it. [https://github.com/sponsors/nikgraf](https://github.com/sponsors/nikgraf)

## License

The project is [MIT licensed](./LICENSE).
