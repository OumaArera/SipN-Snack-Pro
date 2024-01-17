// Create variables to store the json addresses
const hotDrinks = "http://localhost:3000/hot_drinks";
const juices = "http://localhost:3000/juices";
const snacks = "http://localhost:3000/snacks";
const report = "http://localhost:3000/report"

// Create a resources to store transactions before updating the server
const resources = 
    {
        totalSales: 0

    }

// Function renders names of hot drinks in a list
const hotDrinksList = () =>{
    fetch(hotDrinks)
    .then(res => res.json())
    .then(data =>{
        data.forEach(element => {
            const firstList = document.createElement("div");
            firstList.className = "names";
            firstList.innerHTML = `
            <li class="li" id="li-one">${element.name}</li>
        `;
        document.querySelector("#tea-coffee").appendChild(firstList);
        document.querySelector("#li-one").addEventListener("click", () => billingPage())
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
            const secondList = document.createElement("div");
            secondList.className = "names";
            secondList.innerHTML=`
                <li class="li">${element.name}</li>
            `;
            document.querySelector("#juice").appendChild(secondList);
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
            const thirdList = document.createElement("div");
            thirdList.className = "names";
            thirdList.innerHTML = `
                <li class="li">${element.name}</li>
            `;
            document.querySelector("#snack").appendChild(thirdList)

        })
    })
}
snackList()

// Display billing page
const billingPage = () =>{
    const buy = document.querySelector("#buy");
    // buy.id="buy-div"
    buy.innerHTML = `
    <label style="font-size:1.2vw"  for="twenty">Eneter the number of KES 20 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="twenty" name="twenty" placeholder="Eneter the number of KES 20 coins">
    <br> 
    <label style="font-size:1.2vw"  for="ten">Eneter the number of KES 10 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="ten" name="twenty" placeholder="Eneter the number of KES 10 coins">
    <br> 
    <label style="font-size:1.2vw"  for="five">Eneter the number of KES  5 coins</label>
    <br> 
    <input style="font-size:1.2vw"  type="text" id="five" name="five" placeholder="Eneter the number of KES  5 coins">
    <br> 
    <button id="pay">Submit</button>
    `;
    // document.querySelector("#buy").appendChild(buy)
}

