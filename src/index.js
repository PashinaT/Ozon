'use strict';
// checkbox

//let checkbox =document.getElementById('discount-checkbox');// тоже самое что и снизу - этот варик лучше по id получать
//(для одного чекбокса - ниже переписали чтобы для класса былоо - по команде ищем все элементы этого класса)
const checkbox =document.querySelectorAll('.filter-check_checkbox');

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



// способ 2 для большого вывода галочек
checkbox.forEach(function(elem){
    elem.addEventListener('change', function(){
        if(this.checked){
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
});









//3 способ - стрелочная - если используем this  - то всё полетит
//checkbox.addEventListener('change',()=>{
//    console.log('u');
//});

//end checkbox


// корзина

const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');

btnCart.addEventListener('click', ()=>{
    modalCart.style.display ='flex';// открывает блок корзины
    document.body.style.overflow = 'hidden';
    //modalCart.style.cssText='display: flex; font-size: 30px'; // чтобы много свойств применять

});

closeBtn.addEventListener('click', ()=>{
    modalCart.style.display ='none';// закрывает блок корзины
    document.body.style.overflow = '';

});

// конец корзины
// работа с товаром
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const count = document.querySelector('.counter');
const cards = document.querySelectorAll('.goods .card'); // получаем все карточки в обёртке goods
cards.forEach((card)=>{
    const btn = card.querySelector('button');
    btn.addEventListener('click', ()=>{
        const cardClone = card.cloneNode(true);// если true всё внутри скопирует
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();// убрали(не удалили!!) надпись что корзина пуста - если добавляем
        showData();
    });
});

function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    count.textContent = cardsCart.length;// текст поменяли - быстрее чем html

}



// end работы