/* 
    DOM manipulation


    Het doel hier is om te leren hoe je mbv JS de DOM manipuleert.
    En hoe je documentatie leest.

    DOM manipulatie vindt meestal plaats op een (user) event.

    Hier is een voorbeeld.
    https://www.w3schools.com/jsref/met_document_addeventlistener.asp


    - Opdracht 1.

    Wanneer een gebruiker de waarde van een input field met class 'quantity' aanpast, moet de totaal prijs van het product berekend worden en worden weergeven in op het scherm.

    *** HINTS ***
        1. Begin met document en gebruik een methode om een element te selecteren (in dit geval een input field).
        2. Gebruik een event listener die de waarde die de waarde van het input field registreert.
        3. Om het juiste object te updaten maak gebruik van DOM traversion. => https://javascript.info/dom-navigation 
    ***    ***
    
    - Opdracht 2.

    Na dat de prijs per product is berekend, bereken de totaal prijs van alle producten en laat de waarde zien in de span met id 'total-price'. 

    - Opdracht 3.

    Maak een nieuwe sectie in html waar in je een product kan toevoegen aan het bestaande assortiment.

    Dus twee input fields: één voor de naam van het product, één voor de prijs van het product.

*/

window.onload = function () {
  //door dit buiten de functie te plaatsen hoef je niet iedere keer 'te zoeken' naar dit element.
  const totalPriceElement = document.getElementById('total-price');

  const newProductName = document.getElementById('productname').value;
  const newProductPrice = document.getElementById('productprice').value;

  const newProduct = document.getElementById('newproduct');

  const inputFields = document.getElementsByClassName('quantity');

  document.getElementById('add-product').addEventListener('click', function () {
    addNewProduct(
      newProduct,
      newProductName,
      newProductPrice,
      totalPriceElement
    );
  });

  for (let i = 0; i < inputFields.length; i++) {
    addCalcTotalPriceProduct(inputFields[i], totalPriceElement);
  }
};

function addNewProduct(
  newProduct,
  newProductName,
  newProductPrice,
  totalPriceElement
) {
  const div1 = document.createElement('div');
  div1.classList.add('product');
  newProduct.appendChild(div1);

  const header = document.createElement('h2');
  header.innerHTML = newProductName;
  div1.appendChild(header);

  const div2 = document.createElement('div');
  div2.classList.add('div');
  div1.appendChild(div2);

  const pPricePerProduct = document.createElement('p');
  const spanPrice = document.createElement('span');
  spanPrice.classList.add('price');
  spanPrice.innerHTML = newProductPrice;
  pPricePerProduct.innerHTML = 'Price per product: ';
  pPricePerProduct.appendChild(spanPrice);
  div1.appendChild(pPricePerProduct);

  const pTotalPrice = document.createElement('p');
  const spanTotalPriceProduct = document.createElement('span');
  spanTotalPriceProduct.classList.add('total-price-product');
  spanTotalPriceProduct.innerHTML = '0';
  pTotalPrice.innerHTML = 'Total price: ';
  pTotalPrice.appendChild(spanTotalPriceProduct);
  div1.appendChild(pTotalPrice);

  let input = document.createElement('input');
  input.placeholder = 'quantity';
  input.classList.add('quantity');
  input.type = 'number';
  div2.appendChild(input);
  console.log('added new product');

  addCalcTotalPriceProduct(input, totalPriceElement);
}

function addCalcTotalPriceProduct(element, totalPriceElement) {
  element.addEventListener('change', (e) =>
    calcTotalPriceProduct(e, totalPriceElement)
  );
}

//altijd camelCase gebruiken.
//dit is een andere manier van noteren (niet perse beter)
const multiply = (a, b) => a * b;
//probeer functies 'puur' te maken. Dat betekend dat ze maar een doel hebben.
function getTotalPrice(list) {
  let totalPrice = 0;

  for (let index = 0; index < list.length; index++) {
    totalPrice = Number(list[index].innerHTML) + totalPrice;
  }

  return totalPrice;
}

function calcTotalPriceProduct(event, totalPriceElement) {
  //Dit heet object deconstruction. En zal ik je uitgebreider laten zien.

  const { value, parentElement } = event.target;

  const targetAmount = Number(value);
  const targetPrice = Number(
    parentElement.nextElementSibling.children.item(0).innerHTML
  );
  const targetTotalPrice = multiply(targetAmount, targetPrice);

  parentElement.nextElementSibling.nextElementSibling.children.item(
    0
  ).innerHTML = targetTotalPrice;

  const listTotalPriceProduct = document.getElementsByClassName(
    'total-price-product'
  );
  const totalPrice = getTotalPrice(listTotalPriceProduct);

  totalPriceElement.innerHTML = totalPrice;
}
