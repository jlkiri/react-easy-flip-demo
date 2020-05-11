import { FlipProvider, useFlip, AnimateInOut } from "react-easy-flip";
import { useState } from "react";

const items = [{ id: "item-1" }, { id: "item-2" }, { id: "item-3" }];

const Item = (props) => {
  const isExpanded = props.expanded.includes(props.id);
  /* const fadeIn = {
    from: { opacity: 0, transform: "translateY(100px) scale(0,0)" },
    to: { opacity: 1, transform: "translateY(0px) scale(1,1)" },
    duration: 2000,
    delay: 900,
    easing: "ease-out",
  }; */
  return (
    <div
      style={{
        transformOrigin: "top left",
      }}
      data-flip-id={props.id}
      className={`bg-gray-400 ${
        isExpanded ? "expand" : "shrink"
      } flex flex-col justify-center items-center mb-4`}
      onClick={() =>
        isExpanded ? props.shrink(props.id) : props.expand(props.id)
      }
    >
      <div
        className="rounded-full bg-gray-700 w-16 h-16"
        data-preserve-scale
      ></div>
      {isExpanded && (
        <div className="appear" data-preserve-scale>
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
        <div className="w-1/2">
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
