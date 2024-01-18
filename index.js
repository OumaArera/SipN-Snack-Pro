// Create variables to store the json addresses
const hotDrinks = "http://localhost:3000/hot_drinks";
const juices = "http://localhost:3000/juices";
const snacks = "http://localhost:3000/snacks";
const report = "http://localhost:3000/report";
const user = "http://localhost:3000/user"

// Create a resources to store transactions before updating the server
let totalSales = 0;

// Function renders names of hot drinks in a list
const hotDrinksList = () =>{
    fetch(hotDrinks)
    .then(res => res.json())
    .then(data =>{
        data.forEach(element => {
            // Create an id to use later
            const hotDrinksId = element.id;
            // Const set price of commodity
            // Create cost per unit
            let sales = parseInt(element.sales)
            // Set price to 40
            const price = 40;
            // Define quantity in the server
            let productQuantity = parseInt(element.quantity)
            // Create cost per unit
            const quantityPerUnit = 250;
            // Create a div to carry the list
            const firstList = document.createElement("div");
            firstList.className = "names";
            firstList.innerHTML = `
            <li class="li" id="li-one">${element.name}</li>
        `;
            // Append the div to the DOM
            document.querySelector("#tea-coffee").appendChild(firstList);
            // Event listener populates the billing page
            firstList.querySelector(".li").addEventListener("click", () => {
                // Confirm that the product is available
                if (parseInt(element.quantity) >= 250){
                    billingPage(hotDrinks, hotDrinksId, price, quantityPerUnit, sales, productQuantity)
                // Confirm that a product is available
                }else{
                    productNotAvailable(element.name)
                }
            })
        });
    })
    .catch(err => console.log(err))
}
hotDrinksList()

// Function renders names of juices
const juiceList = () =>{
    fetch(juices)
    .then(res => res.json())
    .then(data =>{
        data.forEach(element =>{
            // Create an id to use later
            const juicesId = element.id; 
            // Const set price of commodity
            const price = 50; 
            // Define quantity in the server
            let productQuantity = parseInt(element.quantity)
            // Create cost per unit
            let sales = parseInt(element.sales)
            const quantityPerUnit = 250;
            // Create a div to carry the list
            const secondList = document.createElement("div");
            secondList.className = "names";
            secondList.innerHTML=`
                <li class="li">${element.name}</li>
            `;
            // Append the div to the DOM
            document.querySelector("#juice").appendChild(secondList);
            // Event listener populates the billing page
            secondList.querySelector(".li").addEventListener("click", () => {
                // Confirm if the product is available
                if (parseInt(element.quantity) >= 250){
                    billingPage(juices, juicesId,price, quantityPerUnit, sales, productQuantity)
                // Inform user that a product is not available
                }else{
                    productNotAvailable(element.name)
                }
            })
        })
    })
}
juiceList()

// Function renders names of snacks
const snackList = () =>{
    fetch(snacks)
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            // Create an id to use later
            const snacksId = element.id;
            // Const set price of commodity
            const price = 20;
            // Define quantity in the server
            let productQuantity = parseInt(element.quantity)
            // Create cost per unit
            let sales = parseInt(element.sales)
            // Create cost per unit
            const quantityPerUnit = 1;
            // Create a div to carry the list
            const thirdList = document.createElement("div");
            thirdList.className = "names";
            thirdList.innerHTML = `
                <li class="li">${element.name}</li>
            `;
            // Append the div to the DOM
            document.querySelector("#snack").appendChild(thirdList)
            // Event listener populates the billing page
            thirdList.querySelector(".li").addEventListener("click", () => {
                // Confirm if there is enough quantity in the server
                if (parseInt(element.quantity) >= 1){
                    billingPage(snacks, snacksId, price, quantityPerUnit, sales, productQuantity)
                // If the product is not available, customer is informed
                }else{
                    productNotAvailable(element.name)
                }
            })

        })
    })
}
snackList()

// Display billing page
const billingPage = (productUrl, productId, price, quantityPerUnit, sales, productQuantity) => {
    const buy = document.querySelector("#buy");
    // Append html as child
    buy.innerHTML = `
    <label style="font-size:1.2vw"  for="twenty" class="label">Enter the number of KES 20 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="twenty" class="input" name="twenty" placeholder="">
    <br> 
    <label style="font-size:1.2vw"  for="ten" class="label">Enter the number of KES 10 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="ten" class="input" name="ten" placeholder="">
    <br> 
    <label style="font-size:1.2vw"  for="five" class="label">Enter the number of KES 5 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="five" class="input" name="five" placeholder="">
    <br> 
    <button id="pay">Submit</button>
    `;
    document.querySelector("#pay").addEventListener("click", event => {
        // Enable the customer to confirm payment
        const confirmation = confirm("Are you sure you want to proceed with the payment?")
        if (confirmation === true){
            // Call processTransaction with the correct arguments
            processTransaction(productUrl, productId, price, quantityPerUnit, sales, productQuantity);
        // Prevent the default behavior of the page
        } else {
            event.preventDefault();
        }
    })
}

// Function informs the customer that a particular product is out of stock
const productNotAvailable = product =>{
    // Append a message to user
    const notAvailable = document.querySelector("#buy");
    // Append html to DOM
    notAvailable.innerHTML=`
        <p class="product">Sorry I have run out of ${product}</p>
        <br>
        <p class="product">Please select another one</p>
    `;

    // Schedule a page refresh after 2 seconds
    setTimeout(() => {
        window.location.reload(); // Refresh the page
        }, 2000); // 2000 milliseconds (2 seconds)
    
}

// Function processes payment then posts the transactions to the server
const processTransaction = (productUrl, productId, price, quantityPerUnit, sales, productQuantity) => {
    let twentyShillings = parseInt(document.querySelector("#twenty").value) * 20 || 0;
    let tenShillings = parseInt(document.querySelector("#ten").value) * 10 || 0;
    let fiveShillings = parseInt(document.querySelector("#five").value) * 5 || 0;
    // Define price update
    let priceUpdate = sales + price
    let total = twentyShillings + tenShillings + fiveShillings;

    // Confirm that customer needs change
    if (total > price) { // Use >= to handle the case where total === price
        // Define change to give to the customer
        const change = total - price;
        // Amount to update in the server
        total -= change;
        // Update total sales (Note: You need to implement this logic)
        totalSales += total; // You may need to update this variable properly
        // Define remaining quantity
        setTimeout(()=>{
            totalSalesUpdate(totalSales)
        }, 7000)
        let remainingQuantity = productQuantity - quantityPerUnit
        // Target the card
        let buy = document.querySelector("#buy")
        // buy.innerHTML = '';
        buy.innerHTML = `
            <br>
            <p class="product" style="font-size: 1.2vw">Please take your ${change} balance</p>
        `;
        // Schedule a message to appear after 5 seconds
        setTimeout(() => {
            // Clear the message and display "Welcome again"
            buy.innerHTML = `
            <br>
            <p class="product" style="font-size: 1.2vw">Welcome again 😊</p>`;
        }, 5000); // 5000 milliseconds (5 seconds)
        // Set timeout for the page to only update after the message has been populated
        setTimeout(() =>{
            // Updates the transaction to the server
            updateTransaction(productUrl, productId, remainingQuantity, priceUpdate)
        }, 6500)
    } else if (total === price) {
        let buy = document.querySelector("#buy");
        buy.innerHTML= `
            <p class="product" style="font-size: 1.2vw">Welcome again 😊</p>  
        `;
        // Define remaining quantity
        let remainingQuantity = productQuantity - quantityPerUnit
        setTimeout(() =>{
            updateTransaction(productUrl, productId, remainingQuantity, priceUpdate)
        }, 1500)
    }else if (total < price){
        let buy = document.querySelector("#buy");
        buy.innerHTML = `
            <p class="product" style="font-size: 1.2vw">The amount you entered is insufficient!</p> 
        `;
        // Reload page after 1.5seconds
        setTimeout(() =>{
            window.location.reload();
        }, 1500)
    }
}

// Update Server
const updateTransaction = (productUrl, productId, remainingQuantity, priceUpdate) =>{
    const updates = {
        quantity: remainingQuantity,
        sales: priceUpdate
    }
    // Make a PATCH request to the server
    fetch(`${productUrl}/${productId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body:JSON.stringify(updates)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

// Update total sales
const totalSalesUpdate = (sales) => {
    // First, fetch the current total sales from the server
    fetch(`${report}/1`)
        .then(res => res.json())
        .then(data => {
            const currentTotal = parseInt(data.total )|| 0;
            // Add the new sales to the current total
            const updatedTotal = currentTotal + sales;
            
            // Create an object with the updated total
            const salesUpdate = {
                total: updatedTotal
            };

            // Make a PATCH request to update the total sales on the server
            fetch(`${report}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(salesUpdate)
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
}

const logIn = () => {
    // Target the card
    const login = document.querySelector("#admin");
    // Append HTML to the DOM
    login.innerHTML = `
        <input style="font-size:1.2vw"  type="text" id="username" class="input" name="username" placeholder="Enter Username">
        <br>
        <input style="font-size:1.2vw"  type="text" id="password" class="input" name="password" placeholder="Enter Password">
        <button id="log">Submit</button>
    `;
    // Now that the #log element exists in the DOM, you can add the event listener
    document.querySelector("#log").addEventListener("click", confirmUserDetails);
}

// enable log in page to populate
document.querySelector("#log-in").addEventListener("click", logIn)

// Confirm user details by fetching the details in the server
const confirmUserDetails = () =>{
    fetch(`${user}/1`)
    .then(res => res.json())
    .then(data => {
        const userName = document.querySelector("#username").value;
        const userPassword = document.querySelector("#password").value;
        if (data.username === userName && data.password === userPassword){
            const accessRights = document.querySelector("#admin");
            accessRights.innerHTML = `
            <form action="submit" id="report">
                <button class="log">Report</button>
            </form>  
            <form action="submit" id="report">
                <button class="log">Add New</button>
            </form> 
            <form action="submit" id="report">
                <button class="log">Remove</button>
            </form> 
            `
        }
    })
}


