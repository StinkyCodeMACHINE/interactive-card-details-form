import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <aside>
          {/* <div className="card card-front"></div> */}
          {/* <div className="card card-back"></div> */}
          <div className="card-container">
            <img className="card-img" src="/assets/bg-card-front.png" alt="" />
            <div className="card-info card-info-upper">
              <img src="/assets/card-logo.svg" />
            </div>
          </div>
          <div className="card-container lower-card">
            <img className="card-img" src="/assets/bg-card-back.png" alt="" />
            <div className="card-info card-info-lower">
              <div className="card-cvc">000</div>
            </div>
          </div>
        </aside>
        <section>
          <form>
            <div className="input-label">Cardholder name</div>
            <input placeholder="e.g. Jane Appleseed" type="text" />
            <div className="input-label">Card number</div>
            <input placeholder="e.g. 1234 5678 9123 0000" type="text" />
            <div className="bottom-inputs">
              <div className="input-label">Exp. date (MM/YY)</div>
              <div className="input-label">CVC</div>
              <input placeholder="MM" type="text" />
              <input placeholder="YY" type="text" />
              <input placeholder="e.g. 123" type="text" />
            </div>
            <button>Confirm</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
