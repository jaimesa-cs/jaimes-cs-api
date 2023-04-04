import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Jaime&apos;s Api</title>
        <meta name="description" content="Generated by Jaime Santos Alcon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started with <a href="https://www.contenstack.com">Contentstack</a>
          </p>
          <div>
            <a href="/api/ping" target="_blank" rel="noopener noreferrer">
              Jaime&apos;s Api
              {/* <Image
                src="/contentstack-logo.png"
                alt="Contentstack Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              /> */}
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.cslogo}>
            <Image src="/cs.png" alt="13" width={40} height={31} priority />
          </div>
        </div>

        <div className={styles.grid}>
          <a href="https://contentsack.com/" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Contenstack <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Find in-depth information about Contentstack features and&nbsp;More.</p>
          </a>

          <a href="#" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Contentstack in an interactive course with&nbsp; Contentsack Academy
            </p>
          </a>

          <a
            href="https://www.contentstack.com/docs/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Documentation <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Discover and deploy boilerplate example Next.js&nbsp;projects.</p>
          </a>

          <a
            href="https://www.contentstack.com/launch/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Launch <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Front-end hosting made simple. Fully integrated, fully automated, MACH-compliant front-end hosting.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
