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
    discountCheckbox.addEventListener('click',filter);

    // если ввели цену

    min.addEventListener('change',filter); //  скобочки писать не надо - иначе сразу вызовет
    max.addEventListener('change',filter);

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

    //ab
    function filter(){
        cards.forEach((card)=>{
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount= card.querySelector('.card-sale');

            if((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.remove();
            } else if(discountCheckbox.checked && !discount){
                card.parentNode.remove();
            } else{
                goods.appendChild(card.parentNode);
            }

            });

    }
}




//конец фильтра

//получение данных с сервера
function getData(){
    const goodsWrapper =  document.querySelector(('.goods'));
    //API - по умолчанию как get запрос
    return fetch('../db/db.json').then((response)=>{ //после загрузки файла then запускает функцию
        if(response.ok){
            return response.json();
        } else {
            throw new Error(response.status); // выкинули ошибку с кодом статуса
        }

    }).then((data) =>{
        return data;
    })
        .catch((err)=>{
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="color: red; font-size:30px">Что-то пошло не так!</div>'; //заменили на текст
        });
}
//вывод карточек товара
function renderCards(data){
    const goodsWrapper= document.querySelector('.goods');
    data.goods.forEach((good)=>{
        const card = document.createElement('div');// создали карточку
       card.className='col-12 col-md-6 col-lg-4 col-xl-3'
        card.innerHTML=`
        
                <div class="card" data-category="${good.category}">
                ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>':''} <!--условный оператор-->
                   <div class="card-img-wrapper">
                        <span class="card-img-top"
                      style="background-image: url('${good.img}')"></span>
                   </div>
                   <div class="card-body justify-content-between">
                        <div class="card-price" style="${good.sale ? 'color:red':''}">${good.price} ₽</div>
                        <h5 class="card-title">${good.title}</h5>
                        <button class="btn btn-primary">В корзину</button>
                   </div>
                </div>

        `;
        goodsWrapper.appendChild(card);// вывод карты на страницу
    });

}
// end получения данных с сервера


function renderCatalog(){
     const cards = document.querySelectorAll('.goods .card');
     const categories = new Set();
     const catalogWrapper = document.querySelector('.catalog');
     const catalogBtn = document.querySelector('.catalog-button');
     const catalogList = document.querySelector('.catalog-list');
     cards.forEach((card)=>{
         categories.add(card.dataset.category);
     });


     categories.forEach((item)=>{
         const li = document.createElement('li');
         li.textContent=item;
         catalogList.appendChild(li);
     });

     console.log(categories);

     catalogBtn.addEventListener('click',(event)=>{
        if(catalogWrapper.style.display){
            catalogWrapper.style.display='';
             } else{
            catalogWrapper.style.display='block';
        }
        if(event.target.tagName ==='LI'){
            cards.forEach((card)=>{
               if(card.dataset.category === event.target.textContent) {
                   card.parentNode.style.display="";
               }else{
                   card.parentNode.style.display="none";
               }
            });
        }
        });
}






// сделали так, чтобы сначала загружались карты а только затем выполнялись действия с ними
getData().then((data)=>{
    renderCards(data);
    toggleCart();
    toggleCgeckbox();
    actionPage();
    addCart();
    renderCatalog();
});



