import { useState } from "react";

function App() {
  const [inputValues, setInputValues] = useState({
    name: "JANE APPLESEED",
    number: "0000 0000 0000 0000",
    month: "00",
    year: "00",
    cvc: "000",
  });

  const [invalidated, setInvalidated] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [calculated, setCalculated] = useState(false);

  return (
    <>
      <main>
        <h1 class="sr-only">Card details form</h1>
        <aside>
          <div className="card-container">
            <img
              className="card-img"
              src="/assets/bg-card-front.png"
              alt="front side of a card"
            />
            <div className="card-info card-info-upper">
              <img className="card-logo" src="/assets/card-logo.svg" />
              <div className="card-number">{inputValues.number}</div>
              <div>
                <div className="card-name">{inputValues.name}</div>
                <div className="card-date">
                  {inputValues.month && inputValues.year
                    ? inputValues.month + "/" + inputValues.year
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="card-container lower-card">
            <img
              className="card-img"
              src="/assets/bg-card-back.png"
              alt="back side of a card"
            />
            <div className="card-info card-info-lower">
              <div className="card-cvc">{inputValues.cvc}</div>
            </div>
          </div>
        </aside>
        <section>
          {!calculated ? (
            <form>
              <div className="input-container">
                <div
                  style={invalidated.name ? { color: "var(--red)" } : {}}
                  className="input-label"
                >
                  Cardholder name
                </div>
                <input
                  onChange={async (e) => {
                    await setInputValues((oldInputValues) => ({
                      ...oldInputValues,
                      name: e.target.value,
                    }));
                    await setInvalidated((oldInvalidated) => ({
                      ...oldInvalidated,
                      name: "",
                    }));
                  }}
                  style={
                    invalidated.name ? { border: "1px solid var(--red)" } : {}
                  }
                  value={inputValues.name}
                  maxLength="20"
                  placeholder="e.g. Jane Appleseed"
                  type="text"
                />
                {invalidated.name && (
                  <div className="invalidated-message">{invalidated.name}</div>
                )}
              </div>
              <div className="input-container">
                <div
                  style={invalidated.number ? { color: "var(--red)" } : {}}
                  className="input-label"
                >
                  Card number
                </div>
                <input
                  onChange={async (e) => {
                    const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
                    const splits = inputVal.match(/.{1,4}/g);

                    let spacedNumber = "";
                    if (splits) {
                      spacedNumber = splits.join(" "); // Join all the splits with an empty space
                    }

                    await setInputValues((oldInputValues) => ({
                      ...oldInputValues,
                      number: spacedNumber.toUpperCase(),
                    }));
                    await setInvalidated((oldInvalidated) => ({
                      ...oldInvalidated,
                      number: "",
                    }));
                  }}
                  style={
                    invalidated.number ? { border: "1px solid var(--red)" } : {}
                  }
                  value={inputValues.number}
                  maxLength="19"
                  placeholder="e.g. 1234 5678 9123 0000"
                  type="text"
                />
                {invalidated.number && (
                  <div className="invalidated-message">
                    {invalidated.number}
                  </div>
                )}
              </div>

              <div className="bottom-inputs">
                <div
                  style={
                    invalidated.month || invalidated.year
                      ? { color: "var(--red)" }
                      : {}
                  }
                  className="input-label"
                >
                  Exp. date (MM/YY)
                </div>
                <div
                  style={invalidated.cvc ? { color: "var(--red)" } : {}}
                  className="input-label"
                >
                  CVC
                </div>
                <div className="input-container bottom-input-1">
                  <input
                    onChange={async (e) => {
                      await setInputValues((oldInputValues) => ({
                        ...oldInputValues,
                        month: e.target.value,
                      }));
                      await setInvalidated((oldInvalidated) => ({
                        ...oldInvalidated,
                        month: "",
                      }));
                    }}
                    style={
                      invalidated.month
                        ? { border: "1px solid var(--red)" }
                        : {}
                    }
                    value={inputValues.month}
                    maxLength="2"
                    placeholder="MM"
                    type="text"
                  />
                  {invalidated.month && (
                    <div className="invalidated-message">
                      {invalidated.month}
                    </div>
                  )}
                </div>
                <div className="input-container bottom-input-2">
                  <input
                    onChange={async (e) => {
                      await setInputValues((oldInputValues) => ({
                        ...oldInputValues,
                        year: e.target.value,
                      }));
                      await setInvalidated((oldInvalidated) => ({
                        ...oldInvalidated,
                        year: "",
                      }));
                    }}
                    style={
                      invalidated.year ? { border: "1px solid var(--red)" } : {}
                    }
                    value={inputValues.year}
                    maxLength="2"
                    placeholder="YY"
                    type="text"
                  />
                  {invalidated.year && (
                    <div className="invalidated-message">
                      {invalidated.year}
                    </div>
                  )}
                </div>
                <div className="input-container bottom-input-3">
                  <input
                    onChange={async (e) => {
                      await setInputValues((oldInputValues) => ({
                        ...oldInputValues,
                        cvc: e.target.value,
                      }));
                      await setInvalidated((oldInvalidated) => ({
                        ...oldInvalidated,
                        cvc: "",
                      }));
                    }}
                    style={
                      invalidated.cvc ? { border: "1px solid var(--red)" } : {}
                    }
                    value={inputValues.cvc}
                    maxLength="3"
                    placeholder="e.g. 123"
                    type="text"
                  />
                  {invalidated.cvc && (
                    <div className="invalidated-message">{invalidated.cvc}</div>
                  )}
                </div>
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  let newInvalidated = {
                    name: "",
                    number: "",
                    month: "",
                    year: "",
                    cvc: "",
                  };
                  if (
                    !inputValues.month ||
                    /[a-zA-Z]/g.test(inputValues.month) ||
                    !inputValues.year ||
                    /[a-zA-Z]/g.test(inputValues.year) ||
                    !inputValues.name ||
                    !inputValues.number ||
                    !inputValues.cvc ||
                    /[a-zA-Z]/g.test(inputValues.cvc) ||
                    /[a-zA-Z]/g.test(inputValues.number) ||
                    inputValues.month > 12
                  ) {
                    newInvalidated.month = !inputValues.month
                      ? "Can't be blank"
                      : inputValues.month > 12 ||
                        /[a-zA-Z]/g.test(inputValues.month)
                      ? "Must be a valid month"
                      : "";
                    newInvalidated.year = !inputValues.year
                      ? "Can't be blank"
                      : /[a-zA-Z]/g.test(inputValues.year)
                      ? "Must be a valid year"
                      : "";
                    newInvalidated.name = !inputValues.name
                      ? "Can't be blank"
                      : "";
                    newInvalidated.number = !inputValues.number
                      ? "Can't be blank"
                      : /[a-zA-Z]/g.test(inputValues.number)
                      ? "Wrong format, numbers only"
                      : "";

                    newInvalidated.cvc = !inputValues.cvc
                      ? "Can't be blank"
                      : /[a-zA-Z]/g.test(inputValues.cvc)
                      ? "Must be a valid cvc"
                      : "";
                    await setInvalidated(newInvalidated);
                  } else {
                    await setCalculated(true);
                  }
                }}
              >
                Confirm
              </button>
            </form>
          ) : (
            <div className="complete-container">
              <img src="/assets/icon-complete.svg" />
              <h1>Thank you!</h1>
              <div>We've added your card details</div>
              <button>Continue</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
