import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [setResult] = useState("");

  const op = ["/", "*", "+", "-", "."];
  const updateCalc = (value) => {
    if (
      (op.includes(value) && calc === "") ||
      (op.includes(value) && op.includes(calc.slice(-1)))
    ) {
      return;
    }

   

    setCalc(calc + value);

    if (!op.includes(value)) {
      setResult(safeEval(calc + value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };
  
  const clear = () =>{
      setCalc("");

  }

  const deletelast = () => {
    if (calc ===''){
      return;
    }
    const value = calc.slice(0, -1);

    setCalc(value);
  }

  const calculate = () =>{
    setCalc(safeEval(calc).toString());
  }


  const safeEval = (expression) =>{
    const parts = expression.match(/^(\d+)([*/+-])(\d+)$/);
    if (parts) {
        var num1 = parseInt(parts[1])
        var operation= parts[2]
        var num2= parseInt(parts[3])

        switch (operation) {
          case '+':
            return num1 + num2;
          case '-':
            return num1 - num2;
          case '*':
            return num1 * num2;
          case '/':
            return num1 / num2;
          default:
            return undefined;
        }
    }
    
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
    
          {calc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={deletelast}>DEL</button>
          <button onClick={clear}>C</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
