import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout';

export default function Glossary() {
  return (
    <Layout>
      <Head>
        <title>Glossary</title>
      </Head>

      <h1>Glossary, Terms, Definitions</h1>
      <p>Below, you'll find definitions for general key terms normally used in real estate investing:</p>
      <h3>Cash On Cash Return</h3>
      <p>Cash On Cash Return is the annual NOI (Net Operating Income) divided by the initial all-in cash down including the down payment, any closing costs, and any optional upfront repair costs.</p>

      <h3>Closing Costs</h3>
      <p>
        Every state has buying, selling closing costs. These are additional costs or fees such as loan origination, taxes to local municipalities,
        transfer taxes, inspection fees, filing fees, title fees, notary fees, and more. “Closing Costs” is a blanket statement/word. 
        Closing costs vary from state to state as each state follow their own customs. For instance, California's closing costs may vary 
        from Oregon's as they may follow different customs and laws.
      </p>
      <h3>Purchase Price</h3>
      <p>The initial property value price for the property. This price is most often displayed on online property listings as the "price tag" for the property.</p>
      {/* 
      
      Down Payment
      Interest Rate
      Length of Loan
      Mortgage
      Rental Income
      Property Taxes
      Insurance
      Upfront Repairs (Rehab Budget)
      Repairs & Maintenance (Ongoing)
      Vacancy Allowance
      Capital Expenditures (CapEx)
      Management Fees
      HOA Fees
      All-In Cash (Initial Investment)
      Net Operating Income (NOI, Net Cash Flow)
      Cash On Cash (CoC)
      */}

    </Layout>
  )
}