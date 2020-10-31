import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useEffect } from 'react';
import Results from '../components/Results'
import ResultsPDF from '../components/ResultsPDF'
import MapView from '../components/MapView';

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
          {global.logo ? <img src={URL.createObjectURL(global.logo)} height="130" onLoad={URL.revokeObjectURL(this)}/> : <img src="/RealyzerPrint1.png"/>}
            
            <h2 style={{width: "300px"}}>{global.address}</h2>
          </div>

          <div className={styles.flex_container}>
            <ResultsPDF />
            {/* <MapView /> */}
            {/* <Results /> */}
            <div className={styles.pdfImages}>
              <img src="../stock-images/home.png" alt="stock image"/>
              <img src="../stock-images/home2.png" alt="stock image"/>
              <img src="../stock-images/map.png" alt="stock image"/>
            </div>
          </div>

          <div className={styles.results_container}>
              <p>{global.url ? `Original Listing URL:` : null}</p>
              <p><a href={global.url} rel="nofollow" target="_blank">{global.url}</a></p>
          </div>

        </div>
  )
}