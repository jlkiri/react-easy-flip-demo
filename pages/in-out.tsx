import * as React from "react";
import Head from "next/head";
import { useFlip, AnimateInOut, FlipProvider } from "react-easy-flip";

const _items = Array(4)
  .fill(0)
  .map((_, i) => {
    return {
      id: `id${i}`,
    };
  });

function InOutDemo() {
  const [todoItems, setTodoItems] = React.useState(_items);

  const todoItemsId = "flip-todo-items";

  useFlip(
    todoItemsId,
    {
      duration: 800,
    },
    todoItems.length
  );

  React.useEffect(() => {
    if (todoItems.length === 0) {
      setTimeout(() => setTodoItems(_items), 1000);
    }
  }, [todoItems]);

  return (
    <FlipProvider>
      <Head>
        <title>react-easy-flip-demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        data-flip-root-id="flipRoot"
        className="flex w-full h-full justify-center items-center bg-gray-800"
      >
        <AnimateInOut playOnFirstRender>
          {todoItems.map((i) => (
            <div
              key={i.id}
              onClick={() =>
                setTodoItems(todoItems.filter((it) => it.id !== i.id))
              }
              data-flip-id={i.id}
              className="w-32 h-32 m-2 cursor-pointer rounded-lg bg-gray-100"
            ></div>
          ))}
        </AnimateInOut>
      </div>
    </FlipProvider>
  );
}

export default InOutDemo;
