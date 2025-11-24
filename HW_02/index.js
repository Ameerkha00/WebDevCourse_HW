document.addEventListener("DOMContentLoaded", () => {
    pageLoaded();
});

let txt1;
let txt2;
let btn;
let lblRes;
let op;

function pageLoaded() {
    txt1 = document.getElementById("txt1");
    txt2 = document.getElementById("txt2");
    btn = document.getElementById("btnCalc");
    lblRes = document.getElementById("lblRes");
    op = document.getElementById("operation");

    btn.addEventListener("click", calculate);

    // STEP 5: validation while typing
    txt1.addEventListener("input", validateInputs);
    txt2.addEventListener("input", validateInputs);
}

/* STEP 5 VALIDATION */
function validateInputs() {
    validateOne(txt1);
    validateOne(txt2);
}

function validateOne(input) {
    let value = input.value.trim();

    if (value === "") {
        input.classList.remove("is-valid", "is-invalid");
        return;
    }

    if (!isNaN(value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
}

/* CALCULATOR LOGIC */
function calculate() {
    let n1 = parseFloat(txt1.value);
    let n2 = parseFloat(txt2.value);

    if (isNaN(n1) || isNaN(n2)) {
        lblRes.innerText = "Invalid Input";
        print("Invalid input");
        return;
    }

    let result;
    let symbol;

    switch (op.value) {
        case "add": result = n1 + n2; symbol = "+"; break;
        case "sub": result = n1 - n2; symbol = "-"; break;
        case "mul": result = n1 * n2; symbol = "*"; break;
        case "div":
            if (n2 === 0) {
                lblRes.innerText = "Error";
                print("Division by zero");
                return;
            }
            result = n1 / n2; symbol = "/"; break;
    }

    lblRes.innerText = result.toFixed(2);
    print(`${n1} ${symbol} ${n2} = ${result.toFixed(2)}`);
}

/* PRINT TO LOGS */
function print(msg) {
    const ta = document.getElementById("output");
    ta.value += (ta.value ? "\n" : "") + msg;
}
