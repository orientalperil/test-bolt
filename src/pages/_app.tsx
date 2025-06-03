import Head from "next/head";
import Link from "next/link";
import { type AppType } from "next/dist/shared/lib/utils";
import clsx from "clsx";
import {useRouter} from "next/router";

import "~/styles/globals.css";



const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Condorsoft technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-pokemon flex min-h-screen flex-col  font-sans">
        <div className="fixed top-0 left-0 w-full h-32 bg-dark text-white flex flex-col items-center justify-center">
          <img src="/logo.png" className="h-1/3" />
          <div className="mt-4">
            <Link href="/" className={clsx({'font-semibold underline': !pathname.includes('pokedex') })}>Home</Link>
            <Link href="/pokedex" className={clsx('ml-20', {'font-semibold underline': pathname.includes('pokedex') })}>Pokedex</Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="h-32"></div>
          <div className="flex flex-1 flex-col items-center">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </>
  );
};

export default MyApp;
