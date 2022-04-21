let carts= document.querySelectorAll('.add-cart');

let products =[
    {
        prod:" Twd. Blue Dream",
        tag:'prod1',
        price:30,
        inCart: 0,
        
    },
    {
        prod:" Legend Sativa Blend",
        tag:'prod2',
        price:35,
        inCart: 0
    },
    {
        prod:" Haven St. No. 427 Retrograde",
        tag:'prod21',
        price:31,
        inCart: 0
    },
    {
        prod:" Palmetto Nuken",
        tag:"prod22",
        price:33,
        inCart: 0
    }

];

for(let i=0; i < carts.length;i++){
    carts[i].addEventListener('click' , () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}
 function cartNumbers(product){
     
     let productNumbers=localStorage.getItem('cartNumbers');
     


     productNumbers= parseInt(productNumbers);
     if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1 );
        document.querySelector('.cart span').textContent=productNumbers+1;
     }
     else{
        localStorage.setItem('cartNumbers', 1 );
        document.querySelector('.cart span').textContent=1;
     }
   setItems(product)
 }
 function setItems(product){
     let cartItems =localStorage.getItem('productsIncart');
     cartItems=JSON.parse(cartItems);
    


     if(cartItems != null) {
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
      cartItems[product.tag].inCart += 1;
     }else{
        product.inCart=1;
        cartItems = {
            [product.tag]: product
        }
     }
     localStorage.setItem("productsIncart",JSON.stringify
    (cartItems));
 }
 function totalCost(product){
        //console.log("the products price is ",product.price);
        let cartCost =localStorage.getItem('totalCost');
        
        console.log('My cart cost is',cartCost);

        if(cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost" , cartCost + product.price );
        }
        else{
            localStorage.setItem("totalCost",product.price);
        }
          
        

 }
 

 function displayCart(){
   let cartItems =localStorage.getItem("productsIncart");
   cartItems= JSON.parse(cartItems);
   let productContainer=document.querySelector(".products");
   let cartCost =localStorage.getItem('totalCost');
 
   if(cartItems  &&  productContainer){
      
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div class="product">
        <div> <img src="Photos/${item.tag}.png">
        <span>${item.prod}</span>
        </div>
        <div class="price">$${item.price},00</div>
        <div class="quantity"> <span>${item.inCart}</span></div>
        <div class="total">$${item.inCart * item.price},00</div>
        </div>
        `
        
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
    
    <h4 class="basketTotalTittle">
      Basket Total
      </h4>
    
   
    <h4 class="basketTotal"> 
      $${cartCost},00
      </h4>
   
    </div>

    `


   }

 }

 onLoadCartNumbers();
 displayCart();
 btt();