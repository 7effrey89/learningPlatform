function between(x, min, max) {
    return x >= min && x <= max;
}
function enere(number) {
    switch (number) {
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
    switch (number) {
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
    switch (digits) {
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

function getLastDigit(int) {
    return int.toString().slice(-1);
}
function getFirstDigit(int) {
    return Number(String(OriginalNumberx).charAt(0));
}
function getNumberOfDigits(int) {
    return Number(OriginalNumberx.toString().length);
}
function ordinaryNumber(NumberDrawnFromInput) {
    switch (NumberDrawnFromInput) {
        case (between(NumberDrawnFromInput, 1, 20)):
            switch (NumberDrawnFromInput) {
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
        case (between(NumberDrawnFromInput, 20, 99)):
            base = tiere(getFirstDigit(NumberDrawnFromInput));
            return Synthesize(NumberDrawnFromInput, base)
        case (NumberDrawnFromInput == 100):
            base = "hundrende";
        default:
            return null;
    }
}

function Synthesize(NumberDrawnFromInput, base) {
    if (getLastDigit(NumberDrawnFromInput == 0)) {
        return base;
    } else {
        return lastDigitToDanish(getLastDigit(NumberDrawnFromInput)) + "og" + base;
    }
}
