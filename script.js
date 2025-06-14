function saveRatingsToLocalStorage(ratings) {
    localStorage.setItem('ratings', JSON.stringify(ratings));
}

// Fungsi untuk mengambil data rating dari LocalStorage
function getRatingsFromLocalStorage() {
    const storedRatings = localStorage.getItem('ratings');
    return storedRatings ? JSON.parse(storedRatings) : [];
}

// Array untuk menyimpan semua rating (diambil dari LocalStorage)
let ratings = getRatingsFromLocalStorage();

// Event listener untuk menangani submit form
document.getElementById('ratingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah halaman direload

    // Ambil rating yang dipilih oleh pengguna
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
        const ratingValue = parseInt(selectedRating.value);
        ratings.push(ratingValue); // Tambahkan rating ke array
        saveRatingsToLocalStorage(ratings); // Simpan rating ke LocalStorage
        updateRatingOutput(); // Perbarui output rating
    }
});

// Fungsi untuk memperbarui output rating
function updateRatingOutput() {
    const totalRatings = ratings.length;
    const totalStars = ratings.reduce((acc, curr) => acc + curr, 0); // Hitung jumlah total bintang
    const averageRating = totalStars / totalRatings; // Hitung rata-rata rating

    // Update tampilan dengan rata-rata rating dan jumlah orang yang memberikan rating
    const output = `Rating: ${averageRating.toFixed(1)} dari ${totalRatings} orang.`;
    document.getElementById('ratingOutput').textContent = output;
}

// Tampilkan output rating saat halaman dimuat pertama kali
updateRatingOutput();