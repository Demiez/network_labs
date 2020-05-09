const createMultiplyTable = (x,y) => {
    let table = document.createElement("table");
    document.body.appendChild(table);
    for(let i = 0; i < x; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < y; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
        }
    }
}

const highlight = event => {
    let td = event.target;
    let tr = td.parentElement.children;
    for (let key of tr) {
        key.style["backgroundColor"] = "green";
    }
}

const clear = event => {
    let td = event.target;
    let tb = td.parentElement.parentElement.children;
    for (let row of tb) {
        for (let data of row.children) {
            data.style["backgroundColor"] = "white";
        }
    }
}

createMultiplyTable(5,5);

window.onload = () => {
    let tds = document.querySelectorAll("td");
    for (let i = 0; i < tds.length; i++) {
        tds[i].addEventListener("mouseover", highlight);
        tds[i].addEventListener("mouseout", clear);
    }
};