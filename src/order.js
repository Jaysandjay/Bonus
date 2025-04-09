import {
    Grid,
    html
} from "https://unpkg.com/gridjs?module";


// Check if current order
const noOrder = document.getElementById("no-order")
const currentOrderDiv = document.getElementById("current-order")

function isOrder(){
    console.log(localStorage.getItem("currentOrder"))
    console.log(!localStorage.getItem("currentOrder"))
    if(!localStorage.getItem("currentOrder")){
        noOrder.style.visibility = "visible"
        currentOrderDiv.style.visibility = "hidden"
    }else{
       noOrder.style.visibility = "hidden"
       currentOrderDiv.style.visibility = "visible"
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

function createGridData(){
    let order = JSON.parse(localStorage.getItem("currentOrder"))
    let total = ["", "Total", `$${order.total}.00`]
    delete order.total
    let gridData = []
    for(const pizza in order){
        let column = []
        column.push(pizza)
        column.push(order[pizza].quantity)
        column.push(`$${order[pizza].price}.00`)
        gridData.push(column)
    }
    gridData.push(total)
    return gridData
}

function updateOrderDisplay(){
    new Grid({
        columns: ["Pizza", "Quantity", "Price"],
        data: createGridData()
      }).render(document.getElementById("order-details"));

}
updateOrderDisplay()

addBtn.addEventListener("click", function(){
    if(validate()){
        storeOrder()
        updateOrderDisplay()
    }
})