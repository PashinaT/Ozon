'use strict';
// checkbox

//let checkbox =document.getElementById('discount-checkbox');// тоже самое что и снизу - этот варик лучше по id получать
//(для одного чекбокса - ниже переписали чтобы для класса былоо - по команде ищем все элементы этого класса)





// 1 способ
//let checkbox = document.querySelector('#discount-checkbox'); подключились по id(используем решётку)
//checkbox.onchange=function(){ если навести на объект - но способ сказали устарел, нельзя две функции повесить например
 //   console.log('галочка');
//};

//2 способ(не работает для многих элементов - перепишем с циклом)
// checkbox.addEventListener('change',function(){
//     if(this.checked === true) //взяоли свойство checked у checkbox
//     {
//
//        this.nextElementSibling.classList.add('checked'); // берёт следующий элемент -ниже нашего checkbox , classList
//         // - даст весь список классов
//     } else{
//         this.nextElementSibling.classList.remove('checked'); // убрали галочку
//     }
//                                             });



// способ 1 для большого вывода галочек
// for(let i = 0;i < checkbox.length;i++){
//
//     checkbox[i].addEventListener('change', function(){
//         if(this.checked === true){
//             this.nextElementSibling.classList.add('checked');
//         } else{
//             this.nextElementSibling.classList.remove('checked');
//         }
//     });
// }


//3 способ - стрелочная - если используем this  - то всё полетит
//checkbox.addEventListener('change',()=>{
//    console.log('u');
//});

//end checkbox

// корзина



// конец корзины
// работа с товаром



// end работы

// фильтр акции - сказали не самый лучший способ





//конец фильтра

//получение данных с сервера

//вывод карточек товара

// end получения данных с сервера


import getData from './modules/getData.js';
import renderCards from './modules/renderCards.js';
import toggleCart from './modules/toggleCart.js';
import toggleCgeckbox from './modules/toggleCgeckbox.js';
import actionPage from './modules/actionPage.js';
import addCart from './modules/addCart.js';
import renderCatalog from './modules/renderCatalog.js';


(async function () { // функция которая сама себя вызвала
    const data = await getData();
    renderCards(data);
    toggleCart();
    toggleCgeckbox();
    actionPage();
    addCart();
    renderCatalog();

}());


// сделали так, чтобы сначала загружались карты а только затем выполнялись действия с ними




