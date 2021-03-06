const dishMarkUp = (dish) => {
  return `
    <div class="recipe__details flex__btw" id="${dish._id}">
    <div class="flex flex__btw" style="flex: 1">
      <div class="recipe__info">
        <span class="recipe__info-data recipe__info-data--people" id="name-${dish._id}"
          >${dish.DishName}</span
        >
        <span class="recipe__info-text" style="margin-left: 4rem">
          Rs ${dish.Price}</span
        >
      </div>

      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="src/img/icons.svg#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes"
          >${dish.time}</span
        >
        <span class="recipe__info-text">min</span>
      </div>
      <div class="recipe__info">
      </div>
    </div>
    <div class="flex">
      <div class="recipe__user-generated" data-price="${dish.Price}">
        <svg>
          <use href="src/img/icons.svg#icon-minus-circle"></use>
        </svg>
      </div>
      <button class="btn--round plus-btn" data-price="${dish.Price}">
        <svg id="plus-btn">
          <use href="src/img/icons.svg#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>
    `;
};

const orderListMarkup = (data) => {
  return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="src/img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${data[1]}</div>
    <div class="recipe__description">${data[0]}</div>
  </li>`;
};

const headingName = `<h2 class="heading--2" style="flex: 1 ; margin: 2rem ; display:block">Side Dish</h2>`

const elementResult = document.querySelector(".dish-box");
const elementAddOrder = document.querySelector(".orderListHere");
const elementOrder = document.querySelector("#place-order-btn");
const state = {
  order: [],
  price: 0,
};

let finalOrder = [];
let placeOrder = [];

const renderResult = (data) => {
  data.forEach((item , i ) => {
    if(i == 9){
      elementResult.insertAdjacentHTML("beforeend", headingName);
    }
    elementResult.insertAdjacentHTML("beforeend", dishMarkUp(item));
  });
};

const renderOrder = (data) => {
  data.forEach((item) => {
    elementAddOrder.insertAdjacentHTML("beforeend", orderListMarkup(item));
  });
};

const convertOrder = (order) => {
  console.log(order);

  order.forEach((el, i) => {
    placeOrder.push({
      dishName: el[0],
      Servings: el[1],
    });
  });
};

elementResult.addEventListener("click", (e) => {
  console.log(e.target.className);
  if (e.target.parentElement.className == "btn--round plus-btn") {
    //Getting dish Id
    console.log(e.target.className);
    const dishId = e.target.parentElement.parentElement.parentElement.id;
    //Calculating total price
    const price = e.target.parentElement.dataset.price;
    state.price += parseInt(price);
    document.getElementById("bill-total-price").innerText = state.price;

    //Adding count of dish
    const counts = {};
    state.order.push(document.getElementById(`name-${dishId}`).innerText);
    elementAddOrder.innerHTML = "";

    state.order.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    finalOrder = Object.entries(counts);
    renderOrder(finalOrder);
    console.log(finalOrder);
  }

  if (e.target.parentElement.className == "recipe__user-generated") {
    const dishId = e.target.parentElement.parentElement.parentElement.id;
    const index = state.order.indexOf(
      document.getElementById(`name-${dishId}`).innerText
    );
    const counts = {};

    //Calculating total price
    if (state.price > 0) {
      const price = e.target.parentElement.dataset.price;
      state.price -= parseInt(price);

      document.getElementById("bill-total-price").innerText = state.price;
    }

    if (index > -1) {
      state.order.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(state.order);
    elementAddOrder.innerHTML = "";

    state.order.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    // console.log(Object.getOwnPropertyNames(counts))
    finalOrder = Object.entries(counts);
    renderOrder(finalOrder);
    console.log(finalOrder);
  }
});

elementOrder.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    convertOrder(finalOrder);
    console.log(placeOrder);

    const data = {
      Name: document.getElementById("costumerName").value,
      orders: placeOrder,
    };
    await axios({
      method: "POST",
      url: "https://digi-menu-api.herokuapp.com/order",
      data,
    });
    localStorage.setItem("totalPrice", state.price);
    localStorage.setItem("name", data.Name);

    const pay = document.querySelector('input[name="payment"]:checked').value;
    if (pay == "card") location.assign("/payment.html");
    else location.assign("/cart.html");
  } catch (err) {
    console.log(err);
  }
});

const init = async () => {
  await fetch("https://digi-menu-api.herokuapp.com/getDish")
    .then((response) => response.json())
    .then((data) => {
      renderResult(data.dish);
    });
};

init();
