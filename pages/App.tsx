import * as React from "react";
import { nanoid } from "nanoid";
import { useFlip, FlipProvider, AnimateInOut } from "react-easy-flip";
import styles from "./App.module.css";

export { FlipProvider };

const TrashCan = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="white"
  >
    <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
  </svg>
);

const shuffle = function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ids = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

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

const todos = [
  "Wash dishes",
  "Feed the cat",
  "Read a book",
  "Do laundry",
  "Learn Russian",
  "Cook pasta",
  "Buy coffee beans",
  "Do a quick workout",
  "Fix some bugs",
  "Buy fresh bread",
];

const _items2 = Array(10)
  .fill(0)
  .map((_, i) => {
    const id = ids[i];
    return {
      id: id,
      done: i === 0,
      nid: i + 1,
      text: todos[i],
    };
  });

function ShuffleApp() {
  const [todoItems, setTodoItems] = React.useState(_items);

  const todoItemsId = "flip-todo-items";

  useFlip(todoItemsId, {
    duration: 500,
  });

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

const RemoveButton = ({ onClick }) => (
  <button onClick={onClick}>
    <TrashCan />
  </button>
);

const Checkbox = ({ onChange, item }) => {
  const { id, done, text } = item;
  return (
    <label htmlFor={id}>
      {text}
      <input
        className={styles["input"]}
        type="checkbox"
        id={id}
        checked={done}
        onChange={() => onChange(item, id)}
      />
    </label>
  );
};

const Li = React.forwardRef<any, any>(
  ({ changeToDone, removeFromItems, item }, ref) => {
    return (
      <li
        key={item.id}
        data-flip-id={`flip-id-${item.id}`}
        className={styles["todo-list-item"]}
        ref={ref}
      >
        <RemoveButton onClick={() => removeFromItems(item.id)} />
        <Checkbox onChange={changeToDone} item={item} />
      </li>
    );
  }
);

function TodoApp() {
  const [todoItems, setTodoItems] = React.useState(_items2);
  const [t, setT] = React.useState("");

  const todoItemsId = "flip-todo-items";

  useFlip(todoItemsId, { duration: 800 });

  const removeFromItems = (id) =>
    setTodoItems(todoItems.filter((i) => i.id !== id));

  const changeToDone = (item, id) =>
    setTodoItems(
      [...todoItems.filter((i) => i.id !== id), { ...item, done: true }].sort(
        (a, b) => a.nid - b.nid
      )
    );

  const undo = (item, id) =>
    setTodoItems(
      [...todoItems.filter((i) => i.id !== id), { ...item, done: false }].sort(
        (a, b) => a.nid - b.nid
      )
    );

  const doneStyle = { backgroundColor: "#5209d5" };

  return (
    <>
      <input
        value={t}
        type="text"
        onChange={(e) => setT(e.target.value)}
      ></input>
      <button
        onClick={() =>
          setTodoItems([
            ...todoItems,
            {
              id: "x",
              done: false,
              nid: todoItems.length + 1,
              text: t,
            },
          ])
        }
      >
        add
      </button>
      <div className="flex justify-center">
        <div className={styles["named-list"]}>
          <h2 className={styles["center"]}>TODO</h2>
          <ul data-flip-root-id={todoItemsId} className={styles["list"]}>
            <AnimateInOut itemAmount={todoItems.length}>
              {todoItems
                .filter((i) => !i.done)
                .map((item) => (
                  <Li
                    key={item.id}
                    item={item}
                    data-flip-id={`flip-id-${item.id}`}
                    changeToDone={changeToDone}
                    removeFromItems={removeFromItems}
                  />
                ))}
            </AnimateInOut>
          </ul>
        </div>

        <div className={styles["named-list"]}>
          <h2 className={styles["center"]}>DONE</h2>
          <ul data-flip-root-id={todoItemsId} className={styles["list"]}>
            <AnimateInOut itemAmount={todoItems.length}>
              {todoItems
                .filter((i) => i.done)
                .map((item) => (
                  <li
                    style={doneStyle}
                    key={item.id}
                    data-flip-id={`flip-id-${item.id}`}
                    className={styles["todo-list-item"]}
                  >
                    <RemoveButton onClick={() => removeFromItems(item.id)} />
                    <Checkbox onChange={undo} item={item} />
                  </li>
                ))}
            </AnimateInOut>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TodoApp;
