document.addEventListener("DOMContentLoaded", ()=>{

    pageLoaded();
    //..
});

let txt1;
let txt2;
let btn;
let lblRes;
let operationSelect;   // <--- added for step 1

function pageLoaded() 
{
    txt1 = document.getElementById("txt1");
    txt2 = document.querySelector("#txt2");
    btn = document.getElementById("btnCalc");
    lblRes = document.getElementById("lblRes");

    // Get reference to dropdown (step 1)
    operationSelect = document.getElementById("operation");

    btn.addEventListener("click", ()=>{
        calculate();
    });
}

function calculate()
{
    let num1 = parseFloat(txt1.value);
    let num2 = parseFloat(txt2.value);

    if (isNaN(num1) || isNaN(num2)) {
        lblRes.innerText = "Invalid Input";
        print("Invalid Input");
        return;
    }

    let symbol = "";
    let res;

    switch (operationSelect.value) {
        case "add": 
            res = num1 + num2; 
            symbol = "+"; 
            break;
        case "sub": 
            res = num1 - num2; 
            symbol = "-"; 
            break;
        case "mul": 
            res = num1 * num2; 
            symbol = "*"; 
            break;
        case "div":
            if (num2 === 0) {
                lblRes.innerText = "Error";
                print(num1 + " / " + num2 + " = Error");
                return;
            }
            res = num1 / num2;
            symbol = "/";
            break;
    }

    // Show result above
    lblRes.innerText = res.toFixed(2);

    // Add to log (textarea)
    print(`${num1} ${symbol} ${num2} = ${res.toFixed(2)}`);
}




const btn2 = document.getElementById("btn2");
btn2.addEventListener("click", ()=>{
    print("btn2 clickled:"+ btn2.id+ "|"+ btn2.innerText);
});

//btn2.addEventListener("click", func1);

//function func1() 
//{

//}
function print(msg) {

    const ta = document.getElementById("output");

    if (ta) {
        ta.value += (ta.value ? "\n" : "") + msg;
    } 
    else {
        console.log(msg);
    }
}


// =============================================
// STEP 1: JS NATIVE TYPES, USEFUL TYPES & OPERATIONS
// =============================================
function demoNative() {
    let out = "=== STEP 1: NATIVE TYPES ===\n";

    // String
    const s = "Hello World";
    out += "\n[String] s = " + s;
    out += "\nLength: " + s.length;
    out += "\nUpper: " + s.toUpperCase();

    // Number
    const n = 42;
    out += "\n\n[Number] n = " + n;

    // Boolean
    const b = true;
    out += "\n\n[Boolean] b = " + b;

    // Date
    const d = new Date();
    out += "\n\n[Date] now = " + d.toISOString();

    // Array
    const arr = [1, 2, 3, 4];
    out += "\n\n[Array] arr = [" + arr.join(", ") + "]";
    out += "\nPush 5 → " + (arr.push(5), arr.join(", "));
    out += "\nMap x2 → " + arr.map(x=>x*2).join(", ");

    // Functions as variables
    const add = function(a,b){ return a+b; };
    out += "\n\n[Function as variable] add(3,4) = " + add(3,4);

    // Callback
    function calc(a,b,fn){ return fn(a,b); }
    const result = calc(10,20,(x,y)=>x+y);
    out += "\n[Callback] calc(10,20, x+y ) = " + result;

    //--Print to log/output
    print(out);
}
