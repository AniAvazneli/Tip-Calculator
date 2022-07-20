// catch html elements
const billAmount = document.getElementById("billAmount");
const splitAmount = document.getElementsByClassName("tipPerCent");
const splitAmountNumber = document.getElementById("tipAmountNumber");
const servants = document.getElementById("servants");
const reset = document.getElementById('reset');
const inputErrorAlarm = document.getElementById('servantsErrorText')
const servantsErrorElement = document.getElementsByClassName('servantsErrorText')[0];

// variables for calculation
let inputBillValue = "";
let splitAmountValue = "";
let servantsValue = "";
let catchedError = false;

// catches bill written amount 
billAmount.addEventListener('focusout', function () { 
    inputBillValue = billAmount.value; 
})

// catches per cent
for (let i = 0; i < splitAmount.length; i++) {
    splitAmount[i].addEventListener('click', function () {
        splitAmountValue = splitAmount[i].value;
    })
}

// catches customed split amount
splitAmountNumber.addEventListener('focusout', function () { 
    splitAmountValue = splitAmountNumber.value;
})


// catches number of servants
servants.addEventListener('focusout', function () {
    servantsValue = servants.value;
    if(validate(inputBillValue, splitAmountValue, servantsValue)){
        calculateTip();
            if(catchedError){
                servantsErrorElement.innerHTML = '';
                servants.classList.remove('error');
                catchedError = false;
            }
    }else{
        catchedError = true;
    }
})

// calculation Tip per person and Total
function calculateTip() {
    let totalTipPerCent = inputBillValue / 100 * splitAmountValue;
    let total = Number(totalTipPerCent) + Number(inputBillValue);
    let tipAmount = totalTipPerCent / servantsValue;
    document.getElementById('tipamount1').innerHTML = tipAmount;
    document.getElementById('totalAmount1').innerHTML = total;
}

// function to catch if every element is valid if not shows error
function validate(inputBillValue, splitAmountValue, servantsValue){
    if (inputBillValue == '' || inputBillValue <= '0' || splitAmountValue == '' || servantsValue == '')
        return false;
    if ( servantsValue <= '0'){
        servants.classList.add('error');
        servantsErrorElement.innerHTML = 'can\'t be zero';
       return false
    }
    return true
}

// catches reset click 
reset.addEventListener('click', reset_values);

function reset_values() {
    splitAmount.value = '';
    splitAmountNumber.value = '';
    billAmount.value = 0;
    servants.value = 0;
    document.getElementById('tipamount1').innerHTML = "0.00";
    document.getElementById('totalAmount1').innerHTML = "0.00";
}








