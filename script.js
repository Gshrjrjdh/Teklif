// Elementleri al
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const proposalContainer = document.getElementById('proposalContainer');
const proposalWrapper = document.getElementById('proposalWrapper');
const mediaContainer = document.getElementById('mediaContainer');
const proposalVideo = document.getElementById('proposalVideo');
// Müzikle ilgili değişkenler silindi

let yesButtonSizeMultiplier = 1; 

// Başlangıçtaki Kalp Animasyonu
const dynamicIntroVisual = document.getElementById('dynamicIntroVisual');
function createFloatingHearts() {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-animation');
        heart.style.setProperty('--left-position', `${Math.random() * 100}%`); 
        heart.style.animationDelay = `${Math.random() * 10}s`; 
        dynamicIntroVisual.appendChild(heart);
    }
}
createFloatingHearts(); 


// "HAYIR" Butonu Mantığı
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


// "EVET" Butonu Mantığı
yesButton.addEventListener('click', () => {
    
    // Teklif ekranı gizlensin, medya alanı gösterilsin
    proposalWrapper.style.opacity = '0';
    setTimeout(() => {
        proposalWrapper.style.display = 'none';
        mediaContainer.style.display = 'block'; 
        document.getElementById('specialEffectsCanvas').style.display = 'block';
    }, 500); 

    // Başarı Efektlerini Başlat (Havai Fişek ve Çiçekler)
    triggerSuccessEffects();

    // Video Oynasın
    proposalVideo.play();
});


// Başarı Efektleri Fonksiyonu (Havai Fişek ve Çiçekler)
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
