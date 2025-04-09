
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

// Declare pizza prices
const PRICES = {
    cheese: 10,
    pepperoni: 15,
    meatlovers: 20,
    veggie: 20
}

// get input elements
const cheeseQuantity = document.getElementById("cheese")
const pepperoniQuantity = document.getElementById("pepperoni")
const meatloversQuantity = document.getElementById("meatlovers")
const veggieQuantity = document.getElementById("veggie")
const inputArray = [
    cheeseQuantity,
    pepperoniQuantity,
    meatloversQuantity,
    veggieQuantity
]

const addBtn = document.getElementById("add")

function validate(){
    if(
        cheeseQuantity.value != 0 ||
        pepperoniQuantity.value != 0 ||
        meatloversQuantity.value != 0 ||
        veggieQuantity.value != 0
    ){
        return true
    }else{
        return false
    }
}

function isEmpty(pizza){
    if(parseInt(pizza.value) > 0){
        return false
    }else{
        return true
    }
}

function getPrice(pizza, quantity){
    let price = PRICES[pizza]
    let total = price * quantity
    return total
}

function getTotal(order){
    let total = 0
    for(const pizza in order){
        total += order[pizza].price
    }
    return total
}


function storeOrder(){
    let order = {}
    for(const input of inputArray){
        if(!isEmpty(input)){
            let key = input.id
                order[key] = {
                    quantity: input.value,
                    price: getPrice(key, input.value)
                }
        }
    }
    order.total = getTotal(order)
    localStorage.setItem("currentOrder", JSON.stringify(order))
}

function updateOrderDisplay(){
    
}

addBtn.addEventListener("click", function(){
    if(validate()){
        storeOrder()
        updateOrderDisplay()
    }
})