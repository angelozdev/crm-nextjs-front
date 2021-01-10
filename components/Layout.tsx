import React from "react";
import Head from "next/head";

/* Types */
interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>CRM - Next Application</title>
      </Head>
      {children}
    </React.Fragment>
  );
}

export default Layout;
