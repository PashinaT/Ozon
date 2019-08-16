export default function addCart(){
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