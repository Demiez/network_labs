# Програмування в мережевих середовищах
# Лабораторні роботи:

### Лабораторна робота N1:
Розробити сайт (електронная версія газети - варіант 1) з елементами HTML та СSS

### Лабораторна робота N2:
1. Створити форму, яка містить інформацію по реєстрації користувача 
на сайті бібліотеки. У разі правильного заповнення всіх полів видати зведену 
введену інформацію в новому вікні. 
1) create form constructor
2) all layout (except container) is planned to be created with Javascript
3) an object provided to constructor can contain different inputs (name, surname, boolean data(married, has children and so on)) and buttons (with callbacks for actions)
4) while iterating through the object validate type of fields and buttons
5) each input must correspond to the aim of the field (type="text" for simple fields, radio - for boolean values)
6) user's input must be validated and if valid, data should be changed in runtime
7) for now 2 buttons:<br>
ok - updates data<br>
cancel - must clear all the inputs<br>
8) mandatory fields marked with red * (had to mutate object to avoid * in property and to save all validation checks)
9) mandatory fields are highlighted if empty
10) password and password confirmation validation
11) ok button checks following before sending request (for now just into console without JSON formation):
- if mandatory fields are not empty
- all validators are passed
12) cancel button restores all input fields to the moment of object creation (including radio buttons) 

2. Рухомий рядок
3. Простий графічний редактор для малювання примітивів (лінія, коло, прямокутник)
