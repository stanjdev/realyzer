/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import Link from 'next/link'
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


  useEffect(() => {
    let burgerButton = document.querySelector(".burgerButton");
    let navMenu = document.querySelector('.nav');

    burgerButton.addEventListener('click', function() {
      navMenu.classList.toggle("navMenuOpened");
      burgerButton.classList.toggle("expanded");
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Realyzer Rental Property Calculator</title>
        <script data-ad-client="ca-pub-2377465396084687" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <link rel="icon" href="/house.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"></link>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
        <meta name="description" content="Simply Analyze your next Real Estate Property Deal.
        Calculate your cash on cash return, ROI, net operating income, and cash flow for rental, commercial,
        single-family, multi-family, BRRRR, house hacking duplex, triplex, fourplex homes! It is a very simple commercial real estate calculator as well. We use a simple mortgage calculator,
        a basic mortgage calculator to find out your monthly payments! Our cash on cash return formula will help you calculate your cash on cash return. Real estate roi calculator and rental property roi calculator."
        ></meta>
        <meta name="og:title" property="og:title" content="Simple Rental Property Calculator, and Real Estate Investment Calculator"></meta>
      </Head>

      <main className={styles.main}>
        <div className={`${styles.jumbo} ${styles.jumboPadding}`} id="jumbo">
          <button id="lightswitch" className={`${"darkmode"} ${"button"} ${"buttonLightSwitch"}`} style={{ position: "absolute", right: "2em", top: "2em"}} onClick={handleClick}>
            {light ? <img src="/light-switch/Moon.svg" type="image/svg+xml" style={{color: "white"}}  /> : <img src="/light-switch/Sun.svg" type="image/svg+xml" />}
          </button>

          <div className={`burgerButton`}>
            <div className={`burgerButton__bars bar1`}></div>
          </div>

          <nav className={`nav navMenuClosed`}>
            <Link href="/about">About</Link>
            <Link href="/example-deal">Example Deal</Link>
            <Link href="/howToUse">How To Use</Link>
            <Link href="/glossary">Glossary</Link>
            <Link href="/faq">FAQ</Link>
          </nav>

          <div className={styles.main__title}>
            {/* <img src="/favicon.png" alt="red house icon" /> */}
            {/* <img src="/logo-main2.svg" alt="logo main" style={{width: "270px"}}/> */}
            {/* <img src="/logo-main2.svg" alt="logo main" style={{width: "270px"}}/> */}
            <object data="/logo-main2.svg" type="image/svg+xml" alt="rental property calculator, simple mortgage calculator"></object>
            {/* <h1 className={styles.title}>Real Estate Deal Analyzer</h1> */}
            {/* <h1 className={styles.title}>Redealio</h1> */}
            {/* <h1 className={styles.title}>Realyzer</h1> */}
          </div>

          <h1 className={styles.description}>
            Real Estate Deal Analyzer <br/>
            Calculate Your Cash on Cash Return (ROI)
          </h1>


        </div>

        <Inputs />
      </main>



      <footer className={styles.footer}>

        {/* <img src="/realyzer-white.svg" alt="realyzer-white-logo" height="50" className={styles.footerBlock}/> */}
        <object className={styles.footerBlock} data="/realyzer-white.svg" type="image/svg+xml" height="50"></object>

        <p className={styles.footerBlock}>
        <span>Copyright &copy; Realyzer</span>
          <a
            href="https://stanjeong.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: "#FFFFFF"}}
          >
            Developed by Stan Jeong
            {/* <img src="/favicon.ico" alt="Vercel Logo" className={styles.logo} /> */}
          </a>
        </p>

        <div className={styles.footerBlock}>
          {/* <form action="https://www.paypal.com/donate" method="post" target="_blank">
            <input type="hidden" name="hosted_button_id" value="DUYKJBZBQ9GCJ" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form> */}
        </div>

      </footer>
    </div>
  )
}
