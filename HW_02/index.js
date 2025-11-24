document.addEventListener("DOMContentLoaded", () => {
    pageLoaded();
});

let txt1;
let txt2;
let btn;
let lblRes;
let operationSelect;

function pageLoaded() 
{
    txt1 = document.getElementById("txt1");
    txt2 = document.getElementById("txt2");
    btn = document.getElementById("btnCalc");
    lblRes = document.getElementById("lblRes");
    operationSelect = document.getElementById("operation");

    btn.addEventListener("click", () => {
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
        case "add": res = num1 + num2; symbol = "+"; break;
        case "sub": res = num1 - num2; symbol = "-"; break;
        case "mul": res = num1 * num2; symbol = "*"; break;
        case "div":
            if (num2 === 0) {
                lblRes.innerText = "Error";
                print(`${num1} / ${num2} = Error`);
                return;
            }
            res = num1 / num2;
            symbol = "/";
            break;
    }

    lblRes.innerText = res.toFixed(2);

    print(`${num1} ${symbol} ${num2} = ${res.toFixed(2)}`);
}

function print(msg) {
    const ta = document.getElementById("output");
    ta.value += (ta.value ? "\n" : "") + msg;
}
