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
        <script data-ad-client="ca-pub-2377465396084687" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>

      <h1>FAQ (Frequently Asked Questions)</h1>

      <div>
        <div className="questionCard">
          <div className="question">
            <h2>What are Closing Costs?</h2>
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
            <h2>How are Closing Costs Calculated?</h2>
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
            <h2>What is a Cap Rate?</h2>
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
            <h2>What is a Mortgage?</h2>
          </div>
          <div className="answer opened">
            <p>A Mortgage is money borrowed from a bank or other lenders to help with purchasing a property. It is an agreement between the buyer and the lender giving the lender the right to seize the property as collateral if the buyer fails to repay the borrowed money, plus interest.</p>
          </div>
        </div>

        
        <div className="questionCard">
          <div className="question">
            <h2>How do you calculate the Mortgage numbers?</h2>
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
            <h2>How do you calculate Cash-On-Cash?</h2>
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
            <h2>What's the Difference Between Cash-On-Cash and Cap Rate?</h2>
          </div>
          <div className="answer opened">
            <ul>
              <li>Cash-On-Cash Return does not include the loan amount from the mortgage (borrowed money) you may have pulled out to pay down the house, if you did not buy the house entirely with your own cash. In most instances, buyers will put down a standard 20% down payment on the house, and pull out the remaining 80% mortgage loan to pay for the rest.</li>
              <li>Cash-On-Cash (CoC) for an all-cash purchase will be the same as the Cap Rate (because there would be no mortgage financing involved. No loan would be needed to pay for the property)</li>
              <li>Cash-On-Cash Returns do involve financing because the return itself is completely dependent on financing, so the mortgage cost must be included. This is unlike calculating Cap Rate, where no mortgage is considered because the entire value of the property is used for that calculation.</li>
            </ul>
          </div>
        </div>

        <div className="questionCard">
          <div className="question">
            <h2>How do you calculate Property Taxes?</h2>
          </div>
          <div className="answer opened">
            <p>Realyzer sources Property Tax rates from <a href="https://wallethub.com/edu/states-with-the-highest-and-lowest-property-taxes/11585" target="_blank">WalletHub</a>, which aggregates its data from the <a href="https://www.census.gov/en.html" target="_blank">U.S. Census Bureau</a>. Realyzer automatically determines an estimated property tax rate based off of the user-inputted property address, which includes the state of the property.</p>
            <p>Other areas to search for property tax information details of current and historical tax records can be found the website of your County Assessor, and the nonprofit policy research firm, <a href="https://taxfoundation.org/" target="_blank">Tax Foundation</a>.</p>
            <p>
              Property Tax rates vary widely depending on the state and the county. Certain states use a specific percentage rate of the property's assessed value, while other states use a <a href="https://www.investopedia.com/terms/m/millrate.asp" target="_blank">Mill Rate</a> system to determine property taxes.
            </p>
            <p>Hawaii has been known to have the lowest tax rates in the country in the past years, as opposed to New Jersey, a state with the highest property tax rates in the past years.</p>
          </div>
        </div>

        <div className="questionCard">
          <div className="question">
            <h2>
              Are HOA Fees worth it?
            </h2>
          </div>
          <div className="answer opened">
            <p>
              In certain types of residential properties such as condominiums, townhouses (townhomes), or single-family homes, the owner of the property must pay monthly HomeOwners Association Fees (HOA Fees) just as every other owner in the community. 
              These fees are due in order to assist with maintenance and improvement of properties within the community. Common amenities and benefits to homeowners from the collective HOA fees are community utilities such as community swimming pool maintenance, water/sewage/plumbing, garbage disposal, grounds-keeping maintenance and landscaping, internet/cable, and other common utilities. 
            </p>
            <p>Certain homeowners may prefer to have the community well maintained, and to have access to community utilities and resources such as garbage disposal and water services, community gates, fencing, and security, and internet/cable services, just to name a few.</p>
            <p>Other homeowners that are against HOAs may prefer independence and less strict rules and regulations placed on their property, which gives them more freedom to do whatever they wish with their property, unabiding to community norms and policies.</p>
            <p>It is highly advised to conduct your own research on the specific HOA rules and regulations that may come along with the property. It is also advised to contact local Real Estate Agents who may have more knowledge of the specific property you are researching.</p>
          </div>
        </div>

        <div className="questionCard">
          <div className="question">
            <h2>
              How do I print out the PDF report?
            </h2>
          </div>
          <div className="answer opened">
            <p>
              After filling in all of the necessary inputs with the details of the property and 
              clicking "Print Results" on the bottom of the main home screen, your report will 
              be generated in to a plain canvas view. From that "results" page, you can use your browser's 
              "Print" dialog function which can be accessed on most browsers by pressing (Command + P) on your Mac 
              keyboard, or (Control + P) on your Windows keyboard. From the print dialog, you can print the actual report or Save as a PDF.
            </p>
          </div>
        </div>

      </div>

      {/* 
      Down Payment
      Interest Rate - GB: - the tool itself, interest rates saying "typically 3-4%" is not accurate. in this economy yes, but in our lifetime even its been as high as 8-9%. It varies and is always changing. I would mention that the 3-4% is based on 2020 averages or something.
      Length of Loan
      Rental Income
      Property Taxes
      Insurance - GB: insurance, might be good to do this as an average based on the state too, similar to property taxes. or mention that it might go up/down based on what insurances are required in that state/county. (for example, LA might require earthquake insurance, florida might have flood insurance, oklahoma might have tornado insurance, etc.)
      Upfront Repairs (Rehab Budget)
      Repairs & Maintenance (Ongoing)
      Vacancy Allowance
      Capital Expenditures (CapEx)
      Management Fees
      All-In Cash (Initial Investment)
      Net Operating Income (NOI, Net Cash Flow)
      */}

    </Layout>
  )
}