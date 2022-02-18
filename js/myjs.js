var currentTipRate = 0;
var currentBill = 0;
var currentPersonCount=0;
var tipPerPersonElem, totalPerPersonElem;
var billAmountElem,billAmountErrorElem, btnElems, customTiprateElem,tiprateErrorElem, personCountElem, personCountErrorElem, resetBtnElem;

document.addEventListener("DOMContentLoaded", function(event) {
  billAmountElem = document.getElementById("bill-amount");
  billAmountErrorElem = document.getElementById("bill-error");

  btnElems = document.getElementsByClassName("btn");
  customTiprateElem = document.getElementById("custom-tiprate");
  tiprateErrorElem = document.getElementById("tiprate-error");

  personCountElem = document.getElementById("person-count");
  personCountErrorElem = document.getElementById("person-count-error");
  resetBtnElem = document.getElementById("reset-btn");


  tipPerPersonElem=document.getElementById("tip-per-person");
  totalPerPersonElem=document.getElementById("total-per-person");

  console.log(btnElems);

  for (btnElem of btnElems) {
    btnElem.addEventListener("click", updateRate);
  }
  customTiprateElem.addEventListener("keyup", function(e){updateRate(e,tiprateErrorElem)});
  billAmountElem.addEventListener("keyup", function(e){updateBillAmount(e,billAmountErrorElem)});
  personCountElem.addEventListener("keyup", function(e){updatePersonCount(e,personCountErrorElem)});

  resetBtnElem.addEventListener("click", reset);
  // btnElems.forEach(function(){addEventListener("click", updateRate);});
});

function reset(){
  billAmountElem.value="";
  customTiprateElem.value="";
  for (btnElem of btnElems) {
    btnElem.classList.remove("selected-btn");
  }
  personCountElem.value="";
  billAmountErrorElem.classList.add("invisible");
  tiprateErrorElem.classList.add("invisible");
  personCountErrorElem.classList.add("invisible");
  personCountElem.classList.remove("error-border");
  currentTipRate = 0;
  currentBill = 0;
  currentPersonCount=0;
  calculateResult();
}

function updateBillAmount(e, errorElem) {
  console.log(e,errorElem);
  allowNumberOnly(e, errorElem)
  currentBill = e.target.value;
  calculateResult();
  console.log("Bill : ",currentBill);
}

function updatePersonCount(e, errorElem) {
  console.log(e, errorElem);
  allowNumberOnly(e, errorElem)
  let floatReg=/\./;
  if (floatReg.test(e.target.value)){
    applyError(e.target,errorElem,"Can't be fraction")
    e.target.value=parseFloat(e.target.value).toFixed(0);
  }
  if (parseFloat(e.target.value)==0 || e.target.value=="" ){
    e.target.classList.add("error-border");
    applyError(e.target,errorElem,"Can't be zero")
  }
  currentPersonCount = e.target.value;
  calculateResult();
  console.log(currentTipRate);
}

function updateRate(e, errorElem) {
  allowNumberOnly(e, errorElem)
  // remove css selected properties on buttons
  for (btnElem of btnElems) {
    btnElem.classList.remove("selected-btn");
  }
  // Add selected css property if a button is selected
  if(e.target.classList.contains("btn")){
    e.target.classList.add("selected-btn");
    customTiprateElem.value="";
  }
  currentTipRate = e.target.value.replace("%", "");
  calculateResult();
  console.log(currentTipRate);
}

function calculateResult(){
  if(currentTipRate=="" && currentBill=="" && currentPersonCount==""){
    resetBtnElem.classList.add("inactive")
  }
  else{
    resetBtnElem.classList.remove("inactive")

  }
  if(currentTipRate>0 && currentBill>0 && currentPersonCount>0){
    let totalTip=currentBill*currentTipRate/100;
    let totalBill=parseFloat(currentBill)+totalTip;
    console.log(totalTip, totalBill, tipPerPersonElem)
    tipPerPersonElem.innerText="$"+(totalTip/currentPersonCount).toFixed(2);
    totalPerPersonElem.innerText="$"+(totalBill/currentPersonCount).toFixed(2);
  }
  else{
    tipPerPersonElem.innerText="$0";
    totalPerPersonElem.innerText="$0";
  }
}


function allowNumberOnly(e, errorElem){
  numberReg=/^[\d\.]*$/;
  console.log(numberReg.test(e.target.value));
  if (e.type == "keyup") {
    e.target.classList.remove("error-border");
    errorElem.classList.add("invisible");
    if (!numberReg.test(e.target.value) && e.target.hasOwnProperty("oldValue")) {
      e.target.value = e.target.oldValue;
      applyError(e.target,errorElem,"Only numerics allowed")
    } else if (numberReg.test(e.target.value)) {
      e.target.oldValue = e.target.value;

    } else {
      e.target.value = "";

    }
  }
}

function applyError(target,errorTarget,errorText){

  errorTarget.innerText=errorText;
  errorTarget.classList.remove("invisible");
}
