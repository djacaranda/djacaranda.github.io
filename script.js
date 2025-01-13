let actual_img = 0;

function moverCarrusel(direccion) {
  const items = document.querySelectorAll('.carrusel-item');
  const totalItems = items.length;

  actual_img = (actual_img + direccion + totalItems) % totalItems; 
  const carrusel = document.querySelector('.carrusel');
  carrusel.style.transform = `translateX(-${actual_img * 100}%)`; 
}

setInterval(() => {
  moverCarrusel(1);
}, 2500);