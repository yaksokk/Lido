document.addEventListener("DOMContentLoaded", function() {
    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('container-book-detail');
            const books = data.books;


            document.addEventListener("DOMContentLoaded", function() {
                const path = window.location.pathname;
                const idPattern = /\/detailBuku\/(\d+)/;
                const match = path.match(idPattern);
                
                if (!match) {
                    console.error('No book ID provided in the URL.');
                    return;
                }
            
                const bookId = match[1];
            
                fetch(`/api/book/${bookId}`)
                    .then(response => response.json())
                    .then(book => {
                        if (!book) {
                            console.error('Book not found.');
                            return;
                        }
            
                        const contentDiv = document.getElementById('container-book-detail');
                        const formattedDescription = book.bookDescription ? book.bookDescription.replace(/\n/g, '<br>') : 'Tidak ada deskripsi tersedia.';
            
                        const bookContent = `
                            <div class="content">
                                <div class="left">
                                    <div class="card">
                                        <img src="${book.image}" alt="">
                                    </div>
                                    <div>
                                        <span class="reading"><a href="${book.pdf}">Baca Buku</a></span>
                                    </div>
                                </div>
                                <div class="middle">
                                    <div class="desc-book">
                                        <p class="book-author">${book.bookAuthor}</p>
                                        <span class="book-title">${book.name}</span>
                                        <div class="desc">
                                            <h5>Deskripsi Buku</h5>
                                            <hr>
                                            <p>${formattedDescription}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="details-book">
                                        <h3>Detail buku</h3>
                                        <hr>
                                        <ul class="detail-book-contents">
                                            <li class="penerbit">Penerbit: <span>${book.penerbit}</span></li>
                                            <li class="tahun">Tahun terbit: <span>${book.tahunTerbit}</span></li>
                                            <li class="kategori">Kategori: <span>${book.category}</span></li>
                                            <li class="halaman">Jumlah Halaman: <span>${book.halaman}</span></li>
                                            <li class="bahasa">Bahasa: <span>${book.bahasa}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        `;
            
                        contentDiv.innerHTML = bookContent;
                    })
                    .catch(error => console.error('Error:', error));
            });
            
            // Fungsi untuk menampilkan detail buku
            window.showBookDetail = function(bookId) {
                const book = books.find(b => b.id === bookId);

                if (!book) {
                    contentDiv.innerHTML = 'Buku tidak ditemukan.';
                    return;
                }

                // Konversi karakter newline (\n) ke <br>
                const formattedDescription = book.bookDescription.replace(/\n/g, '<br>');

                const bookContent = `
                    <div class="content">
                        <div class="left">
                            <div class="card">
                                <img src="${book.image}" alt="">
                            </div>
                            <div>
                                <span class="reading"><a href="${book.pdf}">Baca Buku</a></span>
                            </div>
                        </div>
                        <div class="middle">
                            <div class="desc-book">
                                <p class="book-author">${book.bookAuthor}</p>
                                <span class="book-title">${book.name}</span>
                                <div class="desc">
                                    <h5>Deskripsi Buku</h5>
                                    <hr>
                                    <p>${formattedDescription || 'Tidak ada deskripsi tersedia.'}</p>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="details-book">
                                <h3>Detail buku</h3>
                                <hr>
                                <ul class="detail-book-contents">
                                    <li class="penerbit">Penerbit:                                       <span>${book.penerbit}</span></li>
                                    <li class="tahun">Tahun terbit: <span>${book.tahunTerbit}</span></li>
                                    <li class="kategori">Kategori: <span>${book.category}</span></li>
                                    <li class="halaman">Jumlah Halaman: <span>${book.halaman}</span></li>
                                    <li class="bahasa">Bahasa: <span>${book.bahasa}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;

                contentDiv.innerHTML = bookContent;
            };
        })
        .catch(error => console.error('Error:', error));
});

