// Seleciona elementos HTML com as classes e IDs especificados
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreButton = document.getElementById('scoreButton');
const gameOverText = document.getElementById('gameOverText');
const restartButton = document.getElementById('restartButton');
const mainMenu_Button = document.getElementById('mainMenu_Button');
const jumpSound = document.getElementById('jumpSound');
const gameOverMario = document.getElementById('gameOverMario');
const marioSoundtrack = document.getElementById('marioSoundtrack');
const levelCompleteMario = document.getElementById('levelCompleteMario');

let score = 0; // Inicializa a pontuação do jogador

marioSoundtrack.play(); // Toca a trilha sonora do jogo

// Função para atualizar o score do jogador
const updateScore = () => {
    score++; // Incrementa a pontuação
    scoreButton.textContent = `Score: ${score}`; // Atualiza o texto exibindo a pontuação

    // Verifica se o jogador atingiu a pontuação necessária para concluir a fase
    if (score >= 20) {
        gameOver = false; // Define o estado do jogo como não finalizado
        pipe.src = './images/level_end.png'; // Altera a imagem do cano para indicar o fim da fase
        desbloquearNovoPersonagem(); // Chama a função para desbloquear um novo personagem
    }
}

let personagemDesbloqueado = false; // Variável para verificar se o novo personagem foi desbloqueado

// Função para desbloquear um novo personagem
const desbloquearNovoPersonagem = () => {
    if (!personagemDesbloqueado) { // Verifica se o personagem já foi desbloqueado
        marioSoundtrack.remove(); // Remove a trilha sonora atual
        levelCompleteMario.play(); // Toca o som de desbloqueio de personagem
        mainMenu_Button.addEventListener('click', () => {
            window.location.href = "index_3.html"; // Adiciona um evento de clique ao botão de menu principal
        });
        mainMenu_Button.style.display = 'block'; // Exibe o botão de menu principal
        pipe.remove(); // Remove o cano
        personagemDesbloqueado = true; // Define que o personagem foi desbloqueado
        alert('Parabéns, você terminou a fase!'); // Exibe uma mensagem informando ao jogador que a fase foi concluída
        podePular = false; // Define que o jogador não pode mais pular
    }
}

let podePular = true; // Variável para verificar se o jogador pode pular
let saltoIniciado = false; // Variável para verificar se o salto já foi iniciado

// Função para fazer o personagem pular
const jump = () => {
    if (podePular) { // Verifica se o jogador pode pular
        mario.classList.add('jump'); // Adiciona a classe 'jump' para iniciar a animação de pulo
        jumpSound.play(); // Toca o som de pulo
        mario.src = './images/mario_jump.gif'; // Altera a imagem do personagem para a de pulo
        mario.style.width = '115px'; // Define a largura da imagem do personagem durante o pulo

        setTimeout(() => {
            mario.classList.remove('jump'); // Remove a classe 'jump' após um intervalo de tempo
            mario.src = './images/mario.gif'; // Restaura a imagem padrão do personagem
            mario.style.width = '150px'; // Restaura a largura padrão da imagem do personagem
        }, 500); // Define um atraso de 500 milissegundos (0.5 segundos) antes de restaurar a imagem e largura padrão
        updateScore(); // Chama a função para atualizar a pontuação
    }
}

let gameOver = true; // Variável para verificar se o jogo terminou

// Loop principal do jogo
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft; // Obtém a posição horizontal do cano
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', ''); // Obtém a posição vertical do personagem

    if (gameOver) { // Verifica se o jogo ainda não terminou
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) { // Verifica se o personagem colidiu com o cano
            gameOverMario.play(); // Toca o som de fim de jogo

            marioSoundtrack.remove(); // Remove a trilha sonora do jogo

            pipe.style.animation = 'none'; // Remove a animação do cano

            pipe.style.left = `${pipePosition}px`; // Mantém o cano na mesma posição

            mario.style.animation = 'marioDescend 2s forwards'; // Aplica a animação de descida ao personagem

            mario.style.bottom = `${marioPosition}px`; // Mantém o personagem na mesma posição vertical

            mario.src = './images/game-over.png'; // Altera a imagem do personagem para indicar o fim de jogo

            mario.style.width = '75px'; // Define a largura da imagem do personagem

            mario.style.marginLeft = '50px'; // Define a margem esquerda da imagem do personagem
            
            gameOverText.style.display = 'block'; // Exibe o texto de fim de jogo

            restartButton.style.display = 'block'; // Exibe o botão de reiniciar

            mainMenu_Button.style.display = 'block'; // Exibe o botão de menu principal

            clearInterval(loop); // Limpa o intervalo do loop principal
        }
    }
}, 100);

// Adiciona um evento de clique ao botão de reinício para recarregar a página e reiniciar o jogo
restartButton.addEventListener('click', () => {
    location.reload();
});

//Adiciona um evento de retorno
mainMenu_Button.addEventListener('click', () => {
    window.location.href = "index_3.html"; // Adiciona um evento de clique ao botão de menu principal
});

// Adiciona um evento de escuta ao pressionar uma tecla, que chama a função 'jump' quando a tecla é pressionada
document.addEventListener('keydown', jump);
