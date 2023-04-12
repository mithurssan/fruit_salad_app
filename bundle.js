(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form");
const { extractFruit } = require("./fruit");


fruitForm.addEventListener("submit", extractFruit);





},{"./fruit":1}]},{},[2]);
