
export function cambioVentana(src){
    if(typeof src === "string" && src.trim() !== ""){
      
        window.location.href=src;
    }else{
        alert("la ruta tiene algun error");
    }
}
export function showModal() {
    const modal = document.querySelector('.poop');
    if (modal) modal.classList.add('active');
}

export function hideModal() {
    const modal = document.querySelector('.poop');
    if (modal) modal.classList.remove('active');
}


export function initModal(redirectUrl = '../html/selectorAdmin.html') {
    const btnExit = document.querySelector('.btn-fondo');
    const yesBtn = document.getElementById('yes');
    const noBtn = document.getElementById('no');

    if (btnExit) {
        btnExit.addEventListener('click', showModal);
    }
    if (yesBtn) {
        yesBtn.addEventListener('click', () => cambioVentana(redirectUrl));
    }
    if (noBtn) {
        noBtn.addEventListener('click', hideModal);
    }
}