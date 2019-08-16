export default function actionPage(){
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
