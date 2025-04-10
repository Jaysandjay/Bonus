import {
    Grid,
    html
} from "https://unpkg.com/gridjs?module";

const spanName = document.getElementById("user-name")
const noHistoryDiv = document.getElementById("no-history")
const noUserDiv = document.getElementById("no-user")
const loggedInDiv = document.getElementById("logged-in")
const ordersDiv = document.getElementById("orders")
const name = ""

function getUser(){
    let user = JSON.parse(localStorage.getItem("currentUser"))
    return user
}

function getName(){
    let user = JSON.parse(localStorage.getItem("currentUser"))
    return user.name
}

function isHistory(){
    let user = getUser()
 
    if (Object.keys(user.history).length === 0 ) {
        return false;
    }else{
        return true
    }
}
    

function getOrders(){
    let user = getUser()
    let history = user.history
    return history
}

function clearGrid(){
    let parent = document.getElementById("orders-container")
    let gridDiv = document.getElementById("orders")
    if(parent.parentNode){
        parent.removeChild(gridDiv)
        let newDiv = document.createElement("div")
        newDiv.id = "orders"
        parent.appendChild(newDiv)
    }
}

function renderGrid(date, order, elementId){
    let parent = document.getElementById("orders-container")
    if(parent.parentNode){
        clearGrid()
    }

    // createDiv(elementId)
    const gridDiv = document.createElement("div")
    const tempDiv = document.createElement("div")
    gridDiv.id = elementId
    ordersDiv.appendChild(gridDiv)
    console.log(gridDiv)

    console.log(gridDiv)
    new Grid({
        columns: ["Pizza", "Quantity", "Price"],
        data: createGridData(order)
      }).render(ordersDiv);

      console.log(tempDiv)
      gridDiv.appendChild(tempDiv)
      console.log(ordersDiv)

}


function createDiv(elementId){
    const gridDiv = document.createElement("div")
    gridDiv.id = elementId
    ordersDiv.appendChild(gridDiv)
    console.log(gridDiv)
}


function showOrders(){
    let orders = getOrders()
    let elementId = 1
    for(const idDate in orders){
        renderGrid(idDate, orders[idDate], elementId.toString())
        elementId += 1
    }
}

function createGridData(order){
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

function checkLoggin(){
    if(localStorage.getItem("loggedIn") != "true"){
        // Not logged in
        console.log("not logged in")
        loggedInDiv.style.visibility = "hidden"
        noUserDiv.style.visibility = "visible"
    }else{
        // If logged in
        let userName = (localStorage.getItem("currentUser"))
        spanName.textContent = getName()
        loggedInDiv.style.visibility = "visible"
        if(isHistory()){
    
            noHistoryDiv.style.visibility = "hidden"
            showOrders()
        }else{
            noHistoryDiv.style.visibility = "visible"
        }
        noUserDiv.style.visibility = "hidden"
    }
}

checkLoggin()