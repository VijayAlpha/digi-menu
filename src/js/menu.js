const dishMarkUp = (dish) => {
    return `
    <div class="recipe__details flex__btw" id="${dish._id}">
    <div class="flex flex__btw" style="flex: 1">
      <div class="recipe__info">
        <span class="recipe__info-data recipe__info-data--people"
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
        <svg class="recipe__info-icon">
          <use href="src/img/icons.svg#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people"
          >0</span
        >
        <span class="recipe__info-text"></span>
      </div>
    </div>
    <div class="flex">
      <div class="recipe__user-generated">
        <svg>
          <use href="src/img/icons.svg#icon-minus-circle"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg>
          <use href="src/img/icons.svg#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>
    `
}

const dishList = (data) => {
    return `
        <div class="flex flex__btw">
            <p class="preview__publisher">${data.dishName}</p>
            <p class="preview__publisher">${data.Servings}</p>
        </div>`
}

const elementResult = document.querySelector('.dish-box');

const renderResult = (data)=>{
    data.forEach((item)=>{
        elementResult.insertAdjacentHTML('afterbegin' , dishMarkUp(item));
    })
}


const init = ()=>{

    fetch('http://127.0.0.1:3000/getDish')
    .then(response => response.json())
    .then(data => {
      console.log(data.dish);
        renderResult(data.dish)
    });
}

init();