const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const fruitNotFound = document.querySelector("#fruitNotFound p");


function extractFruit(event) {
    event.preventDefault();
    fetchFruitData(event.target.fruitInput.value);
    event.target.fruitInput.value = "";
}

let cal = 0;

function addFruit(fruit) {
    const li = document.createElement("li");
    li.textContent = fruit.name + " " + fruit.nutritions.calories + " calories";
    li.addEventListener("click", () => removeFruit(fruit.nutritions.calories), { once: true });
    fruitList.appendChild(li);

    cal += fruit.nutritions.calories;
    if (cal) {
        fruitNutrition.classList.add("total");
    }
    fruitNutrition.textContent = `${cal} calories`;
}

function removeFruit(calories) {
    const choice = confirm("Are you sure?");
    if (choice) {
        event.target.remove();
        cal -= calories;
        fruitNutrition.textContent = `${cal} calories`;
    }
}


function fetchFruitData(fruit) {
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then(data => {
            console.log("name", data.name);
            addFruit(data);
        })
        .catch(e => console.log(e));

}

function processResponse(resp) {
    if (resp.ok) {
        return resp.json()
    } else if (resp.status === 404) {
        fruitNotFound.textContent = "Fruit not found, please try again!";
        setTimeout(function () {
            fruitNotFound.textContent = "";
        }, 800);
    } else {
        throw `${resp.status} error!`;
    }
}


module.exports = { extractFruit, removeFruit };
