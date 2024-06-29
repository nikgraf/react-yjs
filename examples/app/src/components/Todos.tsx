import React from "react";
import { useY } from "react-yjs";
import * as Y from "yjs";

export const Todos: React.FC = () => {
  const [yTodos] = React.useState(() => {
    // initialize a Y.Doc and get the todos array
    // when the component mounts
    const yDoc = new Y.Doc();
    return yDoc.getArray<Y.Map<string | boolean>>("todos");
  });

  const todos = useY(yTodos);
  const [newTodo, setNewTodo] = React.useState("");

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const todo = new Y.Map<string | boolean>();
          todo.set("checked", false);
          todo.set("text", newTodo);
          yTodos.push([todo]);
          setNewTodo("");
        }}
      >
        <label>
          <input
            type="text"
            value={newTodo}
            onChange={(event) => {
              setNewTodo(event.currentTarget.value);
            }}
          />
        </label>
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.checked as boolean}
                  onChange={(event) => {
                    yTodos
                      .get(index)
                      .set("checked", event.currentTarget.checked);
                  }}
                />
                <input
                  type="text"
                  value={todo.text as string}
                  onChange={(event) => {
                    yTodos.get(index).set("text", event.currentTarget.value);
                  }}
                />
              </label>
            </li>
          );
        })}
      </ul>
      <div>Result: {JSON.stringify(todos, null, 2)}</div>
    </>
  );
};
