const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (n) => {
    return `<div class="product-item">
               <img src='img/product.jpg' alt='product_photo'>
                <h3>${n.title}</h3>
                <p>${n.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    let separationArr = productsList.join(' '); // убираем разделяющую запятую при выводе массива объектов, заменяя её на пробел
    console.log(productsList);
    document.querySelector('.products').innerHTML = separationArr;
};

renderPage(products);