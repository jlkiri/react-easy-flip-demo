import { FlipProvider, useFlip, AnimateInOut } from "react-easy-flip";
import { useState } from "react";

const items = [{ id: "item-1" }, { id: "item-2" }, { id: "item-3" }];

const Item = ({ id, shrink, expand, expanded }) => {
  const isExpanded = expanded.includes(id);
  const cl = isExpanded
    ? "origin-top-left w-full h-full bg-gray-700 flex justify-center items-center top-0 absolute z-50"
    : "origin-top-left w-64 h-64 bg-gray-700 flex justify-center items-center";

  if (!isExpanded) {
    return (
      <div onClick={() => expand(id)} data-flip-id={id} className={cl}>
        <div
          data-preserve-scale
          className="w-32 h-32 bg-gray-200 rounded-full"
        ></div>
      </div>
    );
  }

  return (
    <div onClick={() => shrink(id)} data-flip-id={id} className={cl}>
      <div
        data-preserve-scale
        className="w-32 h-32 bg-gray-200 rounded-full"
      ></div>
    </div>
  );
};

export default function Height() {
  const [expanded, setExpanded] = useState([]);
  const flipRootId = "animated";

  useFlip(flipRootId, { duration: 500 }, 0);

  const expand = (id) => setExpanded([...expanded, id]);
  const shrink = (id) => setExpanded(expanded.filter((i) => i !== id));

  return (
    <FlipProvider>
      <div className="w-full h-full" data-flip-root-id={flipRootId}>
        {items.map((item) => {
          return (
            <Item
              id={item.id}
              expand={expand}
              shrink={shrink}
              expanded={expanded}
            />
          );
        })}
      </div>
    </FlipProvider>
  );
}
