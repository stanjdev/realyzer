import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Results from '../components/Results'
import ResultsPDF from '../components/ResultsPDF'
import MapView from '../components/MapView';

export default function ResultsPage () {
  const global = useSelector(state => state.values)
  
  // // triggers print dialog to open automatically on mount
  // useEffect(() => {
    // window.print()
    // setTimeout(() => {
    //   const r = confirm("Click OK to print, or you can cancel.");
    //   r ? window.print() : null
    // }, 1000);
  // }, [])

  // useEffect(() => {
  //   console.log(global.imgs)
  // }, [global.imgs])

  return (
        <div className={styles.resultsPage}>
          <Head>
            <title>{`Realyzer Report for ${global.address}`}</title>
            <link rel="icon" href="/house.svg" />
            <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
          </Head>

          <div className={styles.flex}>
            {/* {global.logo ? <img src={URL.createObjectURL(global.logo)} height="130" onLoad={URL.revokeObjectURL(this)}/> : <img src="/RealyzerPrint1.png"/>} */}
            {global.logo ? <img src={global.logo} width="150" alt="realyzer rental property calculator logo"/> : <img src="/RealyzerPrint1.png" alt="realyzer rental property calculator logo"/>}
              
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
              {global.imgs ? global.imgs.map((image, i) => <img key={i} src={image} alt="rental property calculator property photos"/>) : <img src="../stock-images/home.png" alt="rental property calculator stock image"/>}
              {/* <img src="../stock-images/home.png" alt="stock image"/>
              <img src="../stock-images/home2.png" alt="stock image"/>
              <img src="../stock-images/map.png" alt="stock image"/> */}
              {global.uploadedPhotos ? global.uploadedPhotos.map((url, i) => <img src={url} key={i} alt="rental property calculator property photos"/> ) : null}
              {/* <MapView /> */}
            </div>
          </div>
          <MapView />

          <div className={styles.results_container}>
              <p>{global.url ? `Original Listing URL:` : null}</p>
              <p><Link href={!(/^[https?://]/i).test(global.url) ? `https://${global.url}` : global.url }><a target="_blank">{global.url}</a></Link></p>
          </div>

          <object data="/logo-main2.svg" type="image/svg+xml" width="150px" style={{padding: "1em 0em"}}></object>

        </div>
  )
}