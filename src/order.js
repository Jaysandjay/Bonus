
// Check if current order
const noOrder = document.getElementById("no-order")

function isOrder(){
    if(!localStorage.getItem("currentOrder")){
        noOrder.style.visibility = "visible"
    }else{
        noOrder.style.visibility = "hidden"
    }
}
isOrder()

// get input elements
const cheeseQuantity = document.getElementById("cheese")
const pepperoniQuantity = document.getElementById("pepperoni")
const meatloversQuantity = document.getElementById("meatlovers")
const veggieQuantity = document.getElementById("veggie")

const addBtn = document.getElementById("add")

addBtn.addEventListener("click", function(){
    
})