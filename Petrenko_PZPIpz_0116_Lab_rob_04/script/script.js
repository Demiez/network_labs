const readSingleFile = e => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const contents = e.target.result;
        displayContents(contents);
    };
    reader.readAsText(file);
}

const displayContents = contents => {
    const element = document.getElementById('file-content');
    element.textContent = contents;
    parse(contents);
}

const parse = content => {
    let overallPrice = 0;
    const menu = document.getElementById("menu");
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, "text/xml");
    const foods = xmlDoc.childNodes[0].children;
    const foodsNumber = xmlDoc.childNodes[0].children.length;

    for (let i = 0; i < foodsNumber; i++) {
        const menuItem = document.createElement("div");
        menuItem.innerText = `Блюдо ${i + 1}`;
        menuItem.setAttribute("class", "menu_item");
        const title = document.createElement("div");
        const ingredients = document.createElement("div");
        const price = document.createElement("div");

        title.innerText = `Назва: ${foods[i].childNodes[1].innerHTML}`;
        ingredients.innerText = `Інгредієнти: ${foods[i].childNodes[3].innerHTML}`;
        const priceNumber = Number(foods[i].childNodes[5].innerHTML);
        overallPrice += priceNumber;
        price.innerText = `Ціна: ${priceNumber}`;
        menuItem.appendChild(title);
        menuItem.appendChild(ingredients);
        menuItem.appendChild(price);
        menu.appendChild(menuItem);
    }

    const price = document.createElement("div");
    price.innerText = `Загалом: ${overallPrice} грн`;
    menu.appendChild(price);
};

document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);