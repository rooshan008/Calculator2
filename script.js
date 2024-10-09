const resultElement = document.querySelector(".results")
const clearBtn = document.getElementById("clear-btn")
const deleteBtn = document.getElementById("delete-btn")
const divideBtn  = document.getElementById("divide-btn")
const multiplyBtn = document.getElementById("multiply-btn")
const minusBtn = document.getElementById("minus-btn")
const addBtn = document.getElementById("add-btn")
const decimalBtn = document.getElementById("decimal-btn")
const equalBtn = document.getElementById("equal-btn")
const numbersBtn = document.querySelectorAll(".number")


// initialize the variables
let result = ""
let operation = ""
let previousOperand = 0


// Function to update display
const updateDisplay = () => {
    if(operation){
        resultElement.innerHTML = `${previousOperand} ${operation} ${result}`
    }else{
        resultElement.innerHTML = result
    }

}

// Function to calculate results
const calculateResult = () => {
    let evaluatedResult 
    let prev = parseFloat(previousOperand)
    let current = parseFloat(result)

    if(isNaN(prev) && isNaN(current)) return

    switch (operation) {
        case '+':
            evaluatedResult = prev + current
            break;
        case '-':
            evaluatedResult = prev - current
            break;
        case '*':
            evaluatedResult = prev * current
            break;
        case '/':
            evaluatedResult = prev / current
            break;
    
        default:
            return;
    }

    result = evaluatedResult.toString()
    operation = ""
    previousOperand = ""
}

// Function to select operator
const selectOperator = (operatorValue) => {

    if(result === "") return
     if(operation !== "" && previousOperand !== ""){
        calculateResult()
     }
     operation = operatorValue
     previousOperand = result
     result = ""
     updateDisplay()
}

// Function to Append Number
const appendNumber = (number)  => {
    if(number === "." && result.includes(".")) return
   result += number
   updateDisplay()
}

// Adding Event listner to Number buttons
numbersBtn.forEach((button) =>{
    button.addEventListener("click", () => {
        appendNumber(button.innerText)
    })
})

decimalBtn.addEventListener("click",() => appendNumber("."))
divideBtn.addEventListener("click", () => selectOperator("/"))
multiplyBtn.addEventListener("click", () => selectOperator("*"))
minusBtn.addEventListener("click", () => selectOperator("-"))
addBtn.addEventListener("click", () => selectOperator("+"))


// adding evetn listner to equal btn
equalBtn.addEventListener("click", () => {

    calculateResult()
    updateDisplay()
})


// event listner to delete the number
deleteBtn.addEventListener("click", () =>{ 
    if(result){
      result =  result.slice(0,-1)
    }
    updateDisplay()
})


// Adding event listner to clear btn
clearBtn.addEventListener("click", () => {
    if(result === "")return

    result =""
    operation =""
    previousOperand = ""
    updateDisplay()
})