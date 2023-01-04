"use strict";
//Seleción de los elemento
const cards = document.querySelectorAll(".card");
const backCard = document.querySelectorAll(".back");
const puntos = document.querySelector(".puntos");
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
//Array de emojis para las dos versiones
let emojisArcade = [
  {
    id: 1,
    emoji: "🧌",
  },
  {
    id: 2,
    emoji: "🏰",
  },
  {
    id: 3,
    emoji: "🫅🏽",
  },
  {
    id: 4,
    emoji: "🧙🏽",
  },
  {
    id: 5,
    emoji: "🧝🏽‍♀️",
  },
  {
    id: 6,
    emoji: "🧟",
  },
  {
    id: 7,
    emoji: "🧞",
  },
  {
    id: 8,
    emoji: "🧚🏽‍♀️",
  },
];
let emojisClassic = [
  {
    id: 1,
    emoji: "🛤",
  },
  {
    id: 2,
    emoji: "🎑",
  },
  {
    id: 3,
    emoji: "🏞",
  },
  {
    id: 4,
    emoji: "🌅",
  },
  {
    id: 5,
    emoji: "🌄",
  },
  {
    id: 6,
    emoji: "🌃",
  },
  {
    id: 7,
    emoji: "🌉",
  },
  {
    id: 8,
    emoji: "🌇",
  },
];

//Declaracion de las variables, marcadores...
// Guardamos las cartas seleccionadas en un array
let flippedCards = [];
// Guardamos el elemento completo, [...]
let flippedElement = [];

let puntuacion = 0;
//guardamos el numero de matches para poder finalizar el juego cuando llegue a la cantitdad indicada (8 en este caso)
let numberOfMatches = 0;

//Declaramos el array aleatorio a partir de los arrays emojisArcade, emojisClassic, usando la función expresada más abajo.
const randomEmoji = createRandomArrayFromOther(emojisClassic);

//De el array creado lo metemos en uno nuevo duplicando todos los elementos para tener las parejas
const randomEmojiPar = [...randomEmoji, ...randomEmoji];

//////////////////////////////////////////////////////////////
//array creando un array aleatorio a parter de cualquier otro, recive dos paramatros el array que queremos desordenar y el lago de el que nos devuelve, por defecto 8

function createRandomArrayFromOther(array, maxLength = 8) {
  const clonedArray = [...array];
  const randomArray = [];

  for (let i = 0; i < maxLength; i++) {
    //Conseguimos un numero con el maximo como el largo del array y minimo del minimo del array
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    //Guardamos el elemento en la posicion generada aleatoriamente antes
    const randomItem = clonedArray[randomIndex];
    //lo metemos en el nuevo array
    randomArray.push(randomItem);
    //y lo eliminamos de el array clonado
    clonedArray.splice(randomIndex, 1);
  }
  //Devolvemos el array aleatorio
  return randomArray;
}
//////////////////////////////////////////////////////
//Cambiar de estilo
//[...]
h1.addEventListener("click", Mode);

function Mode(e) {
  body.classList.toggle("arcade");
}
if (body.classList.contains("arcade")) {
  emojisClassic = emojisArcade;
}

//////////////////////////////////////
//Colocar cada emoji en su caja.
//Recorremos el array de de randomEmojisPar y lo metemos en una casilla
for (let i = 0; i < randomEmojiPar.length; i++) {
  backCard[i].innerHTML = randomEmojiPar[i].emoji;
}

//////////////////////////////////////
//Funcion PRINCIPAL
function reveal(event) {
  const card = event.target.closest(".card");

  //si Carta y el largo del flippedcards es menor que 2 y carta NO contiene la clase flipped
  if (card && flippedCards.length < 2 && !card.classList.contains("flipped")) {
    //Añade la la clase a la carta par aque inicie la animacion
    card.classList.add("flipped");
    //mete el emoji en el array para poder comparlo mas tarde
    flippedCards.push(card.innerText);
    //mete en el array el elemtento html completo para poder despues quitarle solo a esos dos el atributo fliped
    flippedElement.push(card);
    //si el lardo de flippedcard es 2 ...(es decir que hay dos cartas boca arriba)
    if (flippedCards.length === 2) {
      //llamamos a dos funciones
      comprobarPareja();
      setTimeout(() => terminarJuego(), 500);
    }
  }
}
//por cada elemento le pacamos el evento click y la funcion principal
for (const card of cards) {
  card.addEventListener("click", reveal);
}

//////////////////////////////////////////////////////////////////////
//
function comprobarPareja() {
  //una vex metidos los emojis en el array lo sacamos para poder compararlos
  const emoji1 = flippedCards[0];
  const emoji2 = flippedCards[1];
  //si son iguales ...
  if (emoji1 === emoji2) {
    //Sumamos puntos(Residuo) y sumamos al numero de matches
    puntuacion++;
    numberOfMatches++;
    //añadimos un punto a intentos
    puntos.textContent = `Intentos:  ${puntuacion} `;
    for (const element of flippedElement) {
     element.classList.add("move");
    }
    flippedCards.length = 0;
    flippedElement = [];
    
  } else {
    //Si no son iguales...
    setTimeout(() => {
      //por cada elemento del array que quita la clase (hace que si no son iguales se den la vuelta otra vez)
      flippedElement.forEach((card) => {
        card.classList.remove("flipped");
      });
      //Suma a puntuacion por que en este momento son intetento (Siempre se puede quitar)
      puntuacion++;
      //añadimos un punto a intentos
      puntos.textContent = `INTENTOS: ${puntuacion} `;
      flippedElement = [];
      //reseteamos la lista a 0 elementos
      flippedCards.length = 0;
      //Y todo esto se hace despues de un segundo
    }, 1000);
  }
}
//////////////////////////////////////////////////////
//Se encarga de que al llegar 8 matches (que es el numero total de pajeras)
function terminarJuego() {
  if (numberOfMatches == 8) {
    alert(`Has terminado el juego con un total de ${puntuacion} intentos`),
      //les elimina el atributo para que den la vuelta.
      cards.forEach((card) => {
        card.classList.remove("flipped");
      });
    resetGame();
  }
}
/////////////////////////////////////////////////
//RESETEO DEL JUEGO
function resetGame() {
  //Por cada carta
  cards.forEach((card) => {
    //les elimina el atributo para que den la vuelta.
    card.classList.remove("flipped");
  });
  //restauramos todos los valores a cero
  flippedCards = [];
  flippedElement = [];
  puntuacion = 0;
  //Recargamos la pagina (de momento es la solucion a muchos de los errores, asi nos los evetamos, )
  location.reload();
}

//MOVIMIENTO CARTA AMBAS COINCIDEN

function anadirMovimiento(e) {
  e.classList.add("move")
console.log(hola);
}

