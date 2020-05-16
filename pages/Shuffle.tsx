import * as React from "react";
import Head from "next/head";
import { useFlip, FlipProvider } from "react-easy-flip";

const shuffle = function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const _items = Array(7)
  .fill(0)
  .map((_, i) => {
    return {
      id: `id${i}`,
      done: i === 0 || i === 1,
      nid: i + 1,
    };
  });

function ShuffleApp() {
  const [todoItems, setTodoItems] = React.useState(_items);

  const todoItemsId = "flip-todo-items";

  useFlip(todoItemsId, {
    duration: 800,
  });

  return (
    <FlipProvider>
      <Head>
        <title>react-easy-flip-demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full h-full justify-center items-center bg-gray-800">
        <div className="w-1/2 text-center">
          <button
            className="mt-2 p-2 bg-gray-200 font-bold rounded-lg hover:bg-gray-400"
            onClick={() => setTodoItems(shuffle([...todoItems]))}
          >
            Shuffle
          </button>
          <ul data-flip-root-id={todoItemsId} className="p-4">
            {todoItems.map((item, _) => (
              <li
                key={item.id}
                data-flip-id={`flip-id-${item.id}`}
                className="flex items-center justify-center font-bold text-lg bg-gray-400 mb-4 bg-yellow-500 rounded-lg"
              >
                {item.nid}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FlipProvider>
  );
}

export default ShuffleApp;
