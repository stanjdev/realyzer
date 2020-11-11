import Head from 'next/head';
import Link from 'next/link'
import { useEffect } from 'react';
import Layout from '../components/layout';

export default function Faq() {

  useEffect(() => {
    const questions = document.querySelectorAll(".question");
    questions.forEach(function(q) {
      q.addEventListener('click', function(e) {
        this.parentNode.children[1].classList.toggle('answer')
      })
    })
  }, [])


  return (
    <Layout>
      <Head>
        <title>FAQ</title>
      </Head>

      <h1>FAQ (Frequently Asked Questions)</h1>

      <div>
        <div className="questionCard">
          <div className="question">
            <h3>What are Closing Costs?</h3>
          </div>
          <div className="answer opened">
            <p>
              Every state has buying, selling closing costs. These are additional costs or fees such as loan origination, taxes to local municipalities,
              transfer taxes, inspection fees, filing fees, title fees, notary fees, and more. “Closing Costs” is a blanket statement/word. 
              Closing costs vary from state to state as each state follow their own customs. For instance, California's closing costs may vary 
              from Oregon's as they may follow different customs and laws.
            </p>
          </div>

        </div>


        {/* <div className="questionCard">
          <div className="question">

          </div>
          <div className="answer opened">
            
          </div>
        </div> */}

        
        <div className="questionCard">
          <div className="question">
            <h3>How are Closing Costs Calculated?</h3>
          </div>
          <div className="answer opened">
            <p>Also known as "settlement costs", <strong>Closing Costs</strong> are the fees you pay when obtaining the loan for your property purchase.</p>
            <p>Closing Costs are typically about 3-5% of your home's purchase price (although some people calculate based off the loan amount). These costs are usually paid at the closing of the deal.</p>
            <ul>
              <li>Examples of common closing costs include fees related to the record filing, real estate commissions, taxes to local municipalities, transfer taxes, insurances, and loan origination and underwriting of a mortgage.</li>  
              <li>Every state has their own different buying and selling closing costs. "Closing Costs" is a blanket statement that encompasses a variety of items such as inspection fees, filing fees, title transfer fees, and notary fees.</li> 
            </ul>
          </div>
        </div>

        <div className="questionCard">
          <div className="question">
            <h3>What is a Cap Rate?</h3>
          </div>
          <div className="answer opened">
            <p>Cap Rate is the ratio of the Net Operating Income (NOI) divided by the property value. It is a measure used to compare different real estate investments (it’s a good, quick measurement for comparison of similar assets and what they sold for).</p>
            <p>Cap Rate is used to determine the <strong>VALUE</strong> of the property, NOT the ROI (Return On Income). The Cap Rate often matters when you sell or buy a property, unless it is a case where you are paying all cash.</p>
            <h4>Examples:</h4>
            <p>A 7.5% cap rate and above may be a good measure to begin to spot a profitable deal. For example, if you bought a $400,000 property and it makes you $32,000/year NOI (Net Operating Income), the $32,000 NOI / $400,000 purchase price = 8% cap rate.</p>
            <p>“10 capped” means a 10% cap rate. For instance, if you bought a $1 million property with "10 cap", it would take you 10 years to pay it off ($1,000,000 multiplied by 0.10 equals $100,000. Ten payments of $100,000 every year, and the $1,000,000 property is paid off). Hypothetically, after the property is paid off, you continue to profit that $100,000 directly into your pocket because the property is fully paid off.</p>

            <h4>Good to Know:</h4>
            <ul>
              <li>Cap Rate does not involve any mortgage financing (principal, interest, etc.). Since you are using the entire value of the property in the calculation, this is before any loan or mortgage would be considered, because the Cap Rate is a quick ratio measurement of how much NOI you can potentially earn divided by the current value of the property.</li>
              <li>Net Operating Income (NOI) if AFTER every monthly expense is taken out from the gross income (management fees, HOA fees, etc.)</li>
            </ul>

          </div>
        </div>


        <div className="questionCard">
          <div className="question">
            <h3>What is a Mortgage?</h3>
          </div>
          <div className="answer opened">
            <p>A Mortgage is money borrowed from a bank or other lenders to help with purchasing a property. It is an agreement between the buyer and the lender giving the lender the right to seize the property as collateral if the buyer fails to repay the borrowed money, plus interest.</p>
          </div>
        </div>

        
        <div className="questionCard">
          <div className="question">
            <h3>How do you calculate the Mortgage numbers?</h3>
          </div>
          <div className="answer opened">
            <h1>Mortgage Calculation Formula</h1>
            <p>
              For the mortgage calculation, the key variables to keep track of were the Property Value, the user's Down Payment Percentage (e.g. 20% down), 
              the Interest Rate (e.g. 4%), and the Length of the Loan (e.g. 30 years). These numbers were then plugged into a complex mortgage calculation formula 
              to determine the user's monthly mortgage payment. The user then has the freedom to adjust the Down Payment and Interest Rate via range inputs
              to dynamically adjust the monthly payments.
            </p>

            <pre className="formulas">
              <code style={{fontSize: "1.25em"}}>
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


        <div className="questionCard">
          <div className="question">
            <h3>How do you calculate Cash-On-Cash?</h3>
          </div>
          <div className="answer opened">
            <p>Cash on Cash Return is calculated by dividing how much you are getting in return annually (NOI) by how much you initially put into the investment (All-In-Cash).</p>
            <p>The All-In-Cash would include your initial down payment, closing costs for the entire transaction, and any upfront repairs for property (if applicable).</p>
            <p>The Net Operating Income (NOI) would be your annual profit after subtracting items such as management fees, property taxes, insurance, monthly mortgage payments, and HOA fees from your annual gross rental income.</p>
            <p>Cash on Cash (CoC) is your Return on Investment (ROI) -- this tells you how much you make in return on the actual money you put into the investment.</p>
            
            <h4>Good to Know:</h4>
            <ul>
              <li>A Cash on Cash Return of 8-15% or higher is great to aim for. Anything below that may result in slow growth of wealth and a negative percentage will result in losing money.</li>
            </ul>
            
            <h4>Cash on Cash answers the question:</h4>
            <ul>
              <li>What percentage did your money earn from this property?</li>
              <li>How much of your money did you make back in profit after year one?</li>
              <li>How much in cash flow do you make from this property?</li>
            </ul>


          </div>
        </div>

        <div className="questionCard">
          <div className="question">
            <h3>What's the Difference Between Cash-On-Cash and Cap Rate?</h3>
          </div>
          <div className="answer opened">
            <ul>
              <li>Cash-On-Cash Return does not include the loan amount from the mortgage (borrowed money) you may have pulled out to pay down the house, if you did not buy the house entirely with your own cash. In most instances, buyers will put down a standard 20% down payment on the house, and pull out the remaining 80% mortgage loan to pay for the rest.</li>
              <li>Cash-On-Cash (CoC) for an all-cash purchase will be the same as the Cap Rate (because there would be no mortgage financing involved. No loan would be needed to pay for the property)</li>
              <li>Cash-On-Cash Returns do involve financing because the return itself is completely dependent on financing, so the mortgage cost must be included. This is unlike calculating Cap Rate, where no mortgage is considered because the entire value of the property is used for that calculation.</li>
            </ul>

          </div>
        </div>



      </div>

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