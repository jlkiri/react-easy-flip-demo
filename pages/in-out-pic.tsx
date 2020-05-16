import * as React from "react";
import Head from "next/head";
import { useFlip, AnimateInOut, FlipProvider } from "react-easy-flip";

const _images = ["earth.jpg", "milkyway.jpg", "galaxy.jpg"];

function InOutImageDemo() {
  const [image, setImage] = React.useState(0);

  const imagesId = "flip-images";

  useFlip(
    imagesId,
    {
      duration: 1800,
    },
    imagesId.length
  );

  React.useEffect(() => {
    let i = 0;
    setInterval(() => {
      i++;
      setImage(i % 3);
    }, 1000);
  }, []);

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
        <div className="w-640 h-359 flex  rounded-lg items-center relative overflow-hidden">
          <AnimateInOut
            out={{
              from: { transform: "translateX(0px)", opacity: 1 },
              to: { transform: "translateX(-500px)", opacity: 0 },
              duration: 300,
            }}
            in={{
              from: { transform: "translateX(500px)", opacity: 0 },
              to: { transform: "translateX(0px)", opacity: 1 },
              duration: 300,
            }}
            playOnFirstRender
          >
            <img
              className="absolute"
              key={_images[image]}
              src={`/${_images[image]}`}
            />
          </AnimateInOut>
        </div>
      </div>
    </FlipProvider>
  );
}

export default InOutImageDemo;
