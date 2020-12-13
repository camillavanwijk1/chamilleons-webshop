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

function Multiply (a, b){
  let Outcome = a * b;
  return Outcome;
}

function calcTotalPriceProduct(event) {
  
  let onClickTarget = event;
  //console.log(event);

  let targetAmount = Number(onClickTarget.value);
  let targetPrice = Number(onClickTarget.parentElement.nextElementSibling.children.item(0).innerHTML);
  let targetTotalPrice = Multiply(targetAmount, targetPrice);

  onClickTarget.parentElement.nextElementSibling.nextElementSibling.children.item(0).innerHTML = targetTotalPrice;
  
  let ListTotalPriceProduct = document.getElementsByClassName("total-price-product");
  let totalPrice = 0;
  
  for (index=0; index<ListTotalPriceProduct.length; index++){
    totalPrice = Number(ListTotalPriceProduct[index].innerHTML) + totalPrice;
  }
  
  document.getElementById("total-price").innerHTML = totalPrice;
}

function addCalcTotalPriceProduct(element){

if (element){
  element.setAttribute( "onchange", "calcTotalPriceProduct(this)" );
} else {
  console.log("element is empty");
}
 
}

function addNewProduct(){
  
  let newProductName = document.getElementById("productname").value;
  let newProductPrice = document.getElementById("productprice").value;

  const newProduct = document.getElementById("newproduct");
  //newProduct.classList.add('product');

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
  pPricePerProduct.innerHTML = "Price per product: ";
  pPricePerProduct.appendChild(spanPrice);
  div1.appendChild(pPricePerProduct);

  const pTotalPrice = document.createElement('p');
  const spanTotalPriceProduct = document.createElement('span');
  spanTotalPriceProduct.classList.add('total-price-product');
  spanTotalPriceProduct.innerHTML = '0';
  pTotalPrice.innerHTML = "Total price: ";
  pTotalPrice.appendChild(spanTotalPriceProduct);
  div1.appendChild(pTotalPrice);
    
  let input = document.createElement('input');
  input.placeholder = 'quantity';
  input.classList.add('quantity');
  input.type = 'number';
  div2.appendChild(input);
  console.log('added new product');

  addCalcTotalPriceProduct(input);
}



/* data is going to be collected from your element
   put into something to persist the data*/
