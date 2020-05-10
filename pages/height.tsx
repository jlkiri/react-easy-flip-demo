import { FlipProvider, useFlip } from "react-easy-flip";
import { useState } from "react";

export default function Height() {
  const [expanded, setExpanded] = useState(false);
  const flipRootId = "animated";

  useFlip(flipRootId, { duration: 1000 }, 0);

  const className = `bg-gray-400 ${expanded ? "h-64 w-64" : "h-56 w-56"} flex`;

  return (
    <FlipProvider>
      <div data-flip-root-id={flipRootId}>
        <div
          style={{ transformOrigin: "top left" }}
          className={className}
          data-flip-id={"a"}
        >
          <span>Lol</span>
        </div>
        <button onClick={() => setExpanded(!expanded)}>expand</button>
      </div>
    </FlipProvider>
  );
}
