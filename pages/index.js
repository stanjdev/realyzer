/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Inputs from '../components/Inputs'
import { LightContext } from '../components/LightContext';
import { useContext, useEffect } from 'react';

export default function Home() {
  const { light, setLight } = useContext(LightContext);

  const handleClick = () => {
    if (light) {
      setLight(false)
    } else {
      setLight(true)
    }
  }

  useEffect(() => {
    // console.log(light);

    let lightSwitch = document.querySelector("#lightswitch");
    let buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      if (!light) {
        button.classList.add('darkmode__button')
        document.body.classList.add("darkmode");
        lightSwitch.innerHTML = "Light Mode"
      } else {
        button.classList.remove('darkmode__button')
        document.body.classList.remove("darkmode");
        lightSwitch.innerHTML = "Dark Mode"
      }
    })
  }, [light])

  return (
    <div className={styles.container}>
      <Head>
        <title>Real Estate Deal Analyzer</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Simply Analyze your next Real Estate Property Deal. Calculate your cash on cash, ROI, net operating income, and cash flow for rental, commercial, single-family, multi-family, BRRRR, house hacking duplex, triplex, fourplex homes! Very simple!"></meta>
        <meta name="og:title" property="og:title" content="Simple Real Estate Deal Analyzer"></meta>
      </Head>

      <main className={styles.main}>
        <div className={styles.main__title}>
          <img src="/favicon.png" alt="red house icon" />
          <h1 className={styles.title}>Real Estate Deal Analyzer</h1>
        </div>

        <p className={styles.description}>
            Calculate your Return on Investment (ROI)!
        </p>

        <button id="lightswitch" className={`${"darkmode"} ${"button"}`} style={{ position: "absolute", right: "2em", top: "2em"}} onClick={handleClick}>Dark Mode</button>

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
