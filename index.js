// Defer JS file from loading until the HTML page load
document.addEventListener("DOMContentLoaded",  () => {
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
            totalSales += total; 
            // Define remaining quantity
            setTimeout(() =>{
                totalSalesUpdate(totalSales)
            }, 6600)
            let remainingQuantity = productQuantity - quantityPerUnit
            // Target the card
            let buy = document.querySelector("#buy")
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
            totalSales += total;
            // Define remaining quantity
            setTimeout(() =>{
                totalSalesUpdate(totalSales)
            }, 6600)
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
    const totalSalesUpdate = sales => {
        // First, fetch the current total sales from the server
        fetch(`${report}/1`)
            .then(res => res.json())
            .then(data => {
                const currentTotal = parseInt(data.total);
                // Add the new sales to the current total
                const updatedTotal = currentTotal + sales;
                // Create an object with the updated total
                const salesUpdate = {
                    total: updatedTotal
                };
                // Make a PATCH request to update the total sales on the server
                fetch(`${report}/1`, {
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
    // Function enables log in
    const logIn = () => {
        // Target the card
        const login = document.querySelector("#admin");
        // Append HTML to the DOM
        login.innerHTML = `
            <input style="font-size:1.2vw"  type="text" id="username" class="input" name="username" placeholder="Enter Username">
            <br>
            <input style="font-size:1.2vw"  type="text" id="password" class="input" name="password" placeholder="Enter Password">
            <button id="log">Login</button>
        `;
        // Now that the #log element exists in the DOM, you can add the event listener
        document.querySelector("#log").addEventListener("click", confirmUserDetails);
    }

    // enable log in page to populate
    document.querySelector("#log-in").addEventListener("click", logIn)

    // Confirm user details by fetching the details in the server
    const confirmUserDetails = () =>{
        // Make a request to the server to fetch user details
        fetch(`${user}/1`)
        .then(res => res.json())
        .then(data => {
            // Assign the entered username to a variable
            const userName = document.querySelector("#username").value;
            // Assign the entered password to a variable
            const userPassword = document.querySelector("#password").value;
            // Check if the password and user name is correct
            if (data.username === userName && data.password === userPassword){
                // Manipulate the HTML content
                const accessRights = document.querySelector("#admin");
                // Append to DOM
                accessRights.innerHTML = `
                <button id="report" class="log">Report</button>
                <br>
                <button id="add" class="log">Show Categories</button>
                <br>
                <form action="submit" class="remove-item">
                    <button id="remove" class="log">Remove</button>
                </form>
                `;
                // Add click event to display total sales
                document.querySelector("#report").addEventListener("click", displayReport)
                // Add click event to execute list of categories
                document.querySelector("#add").addEventListener("click", () => categoriesList(hotDrinks, juices, snacks))
                // Add click event to execute removing item
                document.querySelector("#remove").addEventListener("click", removeItem)
            }
        })
    }

    // The function displays the report from the server
    const displayReport = () =>{
        // Make a GEt request to the server
        fetch(`${report}/1`)
        .then(res => res.json())
        .then(data =>{
            const reportData = document.querySelector("#admin");
            reportData.innerHTML=`
                <p class="product" style="font-size: 1.2vw">Total Sales: ${data.total}</p> 
            `;
        })
    }

    // Function updates a new product
    const addNewProduct = link =>{
        const admin = document.querySelector("#admin")
        admin.innerHTML =`
            <input style="font-size:1.2vw"  type="text" class="entry" id="product-name" class="input" name="username" placeholder="Enter name">
            <br>
            <input style="font-size:1.2vw"  type="text" class="entry" id="quantity" class="input" name="password" placeholder="Enter quantity">
            <form id="my-new" action="submit">
                <button id="log">Submit</button>
            </form>
        `;
        document.querySelector("#my-new").addEventListener("submit", e => {
            e.preventDefault()
            const productMpya = document.querySelector("#product-name").value;
            const productQty = document.querySelector("#quantity").value;
            const productNew = {
                name: productMpya,
                quantity: productQty,
                sales: 0
            }
            // Posts a new product
            fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(productNew)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        })
        
    }

    // Function displays a dropdown of product categories
    const categoriesList = (link1, link2, link3) => {
        // Target the card to manipulate it
        const categoryList = document.querySelector("#admin");
        // Append HTML to DOM
        categoryList.innerHTML = `
            <label id="categori" for="category" class="cat">Select a Category</label>
            <select id="catego" name="category">
                <option class="category" value="http://localhost:3000/hot_drinks" selected>SteamySips</option>
                <option class="category" value="http://localhost:3000/snacks">MunchDelights</option>
                <option class="category" value="http://localhost:3000/juices">Smoothies</option>
            </select>
        `;

        // Add event listener for dropdown change
        const dropdown = document.querySelector("#catego");
        dropdown.addEventListener("click", event => {
            const selectedCategory = event.target.value;
            addNewProduct(selectedCategory);
        });

        // Initial content display
        const initialCategory = dropdown.value;
    }

    // Function populates a card to enter the item to delete
    // Function populates a card to enter the item to delete
    const populateItemToDelete = selected => {
        const populatedItemDetails = document.querySelector("#admin")
        populatedItemDetails.innerHTML = `
            <input style="font-size:1.2vw"  type="text" class="entry" id="del" class="input" name="password" placeholder="Enter quantity">
            <form id="remove-item" action="submit">
                <button id="log">Remove</button>
            </form>
        `;

        // Add a submit event to execute remove when the "Remove" button is clicked
        document.querySelector("#remove-item").addEventListener("submit", event => {
            event.preventDefault();
            // Get the value of "del" input when the form is submitted
            const whatToDelete = document.querySelector("#del").value;
            // Call the function to delete the item
            deleteItem(selected, whatToDelete);
        });
    }
    // Function populates a dropdown to select item to delete
    const removeItem = () =>{
        const toDelete =document.querySelector("#admin")
        toDelete.innerHTML= `
            <label id="categori" class="delete" for="category" class="cat">Select a Category</label>
            <select id="catego" class="dropdown" name="category">
                <option class="category" value="select"></option>
                <option class="category" value="http://localhost:3000/hot_drinks">SteamySips</option>
                <option class="category" value="http://localhost:3000/snacks">MunchDelights</option>
                <option class="category" value="http://localhost:3000/juices">Smoothies</option>
            </select>
        `;
        // Add change event listener to the dropdown
        document.querySelector(".dropdown").addEventListener("change", event => {
            const selected = event.target.value;
            // Call the function to fetch data of given item and delete
            populateItemToDelete(selected)
        })
        // Initial content display
        const initialCategory = dropdown.value;
    }

    /*
    Function sends a GEt request to the given server
    Iterates throught the server trying to match item name
    Once it locates the item, it makes another DELETE request to delete the item
    Once it is deleted, it refreshes the page
    */
    const deleteItem = (selected, whatToDelete) => {
        // Fetch data from the server
        fetch(selected)
            .then(res => res.json())
            .then(data => {
                // Search for the item to delete in the fetched data
                const itemToDelete = data.find(element => element.name === whatToDelete);
    
                if (itemToDelete) {
                    // If the item is found, delete it using its ID
                    const deleteId = itemToDelete.id;
                    fetch(`${selected}/${deleteId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    .then(res => {
                        // Handle the response if needed
                        if (res.status === 200) {
                            // Item deleted successfully (HTTP 204 No Content)
                            alert(`${whatToDelete} has been deleted successfully!`)
                            // You may want to reload the page or update the UI here
                        } else {
                            // Handle other response statuses if necessary
                            alert("Failed to delete item!")
                        }
                    })
                    .catch(error => console.log(error));
                } else {
                    alert(`Error 404\n\n${whatToDelete} not found!`)
                }
            })
            .catch(err => console.log(err));
    }

})

