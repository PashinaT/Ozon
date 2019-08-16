export default function toggleCart(){
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