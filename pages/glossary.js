import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout';
import { useEffect } from 'react';

export default function Glossary() {

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
        <title>Glossary</title>
        <script data-ad-client="ca-pub-2377465396084687" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>

      <h1>Glossary, Terms, Definitions</h1>
      <p>Below, you'll find definitions for general key terms normally used in real estate investing:</p>

      <div className="questionCard">
        <div className="question">
          <h2>Cash On Cash Return</h2>
        </div>
        <div className="answer opened">
          <p>Cash On Cash Return is the annual NOI (Net Operating Income) divided by the initial all-in cash down including the down payment, any closing costs, and any optional upfront repair costs.</p>
        </div>
      </div>

      <div className="questionCard">
        <div className="question">
          <h2>Closing Costs</h2>
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
      
      <div className="questionCard">
        <div className="question">
          <h2>Down Payment</h2>
        </div>
        <div className="answer opened">
          <p>
            A Down Payment is a necessary upfront payment from a buyer looking to purchase an expensive or good large purchase. The payment represents a percentage of the entire purchase price. The remaining unpaid percentage of the full purchase price can be paid using a loan.
          </p>
          <p>
            Typically 20% down payment on a property purchase, where the remaining 80% of the property value is paid with the help of a mortgage loan. Down payment percentage vary depending on every situation and there are many different kinds of loans that require varying minimums of down payment percentages, such as FHA Loans, which require a minimum 3.5% down payment.
          </p>
        </div>
      </div>

      <div className="questionCard">
        <div className="question">
          <h2>HOA Fees</h2>
        </div>
        <div className="answer opened">
          <p>
            HOA (HomeOwners Association) Fees are monthly dues paid by owners of certain types of residential properties such as condominiums, townhouses (townhomes), or single-family homes in order to assist with maintenance and improvement of properties within the association. Common amenities and benefits gained from the collective HOA fees are community swimming pool maintenance, water/sewage, garbage, grounds maintenance and landscaping, internet/cable, and other community utilities.
          </p>
        </div>
      </div>
      
      <div className="questionCard">
        <div className="question">
          <h2>Management Fees</h2>
        </div>
        <div className="answer opened">
          <p>
            Management Fees are paid monthly to the property management company of your choice. Property management provides you the convenience of day-to-day management of your property, including communication with the tenants, rent collection and processing, coordinating repairs, responding to calls for emergency maintenance, and conducting annual property inspections.
          </p>
          <p>Property management companies are especially useful if you are not within close proximity of the property you own. You may want a reliable property management company to manage your property and be there in your stead.</p>
          <p>Property Management Fees may typically range from 8-12% of the monthly rental income your property generates.</p>
        </div>
      </div>

      <div className="questionCard">
        <div className="question">
          <h2>Mortgage</h2>
        </div>
        <div className="answer opened">
          <p>
            A Mortgage is money borrowed from a bank or other lenders to help with purchasing a property. It is an agreement between the buyer and the lender giving the lender the right to seize the property as collateral if the buyer fails to repay the borrowed money, plus interest.
          </p>
        </div>
      </div>

      <div className="questionCard">
        <div className="question">
          <h2>Purchase Price</h2>
        </div>
        <div className="answer opened">
          <p>The initial property value price for the property. This price is most often displayed on online property listings as the "price tag" for the property.</p>
        </div>
      </div>

      
      {/* 
      Interest Rate
      Length of Loan
      Rental Income
      Property Taxes
      Insurance
      Upfront Repairs (Rehab Budget)
      Repairs & Maintenance (Ongoing)
      Vacancy Allowance
      Capital Expenditures (CapEx)
      
      All-In Cash (Initial Investment)
      Net Operating Income (NOI, Net Cash Flow)
      */}

    </Layout>
  )
}