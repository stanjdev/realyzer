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
    let jumbo = document.querySelector('#jumbo');
    // background-image: url("../public/Mask\ Group.svg");

    buttons.forEach(button => {
      if (!light) {
        button.classList.add('darkmode__button')
        document.body.classList.add("darkmode");
        // lightSwitch.innerHTML = "Light Mode"
        jumbo.classList.remove(styles.jumbo);
      } else {
        button.classList.remove('darkmode__button')
        document.body.classList.remove("darkmode");
        // lightSwitch.innerHTML = "Dark Mode"
        jumbo.classList.add(styles.jumbo);
      }
    })
  }, [light])

  return (
    <div className={styles.container}>
      <Head>
        <title>Realyzer</title>
        <link rel="icon" href="/house.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"></link>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
        <meta name="description" content="Simply Analyze your next Real Estate Property Deal. Calculate your cash on cash, ROI, net operating income, and cash flow for rental, commercial, single-family, multi-family, BRRRR, house hacking duplex, triplex, fourplex homes! Very simple!"></meta>
        <meta name="og:title" property="og:title" content="Simple Real Estate Deal Analyzer"></meta>
      </Head>

      <main className={styles.main}>
        <div className={`${styles.jumbo} ${styles.jumboPadding}`} id="jumbo">
        <button id="lightswitch" className={`${"darkmode"} ${"button"} ${"buttonLightSwitch"}`} style={{ position: "absolute", right: "2em", top: "2em"}} onClick={handleClick}>
          {light ? <img src="/light-switch/Moon.svg" type="image/svg+xml" style={{color: "white"}}  /> : <img src="/light-switch/Sun.svg" type="image/svg+xml" />}
        </button>
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
        <object className={styles.footerBlock} data="/realyzer-white.svg" type="image/svg+xml" height="50"></object>

        <p className={styles.footerBlock}>
        <span>Copyright &copy; 2020 Realyzer</span>
          <a
            href="https://stanjeong.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: "#FFFFFF"}}
          >
            Developed by Stan Jeong <br /> Designed by Casey Tang
            {/* <img src="/favicon.ico" alt="Vercel Logo" className={styles.logo} /> */}
          </a>
        </p>

        <div className={styles.footerBlock}>
          <form action="https://www.paypal.com/donate" method="post" target="_blank">
            <input type="hidden" name="hosted_button_id" value="DUYKJBZBQ9GCJ" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form>
        </div>

      </footer>
    </div>
  )
}
