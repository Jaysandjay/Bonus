import {
    Grid,
    html
} from "https://unpkg.com/gridjs?module";


// Check if current order
const noOrder = document.getElementById("no-order")
const currentOrderDiv = document.getElementById("current-order")

function isOrder(){
    if(!localStorage.getItem("currentOrder")){
        noOrder.style.visibility = "visible"
        currentOrderDiv.style.visibility = "hidden"
        console.log("none")
    }else{
       noOrder.style.visibility = "hidden"
       currentOrderDiv.style.visibility = "visible"
       updateOrderDisplay()
    }
}
isOrder()

// Declare pizza prices
const PRICES = {
    Cheese: 10,
    Pepperoni: 15,
    MeatLovers: 20,
    Veggie: 20
}

// get input elements
const cheeseQuantity = document.getElementById("Cheese")
const pepperoniQuantity = document.getElementById("Pepperoni")
const meatloversQuantity = document.getElementById("MeatLovers")
const veggieQuantity = document.getElementById("Veggie")
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
    console.log(pizza)
    console.log(PRICES)
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
            console.log(input)
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
    console.log(order)
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

function clearGrid(){
    let parent = document.getElementById("parent")
    let gridDiv = document.getElementById("order-details")
    if(parent.parentNode){
        parent.removeChild(gridDiv)
        let newDiv = document.createElement("div")
        newDiv.id = "order-details"
        parent.appendChild(newDiv)
    }
}

function updateOrderDisplay(){
    let parent = document.getElementById("parent")
    if(parent.parentNode){
        clearGrid()
    }

    new Grid({
        columns: ["Pizza", "Quantity", "Price"],
        data: createGridData()
      }).render(document.getElementById("order-details"));


}


addBtn.addEventListener("click", function(){
    if(validate()){
        storeOrder()
        updateOrderDisplay()
    }
})