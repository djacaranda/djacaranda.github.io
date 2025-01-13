fetch('productos.csv')
    .then(response => response.text())
    .then(csvText => {
        Papa.parse(csvText, {
            header: false,
            skipEmptyLines: true,
            complete: function(results) {
                const products = results.data;
                setupFilter(products);
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar el CSV:', error);
    });

function renderProducts(products, container) {
    container.innerHTML = '';

    products.forEach(product => {
        const [nombre, , cdad, ruta, , codigo] = product;

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = ruta.trim(); 
        img.alt = nombre;
        img.classList.add('product-img');

        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info-container');

        //const price = document.createElement('h4');
        //price.textContent = `$${precio} c/u`;

        const name = document.createElement('h3');
        name.textContent = nombre;

        const cod = document.createElement('h5');
        cod.textContent = `código: ${codigo}`;

        const bulto = document.createElement('h5');
        bulto.textContent = `cdad por bulto: ${cdad}`;

        cardInfo.appendChild(name);
        // cardInfo.appendChild(price);
        cardInfo.appendChild(cod);
        cardInfo.appendChild(bulto);

        card.appendChild(img);
        card.appendChild(cardInfo);

        container.appendChild(card);
    });
}

function setupFilter(products) {
    const container = document.querySelector('.products-container');
    const sortSelect = document.getElementById('sort-by');
    const filterSelect = document.getElementById('brand');

    function updateProducts() {
        let filteredProducts = products;

        const selectedFilter = filterSelect.value;

        if (selectedFilter != ' ') {
            filteredProducts = products.filter(product => {
                const [, , , , categoria] = product;
                return categoria.trim() === selectedFilter.trim();
            });
        }

        const sortedProducts = sortProducts(filteredProducts);

        renderProducts(sortedProducts, container);
    }

    document.getElementById('apply-filters').addEventListener('click', updateProducts);
    sortSelect.addEventListener('change', updateProducts);


    renderProducts(products, container);
}

function sortProducts(products) {
    const sortValue = document.getElementById('sort-by').value;

    switch (sortValue) {
        /*case 'price-low-high':
            return products.slice().sort((a, b) => {
                const [, priceA] = a;
                const [, priceB] = b;
                return parseFloat(priceA) - parseFloat(priceB); //  ascendente
            });
        case 'price-high-low':
            return products.slice().sort((a, b) => {
                const [, priceA] = a;
                const [, priceB] = b;
                return parseFloat(priceB) - parseFloat(priceA); //  descendente
            });*/
        case 'newest':
            return products.slice().reverse(); //  novedades
        default:
            return products;
    }
}

