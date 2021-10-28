let blockText = document.querySelector('.text_block');
document.getElementById('text_btn').addEventListener('click', () => {
    blockText.textContent = blockText.textContent.replace(/\B'|'\B/g, '"');
})