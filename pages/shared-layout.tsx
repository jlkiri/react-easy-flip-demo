import Head from "next/head";
import { FlipProvider, useFlip } from "react-easy-flip";
import * as React from "react";

const _items = Array(9)
  .fill(0)
  .map((_, i) => {
    return {
      id: `id${i}`,
      done: i === 0 || i === 1,
      nid: i + 1,
    };
  });

const Checkbox = ({ onChange, item }) => {
  const { id, done, text } = item;
  return (
    <label
      className="flex items-center flex-grow p-4 rounded-lg cursor-pointer"
      htmlFor={id}
    >
      {text}
      <input
        className="absolute hidden right-0 mr-2"
        type="checkbox"
        id={id}
        checked={done}
        onChange={() => onChange(item, id)}
      />
    </label>
  );
};

const Li = React.forwardRef<any, any>(({ onChange, item }, ref) => (
  <li
    key={item.id}
    data-flip-id={`flip-id-${item.id}`}
    className={`w-64 mb-4 rounded-lg text-lg select-none ${
      item.done ? "bg-purple-700" : "bg-pink-600"
    }`}
    ref={ref}
  >
    <Checkbox onChange={onChange} item={item} />
  </li>
));

function SharedLayoutTransitions() {
  const [todoItems, setTodoItems] = React.useState(_items);

  const todoItemsId = "flip-todo-items";

  useFlip(todoItemsId, { duration: 1500, animateColor: true });

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

  return (
    <div className="flex flex-col pt-4 bg-gray-800 items-center w-full h-full">
      <div
        data-flip-root-id={todoItemsId}
        className="flex w-1/2 h-full justify-between"
      >
        <div className="p-8">
          <ul className="flex flex-col p-0">
            {todoItems
              .filter((i) => !i.done)
              .map((item) => (
                <Li
                  key={item.id}
                  item={item}
                  onChange={changeToDone}
                  removeFromItems={removeFromItems}
                />
              ))}
          </ul>
        </div>

        <div className="p-8">
          <ul className="flex flex-col p-0">
            {todoItems
              .filter((i) => i.done)
              .map((item) => (
                <Li
                  item={item}
                  key={item.id}
                  removeFromItems={removeFromItems}
                  onChange={undo}
                ></Li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SharedLayout() {
  return (
    <FlipProvider>
      <Head>
        <title>react-easy-flip-demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SharedLayoutTransitions />
    </FlipProvider>
  );
}
