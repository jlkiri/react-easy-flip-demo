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

const _items = Array(9)
  .fill(0)
  .map((_, i) => {
    return {
      id: `id${i}`,
      done: i === 0 || i === 1,
      nid: i + 1,
    };
  });

const commonClass = `w-32 h-32 m-2 rounded-lg inline-block`;

const _components = [
  <div
    key={"tl"}
    data-flip-id={`flip-id-tl`}
    className={`${commonClass} bg-pink-500`}
  ></div>,
  <div
    key={"tr"}
    data-flip-id={`flip-id-tr`}
    className={`${commonClass} bg-purple-600`}
  ></div>,
  <div
    key={"bl"}
    data-flip-id={`flip-id-bl`}
    className={`${commonClass} bg-red-500`}
  ></div>,
  <div
    key={"br"}
    data-flip-id={`flip-id-br`}
    className={`${commonClass} bg-blue-400`}
  ></div>,
];

function AutoShuffleApp() {
  const [components, setComponents] = React.useState(_components);

  const todoItemsId = "flip-todo-items";

  useFlip(todoItemsId, {
    duration: 800,
  });

  React.useEffect(() => {
    setInterval(() => {
      setComponents(shuffle([..._components]));
    }, 1000);
  }, []);

  return (
    <FlipProvider>
      <Head>
        <title>react-easy-flip-demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full h-full justify-center items-center bg-gray-800">
        <div data-flip-root-id={todoItemsId} className="w-300">
          {components}
        </div>
      </div>
    </FlipProvider>
  );
}

export default AutoShuffleApp;
