import Head from "next/head";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-2xl text-center">Hola mundo</h1>
      <Sidebar />
    </Layout>
  );
}
