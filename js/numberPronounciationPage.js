// ============= Star Controls ============= 
var wordDisplay = document.getElementById("numberToGuess");
var autoSwitch = document.getElementById("autoSpeakSwitch");
var rangeSlider = document.getElementById('numberSlider');
var numberTxtDislay = document.getElementById('numberSpelling');

//Max Number Range for RnD generator
var maxNumLbl = document.getElementById('maxNumLbl');
var maxNumLbl_ordinaryMax = document.getElementById('maxNumLbl_ordinaryMax');

//Year settings
var hundredChk = document.getElementById("hundred");
var thousandChk = document.getElementById('thousand');
var twoThousandChk = document.getElementById('twoThousand');

// ============= End Controls ============= 

// ============= Start Global Variables============= 
var autoSpeakMode;
var numberMaxRange;
var currentTrainingMode;
var trainingMode_minNumberRng;
var trainingMode_maxNumberRng;
var yearHundredMode;
var yearThousandMode;
var yearTwothousandMode;

// ============= End Global Variables============= 

// ============= Start Settings ============= 
var numberMinRange = 1;
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
variable = randomNumberGenerator(numberMinRange, numberMaxRange);    //load random number on pageload

wordDisplay.innerHTML = variable
numberTxtDislay.innerHTML = displayNumberSpelling(variable); //load spelling to random number on pageload

yearTwothousandMode = twoThousandChk.checked; //Load the state of the century range picker 
yearThousandMode = thousandChk.checked; //Load the state of the century range picker
yearHundredMode = hundredChk.checked;//Load the state of the century range picker

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

            //Reduce the Max number if overseeding supported range, and give warning to user
            if (currentTrainingMode==trainingMode.ORDINARY) {
                limitMaxNumberAndGiveWarningForOrdinaryNum();
            }
        });

        //add eventlistner to checkbox for year settings
        hundredChk.addEventListener('change', function(e) {
            //console.log('click', e);
            yearHundredMode = hundredChk.checked;
        });
        //add eventlistner to checkbox for year settings
        thousandChk.addEventListener('change', function(e) {
            //console.log('click', e);
            yearThousandMode = thousandChk.checked;
        });
        //add eventlistner to checkbox for year settings
        twoThousandChk.addEventListener('change', function(e) {
            //console.log('click', e);
            yearTwothousandMode = twoThousandChk.checked;
        });

        //Only enable century range picker when on Year mode
        if (currentTrainingMode==trainingMode.YEAR) {
            enableCenturyRangePicker(true);
            randomNumberForCentury();
        } else {
            enableCenturyRangePicker(false);
        }
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
    if (currentTrainingMode==trainingMode.YEAR){
        //generate random number within the selected ranges of centruries
        variable = randomNumberForCentury();
    } else {
        //generate random number
        variable = randomNumberGenerator(numberMinRange, numberMaxRange);
    }
    
    //display the number 
    variable = 1800;
    wordDisplay.innerHTML = variable;
    numberTxtDislay.innerHTML = displayNumberSpelling(variable); 

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
            pronounceWord(variable.toString()); 
        } else {
            alert("No mode was set");
        }
    }
    
}

function displayNumberSpelling(number) {
    switch(true) {
        case (currentTrainingMode==trainingMode.NUMERIC):
        {
            return normalNumberSpeller(variable); //needs to be an universal method 
            //return normalNumber(variable); //needs to be an universal method
        }
        case (currentTrainingMode==trainingMode.ORDINARY):
        {
            return ordinaryNumber(variable); //needs to be an universal method
        }
        case (currentTrainingMode==trainingMode.YEAR):
        {
            return normalNumberSpeller(variable); //needs to be an universal method
        }
   }
}

function randomNumberGenerator(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1) ) + minValue;
}
function randomNumberForCentury() {
    var rndNumRng1; var rndNumRng2; var rndNumRng3;
    if (yearHundredMode == true) {
        rndNumRng1 = randomNumberGenerator(1, 1000);
    }
    if (yearThousandMode == true) {
        rndNumRng2 = randomNumberGenerator(1001, 1899);
    }
    if (yearTwothousandMode == true) {
        rndNumRng3 = randomNumberGenerator(1900, 2025);
    }
    //Array that of numbers that we will select a random number from
    var rndNumberCandidates = [];

    //Add all random generated numbers from the different century ranges that is not null (that has been selected)
    var randomNumbers = [rndNumRng1,rndNumRng2,rndNumRng3];
    var arrayLength = randomNumbers.length;
    for (var i = 0; i < arrayLength; i++) {
        if (randomNumbers[i] != null) {
            rndNumberCandidates.push(randomNumbers[i]);
        }
    }
    //return a random number of the random number
    return theRandomNumber = rndNumberCandidates[Math.floor(Math.random()*rndNumberCandidates.length)];
}

function pronounceWord(word) {
    if(responsiveVoice.voiceSupport()) {
        return responsiveVoice.speak(word, "Danish Female");
    }
}

//toggle mode for century picker
function enableCenturyRangePicker(boolean) {
    hundredChk.disabled = !boolean;
    thousandChk.disabled = !boolean;
    twoThousandChk.disabled = !boolean;
}

//Settings to activate numeric training mode
function activateNumTrainMode() {
    currentTrainingMode = trainingMode.NUMERIC;

    //redefine max range for number
    numberMaxRange = rangeSlider.value;
    numberMinRange = 1;

}
//Settings to activate ordinary training mode
function activateOrdTrainMode() {
    currentTrainingMode = trainingMode.ORDINARY;

    //redefine max range for number
    numberMaxRange = rangeSlider.value;
    numberMinRange = 1;

    //Reduce the Max number if overseeding supported range, and give warning to user
    limitMaxNumberAndGiveWarningForOrdinaryNum();
    
}
//Settings to activate year training mode
function activateYeaTrainMode() {
    currentTrainingMode = trainingMode.YEAR;

    //redefine max range for number
    //limits are set
}

//Reduce the Max number if overseeding supported range, and give warning to user
function limitMaxNumberAndGiveWarningForOrdinaryNum() {

    //if number range is higher than the supported for ordinary number show toast warning
    if (numberMaxRange> maxNumberSuppByOrdinaryNum) {

        //Set number limit to maxNumberSuppByOrdinaryNum (100)
        rangeSlider.value = maxNumberSuppByOrdinaryNum;
        
        showDynamicMaxNumDisplay(false);
        //TODO bug: after rangeSlider has been set, the ng-model doesn't update.
        //workaround using: showDynamicMaxNumDisplay(false); 
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
function tiTilTyveNormal(NumberDrawnFromInput) {
    switch (true) {
        case (NumberDrawnFromInput == 10):
            return "ti";
        case (NumberDrawnFromInput == 11):
            return "elve";
        case (NumberDrawnFromInput == 12):
            return "tolv";
        case (NumberDrawnFromInput == 13):
            return "tretten";
        case (NumberDrawnFromInput == 14):
            return "fjorten";
        case (NumberDrawnFromInput == 15):
            return "femten";
        case (NumberDrawnFromInput == 16):
            return "seksten";
        case (NumberDrawnFromInput == 17):
            return "sytten";
        case (NumberDrawnFromInput == 18):
            return "atten";
        case (NumberDrawnFromInput == 19):
            return "nitten";
        default:
            return null;
    }
}
function tiereOrdinary(number) {
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
function tiereNormal(number) {
    switch (true) {
        case (number == 2):
            return "tyve";
        case (number == 3):
            return "tredive";
        case (number == 4):
            return "fyrre";
        case (number == 5):
            return "halvtreds";
        case (number == 6):
            return "tres";
        case (number == 7):
            return "halvfjerds";
        case (number == 8):
            return "firs";
        case (number == 9):
            return "halvfems";
        default:
            return null;
    }
}
function hunderedeOrdinary(digits) {
    switch (true) {
        case (digits == 2):
            return "hundrede";
        case (digits == 3):
            return "tusinde";
        default:
            return null;
    }
}
function hunderedeNormal(digits) {
    switch (true) {
        case (digits == 2):
            return "hundrede";
        case (digits == 3):
            return "tusind";
        default:
            return null;
    }
}
function getLastDigits(variable, digits) {
    return variable.toString().slice(-digits);
}
function getFirstDigits(variable,digits) {
    return Number(String(variable).substring(0,digits));
}
function getFirstDigit(variable) {
    return Number(String(variable).charAt(0));
}
function getNumberOfDigits(integer) {
    return Number(integer.toString().length);
}

function getLastTwoDigitsOfYearToSpelling(centuryNr, NumberDrawnFromInput) {
    if (getLastDigits(NumberDrawnFromInput,2) != "00") {
        //If no century is given then do not print OG
        if (centuryNr != "") {
            centuryNr = centuryNr + " og ";
        }
        //century (e.g 18th) + Spelling algorithm for 1 to 99
        return spell1To99(centuryNr, NumberDrawnFromInput);
    } else {
        //return century if no just 1800
        return centuryNr;
    }
}
//Spelling algorithm for 1 to 99
function spell1To99(centuryNr, NumberDrawnFromInput) {
        yearEndDigits = parseInt(getLastDigits(NumberDrawnFromInput,2));
        switch (true) {
            case (yearEndDigits < 10):
                return centuryNr + enere(yearEndDigits);
            case (between(yearEndDigits, 10, 19)):
                return centuryNr + tiTilTyveNormal(yearEndDigits);
            case (yearEndDigits == 20):
            case (yearEndDigits == 30):
            case (yearEndDigits == 40):
            case (yearEndDigits == 50):
            case (yearEndDigits == 60):
            case (yearEndDigits == 70):
            case (yearEndDigits == 80):
            case (yearEndDigits == 90):
                return centuryNr + tiereNormal(getFirstDigit(yearEndDigits));
            default: //11-21
                return centuryNr + enere(getLastDigits(yearEndDigits,1)) + "og" + tiereNormal(getFirstDigit(yearEndDigits));
        }
}
//Function to return number to spelling
function normalNumberSpeller(NumberDrawnFromInput) {
    switch (true) {
        case (between(NumberDrawnFromInput, 1, 99) == true):
            var centuryNr = "";
            return getLastTwoDigitsOfYearToSpelling(centuryNr, NumberDrawnFromInput);
        case (between(NumberDrawnFromInput, 100, 199) == true):
            var centuryNr = "et " + hunderedeNormal(2);
            return getLastTwoDigitsOfYearToSpelling(centuryNr, NumberDrawnFromInput);
        case (between(NumberDrawnFromInput, 200, 999) == true):
            var centuryNr = enere(getFirstDigit(NumberDrawnFromInput)) + hunderedeNormal(2);
            return getLastTwoDigitsOfYearToSpelling(centuryNr, NumberDrawnFromInput);
        case (between(NumberDrawnFromInput, 1000, 1099) == true):
            var centuryNr = "et" + hunderedeNormal(3);
            return getLastTwoDigitsOfYearToSpelling(centuryNr, NumberDrawnFromInput);
        case (between(NumberDrawnFromInput, 1100, 1999) == true):
            var centuryNr = tiTilTyveNormal(parseInt(getFirstDigits(NumberDrawnFromInput, 2))) + "hundrede";
            return getLastTwoDigitsOfYearToSpelling(centuryNr, NumberDrawnFromInput);
        case (between(NumberDrawnFromInput, 2000, 9991) == true):
            var centuryNr = enere(getFirstDigit(NumberDrawnFromInput)) + hunderedeNormal(3);
            return getLastTwoDigitsOfYearToSpelling(centuryNr, NumberDrawnFromInput);
        default:
            return "number unsupported";
    }
}

function ordinaryNumber(NumberDrawnFromInput) {
    switch (true) {
        case (between(NumberDrawnFromInput, 1, 19) == true):
            switch (true) {
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
            base = tiereOrdinary(getFirstDigit(NumberDrawnFromInput, 1));
            return Synthesize(NumberDrawnFromInput, base)
        case (NumberDrawnFromInput == 100):
            return hunderedeOrdinary(2); //return 100
        default:
            return "ikke understøttet";
    }
}
//spells the number for ordinary number, and pronounce it more clearly through voice api
function Synthesize(NumberDrawnFromInput, base) {
    if (getLastDigits(NumberDrawnFromInput, 1) == 0) {
        return base;
    } else {
        return enere(getLastDigits(NumberDrawnFromInput, 1)) + " og " + base;
    }
}
//spells the number for ordinary number
function SynthesizeWithCorrectSpelling(NumberDrawnFromInput, base) {
    if (getLastDigits(NumberDrawnFromInput, 1) == 0) {
        return base;
    } else {
        return enere(getLastDigits(NumberDrawnFromInput, 1)) + "og" + base;
    }
}
