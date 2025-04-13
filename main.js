const phrases = [
    "Marcos Túlio.",
    "Urso Polar.",
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 150; // Velocidade de digitação em milissegundos
const h1Element = document.getElementById("mudar"); // Corrigido o método

function type() {
    if (currentCharIndex < phrases[currentPhraseIndex].length) {
        h1Element.textContent += phrases[currentPhraseIndex].charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(type, typingSpeed);
    } else {
        // Aguarda um tempo antes de apagar o texto
        setTimeout(deleteText, 1000);
    }
}

function deleteText() {
    if (currentCharIndex > 0) {
        h1Element.textContent = phrases[currentPhraseIndex].substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(deleteText, typingSpeed);
    } else {
        // Muda para a próxima frase
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(type, 500); // Aguarda um tempo antes de começar a digitar a próxima frase
    }
}

// Inicia o efeito de digitação
type();