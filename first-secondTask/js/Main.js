window.onload = function () {

    // Id контроллеров для верификации значений
    var controllersIdArray = ["FirstNameInput", "SecondNameInput", "DatePicker", "CitySelector"];

    // Подписка Input контроллеров на верификацию значения
    for (let i = 0; i < controllersIdArray.length; i++) {
        var controller = document.getElementById(controllersIdArray[i]);
        controller.addEventListener('keyup', function () {
            ValidateController(controllersIdArray[i]);
        });
    }

    // Подписывание кнопки
    document.getElementById("SubmitButton").onclick = function () {

        // все ли контроллеры валидны
        isValidated = true;

        // выполнение верификации Input значений контроллеров
        for (let i = 0; i < controllersIdArray.length; i++) {
            if (!ValidateController(controllersIdArray[i], isValidated)) {
                isValidated = false;
            }
        }

        // если все заполненно верно - добавляем человека в список
        if (isValidated) {

            jQuery("#grid").jqGrid('addRow', {
                rowID: "new_row",
                initdata: {
                    FirstName: $("#FirstNameInput").val(),
                    SecondName: $("#SecondNameInput").val(),
                    Date: $("#DatePicker").val(),
                    Sity: $("#CitySelector option:selected").text()
                },
                position: "first",
                useDefValues: false,
                useFormatter: false,
                addRowParams: {
                    extraparam: {}
                }
            });
        }
    }
}


/*
TODO: Задание 2.

Сделать валидацию формы из задания 1 средствами чистого JavaScript.

При изменениии значения полей проверять:
    - не превышает ли длина имени 10 символов. 
            Если превышает, то пометить поле красной рамкой. 
            Если значение введено корректно, то красной рамки быть не должно.
    - не превышает ли длина фамилии 15 символов. 
            Если превышает, то пометить поле красной рамкой. 
            Если значение введено корректно, то красной рамки быть не должно.
    - корректно ли введена дата.
            Если некорректно, то пометить все три поля даты красной рамкой. 

    Если какое-то из полей даты НЕ заполнено, то другие НЕ должны помечаться как ошибочные.
*/