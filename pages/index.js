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
        {/* <title>Real Estate Deal Analyzer</title> */}
        {/* <title>Redealio</title> */}
        <title>Realyzer</title>
        <link rel="icon" href="/house.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"></link>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
        <meta name="description" content="Simply Analyze your next Real Estate Property Deal. Calculate your cash on cash, ROI, net operating income, and cash flow for rental, commercial, single-family, multi-family, BRRRR, house hacking duplex, triplex, fourplex homes! Very simple!"></meta>
        <meta name="og:title" property="og:title" content="Simple Real Estate Deal Analyzer"></meta>
      </Head>

      <main className={styles.main}>
        <div className={styles.jumbo}>
        <button id="lightswitch" className={`${"darkmode"} ${"button"}`} style={{ position: "absolute", right: "2em", top: "2em"}} onClick={handleClick}>Dark Mode</button>
          <div className={styles.main__title}>
            {/* <img src="/favicon.png" alt="red house icon" /> */}
            {/* <img src="/logo-main2.svg" alt="logo main" style={{width: "270px"}}/> */}
            {/* <img src="/logo-main2.svg" alt="logo main" style={{width: "270px"}}/> */}
            <object data="/logo-main2.svg" type="image/svg+xml"></object>
            {/* <h1 className={styles.title}>Real Estate Deal Analyzer</h1> */}
            {/* <h1 className={styles.title}>Redealio</h1> */}
            {/* <h1 className={styles.title}>Realyzer</h1> */}
          </div>

          <p className={styles.description}>
            Real Estate Deal Analyzer <br/>
            Calculate Your ROI
          </p>
        </div>

        <Inputs />
      </main>



      <footer className={styles.footer}>
        {/* <img src="/realyzer-white.svg" alt="realyzer-white-logo" height="50" className={styles.footerBlock}/> */}
        <object data="/realyzer-white.svg" type="image/svg+xml" height="50"></object>
        <p className={styles.footerBlock}>
        <span>Copyright &copy; 2020 Realyzer</span>
          <a
            href="https://stanjeong.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: "#FFFFFF"}}
          >
            Powered by Stan the Man{' '}
            {/* <img src="/favicon.ico" alt="Vercel Logo" className={styles.logo} /> */}
          </a>
        </p>
        <div className={styles.footerBlock}></div>
      </footer>
    </div>
  )
}
