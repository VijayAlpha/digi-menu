const orderMarkUp = (order) => {
    return `
    <li class="preview">
    <a class="preview__link preview__link--active" href="#23456">
      <figure class="preview__fig">
        <svg>
            <use href="src/img/icons.svg#icon-user"></use>
        </svg>
      </figure>
      <div class="preview__data preview__data--fr">
        <h4 class="preview__title preview__title--full-width">${order.Name}</h4>
        
      </div>
    </a>
  </li>
    `
}

const dishList = (data) => {
    return `
        <div class="flex flex__btw">
            <p class="preview__publisher">${data.dishName}</p>
            <p class="preview__publisher">${data.Servings}</p>
        </div>`
}

const elementResult = document.querySelector('.results');

const renderResult = (data)=>{
   console.log(data.order)
    data.order.forEach((item)=>{
        console.log(item.Name)
        
        elementResult.insertAdjacentHTML('afterbegin' , orderMarkUp(item));

        item.orders.forEach((dishItem)=>{
            document.querySelector('.preview__data').insertAdjacentHTML('beforeend' , dishList(dishItem));
        })
    })
}

const init = ()=>{

    fetch('http://127.0.0.1:3000/order')
    .then(response => response.json())
    .then(data => {
      console.log(data);
         renderResult(data)
    });
}

init();