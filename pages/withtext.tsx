import * as React from "react";
import { useFlip, FlipProvider, AnimateInOut } from "react-easy-flip";

export { FlipProvider };

const TrashCan = () => (
  <svg
    className="w-5"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="white"
  >
    <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
  </svg>
);

const _items = Array(9)
  .fill(0)
  .map((_, i) => {
    return {
      id: `id${i}`,
      done: i === 0 || i === 1,
      nid: i + 1,
    };
  });

const RemoveButton = ({ onClick }) => (
  <button
    className="hover:bg-red-600 hover:border-transparent w-9 h-9 p-2 ml-2 cursor-pointer border-dotted border-2 border-pink-400 rounded-full"
    onClick={onClick}
  >
    <TrashCan />
  </button>
);

const Checkbox = ({ onChange, item }) => {
  const { id, done, text } = item;
  return (
    <label
      className="flex items-center flex-grow p-4 rounded-lg cursor-pointer"
      htmlFor={id}
    >
      {text}
      <input
        className="absolute right-0 mr-2"
        type="checkbox"
        id={id}
        checked={done}
        onChange={() => onChange(item, id)}
      />
    </label>
  );
};

const Li = React.forwardRef<any, any>(
  ({ onChange, removeFromItems, item }, ref) => {
    const doneStyle = { backgroundColor: "#5209d5" };
    return (
      <li
        key={item.id}
        data-flip-id={`flip-id-${item.id}`}
        className={`w-64 text-white relative flex items-center mb-2 rounded-lg text-lg select-none ${
          item.done ? "bg-purple-700" : "bg-pink-600"
        }`}
        ref={ref}
      >
        <RemoveButton onClick={() => removeFromItems(item.id)} />
        <Checkbox onChange={onChange} item={item} />
      </li>
    );
  }
);

function TodoApp() {
  const [todoItems, setTodoItems] = React.useState(_items);
  const [t, setT] = React.useState("");
  const lastId = React.useRef(todoItems.length);

  const todoItemsId = "flip-todo-items";

  useFlip(todoItemsId, { duration: 1500 }, todoItems.length);

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
    <>
      <div className="flex flex-col pt-4 bg-gray-800 w-full h-full">
        <div className="flex justify-center">
          <input
            className="focus:outline-none focus:shadow-outline rounded-md border border-purple-300 py-2 px-4 appearance-none leading-normal"
            value={t}
            type="text"
            onChange={(e) => setT(e.target.value)}
          ></input>
          <button
            className="ml-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => {
              setTodoItems([
                ...todoItems,
                {
                  id: `id${lastId.current}`,
                  done: false,
                  nid: lastId.current + 1,
                },
              ]);

              lastId.current++;
            }}
          >
            Add
          </button>
        </div>
        <div
          data-flip-root-id={todoItemsId}
          className="flex w-full h-full justify-center"
        >
          <div className="p-4">
            <ul className="flex flex-col p-0">
              <AnimateInOut itemAmount={todoItems.length}>
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
              </AnimateInOut>
            </ul>
          </div>

          <div className="p-4">
            <ul className="flex flex-col p-0">
              <AnimateInOut itemAmount={todoItems.length}>
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
              </AnimateInOut>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoApp;
