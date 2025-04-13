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

document.querySelector('.formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const emailData = {
        to: 'marcostuliogc86@gmail.com',
        subject: `Contato de ${nome}`,
        body: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
    };

    try {
        const response = await fetch('https://api.mailjet.com/v3.1/send', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('60c83577a5588bfbb35723c44c61ece8:0120e4e89947972cca584ece9071031d')
            },
            body: JSON.stringify({
            Messages: [
                {
                From: {
                    Email: `${email}`,	
                    Name: `${nome}`
                },
                To: [
                    {
                    Email: emailData.to,
                    Name: emailData.to
                    }
                ],
                Subject: emailData.subject,
                TextPart: emailData.body
                }
            ]
            })
        });

        if (response.ok) {
            alert('Email enviado com sucesso!');
        } else {
            alert('Erro ao enviar o email. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar o email. Verifique sua conexão.');
        console.log('Erro:', error);
    }
});