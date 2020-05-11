import { FlipProvider, useFlip, easeOutCubicCSS } from "react-easy-flip";
import { useState } from "react";

export default function Height() {
  const [expanded, setExpanded] = useState(false);
  const flipRootId = "animated";

  useFlip(flipRootId, { duration: 1000 }, 0);

  const className = `transition-transform ease-linear duration-500 bg-gray-400 ${
    expanded && "expanded"
  } flex`;

  const inversionConfig = {
    duration: 500,
    scale: 3,
    easing: easeOutCubicCSS,
  };

  return (
    <FlipProvider>
      <div className="h-full w-full" data-flip-root-id={flipRootId}>
        <div
          style={{ transformOrigin: "top left" }}
          className={className}
          onClick={() => setExpanded(!expanded)}
        >
          <span
            data-counter-scale
            className={`transition-transform ease-linear duration-500 ${
              expanded && "shrinked"
            }`}
          >
            Lol
          </span>
        </div>
      </div>
    </FlipProvider>
  );
}
