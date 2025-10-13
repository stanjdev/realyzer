import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout';
import util from '../styles/utils.module.css';

export default function HowToUse() {
  return (
    <Layout>
      <Head>
        <title>How To Use</title>
        <script data-ad-client="ca-pub-2377465396084687" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>

      <div className="layoutBody">
        <h1>How To Use</h1>
        <p>
          Realyzer was created for any level real estate investor, from the newbie investor to the experienced. This tool provides a simple and intuitive interface to input your data for any rental property.
        </p>
        <p><Link href="/example-deal">Click here</Link> for a video demonstration of the app</p>

        <div className={util.sectionSpacing}>
          <h1>Visual Walkthrough</h1>
          <img src="/gifs/realyzer-walkthrough.gif" style={{width:"100%"}} alt="realyzer rental property calculator walkthrough usage" />
          <figcaption>Walkthrough usage of the app</figcaption>
        </div>

        <div className={util.sectionSpacing}>
          <h1>Enter Property Address for Map and Property Tax Estimates:</h1>
          <img src="/gifs/realyzer-mapbox-geocoding.gif" style={{width:"100%"}} className="center" alt="rental property calculator mapbox geocoding address to coordinates feature"/>
          <figcaption>Enter an address and click "Search Address" to find the property on the map!</figcaption>
        </div>


        <div className={util.sectionSpacing}>
          <div className="readingWidth">
            <h1>Mortgage Calculation Formula</h1>
            <p>
              For the mortgage calculation, the key variables to keep track of were the Property Value, the user's Down Payment Percentage (e.g. 20% down), 
              the Interest Rate (e.g. 4%), and the Length of the Loan (e.g. 30 years). These numbers were then plugged into a complex mortgage calculation formula 
              to determine the user's monthly mortgage payment. The user then has the freedom to adjust the Down Payment and Interest Rate via range inputs
              to dynamically adjust the monthly payments.
            </p>

            <pre className="formulas">
              <code >
  {`  Mortgage calculation formula:
    M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1]
      P = The Principal loan amount
      r = Monthly Interest Rate
      n = Number of months required to repay the loan
  `}
              </code>
            </pre>
            <figure className="center">
              <img src="/gifs/realyzer-mortgage-calc.gif" className="center" width="100%" alt="rental property calculator simple mortgage calculator"/>
              <figcaption>Simple, Adjustable Mortgage Calculator</figcaption>
            </figure>
          </div>
        </div>

        <div className={util.sectionSpacing}>
          <div className="readingWidth">
            <h1>Final Results:</h1>
            <img src="/pdf-results/pdf1.png" style={{width: "100%"}} alt="Realyzer rental property calculator PDF page 1 cash on cash return net cash flow" className="caseStudyImage center"/>
            <img src="/pdf-results/pdf2.png" style={{width: "100%"}} alt="Realyzer rental property calculator PDF page 2 monthly expenses down payment closing costs" className="caseStudyImage center"/>
            <img src="/pdf-results/pdf3.png" style={{width: "100%"}} alt="Realyzer rental property calculator PDF page 3 mapbox api zillow redfin map marker" className="caseStudyImage center"/>
            <figcaption>Final result pages with your inputted data available to save as a PDF or print!</figcaption>
          </div>
        </div>

        <h4>For more on how it was made: <a href="https://stanjeong.vercel.app/projects/realyzer" target="_blank">Case Study</a></h4>
      </div>


    </Layout>
  )
}