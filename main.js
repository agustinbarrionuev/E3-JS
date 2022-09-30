
// defino las variables
const inputNumber = document.getElementById("input-name");
const button = document.getElementById("search-button");
const cardContainer = document.querySelector(".card-container");
const small = document.querySelector("small")


// constructor Pizzas
class Pizza {
    constructor(id, nombre, ingredientes, precio){  
        this.id = id;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
    }
};

//objetos de Pizzas
const Pizzas = [
    new Pizza(1, 'Mozzarella', ['Jamón','Salsa','Aceitunas','Mozzarella'],'1100'),
    new Pizza(2, 'Fugazzeta', ['Salsa','Aceitunas','Cebolla','Queso'],'1400'),
    new Pizza(3, 'Calabresa', ['Salsa','Calabresa','Mozzarella','Orégano'],'1500'),
    new Pizza(4, 'Especial', ['Salsa','Jamon','Mozzarella','Huevos','Papas fritas'],'1600'),
    new Pizza(5, 'Rucula', ['Salsa', 'Provolone','Rucula','Aceitunas'],'1300'),
    new Pizza(6, 'Champiñones', ['Salsa','Morrón', 'Champiñones','Queso'],'1400')
];


// local storage
const pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];

const saveLocalStorage = pizz => {
    localStorage.setItem('pizzas', JSON.stringify(pizz));
};

// Filtrar la pizza 
const showPizza = () => {
    const valor = inputNumber.value.trim();
    const pizza = Pizzas.filter((e) => e.id == valor);
    
    if(!valor.length) {
        alert("Por favor ingrese un valor");
        return
    } else if (!pizza.length) {
        showError(inputNumber,"Pizza momentaneamente no disponible");
        inputNumber.value = "";
        renderPizza("");
        saveLocalStorage([]);
        return
    } else {
        showSuccess(inputNumber);
    };
    
    inputNumber.value = "";
    renderPizza(pizza);
    saveLocalStorage(pizza);
};

// Mostrar y Renderizar el error
const showError = (input,message) => {
    const pizzasContainer = input.parentElement;
    const error = pizzasContainer.querySelector("small");
    small.classList.add("alert");
    error.textContent = message;

};

const showSuccess = (input) => {
    const pizzasContainer = input.parentElement;
    const error = pizzasContainer.querySelector("small");
    error.textContent = "";
    small.classList.remove("alert");
};

//Renderizar la pizza

const renderPizza = (pizza) => {
    if (pizza.length) {
        const nombre = pizza.map((e) => e.nombre);
        const ingredientes = pizza.map((e) => e.ingredientes);
        const precio = pizza.map((e) => e.precio);

        cardContainer.innerHTML = `
        <h2 class="pizza-nombre">${nombre}</h2>
        <img class="pizza-image" src="./images/${nombre.toString().toLowerCase()}.jpg" alt="pizza">
        <div class="pizza-info">
        <ul class="pizza-ingredientes"><strong>Ingredientes:</strong> ${renderIngredientes(ingredientes)}</ul>
        <p class="pizza-precio"><strong>Precio:</strong> $${precio}</p>
        </div>`
    } else if (pizza === "") {
        cardContainer.innerHTML = `
        <img class="pizzaImageError" src="./images/imagen-no-disponible-3.jpg" alt="pizza-No-disponble">` //Imagen no Disponible
    };
};

//Renderizar los ingredientes

const renderIngredientes = (ingredientes) => {
    return ingredientes[0].map((i) => `<li>  ${i} </li>`).join("");
};

const init = () => {
    renderPizza(pizzas);
    button.addEventListener("click", showPizza);
};

init();