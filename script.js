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

numberButton.forEach(button => {
    button.addEventListener("click" , () => {
        updateDisplay(button.dataset.number)
    })
})

decimalButton.addEventListener("click" , () => {
    if(calculatorDisplay.textContent.includes("."))return
    if(calculatorDisplay.textContent === "0"){
        calculatorDisplay.textContent = "0."
        return
    }
    calculatorDisplay.textContent += "."
})

clearButton.addEventListener("click" , () => {
    calculatorDisplay.textContent = "0"
})

function finalizeDecimal() {
    if(calculatorDisplay.textContent.endsWith(".")){
        calculatorDisplay.textContent += "00"
    }
}

tipButton.forEach(button => {
    button.addEventListener("click" , () => {
        billAmount = parseFloat(calculatorDisplay.textContent)
        if(isNaN(billAmount) || billAmount === 0)return

        let tipPercentage = parseFloat(button.dataset.percent) / 100
        let tipAmount = billAmount * tipPercentage
        let totalWithTip = billAmount + tipAmount

        tipDisplay.textContent = tipAmount.toFixed(2)
        totalWithTipDisplay.textContent = totalWithTip.toFixed(2)
    })
})