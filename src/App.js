import { useState } from "react";

function App() {

  const [calc, setCalc] = useState("");
  const [setResult] = useState("");

 
  const op = ["/", "*", "+", "-", "."];
  const updateCalc = (value) => {
    if(calc.includes("NaN")||calc.includes("infinity")){
      setCalc(value)
      return;
    }
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

    var value = calc.slice(0, -1);

    if(calc.includes("NaN") || calc.includes("infinity"))
    value = "";

    setCalc(value);
  }

  const calculate = () =>{
    setCalc(safeEval(calc).toString());
  }


  const solveSingle = (arr) =>{
    arr = arr.slice();
    while(arr.length-1){
      if(arr[1] === '*') arr[0] = arr[0] * arr[2]
      if(arr[1] === '-') arr[0] = arr[0] - arr[2]
      if(arr[1] === '+') arr[0] = +arr[0] + (+arr[2])
      if(arr[1] === '/') arr[0] = arr[0] / arr[2]
      arr.splice(1,1);
      arr.splice(1,1);
    }
    
   
      return arr[0];
   
   
  }

  const safeEval =(eq) =>{
    let res = eq.split(/(\+|-)/g).map(x => x.trim().split(/(\*|\/)/g).map(a => a.trim()));
    res = res.map(x => solveSingle(x)); //evaluating nested * and  / operations.
     
    return solveSingle(res) //at last evaluating + and -
    
  }
  
  return (
    <div className="App">
      <div className="calculator">
        <div className="bg_display">
        <div className="display">
    
    {calc || "0"}
  </div>
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
