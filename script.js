const calculatorDisplay = document.querySelector(".calculator-display")
const tipDisplay = document.querySelector(".tip-display")
const totalWithTipDisplay = document.querySelector(".total-with-tip-display")
const numberButton = document.querySelectorAll(".number")
const decimalButton = document.querySelector(".decimal")
const clearButton = document.querySelector(".clear")
const tipButton = document.querySelectorAll(".tip-button")

let shouldResetDisplay = false

function updateDisplay(value) {
    if (shouldResetDisplay){
        calculatorDisplay.textContent = value
        shouldResetDisplay = false
        return
    }
    if (calculatorDisplay.textContent.includes(".")){
        let [whole, decimal] = calculatorDisplay.textContent.split(".")
        if(decimal.length >= 2)return
    }
    calculatorDisplay.textContent = calculatorDisplay.textContent === "0" ? value: calculatorDisplay.textContent + value
}