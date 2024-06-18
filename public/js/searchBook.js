document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const list = document.querySelector('.list');
    const filterMenuItems = document.querySelectorAll('.filter-menu .filter-item a');

    let books = [];


    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            books = data.books;
        })
        .catch(error => console.error('Error loading data:', error));

    // Fungsi untuk menampilkan hasil pencarian
    function displayResults(results) {
        searchResults.innerHTML = ''; 
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No books found.</p>';
            return;
        }

        results.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'card';
            bookElement.innerHTML = `
                <a href="/detailBuku/${book.id}">
                    <img src="${book.image}" class="card-img-top"  alt="${book.name}">
                    <div class="card-body">
                        <p class="card-author">${book.bookAuthor}</p>
                        <h5 class="card-title">${book.name}</h5>
                    </div>
                </a>
            `;
            searchResults.appendChild(bookElement);
        });
    }

    // Fungsi untuk mencari buku
    function searchBooks(query) {
        const lowerCaseQuery = query.toLowerCase();
        const filteredBooks = books.filter(book => {
            return (
                book.name.toLowerCase().includes(lowerCaseQuery) 
                // ||
                // book.bookAuthor.toLowerCase().includes(lowerCaseQuery) ||
                // book.category.toLowerCase().includes(lowerCaseQuery) ||
                // book.penerbit.toLowerCase().includes(lowerCaseQuery)
            );
        });
        displayResults(filteredBooks);
        list.style.display = 'none'; 
        searchResults.style.display = 'flex'; 
    }

    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        if (query.trim() === "") {
            searchResults.style.display = 'none'; 
            list.style.display = 'flex'; 
        } else {
            searchBooks(query);
        }
    });

    // Event listener untuk menu filter
    filterMenuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const category = event.target.getAttribute('data-filter').toLowerCase(); // Ambil kategori dari data-filter
            const filteredBooks = books.filter(book => book.category.toLowerCase() === category);
            displayResults(filteredBooks);
            searchResults.style.display = 'flex'; // Tampilkan hasil pencarian
            list.style.display = "none"; // Sembunyikan elemen dengan ID list
        });
    });
});
