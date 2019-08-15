'use strict';
// checkbox

//let checkbox =document.getElementById('discount-checkbox');// тоже самое что и снизу - этот варик лучше по id получать
//(для одного чекбокса - ниже переписали чтобы для класса былоо - по команде ищем все элементы этого класса)

 function toggleCgeckbox(){
     const checkbox =document.querySelectorAll('.filter-check_checkbox');
     checkbox.forEach(function(elem){
         elem.addEventListener('change', function(){
             if(this.checked){
                 this.nextElementSibling.classList.add('checked');
             } else {
                 this.nextElementSibling.classList.remove('checked');
             }
         });
     });
 }

 toggleCgeckbox();

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
function toggleCart(){
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
}

toggleCart();
// конец корзины
// работа с товаром
function addCart(){
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const count = document.querySelector('.counter');
    const cards = document.querySelectorAll('.goods .card'); // получаем все карточки в обёртке goods


    cards.forEach((card)=>{
        const btn = card.querySelector('button');
        btn.addEventListener('click', ()=>{
            const cardClone = card.cloneNode(true);// если true всё внутри скопирует
            cartWrapper.appendChild(cardClone);
            //cartEmpty.remove();// убрали(не удалили!!) надпись что корзина пуста - если добавляем
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent='Удалить из корзины';
            removeBtn.addEventListener('click', ()=> {
                cardClone.remove();
                showData();
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardPrice = cartWrapper.querySelectorAll('.card-price');// цена в корзине
        const cardTotal=document.querySelector('.cart-total span');
        count.textContent = cardsCart.length;// текст поменяли - быстрее чем html
        let sum = 0;
        cardPrice.forEach((elem)=>{

            let price = parseFloat(elem.textContent); // урезаем если сразу увидем не число
            sum += price;
        });

        cardTotal.textContent = sum;

        if(cardsCart.length !== 0){
            cartEmpty.remove();
        } else{
            cartWrapper.appendChild(cartEmpty); // в оболочку cartWrapper вставили - склонировали кнопку
        }
    }
}

addCart();
// end работы

// фильтр акции - сказали не самый лучший способ

function actionPage(){
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const goods = document.querySelector('.goods');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn =  document.querySelector('.search-btn');

    // если есть акция
    discountCheckbox.addEventListener('click',()=>{
        cards.forEach((card)=>{
            if(discountCheckbox.checked)
            {
                if(!card.querySelector('.card-sale')){
                    card.parentNode.style.display='none';// обратились к родителю карточки
                }
            } else {
                card.parentNode.style.display='';
            }

        });
    });

// если ввели цену
    function filterPrice(){
        cards.forEach((card)=>{
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            if((min.value && price < min.value) || (max.value && price > max.value)){

                card.parentNode.remove();
            } else{
                goods.appendChild(card.parentNode);
            }

        });
    }
    min.addEventListener('change',filterPrice); //  скобочки писать не надо - иначе сразу вызовет
    max.addEventListener('change',filterPrice);

// поиск в строке
    searchBtn.addEventListener('click', ()=> {
        const searchText = new RegExp(search.value.trim(),'i'); // получаем регулярное выражение из текста
        // trim - обрезает пробелы, i - с ним не важен регистр
        cards.forEach((card)=>{
            const title = card.querySelector('.card-title');
            if(!searchText.test(title.textContent)){
                card.parentNode.remove();
            } else{
                goods.appendChild(card.parentNode);
            }
        });
        search.value='';


    });
}

actionPage();


//конец фильтра