// Проверка значения Input поля на корректность
// * controllerId - id верифицируемого контроллера
// * maxLengthValue - максимально допустимая длинна строки
function ValidateInput(controllerId, maxLengthValue) {

    // Проверка входных значений
    if (controllerId == null) {
        console.error("function ValidateInput get" + controllerID + "as param");
        return false;
    }

    // получение верифицируемого элемента
    var inputControl = document.getElementById(controllerId);

    // проверка нахождения такого элемента на форме
    if (inputControl == null) {
        console.error("Mistake in ValidateInput function. There are no element with " + controllerId + "Id as param");
        return false;
    }

    // проверка значения на 
    if (inputControl.value.length > maxLengthValue ||
        inputControl.value.length == 0) {
        PaintBorderByColor(inputControl, "red");
        return false;
    }

    PaintBorderByColor(inputControl, "");
    return true;
}

// Проверка значения контроллера с Датой на корректность
function ValidateDate(dateControlId) {

    // Проверка входных значений
    if (dateControlId == null) {
        console.error("function ValidateDate get" + dateControlId + "as param");
        return false;
    }

    // получение верифицируемого элемента
    var dateControl = document.getElementById(dateControlId);

    // проверка нахождения такого элемента на форме
    if (dateControl == null) {
        console.error("Mistake in ValidateDate function. There are no element with" + dateControlId + "Id as param");
        return false;
    }

    // выражение обозночающее корректное значение даты с разделителями - или . в диапазоне 1900 - 2099 года
    const validateDateExpression = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;

    // Сопостовляем значение даты в контроллере с маской регулярного выражения
    if (dateControl.value.match(validateDateExpression)) {

        PaintBorderByColor(dateControl, "");
        return true;
    }

    // Выделение контроллера в случае некорректных данных
    PaintBorderByColor(dateControl, "red");
}

// Проверка значения контроллера в зависимости от ID
function ValidateController(controlId, isValidated) {

    // Проверка входных значений
    if (controlId == null) {
        console.error("function ValidateController get " + controlId + "as param");
        return;
    }

    switch (controlId) {

        case 'FirstNameInput':
            if (!ValidateInput(controlId, 10)) {
                isValidated = false;
            }
            break;

        case 'SecondNameInput':
            if (!ValidateInput(controlId, 15)) {
                isValidated = false;
            }
            break;

        case 'DatePicker':
            if (!ValidateDate(controlId)) {
                isValidated = false;
            }
            break;

        case 'CitySelector':
            var CitySelector = $('#CitySelector');

            if (CitySelector.val() === "") {
                CitySelector.css('borderColor', 'red');
                isValidated = false;
                break;
            }
            CitySelector.css('borderColor', '');
            break;

        default:

            console.log("unrecognized input");
            ValidateInput(controlId);
            break;
    }

    return isValidated;
}

// Обводит контроллер рамкой указаного цвета 
function PaintBorderByColor(controller, borderColor) {
    controller.style.borderColor = borderColor;
}