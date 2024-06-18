document.addEventListener("DOMContentLoaded", function() {
    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('list');
            const books = data.books;

            for (let i = 0; i < books.length; i++) {
                const book = books[i];
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <a href="/detailBuku/${book.id}">
                        <img src="${book.image}" class="card-img-top" alt="${book.name}">
                        <div class="card-body">
                            <p class="card-author">${book.bookAuthor}</p>
                            <h5 class="card-title">${book.name}</h5>
                        </div>
                    </a>
                `;
                list.appendChild(card);
            }
        })
        .catch(error => console.error('Error:', error));
});
