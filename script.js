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

// Cek apakah user sudah pernah rating
function hasUserRated() {
    return localStorage.getItem('hasRated') === 'true';
}

// Event listener untuk menangani submit form
document.getElementById('ratingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah halaman direload

    if (hasUserRated()) {
        return; // Jika sudah pernah rating, tidak melakukan apa-apa
    }

    // Ambil rating yang dipilih oleh pengguna
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
        const ratingValue = parseInt(selectedRating.value);
        ratings.push(ratingValue); // Tambahkan rating ke array
        saveRatingsToLocalStorage(ratings); // Simpan rating ke LocalStorage
        localStorage.setItem('hasRated', 'true'); // Tandai bahwa user sudah rating
        updateRatingOutput(); // Perbarui output rating
        disableRatingForm(); // Disable form setelah rating
    }
});

// Fungsi untuk memperbarui output rating
function updateRatingOutput() {
    const totalRatings = ratings.length;
    const totalStars = ratings.reduce((acc, curr) => acc + curr, 0); // Hitung jumlah total bintang
    const averageRating = totalRatings ? (totalStars / totalRatings) : 0; // Hitung rata-rata rating

    // Update tampilan dengan rata-rata rating dan jumlah orang yang memberikan rating
    const output = `Rating: ${averageRating.toFixed(1)} dari ${totalRatings} orang.`;
    document.getElementById('ratingOutput').textContent = output;
}

// Fungsi untuk men-disable form rating
function disableRatingForm() {
    document.getElementById('ratingForm').querySelectorAll('input, button').forEach(el => {
        el.disabled = true;
    });
}

// Tampilkan output rating saat halaman dimuat pertama kali
updateRatingOutput();

// Disable form jika user sudah pernah rating
if (hasUserRated()) {
    disableRatingForm();
}