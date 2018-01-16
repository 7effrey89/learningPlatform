// ============= Star Controls ============= 
var wordDisplay = document.getElementById("numberToGuess");
var autoSwitch = document.getElementById("autoSpeakSwitch");
var rangeSlider = document.getElementById('numberSlider');
var maxNumLbl = document.getElementById('maxNumLbl');
var maxNumLbl_ordinaryMax = document.getElementById('maxNumLbl_ordinaryMax');

// ============= End Controls ============= 

// ============= Start Global Variables============= 
var autoSpeakMode;
var numberMaxRange;
var currentTrainingMode;

// ============= End Global Variables============= 

// ============= Start Settings ============= 
var maxNumberSuppByOrdinaryNum = 100;
var maxNumberSuppByOrdinaryWarningTxt = "Max number reduced to: " + maxNumberSuppByOrdinaryNum + ". Higher numbers not supported.";
var toastTimeout = 7500;

var trainingMode = {
    NUMERIC: 1,
    ORDINARY: 2,
    YEAR: 3,
    properties: {
      1: {name: "numeric numbers", value: 1, code: "num"},
      2: {name: "ordinary numbers", value: 2, code: "ord"},
      3: {name: "year number", value: 3, code: "year"}
    }
  };
/** How to use:
* var mySize = trainingMode.ORDINARY;
* var myCode = trainingMode.properties[mySize].code; // myCode == "ord"
*/
// ============= End Settings ============= 


// ============= Start On pageload ============= 

//load default values to variables
currentTrainingMode = trainingMode.NUMERIC;
numberMaxRange = rangeSlider.value; //Load the default max range number
autoSpeakMode = true;   //Load the default auto prononcition mode
wordDisplay.innerHTML = randomNumberGenerator();    //load random number on pageload

//Eventlisteners for the pronounciation settings-dialog-box (dialog-numberSettings),
//starting after dialog-box shown (postshow)
document.addEventListener("postshow", function(event) {
    if (event.target.id == "dialog-numberSettings") {

        //add eventlistner to the switch for auto pronounciation
        autoSwitch.addEventListener('change', function(e) {
            //console.log('click', e);
            //ons.notification.alert('Value is ' + autoSwitch.checked);
            autoSpeakMode = autoSwitch.checked;
        });

        //add eventlistner to the switch for auto pronounciation
        rangeSlider.addEventListener('change', function(e) {
            //console.log('click', e);
            numberMaxRange = rangeSlider.value;

            //this doesn't work that well because of wrong event listner
            //Reduce the Max number if overseeding supported range, and give warning to user
            if (currentTrainingMode==trainingMode.ORDINARY) {
                //Reduce the Max number if overseeding supported range, and give warning to user
                limitMaxNumberAndGiveWarningForOrdinaryNum();
            }
        });
    }
}, false);

// ============= End On pageload ============= 


// ============= Start Functions ============= 

function sayDisplayedWord() {
    variable = wordDisplay.innerText;
    
    //speak it out loud
    pronounceWord(variable.toString());
}

function drawNewNumber() { 
    //generate random number
    variable = randomNumberGenerator();
    
    //display the number 
    wordDisplay.innerHTML = variable;

    //speak it out loud if setting is true for speak
    if (autoSpeakMode==true) {
        //determines which pronounciation mode to use depending on settings
        if (currentTrainingMode==trainingMode.NUMERIC){
            pronounceWord(variable.toString()); 
        } else if (currentTrainingMode==trainingMode.ORDINARY) {
            //Reduce the Max number if overseeding supported range, and give warning to user
            limitMaxNumberAndGiveWarningForOrdinaryNum();

            pronounceWord(ordinaryNumber(variable).toString());
        } else if (currentTrainingMode==trainingMode.YEAR) {
            alert("Mode not developed");  
        } else {
            alert("No mode was set");
        }
    }
    
}

function randomNumberGenerator() {
    return Math.floor((Math.random() * numberMaxRange) + 1)
}

function pronounceWord(word) {
    if(responsiveVoice.voiceSupport()) {
    return responsiveVoice.speak(word, "Danish Female");
    }
}

//Settings to activate numeric training mode
function activateNumTrainMode() {
    currentTrainingMode = trainingMode.NUMERIC;
}
//Settings to activate ordinary training mode
function activateOrdTrainMode() {
    currentTrainingMode = trainingMode.ORDINARY;

    //Reduce the Max number if overseeding supported range, and give warning to user
    limitMaxNumberAndGiveWarningForOrdinaryNum();
    
}
//Settings to activate year training mode
function activateYeaTrainMode() {
    currentTrainingMode = trainingMode.YEAR;
}

//Reduce the Max number if overseeding supported range, and give warning to user
function limitMaxNumberAndGiveWarningForOrdinaryNum() {

    //if number range is higher than the supported for ordinary number show toast warning
    if (numberMaxRange> maxNumberSuppByOrdinaryNum) {

        //Set number limit to maxNumberSuppByOrdinaryNum (100)
        rangeSlider.value = maxNumberSuppByOrdinaryNum;
        
        showDynamicMaxNumDisplay(false);
        //TODO bug: after rangeSlider has been set, the ng-model doesn't update
        //Code
        /*app.controller('PageController', function($scope) {
            $scope.numRange = maxNumberSuppByOrdinaryNum;
            $scope.$apply;
        });*/
        
        //toast
        ons.notification.toast({message: maxNumberSuppByOrdinaryWarningTxt, timeout: toastTimeout})
    } else {
        showDynamicMaxNumDisplay(true);
    }
}
//workaround for showing the correct value the slider when setting it manually through code
function showDynamicMaxNumDisplay(booleanValue) {
    if (booleanValue == false) {
        //show the static max number label
        maxNumLbl_ordinaryMax.style.display = "block";
        //set the static max number label - cannot be changed dynamically - lack of angular skills
        maxNumLbl_ordinaryMax.innerHTML = maxNumberSuppByOrdinaryNum;

        //Hide the dynamic max number label
        maxNumLbl.style.display = "none";
    } else {
        //show the static max number label
        maxNumLbl_ordinaryMax.style.display = "none";
        //Hide the dynamic max number label
        maxNumLbl.style.display = "block";
    }
        
}
// ============= End Functions ============= 

// ============= Copy of numberTranslation ==============
function between(x, min, max) {

    return x >= min && x <= max;
}
function enere(number) {
    switch (true) {
        case (number == 1):
            return "en";
        case (number == 2):
            return "to";
        case (number == 3):
            return "tre";
        case (number == 4):
            return "fire";
        case (number == 5):
            return "fem";
        case (number == 6):
            return "seks";
        case (number == 7):
            return "syv";
        case (number == 8):
            return "otte";
        case (number == 9):
            return "ni";
        default:
            return null;
    }
}
function tiere(number) {
    switch (true) {
        case (number == 2):
            return "tyvende";
        case (number == 3):
            return "tredivte";
        case (number == 4):
            return "fyrretyvende";
        case (number == 5):
            return "halvtredsindstyvende";
        case (number == 6):
            return "tresindstyvende";
        case (number == 7):
            return "fjerdsindstyvende";
        case (number == 8):
            return "firsindstyvende";
        case (number == 9):
            return "halvfemsindstyvende";
        default:
            return null;
    }
}
function hunderede(digits) {
    switch (true) {
        case (digits == 2):
            return "hundrede";
        case (digits == 3):
            return "tusinde";
        case (digits == 4):
            return "millioner";
        default:
            return null;
    }
}

function getLastDigit(integer) {
    return integer.toString().slice(-1);
}
function getFirstDigit(integer) {
    return Number(String(integer).charAt(0));
}
function getNumberOfDigits(integer) {
    return Number(integer.toString().length);
}
function ordinaryNumber(NumberDrawnFromInput) {

    switch (true) {
        case (between(NumberDrawnFromInput, 1, 19) == true):
            switch (true) {
                case (NumberDrawnFromInput == 1):
                    return "første";
                case (NumberDrawnFromInput == 1):
                    return "første";
                case (NumberDrawnFromInput == 2):
                    return "anden";
                case (NumberDrawnFromInput == 3):
                    return "tredje";
                case (NumberDrawnFromInput == 4):
                    return "fjerde";
                case (NumberDrawnFromInput == 5):
                    return "femte";
                case (NumberDrawnFromInput == 6):
                    return "sjette";
                case (NumberDrawnFromInput == 7):
                    return "syvende";
                case (NumberDrawnFromInput == 8):
                    return "ottende";
                case (NumberDrawnFromInput == 9):
                    return "niende";
                case (NumberDrawnFromInput == 10):
                    return "tiende";
                case (NumberDrawnFromInput == 11):
                    return "elvte";
                case (NumberDrawnFromInput == 12):
                    return "tolvte";
                case (NumberDrawnFromInput == 13):
                    return "trettende";
                case (NumberDrawnFromInput == 14):
                    return "fjortende";
                case (NumberDrawnFromInput == 15):
                    return "femtende";
                case (NumberDrawnFromInput == 16):
                    return "sekstende";
                case (NumberDrawnFromInput == 17):
                    return "syttende";
                case (NumberDrawnFromInput == 18):
                    return "attende";
                case (NumberDrawnFromInput == 19):
                    return "nittende";
                default:
                    return null;
            }
        case (between(NumberDrawnFromInput, 20, 99) == true):
            base = tiere(getFirstDigit(NumberDrawnFromInput));
            return Synthesize(NumberDrawnFromInput, base)
        case (NumberDrawnFromInput == 100):
            return "hundrede";
        default:
            return null;
    }
}

function Synthesize(NumberDrawnFromInput, base) {
    if (getLastDigit(NumberDrawnFromInput) == 0) {
        return base;
    } else {
        return enere(getLastDigit(NumberDrawnFromInput)) + " og " + base;
    }
}
function SynthesizeWithCorrectSpelling(NumberDrawnFromInput, base) {
    if (getLastDigit(NumberDrawnFromInput) == 0) {
        return base;
    } else {
        return enere(getLastDigit(NumberDrawnFromInput)) + "og" + base;
    }
}
