import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout';
import util from '../styles/utils.module.css';

export default function ExampleDeal() {
  return (
    <Layout>
      <Head>
        <title>Example Deal Analysis</title>
        <script data-ad-client="ca-pub-2377465396084687" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>

      <div className="layoutBody">
        <h1>Example Deal Analysis</h1>
        <p>This is an example of how to use the Realyzer Rental Property Calculator to determine the Cash On Cash Return for a real estate rental property.</p>
        <p>Import data from Redfin, Zillow, Trulia, Realtor or anywhere else you can find the property listing, analyze the property and create a free PDF report of your property analysis. Built in custom mortgage calculator, and property tax rates estimated!</p>

        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/YppX0bXFMQ0" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen="true"
        >
        </iframe>

        <h4>For more on how it was made: <a href="https://stanjeong.vercel.app/projects/realyzer" target="_blank">Case Study</a></h4>
      </div>

    </Layout>
  )
}