import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <script data-ad-client="ca-pub-2377465396084687" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>

      <div className="layoutBody">
        <blockquote>
          <em>
            "A rental property calculator / investment analytics tool helping real estate investors gain insights through property analysis, dynamically sourced tax rates, and a custom, comprehensive mortgage calculator"
          </em>
        </blockquote>

        <h1>About</h1>
        <p>Realyzer is a multi-variable calculator designed for real estate investors to analyze a property's profitability.</p>
        <p>
          Realyzer was created to help real estate investors and professionals analyze residential 
          and commercial properties, providing metrics in order to determine profitability. It analyzes 
          and assesses any given property's net operating income and cash-on-cash return based on the property's 
          value (the purchase price a.k.a. the home value), down payment, the potential rental income, and the 
          overall expenses of the property, including mortgage payments, property taxes, property insurance, and more.
        </p>
        <h1>Realyzer:</h1>
        <ul>
          <li>Provides a clean and simple-to-use interface that keeps you focused on gaining your insights</li>
          <li>Eliminates the need to visit external web sites and tools for property tax or mortgage calculations</li>
          <li>Provides you the option to save/print a clean and simple PDF report of your property analysis</li>
        </ul>

        <h4>For more information on how it was made: <a href="https://stanjeong.vercel.app/projects/realyzer" target="_blank">Case Study</a></h4>
      </div>

    </Layout>
  )
}