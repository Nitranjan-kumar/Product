document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortOrder = document.getElementById('sortOrder');
    const productListing = document.getElementById('productListing');

    // Fetch categories from FakeStoreAPI
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            // Populate category filter dropdown
            categories.forEach(category => {
                const option = document.createElement('option');
                option.textContent = category;
                option.value = category;
                categoryFilter.appendChild(option);
            });

            // Trigger fetch products when categories are loaded
            fetchProducts();
        });

    // Fetch and display products from FakeStoreAPI
    function fetchProducts() {
        const search = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sortBy = sortOrder.value;

        let url = 'https://fakestoreapi.com/products';

        // Append category to URL if selected
        if (category) {
            url += `?category=${category}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(products => {
                // Filter products based on search input
                let filteredProducts = products.filter(product => product.title.toLowerCase().includes(search));

                // Sort products based on selected order
                if (sortBy === 'asc') {
                    filteredProducts.sort((a, b) => a.price - b.price);
                } else if (sortBy === 'desc') {
                    filteredProducts.sort((a, b) => b.price - a.price);
                }

                // Clear previous product listing
                productListing.innerHTML = '';

                // Display filtered and sorted products
                filteredProducts.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');
                    productItem.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        <p>${product.price}</p>
                    `;
                    productListing.appendChild(productItem);
                });
            });
    }

    // Event listeners for search input, category filter, and sort order
    searchInput.addEventListener('input', fetchProducts);
    categoryFilter.addEventListener('change', fetchProducts);
    sortOrder.addEventListener('change', fetchProducts);
});
