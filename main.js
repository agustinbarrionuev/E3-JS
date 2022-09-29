//Declaro las variables
const h2 = document.getElementById("name-pizza");
const h4 = document.getElementById("price-pizza");
const input = document.querySelector("input");
const btnSend = document.getElementById("enviar");
const container = document.getElementById("container");
const inputContainer = document.querySelector("form");
const ingredientes = document.getElementById("ingredientes")
const imagen = document.getElementById("imagen")

// local storage
const getPizza = JSON.parse(localStorage.getItem('pizzas')) || [];

const saveLocalStorage = pizz => {
    localStorage.setItem('pizzas', JSON.stringify(pizz));
};

const pizzas = [
  {
    id: 1,
    name: "Mozzarella",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "orégano",
      "aceitunas",
    ],
    price: 1200,
  },
  {
    id: 2,
    name: "Champiñones",
    ingredientes: [
      "champiñones",
      "queso mozzarella",
      "albahaca",
      "aceite de oliva",
    ],
    price: 1500,
  },
  {
    id: 3,
    name: "Fugazzetta",
    ingredientes: ["queso mozzarella", "cebolla", "orégano", "aceitunas"],
    price: 1300,
  },
  {
    id: 4,
    name: "CuatroQuesos",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "queso gorgonzola",
      "queso fontina",
      "queso parmesano",
    ],
    price: 2000,
  },
  {
    id: 5,
    name: "Especial",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "jamón",
      "huevo",
      "morrones",
      "aceitunas",
    ],
    price: 1600,
  },
  {
    id: 6,
    name: "Cebolla-Jamón",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "jamón crudo",
      "Cebolla",
      "aceitunas",
    ],
    price: 1700,
  },
];
btnSend.addEventListener("click", sendId);

function sendId(e) {
  e.preventDefault();
  //Al hacer click capturo el valor del input y lo asigno a pizzaId
  const pizzaId = parseInt(input.value);
  //Si intenta enviar sin poner nada en el input
  if (!pizzaId) {
    showAlert("Ingrese un ID para continuar");
    reset();
    return; // no va a pasar al siguiente codigo hasta que cumpla la condicion
  }
  //Si intenta enviar un numero mayor o menor a los id que tienen las pizzas mi array 'pizzas'
  if (pizzaId <= 0 || pizzaId > pizzas.length || typeof(pizzaId) === "string") {
    showAlert("Seleccioná un ID válido (desde 1 hasta 6)");
    reset();
    return; // no va a pasar al siguiente codigo hasta que cumpla la condicion
  }
  //Pasa todas las validaciones y busco la pizza que tenga el id igual al valor del input
  const result = pizzas.find((pizza) => pizza.id === pizzaId);
  renderPizza(result);//a la pizza encontrada la muestro en pantalla
  saveLocalStorage(result) //a la pizza encontrada la guardo en el local storage
  return setTimeout(reset,3000)
}
//Renderizar en pantalla
const renderPizza = (pizza) => {
  const { name, price, ingredientes} = pizza; //Destructuracion del objeto (la pizza que encontré)
  //Inyecto el name en el h2
  h2.innerHTML = `<span class= "name-price">Nombre: </span>${  name}`;
  ingredientes.innerHTML =  `${ ingredientes}`;
  imagen.innerHTML = `<img class="pizza-img" src="./images/${name.toString().toLowerCase()}.jpg" alt="pizza"></img>`;

  //Inyecto el price en el h4
  h4.innerHTML = `<span class= "name-price">Precio: </span>$${  price}`;
  inputContainer.classList.add("success-border");
}

// crear la alerta
const showAlert = (message) => {
  //Compruebo si ya existe una alerta previa
  const existsAlert = document.querySelector(".already-alert");
  if (!existsAlert) {
    //si no existe la alerta, creo una
    const divAlert = document.createElement("div");
    divAlert.classList.add("already-alert");
    divAlert.innerHTML = `<p class="alert">${message}</p>`;
    //La agrego al contenedor padre
    container.appendChild(divAlert);
    inputContainer.classList.add("alert-border");
    // Quito la alerta despues transcurrir  3 segundos
    setTimeout(() => {
      divAlert.remove();
      inputContainer.classList.remove("alert-border")
    }, 3000);
  }

  
};

//Esto resetea el h2 y h4
const reset = () => {
  h2.innerHTML = "";
  h4.innerHTML = "";
  inputContainer.classList.remove("success-border")
};

const init = () => {
  renderPizza(pizzas);
  button.addEventListener("click", sendId);
};

init();