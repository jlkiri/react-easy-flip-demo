import Head from "next/head";
import Link from "next/link";
import * as React from "react";

export default function Home() {
  const linkClass = "underline mb-2";
  return (
    <>
      <Head>
        <title>react-easy-flip-demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-800 text-white font-bold w-full h-full flex flex-col justify-center items-center">
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
    </>
  );
}
