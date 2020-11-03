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

  useEffect(() => {
    console.log(global.imgs)
  }, [global.imgs])

  return (
        <div className={styles.resultsPage}>
          <Head>
            <title>{`Realyzer Report for ${global.address}`}</title>
            <link rel="icon" href="/house.svg" />
          </Head>

          <div className={styles.flex}>
            {/* {global.logo ? <img src={URL.createObjectURL(global.logo)} height="130" onLoad={URL.revokeObjectURL(this)}/> : <img src="/RealyzerPrint1.png"/>} */}
            {global.logo ? <img src={global.logo} height="120"/> : <img src="/RealyzerPrint1.png"/>}
              
            <h4 style={{width: "300px", fontSize: "1.7em", color: "black"}}>{global.address}</h4>
          </div>
{/* 
.resultsPDF h4 {
  font-size: 1.7em;
}
*/}
          <div className={styles.flex_resultsContainer}>
            <ResultsPDF />
            {/* <Results /> */}
            <div className={styles.pdfImages}>
              {global.imgs ? global.imgs.slice(0, 3).map((image, i) => <img key={i} src={image} alt={image}/>) : <img src="../stock-images/home.png" alt="stock image"/>}
              {/* <img src="../stock-images/home.png" alt="stock image"/>
              <img src="../stock-images/home2.png" alt="stock image"/>
              <img src="../stock-images/map.png" alt="stock image"/> */}
              {global.uploadedPhotos ? global.uploadedPhotos.map((url, i) => <img src={url} key={i}/> ) : null}
              <MapView />
            </div>
          </div>

          <div className={styles.results_container}>
              <p>{global.url ? `Original Listing URL:` : null}</p>
              <p><a href={global.url} rel="nofollow" target="_blank">{global.url}</a></p>
          </div>

          <object data="/logo-main2.svg" type="image/svg+xml" width="200px"></object>

        </div>
  )
}