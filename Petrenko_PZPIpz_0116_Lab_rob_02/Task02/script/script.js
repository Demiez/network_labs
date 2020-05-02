// Создадим таблицу с рядами
const createMultiplyTable = (x,y) => {
    let table = document.createElement("table");
    document.body.appendChild(table);
    for(let i = 0; i < x; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < y; j++) {
            let td = document.createElement("td");
            if (i == 0) {
                td.innerText = `${j}`;
            }
            if (j == 0 && i != 0) {
                td.innerText = `${i}`;
            }
            if (j != 0 && i != 0){
                td.innerText = `${i*j}`;
            }
            tr.appendChild(td);
        }
    }
}

const highlightTd = event => {
    let td = event.target; //В объекте событий в таргете лежит нужный нам td
    let tr = td.parentElement.children; // В tr заносим всех детей на уровне нашего td и формируем массив
    let tb = td.parentElement.parentElement.children; // В tb - дети table (все tr)

    for (let key of tr) { //здесь key - остальные td в ряду с нашим, если cellIndex одинаковый - подсвечиваем ячейку (td в target), иначе - зеленым всю оставшуюся строку(ряд)
        key.cellIndex == td.cellIndex ? key.style["backgroundColor"] = "grey" : key.style["backgroundColor"] = "green";
    }
    for (let row of tb) { // сначала итерируем через каждый tr в table
        if (row != td.parentElement) { // если ряд не равен ряду в таргетным td (его обработали в предыдущем for)
            for (let data of row.children) { // итерируем через td в ряду
                if (data.cellIndex == td.cellIndex) data.style["backgroundColor"] = "green"; //если cellIndex совпадает с таргетным td -> подсвечиваем его, таким образом формируя подсветку колонки
            }
        }
    }
}

const clearTd = event => {
    let td = event.target;
    let tb = td.parentElement.parentElement.children;
    for (let row of tb) {
        for (let data of row.children) {
            data.style["backgroundColor"] = "white"; // возвращаем всем td во всех рядах белый бэкграунд
        }
    }
}

createMultiplyTable(5,5);

window.onload = () => {
    let tds = document.querySelectorAll("td"); // На онлоаде получаем все td нашей таблицы в виде nodelist (коллекции узлов)
    for (let i = 0; i < tds.length; i++) { // итерируем через них и добавляем 2 ивента (mouseover и mouseout)
        tds[i].addEventListener("mouseover", highlightTd);
        tds[i].addEventListener("mouseout", clearTd);
    }
};