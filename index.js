// Create variables to store the json addresses
const hotDrinks = "http://localhost:3000/hot_drinks";
const juices = "http://localhost:3000/juices";
const snacks = "http://localhost:3000/snacks";
const report = "http://localhost:3000/report"

// Create a resources to store transactions before updating the server
const totalSales = 0;

// Function renders names of hot drinks in a list
const hotDrinksList = () =>{
    fetch(hotDrinks)
    .then(res => res.json())
    .then(data =>{
        data.forEach(element => {
            // Create an id to use later
            const hotDrinksId = element.id;
            // Const set price of commodity
            const price = 40;
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
                    billingPage(hotDrinks, hotDrinksId, price, quantityPerUnit)
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
            // Create cost per unit
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
                    billingPage(juices, juicesId,price, quantityPerUnit)
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
            // Create cost per unit
            const quantityPerUnit = 250;
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
                    billingPage(snacks, snacksId, price, quantityPerUnit)
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
const billingPage = (productUrl, productId, price, quantityPerUnit) =>{
    const buy = document.querySelector("#buy");
    // Append html as child
    buy.innerHTML = `
    <label style="font-size:1.2vw"  for="twenty" class="label">Eneter the number of KES 20 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="twenty" class="input" name="twenty" placeholder="">
    <br> 
    <label style="font-size:1.2vw"  for="ten" class="label">Eneter the number of KES 10 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="ten" class="input" name="twenty" placeholder="">
    <br> 
    <label style="font-size:1.2vw"  for="five" class="label">Eneter the number of KES  5 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="five" class="input" name="five" placeholder="">
    <br> 
    <button id="pay">Submit</button>
    `;
    document.querySelector("#pay").addEventListener("click", event => {
        // Enable customer to confirm payment
        const confirmation = confirm("Are you sure you want to proceed with the payment?")
        if (confirmation === true){
            processTransaction(productUrl, productId, price, quantityPerUnit);
        // Prevent default behaviour of the page
        }else{
            event.preventDefault()
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

// Function process payment then posts the transactions to the server
const processTransaction = (productUrl, productId, price, quantityPerUnit) =>{
    const twentyShillings = parseInt(document.querySelector("#twenty").value) * 20;
    const tenShillings = parseInt(document.querySelector("#ten").value) * 10;
    const fiveshilings = parseInt(document.querySelector("#five").value) * 5;
    const total = 0;

    // Check if the values of currencies are numbers
    if (isNaN(twentyShillings)){
        twentyShillings = 0;
    }else if (isNaN(tenShillings)){
        tenShillings = 0;
    }else if (isNaN(fiveshilings)){
        fiveshilings = 0
    }
    total = twentyShillings + tenShillings + fiveshilings;

        // Confirm that costomer needs change
        if (total > price){
            // Define change to give to customer
            const change = total - price;
            // Amount to update in the server
            total -= change
            // Update total sales
            totalSales += total
            const processing = alert(`\nPlease take your ${change} balance\n\nWelcome again 😊`)
            
        }
        const processing = alert(`\n\nWelcome again 😊`)
        
}

// Update Server
const updateTransaction = (productUrl, productId, price, quantityPerUnit) =>{
    const updates = {
        quantity: quantityPerUnit,
        sales: price
    }
    // Make a PATCH request to the server
    fetch(`${productUrl/productId}`, {
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

