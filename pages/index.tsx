import Head from "next/head";
import Link from "next/link";
import * as React from "react";

export default function Home() {
  const linkClass = "hover:text-red-300 underline mb-2";
  return (
    <>
      <Head>
        <title>react-easy-flip-demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-800 text-red-100 text-2xl font-bold w-full h-full flex flex-col justify-center items-center">
        <Link href="shuffle">
          <a className={linkClass}>Simple shuffle</a>
        </Link>
        <Link href="auto-shuffle">
          <a className={linkClass}>Auto shuffling squares</a>
        </Link>
        <Link href="shared-layout">
          <a className={linkClass}>Shared layout animations</a>
        </Link>
        <Link href="magic-nav">
          <a className={linkClass}>Navigation bar shared layout animation</a>
        </Link>
        <Link href="in-out">
          <a className={linkClass}>In/out animations</a>
        </Link>
        <Link href="in-out-pic">
          <a className={linkClass}>In/out custom picture animations</a>
        </Link>
      </div>
      <div className="pb-4 w-full text-red-500 underline font-bold text-xl flex justify-center absolute bottom-0">
        <a href="https://github.com/jlkiri/react-easy-flip">react-easy-flip</a>
      </div>
    </>
  );
}
