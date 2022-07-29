const app = require("express")();
var bodyParser = require("body-parser");
var cors = require("cors");
const jsonParser = bodyParser.json()
const port = 8080

const Foods = [
    { id: 0, name: "Lasagne", price: 50, ingredients: ["Pasta", "Mince", "Sauce", "Cheese"] },
    { id: 1, name: "Burger", price: 46, ingredients: ["Patty", "Bun", "Cheese"] }
]
app.use(cors());
app.listen(
    port,
    () => console.log(`Actively listening on http://localhost:${port}`)
)

app.use((req, res, next) => {
    console.log("\nRequest: " + req.method);
    console.log("at " + Date.now());
    console.log("from " + req.socket.address()['address']);
    next();
})

app.get('/foods', (req, res) => {
    res.status(200).send(Foods)
})

app.get('/foods/:id', (req, res) => {
    food = find(Foods, { id: +req.params.id })
    food ? res.status(200).send(food) : res.status(401).send("Item does not exist");
})

app.post('/foods', jsonParser, (req, res) => {
    newItem = req.body;
    item = find(Foods, newItem);
    item ? res.send("Item already exists...") : addFood(newItem);
    res.status(200).send("Success...")
    console.log(Foods);
})

function find(arr, objx) {
    let foundItem = arr.find((objy) => {
        return objy.id === objx.id;
    });
    return foundItem;
};

function addFood(food) {
    food.id = Math.max(...Foods.map(food => food.id)) + 1;
    Foods.push(food);
}

class foods {

}