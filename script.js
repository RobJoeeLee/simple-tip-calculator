const calculatorDisplay = document.querySelector(".calculator-display")
const tipDisplay = document.querySelector(".tip-display")
const totalWithTipDisplay = document.querySelector(".total-with-tip-display")
const numberButton = document.querySelectorAll(".number")
const decimalButton = document.querySelector(".decimal")
const clearButton = document.querySelector(".clear")
const tipButton = document.querySelectorAll(".tip-button")

let shouldResetDisplay = false
let shouldClearOnNextInput = false

function updateCalculatorDisplay(value){
    if(shouldClearOnNextInput){
        calculatorDisplay.textContent = value
        tipDisplay.textContent = "0"
        totalWithTipDisplay.textContent = "0"
        shouldClearOnNextInput = false
        return
    }

    if(calculatorDisplay.textContent.includes(".")){
        let [whole, decimal] = calculatorDisplay.textContent.split(".")
        if(decimal.length >= 2)return
    }

    calculatorDisplay.textContent = calculatorDisplay.textContent === "0" ? value: calculatorDisplay.textContent + value
}

numberButton.forEach(button => {
    button.addEventListener("click" , () => {
        updateCalculatorDisplay(button.dataset.number)
    })
})

decimalButton.addEventListener("click" , () => {
    if(shouldClearOnNextInput){
        calculatorDisplay.textContent = "0."
        tipDisplay.textContent = "0"
        totalWithTipDisplay.textContent = "0"
        shouldClearOnNextInput = false
        return
    }

    if(calculatorDisplay.textContent.includes("."))return
    if(calculatorDisplay.textContent === "0"){
        calculatorDisplay.textContent = "0."
        return
    }
    calculatorDisplay.textContent += "."
})

function finalizeDecimal() {
    if(calculatorDisplay.textContent.endsWith(".")){
        calculatorDisplay.textContent += "00"
    }
}

tipButton.forEach(button => {
    button.addEventListener("click" , () => {
        let billAmount = parseFloat(calculatorDisplay.textContent)
        if(isNaN(billAmount) || billAmount === "0")return

        let tipPercentage = parseFloat(button.dataset.percent) / 100
        let tipAmount = tipPercentage * billAmount
        let totalWithTip = tipAmount + billAmount

        tipDisplay.textContent = tipAmount.toFixed(2)
        totalWithTipDisplay.textContent = totalWithTip.toFixed(2)
        shouldClearOnNextInput = true
    })
})

clearButton.addEventListener("click" , () => {
    calculatorDisplay.textContent = "0"
    tipDisplay.textContent = "0"
    totalWithTipDisplay.textContent = "0"
    shouldClearOnNextInput = false
})