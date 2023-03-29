const sidebar = document.getElementById('sidebar');
const btnClose = document.querySelector('.btn-close');
const btnOpen = document.getElementById('btn-open');
const main = document.getElementById('main');
var isopen = true;

main.style.marginLeft = "250px";
console.log(btnClose);
btnClose.addEventListener('click', () => {
    sidebar.style.display = 'none';
    main.style.marginLeft = "0";
});

btnOpen.addEventListener('click', () => {
    isopen = !isopen;
    if (isopen) {
        sidebar.style.display = 'block';
        main.style.marginLeft = "250px";
    } else {
        sidebar.style.display = 'none';
        main.style.marginLeft = "0";
    }

})