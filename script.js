// Elementleri Al
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const proposalContainer = document.getElementById('proposalContainer');
const proposalWrapper = document.getElementById('proposalWrapper');
const mediaContainer = document.getElementById('mediaContainer');

// Sandviç Katmanları: İki ayrı video elementi
const proposalVideo1 = document.getElementById('proposalVideo1');
const proposalVideo2 = document.getElementById('proposalVideo2');

let yesButtonSizeMultiplier = 1; 

// "HAYIR" Butonu Mantığı (Mevcut mantığını koruduk, sorunsuz çalışıyor)
noButton.addEventListener('click', () => {
    // EVET butonunu büyüt
    yesButtonSizeMultiplier += 0.4; 
    yesButton.style.transform = `scale(${yesButtonSizeMultiplier})`;

    // HAYIR butonunu rastgele hareket ettir
    const containerRect = proposalContainer.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    const newLeft = Math.random() * (containerRect.width - buttonRect.width - 40) + 20;
    const newTop = Math.random() * (containerRect.height - buttonRect.height - 40) + 20;

    noButton.style.position = 'absolute';
    noButton.style.left = `${newLeft}px`;
    noButton.style.top = `${newTop}px`;
});

// "EVET" Butonu Mantığı (İlk Ekmeği Kaldırıp 1. Videoyu Başlatıyoruz)
yesButton.addEventListener('click', () => {
    // Teklif ekranı yumuşakça gizlensin, medya alanı gösterilsin
    proposalWrapper.style.opacity = '0';
    setTimeout(() => {
        proposalWrapper.style.display = 'none';
        mediaContainer.style.display = 'block'; 
        document.getElementById('specialEffectsCanvas').style.display = 'block';
        
        // İlk videoyu (Koşan çocuk) başlat
        proposalVideo1.play();
    }, 500); 
});

// --- SANDVİÇİN ORTA KATMANI VE TETİKLEYİCİSİ ---
// 1. Video bittiği an bu fonksiyon otomatik çalışacak:
proposalVideo1.addEventListener('ended', () => {
    // 1. Başarı Efektlerini Başlat (Tam o beyaz sahnede havai fişek/konfeti patlayacak)
    triggerSuccessEffects();

    // 2. İlk videoyu gizle, İkinci videoyu görünür yap
    proposalVideo1.style.display = 'none';
    proposalVideo2.style.display = 'block';

    // 3. İkinci videoyu otomatik olarak oynat
    proposalVideo2.play();
});


// Başarı Efektleri Fonksiyonu (Dokunmadım, senin yazdığın konfeti ve papatya efekti)
function triggerSuccessEffects() {
    // Havai Fişek Efekti
    const confettiDuration = 4 * 1000;
    const confettiAnimationEnd = Date.now() + confettiDuration;
    (function frame() {
        confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ffc0cb', '#e91e63', '#4CAF50', '#ffffff', '#ffd700'] });
        confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ffc0cb', '#e91e63', '#4CAF50', '#ffffff', '#ffd700'] });
        if (Date.now() < confettiAnimationEnd) { requestAnimationFrame(frame); }
    }());

    // Papatya/Çiçeklenme efekti
    setTimeout(() => {
        confetti({
            particleCount: 80, spread: 360, startVelocity: 30, decay: 0.92, gravity: 1, origin: { x: 0.5, y: 0.5 },
            colors: ['#FFFFFF', '#FFFF00', '#F0F8FF', '#ADD8E6'], 
            shapes: ['circle', 'square'] 
        });
    }, 1000); 
}
