import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    const request = async () => {
      const result = await fetch("/api/pokemon");
      // This is just an example to obtain data from the endpoint. Hint :) avoid no typesafety we hate that
      const resultJson = await result.json();
      console.log({ resultJson });
      setText(resultJson.message);
    };
    void request();
  }, []);

  return (
    <>
      <Head>
        <title>Condorsoft</title>
        <meta name="description" content="Condorsoft technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#04040c] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Condorsoft Technical Test <p>{text}</p>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://condorsoft.dev/"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">About our family →</h3>
              <div className="text-lg">
                We create the best products and look for the best.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
