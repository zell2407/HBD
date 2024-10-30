// Fungsi untuk mengetik teks
function typeWriter(text, element, delay) {
    let i = 0;
    element.style.display = "block";
    element.classList.add("show");
    element.innerHTML = ''; // Reset konten

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, delay);
        }
    }
    typing();
}

// Fungsi untuk membuat bintang
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}

// Event handler saat halaman dimuat
window.onload = function() {
    const birthdaySong = document.getElementById('birthdaySong');
    const grass = document.querySelector('.grass');
    const titleElement = document.getElementById('birthdayTitle');
    const messageElement = document.getElementById('birthdayMessage');
    const container = document.querySelector('.fireworkdiv');

    if (!birthdaySong || !grass || !titleElement || !messageElement || !container) {
        console.error('Beberapa elemen tidak ditemukan!');
        return;
    }

    swal({
        title: "Tekan OK",
        text: "Setelah menekan OK, maka akan otomatis memutar lagu dan pindah ke page selanjutnya",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willPlay) => {
        if (willPlay) {
            swal("Hope u like it!", {
                icon: "success",
            }).then(() => {
                birthdaySong.play();
                typeWriter("Happy Birthday, Lisza Indana Zulfa", titleElement, 200);

                // Event handler untuk lagu
                birthdaySong.addEventListener('play', () => {
                    // Mengubah background setelah 9 detik
                    setTimeout(() => {
                        document.body.style.backgroundColor = 'black';
                        grass.style.display = 'none';
                        createStars();

                        // Menambahkan animasi untuk memindahkan teks ke atas
                        titleElement.classList.add("move-up");

                    }, 9000);

                    // Menampilkan pesan setelah 10 detik
                    setTimeout(() => {
                        const birthdayText = `Selamat ulang tahun yang ke-19, Lisza! 🎉 Usia 19 adalah langkah pertama menuju petualangan dewasa, dan aku yakin kamu akan menjalaninya dengan penuh semangat dan keberanian. Semoga setiap harimu dipenuhi dengan tawa, cinta, dan kebahagiaan yang melimpah. 💫

Kamu sudah mencapai banyak hal, dan masa depanmu penuh dengan kesempatan menakjubkan yang menunggu untuk diraih. Ingatlah bahwa kamu memiliki semua kekuatan untuk mewujudkan mimpi-mimpimu. Jangan pernah ragu untuk terus berusaha dan tetap menjadi dirimu yang istimewa!

Semoga semua keinginanmu terkabul dan di usia ini membawa kebahagiaan luar biasa yang tak terlupakan. 🎂💖`;
                        
                        typeWriter(birthdayText, messageElement, 30);
                    }, 10000);

                    // Memulai fireworks setelah 9.5 detik
                    setTimeout(() => {
                        if (window.Fireworks && window.Fireworks.default) {
                            const fireworks = new window.Fireworks.default(container, {
                                autoresize: true,
                                opacity: 0.5,
                                acceleration: 1.05,
                                friction: 0.97,
                                gravity: 1.5,
                                particles: 50,
                                traceLength: 3,
                                traceSpeed: 10,
                                explosion: 5,
                                intensity: 30,
                                flickering: 50,
                                lineStyle: 'round',
                                hue: { min: 0, max: 360 },
                                delay: { min: 30, max: 60 },
                                rocketsPoint: { min: 50, max: 50 },
                                lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
                                brightness: { min: 50, max: 80 },
                                decay: { min: 0.015, max: 0.03 },
                                mouse: { click: false, move: false, max: 1 }
                            });
                            fireworks.start();
                        } else {
                            console.error("Library Fireworks tidak ditemukan!");
                        }
                    }, 9500);
                });
            });
        } else {
            swal("Harus pake laguu, refresh web cepett!");
        }
    });
};