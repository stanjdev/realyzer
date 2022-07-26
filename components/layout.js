import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { useEffect } from 'react';

import Link from 'next/link'

const name = 'Realyzer'
export const siteTitle = 'Realyzer developed by Stan Jeong'

export default function Layout({ children, home }) {

  // useEffect(() => {
  //   let burgerButton = document.querySelector(".burgerButton");
  //   let navMenu = document.querySelector('.nav');

  //   burgerButton.addEventListener('click', function() {
  //     navMenu.classList.toggle("navMenuOpened");
  //     burgerButton.classList.toggle("expanded");
  //   })
  // }, [])

  return (
    <div>

      {/* <div className={`burgerButton`}>
        <div className={`burgerButton__bars bar1`}></div>
      </div> */}

      <nav className={"navMenu"}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/example-deal">Example Deal</Link>
        <Link href="/howToUse">How To Use</Link>
        <Link href="/glossary">Glossary</Link>
        <Link href="/faq">FAQ</Link>
      </nav>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/house.svg" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <img
                src="/images/profile.jpg"
                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>

              <Link href="/">
                <a>
                  <div className={styles.main__title}>
                    <object data="/logo-main2.svg" type="image/svg+xml" alt="rental property calculator, simple mortgage calculator"></object>
                  </div>
                </a>
              </Link>
            </>
          )}
        </header>


        <main>{children}</main>
        {!home && (
          <div>
            <div className={styles.backToHome}>
              <Link href="/">
                  <a><h2>← Back to home</h2></a>
              </Link>
            </div>
          </div>
        )}

      </div>
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
