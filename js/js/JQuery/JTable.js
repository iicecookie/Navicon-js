$(function () { 
    $("#grid").jqGrid({
        colModel: [
            { name: "FirstName",  label: "Имя",              align: "center" },
            { name: "SecondName", label: "Фамилия" ,         align: "center"},
            { name: "Date",       label: "Дата", width: 90,  align: "center"},
            { name: "Sity",       label: "Город проживания", align: "center" }
        ],
        data: [
            { id: 1, FirstName: "Angela",   SecondName: "Merkel"  ,Date: "12.5.2002",  Sity: "Moscow" },
            { id: 2, FirstName: "Vladimir", SecondName: "Putin"   ,Date: "3.7.2003",   Sity: "Moscow" },
            { id: 3, FirstName: "David",    SecondName: "Cameron" ,Date: "31.11.2005", Sity: "Moscow" },
            { id: 4, FirstName: "Barack",   SecondName: "Obama"   ,Date: "01.4.2000",  Sity: "Moscow" },
            { id: 5, FirstName: "François", SecondName: "Hollande",Date: "10.1.2001",  Sity: "Moscow" }
        ],
        
        guiStyle: "bootstrap",
        idPrefix: "dg_",
        rownumbers: false
    });
});