import {
    Grid,
    html
} from "https://unpkg.com/gridjs?module";

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
const orderBtn = document.getElementById("order")


// Check if current order
const noOrder = document.getElementById("no-order")
const currentOrderDiv = document.getElementById("current-order")

function isOrder(){
    if(localStorage.getItem("currentOrder")){
        noOrder.style.visibility = "hidden"
        currentOrderDiv.style.visibility = "visible"
        return false
    }else{
       noOrder.style.visibility = "visible"
       currentOrderDiv.style.visibility = "hidden"
       setDefaults()
       return true
    }
}
isOrder()



function setDefaults(){
    if(localStorage.getItem("currentOrder")){
        let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
        for(const pizza in currentOrder){
            for(const input of inputArray){
                if(pizza === input.id){
                    input.value = currentOrder[pizza].quantity
                }
            }
        }
    }

}


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


function updateLocalUsers(current=(JSON.parse(localStorage.getItem("currentUser")))){
    const users = JSON.parse(localStorage.getItem("users"))
    console.log(users)
    console.log(current.name)
    const otherUsers =  users.filter(user => {
        if(
        user.name != current.name &&
        user.email != current.email 
        ) return true
        console.log(user.name != current.name)
        console.log(user.email != current.email)
        console.log(user.password != current.password)
        console.log(user.email)
        console.log(current.email)
        console.log(user)
       
    }
    )
    otherUsers.push(current)
    localStorage.setItem("users", JSON.stringify(otherUsers))
}

console.log(JSON.parse(localStorage.getItem("users")))

function storeToHistory(){
    if(localStorage.getItem("loggedIn")){
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const order = JSON.parse(localStorage.getItem("currentOrder"))
        const history = user["history"]
        const date = new Date
        const today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}/${date.getMilliseconds()}`
        history[today] = order
        localStorage.setItem("currentUser", JSON.stringify(user))
        updateLocalUsers(user)
    }
    
}


function clearCurrentOrder(){
    localStorage.setItem("currentOrder", "")
}


addBtn.addEventListener("click", function(){
    if(validate()){
        storeOrder()
        isOrder()
        updateOrderDisplay()
    }
})

orderBtn.addEventListener("click", function(){
    storeToHistory()
    clearCurrentOrder()
    isOrder()
    alert("Thank you for ordering! Your order will be ready for pickup in 40 min!")
})