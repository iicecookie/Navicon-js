Study.GetData(Directcollectionion)

// Callback function возвращения преобразованой коллекции
function Directcollectionion(collection) {

  // console.log(collection);

  console.log(`---1----`);

  PrintConsole(sortById(collection));

  console.log(`---2----`);

  PrintConsole(sortByTypeAndId(collection));

  console.log(`---3----`);

  PrintConsole(getTypeEqualsTwo(collection));

  console.log(`---4----`);

  PrintConsole(getOnlyWithName(collection));

  console.log(`---5----`);

  PrintConsole(AddMissingIdAndSort(collection));

  console.log(`---6----`);

  PrintConsole(CutElements(collection));
}

// Выводит элементы коллекции в консоль
function PrintConsole(collection) {
  collection.forEach(element => {
    console.log(`ID: ${ element.id } | Имя: ${ element.name } | Тип: ${ element.type }`)
  });
}

// Сортирует все элементы по свойству id.
//*increase > 0 => сортирует по возрастанию
//*increase < 0 => сортирует по убыванию
function sortById(collection, increase = 1) {
  if (collection == null) {
    console.error(`sortById get ${collection} as param collection`);
    return;
  }
  if (Array.isArray(collection) == false) {
    console.error(`sortById get non array param ${collection}`);
    throw new error('param is not array');
  }
  if (collection.length === 0) {
    console.error(`sortById get empty array param ${collection}`);
    return;
  }
  if (collection[0].hasOwnProperty('id') == false) {
    console.error(`sortById get array without id key ${collection}`);
    return;
  }

  return collection.sort((a, b) => a.id > b.id ? 1 * increase : -1 * increase);
}

// Сортирует все элементы по свойству type по возрастанию и свойству id по убыванию.
function sortByTypeAndId(collection) {
  if (collection == null) {
    console.error(`sortById get ${collection} as param collection`);
    return;
  }
  if (Array.isArray(collection) == false) {
    console.error(`sortById get non array param ${collection}`);
    throw new error('param is not array');
  }
  if (collection.length === 0) {
    console.error(`sortById get empty array param ${collection}`);
    return;
  }
  if (collection[0].hasOwnProperty('id') == false) {
    console.error(`sortById get array without id key ${collection}`);
    return;
  }
  if (collection[0].hasOwnProperty('type') == false) {
    console.error(`sortById get array without type key ${collection}`);
    return;
  }

  return collection.sort(function sortF(ob1, ob2) {// first second
    // Пытаюсь отсортировать по Type
    if (ob1.type > ob2.type) {
      return 1;
    } else if (ob1.type < ob2.type) {
      return -1;
    }

    // Если они равны иду сортироватьпо Id 
    if (ob1.id < ob2.id) {
      return 1;
    } else if (ob1.id > ob2.id) {
      return -1
    }

    return 0;
  });
}

// Выбирает только элементы с type = 2.
function getTypeEqualsTwo(collection) {
  if (collection == null) {
    console.error(`getTypeEqualsTwo get ${collection} as param collection`);
    return;
  }
  if (Array.isArray(collection) == false) {
    console.error(`getTypeEqualsTwo get non array param ${collection}`);
    throw new error('param is not array');
  }
  if (collection.length === 0) {
    console.error(`getTypeEqualsTwo get empty array param ${collection}`);
    return;
  }
  if (collection[0].hasOwnProperty('type') == false) {
    console.error(`getTypeEqualsTwo get array without type key ${collection}`);
    return;
  }
  return collection.filter(obj => obj.type === 2);
}

// Выбирает только элементы, у которых заполнено имя.
function getOnlyWithName(collection) {
  if (collection == null) {
    console.error(`getOnlyWithName get ${collection} as param collection`);
    return;
  }
  if (Array.isArray(collection) == false) {
    console.error(`getOnlyWithName get non array param ${collection}`);
    throw new error('getOnlyWithName is not array');
  }
  if (collection.length === 0) {
    console.error(`getOnlyWithName get empty array param ${collection}`);
    return;
  }
  if (collection[0].hasOwnProperty('name') == false) {
    console.error(`getOnlyWithName get array without type key ${collection}`);
    return;
  }

  return collection.filter(obj => obj.name != null);
}

// Добавляет в коллекцию элементы с недостающими идентификаторами. 
// Отсортировать коллекцию в порядке убывания идентификаторов.
function AddMissingIdAndSort(collection) {
  if (collection == null){
    console.error(`AddMissingIdAndSort get ${collection} as param collection`);
    return;
  }
  if (Array.isArray(collection) == false) {
    console.error(`sortById get non array param ${collection}`);
    throw new error('param is not array');
  }
  if (collection.length === 0) {
    console.error(`AddMissingIdAndSort get empty array param ${collection}`);
    return;
  }
  if (collection[0].hasOwnProperty('id') == false) {
    console.error(`AddMissingIdAndSort get array without id key ${collection}`);
    return;
  }

  // отсортировали массив по убыванию
  collection = sortById(collection, -1);

  // получили максимальный Id массива
  var maxId = collection[0].id;

  // проходим по отсортированому массиву и сравниваем Id c ожидаемым
  for (let id = maxId, i = 0; i < maxId; i++, id--) {

    // если реальное id не совпало с ожидаемым
    if (collection[i].id !== id) {

      // добавляем объект с недостоющим id
      collection.splice(i, 0, {
        id: id,
        type: null,
        name: null
      });
    }
  }
  return collection;
}

// Вырезать из коллекции элементы с третьего по пятый
function CutElements(collection, indexFrom = 3, indexTo = 5) {

  if (collection == null) {
    console.error(`CutElements get ${collection} as param collection`);
    return;
  }
  if (Array.isArray(collection) == false) {
    console.error(`CutElements get non array param ${collection}`);
    throw new error('param is not array');
  }
  if (collection.length === 0) {
    console.error(`CutElements get empty array param ${collection}`);
    return;
  }
  if (collection.length < indexTo) {
    console.error(`CutElements get collectionion length less than indexTo param`);
    return;
  }

  collection.splice(indexFrom, indexTo - indexFrom + 1);
  return collection;
}

// 1. Отсортировать все элементы по свойству id по возрастанию.
// 2. Отсортировать все элементы по свойству type по возрастанию и свойству id по убыванию.
// 3. Выбрать только элементы с type = 2.
// 4. Выбрать только элементы, у которых заполнено имя.
// 5. Добавить в коллекцию элемент с недостающим идентификатором. Отсортировать коллекцию в порядке убывания идентификаторов.
// 6. Вырезать из коллекции элементы с третьего по пятый