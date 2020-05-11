import { FlipProvider, useFlip, AnimateInOut } from "react-easy-flip";
import { useState } from "react";

const items = [{ id: "item-1" }, { id: "item-2" }, { id: "item-3" }];

const Item = ({ id, shrink, expand, expanded }) => {
  const isExpanded = expanded.includes(id);
  return (
    <div
      style={{
        transformOrigin: "top left",
      }}
      data-flip-id={id}
      className={`bg-gray-400 ${
        isExpanded ? "expand" : "shrink"
      } flex flex-col justify-center items-center mb-4`}
      onClick={() => (isExpanded ? shrink(id) : expand(id))}
    >
      <div
        className="rounded-full bg-gray-700 w-16 h-16"
        data-preserve-scale
      ></div>
      {isExpanded && (
        <div className="text" data-preserve-scale>
          TEXT
        </div>
      )}
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
      <div className="flex justify-center" data-flip-root-id={flipRootId}>
        <div className="w-2/4">
          {items.map((it) => (
            <Item
              id={it.id}
              expand={expand}
              shrink={shrink}
              expanded={expanded}
            />
          ))}
        </div>
      </div>
    </FlipProvider>
  );
}
