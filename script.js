

const operation = document.querySelectorAll('[data-operation]');
const number = document.querySelectorAll('[data-number]');
const clear = document.querySelector('[data-AC]');
const del = document.querySelector('[data-delete]');
const equal = document.querySelector('[data-equals]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
const sound = new Audio('clickCalculator.wav');


class Calculator{
    constructor(currentContent, previousContent){
        this.currentContent = currentContent;
        this.previousContent = previousContent;
        this.clear();
    }

   clear(){
        this.currentOperand = '';
        this.previousOperand= '';
        this.operation = undefined;
   }

   delete(){
        this.currentOperand = String(this.currentOperand).slice(0,-1);
   }

   addNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = String(this.currentOperand) + String(number);
   }

   addOperation(operation){
        this.operation = operation;
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.operate();
        }
        this.previousOperand = this.currentOperand + String(operation);
        this.currentOperand = '';
   }

   operate(){
        let computation;    

        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return ''
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                break;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
   }

   getLocalString(operand){
    let display;
    let stringNumber = String(operand);
        if(isNaN(parseFloat(stringNumber.split('.')[0]))){
             display = '';
        }else{
            display = parseFloat(stringNumber.split('.')[0]).toLocaleString('en', {maximumFractionDigits:0});
        }
        
        if(stringNumber.split('.')[1] != null){
            return `${display}.${stringNumber.split('.')[1]}`;
        }else{
            return display;
        }
    }

   updateDisplay(){
        this.currentContent.textContent = this.getLocalString(this.currentOperand) ;
        this.previousContent.textContent = this.previousOperand;
   }
}

const calculator = new Calculator(currentOperand,previousOperand);



number.forEach(item=>{
    item.onclick = () => {
        sound.play();
        calculator.addNumber(item.textContent);
        calculator.updateDisplay();
    }
})

operation.forEach(item=>{
    item.onclick = () => {
        sound.play();
        calculator.addOperation(item.textContent);
        calculator.updateDisplay();
    };
})


equal.onclick = () =>{
    sound.play();
    calculator.operate();
    calculator.updateDisplay();
}

console.log(del);
del.onclick = () =>{
    sound.play();
    calculator.clear();
    calculator.updateDisplay();
}

clear.onclick = () =>{
    sound.play();
    calculator.delete();
    calculator.updateDisplay();
}