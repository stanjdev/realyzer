import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useEffect } from 'react';
import Results from '../components/Results'

export default function ResultsPage () {
  const global = useSelector(state => state.values)
  
  // // triggers print dialog to open automatically on mount
  // useEffect(() => {
  //   window.print()
  // }, [])

  return (
        <div className={styles.resultsPage}>
          <Head>
            <title>{`Report for ${global.address}`}</title>
          </Head>

          <div className={styles.flex}>
            {global.logo ? <img src={URL.createObjectURL(global.logo)} height="150" onLoad={URL.revokeObjectURL(this)}/> : <img src="/favicon.ico"/>}
            
            <h2 style={{width: "300px"}}>{global.address}</h2>
          </div>

          <Results />

          <div className={styles.results_container}>
              <p>{global.url ? `Original Listing URL:` : null}</p>
              <p><a href={global.url} rel="nofollow" target="_blank">{global.url}</a></p>
          </div>

        </div>
  )
}