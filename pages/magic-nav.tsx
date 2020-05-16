import * as React from "react";
import Head from "next/head";
import { useFlip, FlipProvider } from "react-easy-flip";

const tabs = [
  { id: "home", text: "Home" },
  { id: "about", text: "About me" },
  { id: "works", text: "My works" },
];

const MagicNav = () => {
  const [selectedTab, setSelectedTab] = React.useState("home");

  const flipRootId = "flipRoot";

  useFlip(flipRootId);

  return (
    <FlipProvider>
      <Head>
        <title>react-easy-flip-demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        data-flip-root-id={flipRootId}
        className="w-full bg-gray-800 h-full flex justify-center items-center"
      >
        <div className="flex">
          {tabs.map((tab) => {
            return (
              <div
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className="cursor-pointer text-white px-4 h-16 w-64 text-xl font-bold flex flex-col items-stretch text-center"
              >
                <div className="flex-1 hover:text-red-500">{tab.text}</div>
                {tab.id === selectedTab && (
                  <div
                    data-flip-id="highlight"
                    className="h-2 bg-red-500"
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </FlipProvider>
  );
};

export default MagicNav;
