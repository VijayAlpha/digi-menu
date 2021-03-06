const dishMarkUp = (dish) => {
  return `
    <li class="preview">
    <a class="preview__link preview__link--active" href="#23456">
      <figure class="preview__fig">
        <img src="src/img/test-1.jpg" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title preview__title--full-width">${dish.DishName}</h4>
        <p class="preview__publisher">Rs ${dish.Price}</p>
        <div class="preview__user-generated">
            ${dish.time} Mins
        </div>
      </div>
    </a>
  </li>
    `;
};

const elementResult = document.querySelector(".results");

const renderResult = (data) => {
  data.dish.forEach((item) => {
    //console.log(dishMarkUp(item))
    elementResult.insertAdjacentHTML("afterbegin", dishMarkUp(item));
  });
};

// Add Dish
const elementAddDish = document.querySelector("#addDishForm");

elementAddDish.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await axios({
      method: "POST",
      url: "https://digi-menu-api.herokuapp.com/addDish",
      data: {
        DishName: document.getElementById("DishName").value,
        Price: document.getElementById("DishPrice").value,
        time: document.getElementById("DishTime").value,
      },
    });

    location.assign("/admin.html");
  } catch (err) {
    console.log(err.response);
  }
});

const init = () => {
  if (!localStorage.getItem("loggedIn")) {
    location.assign("/error.html");
  }

  fetch("https://digi-menu-api.herokuapp.com/getDish")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      renderResult(data);
    });
};

init();
