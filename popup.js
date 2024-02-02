// doing here so that wont conflict with mengli

// script.js
const helpButton = document.getElementById('helpButton');
const modal = document.getElementById('myModal');
const pages = document.querySelectorAll('.page');
const nextPageButton = document.getElementById('nextPage');
const prevPageButton = document.getElementById('prevPage');

let currentPage = 0;

helpButton.addEventListener('click', () => {
    modal.style.display = 'block';
    showPage(currentPage);
});

nextPageButton.addEventListener('click', () => {
    currentPage = (currentPage + 1) % pages.length;
    showPage(currentPage);
});

prevPageButton.addEventListener('click', () => {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    showPage(currentPage);
});

function showPage(index) {
    pages.forEach((page, i) => {
        page.style.display = i === index ? 'block' : 'none';
    });
}
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}