//Required:
//accept user inputs of a number, operator, and number
//accept decimal numbers
//store inputs
//recognize inputs and perform calculations
//return a result

//Optional:
//accept longer arithmetic operations
//display all input as it is being entered
//store prev total as start of next operation
//clear button should clear all entries
//should prevent invalid inputs (operator next to each other, two decimal points)




//click anywhere inside the container
const keys = document.querySelector('.calculator-buttons')
//object destructing
keys.addEventListener('click', event => {
    //desconstruct event and extract target
    //reach into event and extract the target property
    const { target } = event;
    //from target grab value property
    const { value } = target;
    if (!target.matches('button')) {  //check whether target is a button
        return;
    } else {
        calculator.parseInput(value)
        //console.log(target)

    }
})

const calculator = {
    displayText: '0',
    prevTotal: null,

    parseInput(value) {
        //have any of the "special buttons been clicked"
        switch (value) {
            case '=':
                //calculate the answer
                this.calcAnswer(this.displayText)
                break;
            case 'AC':
                //clear screen and store values
                this.clearAll()
                break;
            case '.':
                if (this.displayText == 0) {
                    //pass '0.' into add text method
                    this.addText('0.')
                } else {
                    //add value to text string
                    this.addText(value)
                }
                break;
            default:
                //add value to text string
                this.addText(value)
                break;
        }
    },

    addText(value) {
        if (this.displayText === '0') {
            this.displayText = ''
        }else if(this.prevTotal!==null){
            this.displayText=this.prevTotal
            this.prevTotal=null
        }

        //user has entered invalid sequence don't proceed
        //if the value we pass in and entire string is not number
        if (isNaN(+(value))&&isNaN(+(this.displayText))){
            if(isNaN(this.displayText.slice(-1))){
                return;
            }
        }
        this.displayText+=value
        //output display text to screen
        this.outputText(this.displayText)
    },

    outputText(text){
        document.querySelector('.calculator-screen').value=text
    },

    calcAnswer(equation){
    //    console.log(eval(equations))
    //safely
        let result=Function("return " + equation)()
        this.outputText(result)
    },

    clearAll(){
        this.displayText='0',
        this.prevTotal=null
        this.outputText(this.displayText)
    }
}