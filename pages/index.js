/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Inputs from '../components/Inputs'

export default function Home() {

  const handleClick = () => {
    document.body.classList.toggle("darkmode")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Real Estate Deal Analyzer</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Simply Analyze your next Real Estate Property Deal. Calculate your cash on cash, ROI, net operating income, and cash flow for rental, commercial, single-family, multi-family, BRRRR, house hacking duplex, triplex, fourplex homes! Very simple!"></meta>
        <meta name="og:title" property="og:title" content="Simple Real Estate Deal Analyzer"></meta>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Real Estate Deal Analyzer
        </h1>

        <p className={styles.description}>
            Calculate your {' '} 
            <code className={styles.code}>Return on Investment (ROI)!</code>
        </p>

        <button style={{width: "200px"}} onClick={handleClick}>light switch</button>

        <Inputs />
      </main>



      <footer className={styles.footer}>
        <a
          href="https://stanjeong.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Stan the Man{' '}
          <img src="/favicon.ico" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}