import { Fragment } from "react";
import Head from "next/head";

import Favicon from "../public/svg/favicon.svg";
import StartingPage from "../components/startingPage/startingPage";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>ZEIT ONLINE</title>
        <link rel="icon" href={Favicon} priority="true"/>
      </Head>
      <StartingPage />
    </Fragment>
  );
}
