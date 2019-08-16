export default function getData(){
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