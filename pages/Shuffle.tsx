import * as React from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.css";

const shuffle = function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const _items = Array(10)
  .fill(0)
  .map((_, i) => {
    const id = nanoid();
    return {
      id: ids[i],
      isMarked: i === 0,
      text: `Item with id: ${id}`,
    };
  });

function ShuffleApp() {
  const [todoItems, setTodoItems] = React.useState(_items);

  const todoItemsId = "flip-todo-items";

  useFlip(
    todoItemsId,
    {
      duration: 500,
    },
    todoItems.length
  );

  return (
    <div>
      <button onClick={() => setTodoItems(shuffle([...todoItems]))}>
        Shuffle
      </button>
      <ul data-flip-root-id={todoItemsId} className="list">
        {todoItems.map((item, _) => (
          <li
            data-flippable
            key={item.id}
            data-flip-id={`flip-id-${item.id}`}
            className="list-item"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
