export default function toggleCgeckbox(){
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