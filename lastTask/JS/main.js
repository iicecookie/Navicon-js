window.onload = function () {

    // Подписывание кнопки
    $("#SubmitButton").click(function () {

        // Id контроллеров для верификации значений
        var controllersIdArray = ["TypeOfPerson", "PayerName", "INN", "PaymentAmount"];

        // if TypeOfPerson == 0 => error
        // PayerName > 0 only char
        // INN для "Юр лицо" - 10 цифр  для "физ лицо" - 12 цифр
        // PaymentAmount

        // все ли контроллеры валидны
        isValidated = true;

        // выполнение верификации Input значений контроллеров
        for (var i = 0; i < controllersIdArray.length; i++) {
            if (!ValidateController(controllersIdArray[i], isValidated)) {
                isValidated = false;
            }
        }

        // controllersIdArray.forEach(controllerId => {
        //     if (!ValidateController(controllerId, isValidated)) {
        //         isValidated = false;
        //     }
        // });

        // если все валидно - высчитываю сумму платежа
        if (isValidated) {
            // "Сумма платежа" * (1 + "НДС"/100).
            $('#Result').val($('#PaymentAmount').val() * (1 + $('#NDS').val() / 100));
        } else {
            $('#Result').val('Не все поля введены корректно');
        }
    });

    // Изменение доступных полей в зависимости от типа 
    $('#TypeOfPerson').change(function () {

        switch ($('#TypeOfPerson option:selected').val()) {
            case '1':
                // Физическое лицо
                $('#NDS').val(13);
                $('#UrFaceForm').prop('hidden', true);
                $('#TaxSystem').prop('hidden', true);
                break;

            case '2':
                // Юридическое лицо
                $('#NDS').val(17);
                $('#UrFaceForm').prop('hidden', false);
                $('#TaxSystem').prop('hidden', false);

                break

            default:
                $('#NDS').val('');
                break;
        }
    });

    // Подписывание чекбокса на изменение доступа к ИНН
    $('#TaxCheckbox').change(function () {

        // Если установлена галочка
        if ($(this).prop('checked')) {
            //то поле "ИНН" очищается, делается необязательным и недоступным для ввода данных. 
            $('#INN').val('');
            $('#INN').prop('readonly', true);

        } else {

            $('#INN').prop('readonly', false);
        }
    });
};