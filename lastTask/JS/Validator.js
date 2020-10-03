// Проверка значения Input поля на корректность
// * controllerId - id верифицируемого контроллера
// * maxLengthValue - максимально допустимая длинна строки
function ValidateInput(controllerId) {

    // Проверка входных значений
    if (controllerId == null) {
        // console.error(`function ValidateInput get ${controllerID} as param`);
        return false;
    }

    // получение верифицируемого элемента
    var inputControl = document.getElementById(controllerId);

    // проверка нахождения такого элемента на форме

    // проверка значения на 
    if (inputControl.value.length > 10 ||
        inputControl.value.length == 0) {
        PaintBorderByColor(inputControl, "red");
        return false;
    }

    PaintBorderByColor(inputControl, "");
    return true;
}

// Проверка значения Input поля на корректность
function ValidatePaymentAmount() {

    // получение верифицируемого элемента
    var PaymentAmount = $('#PaymentAmount');

    // проверка нахождения такого элемента на форме
    if (PaymentAmount == null) {
        //   console.error(`Mistake in ValidateInput function. There are no element with ${controllerId} Id as param`);
        return false;
    }

    var regex = /^\d+(?:\d.\d{0,10})$/;

    if (!regex.test(PaymentAmount.val())) {
        PaymentAmount.css('borderColor', 'red');
        return false;
    } else {
        PaymentAmount.css('borderColor', '');
        var DotIndex = PaymentAmount.val().indexOf('.');
        if (DotIndex == -1) {
            return true;
        }
        PaymentAmount.val(PaymentAmount.val().substring(0, DotIndex + 3));
    }
    return true;
}

// Проверка значения контроллера в зависимости от ID
function ValidateController(controlId, isValidated) {

    // Проверка входных значений
    if (controlId == null) {
        console.error("function ValidateController get " + controlId + " as param");
        return false;
    }

    // выбор метода валидации в зависимости от контроллера
    switch (controlId) {

        case 'TypeOfPerson':
            var TypeOfPerson = $('#TypeOfPerson');
            if (TypeOfPerson.val() == '0') {
                TypeOfPerson.css('borderColor', 'red');
                isValidated = false;
            } else {
                TypeOfPerson.css('borderColor', '');
            }
            break;

        case 'PayerName':
            var PayerName = $('#PayerName');
            // если имя не введено - ошибка
            if (PayerName.val().length < 1) {
                PayerName.css('borderColor', 'red');
                $('#PayerNameInvalide').prop('hidden', false);
                isValidated = false;
            } else {
                PayerName.css('borderColor', '');
                $('#PayerNameInvalide').prop('hidden', true);
            }
            break;

        case 'INN':

            // контроллер ввода ИНН
            var INNInput = $('#INN');
            // подсказка в случае ошибки 
            var INNprompt = $('#INNInvalide');

            // если упрощенное налогооблажение, то доступно пустое
            if ($('#TaxCheckbox').prop('checked')) {
                INNInput.css('borderColor', '');
                break;
            }

            // у юридического лица ИНН на 2 символа больше
            var Maxlength = $('#TypeOfPerson').val() == '2' ? 12 : 10;

            if (INNInput.val().length === 0) {
                // если ИНН не введен
                INNprompt.prop('hidden', false);
                INNprompt.text('Введите ваш ИНН');
                INNInput.css('borderColor', 'red');
                isValidated = false;
            } else
            if (INNInput.val().length > Maxlength) {
                // если длинна ИНН превышает максимально допустимую
                INNprompt.prop('hidden', false);
                INNprompt.text('Длинна ИНН превышает ' + Maxlength + " символов");
                INNInput.css('borderColor', 'red');
                isValidated = false;
            } else {
                INNprompt.prop('hidden', true);
                INNInput.css('borderColor', '');
            }
            break;

        case 'PaymentAmount':
            // подсказка в случае ошибки 
            var INNprompt = $('#PaymentAmountInvalide');
            if (ValidatePaymentAmount()) {
                INNprompt.prop('hidden', true);
                isValidated = true;
            } else {

                INNprompt.prop('hidden', false);
                isValidated = false;
            }
            break;

        default:

            console.warn("unrecognized input " + _controlIds);
            ValidateInput(controlId);
            break;
    }

    // возвращаю результат валидации формы
    return isValidated;
}

// Обводит контроллер рамкой указаного цвета 
function PaintBorderByColor(controller, borderColor) {
    controller.style.borderColor = borderColor;
}