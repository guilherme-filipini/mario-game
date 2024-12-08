// Seleciona elementos HTML com as classes e IDs especificados
const sonic = document.querySelector('.sonic');
const enemy = document.querySelector('.sonic-enemy');
const scoreButton = document.getElementById('scoreButton');
const gameOverText = document.getElementById('gameOverText');
const congratulations = document.getElementById('congratulations');
const restartButton = document.getElementById('restartButton');
const mainMenu_Button = document.getElementById('mainMenu_Button');
const jumpSound = document.getElementById('jumpSound');
const gameOverSonic = document.getElementById('gameOverSonic');
const sonicSoundtrack = document.getElementById('sonicSoundtrack');
const levelCompleteSonic = document.getElementById('levelCompleteSonic');
const sonicHit = document.getElementById('sonicHit');

let score = 0; // Inicializa a pontuação do jogador

sonicSoundtrack.play(); // Toca a trilha sonora do jogo

// Função para atualizar o score do jogador
const updateScore = () => {
    score++; // Incrementa a pontuação
    scoreButton.textContent = `Score: ${score}`; // Atualiza o texto exibindo a pontuação

    if (score >= 20) { // Verifica se a pontuação atingiu o limite necessário para desbloquear um novo personagem
        desbloquearNovoPersonagem(); // Chama a função para desbloquear um novo personagem
    }
}

let personagemDesbloqueado = false; // Variável para verificar se o novo personagem foi desbloqueado

// Função para desbloquear um novo personagem
const desbloquearNovoPersonagem = () => {
    if (!personagemDesbloqueado) { // Verifica se o personagem já foi desbloqueado
        sonicSoundtrack.remove(); // Remove a trilha sonora atual
        levelCompleteSonic.play(); // Toca o som de desbloqueio de personagem
        mainMenu_Button.addEventListener('click', () => {
            window.location.href = "index_4.html"; // Adiciona um evento de clique ao botão de menu principal
        });
        mainMenu_Button.style.display = 'block'; // Exibe o botão de menu principal
        congratulations.style.display = 'block'; // Exibe a mensagem de parabéns
        enemy.remove(); // Remove o inimigo
        personagemDesbloqueado = true; // Define que o personagem foi desbloqueado
        alert('Parabéns, você terminou a fase!'); // Exibe uma mensagem informando ao jogador que a fase foi concluída
        sonic.style.animation = 'none'; // Aplica a animação de descida
        sonic.style.bottom = `${sonicPosition}px`; // Define a posição vertical do Sonic
        gameOverSonic = false; // Define que o jogo não terminou para o Sonic
        podePular = false; // Define que o jogador não pode mais pular
    }
}

let podePular = true; // Variável para verificar se o jogador pode pular

// Função para fazer o Sonic pular
const jump = () => {
    if (podePular) { // Verifica se o jogador pode pular
        gameOver = false; // Define que o jogo não terminou
        sonic.classList.add('jump'); // Adiciona a classe 'jump' para iniciar a animação de pulo
        sonic.src = './images/sonic-spin.gif'; // Altera a imagem do Sonic para a de pulo
        sonic.style.width = '80px'; // Define a largura da imagem do Sonic

        jumpSound.play(); // Toca o som de pulo

        setTimeout(() => {
            sonic.classList.remove('jump'); // Remove a classe 'jump' após um intervalo de tempo
            sonic.src = './images/sonic-run.gif'; // Restaura a imagem padrão do Sonic
            sonic.style.width = '200px'; // Restaura a largura padrão da imagem do Sonic
            gameOver = true; // Define que o jogo terminou
            updateScore(); // Chama a função para atualizar a pontuação
        }, 500); // Define um atraso de 500 milissegundos (0.5 segundos) antes de restaurar a imagem e largura padrão
    }
}

let gameOver = true; // Variável para verificar se o jogo terminou

// Loop principal do jogo
const loop = setInterval(() => {
    const enemyPosition = enemy.offsetLeft; // Obtém a posição horizontal do inimigo
    const sonicPosition = window.getComputedStyle(sonic).bottom.replace('px', ''); // Obtém a posição vertical do Sonic

    if (gameOver) { // Verifica se o jogo ainda não terminou
        if (enemyPosition <= 120 && enemyPosition > 0 && sonicPosition < 80) { // Verifica se o Sonic colidiu com o inimigo
            sonicSoundtrack.remove(); // Remove a trilha sonora do jogo
            gameOverSonic.play(); // Toca o som de fim de jogo para o Sonic
            enemy.style.animation = 'none'; // Remove a animação do inimigo
            enemy.style.left = `${enemyPosition}px`; // Mantém o inimigo na mesma posição horizontal
            sonic.style.animation = 'marioDescend 2s forwards'; // Aplica a animação de descida ao Sonic
            sonic.style.bottom = `${sonicPosition}px`; // Mantém o Sonic na mesma posição vertical
            sonic.src = './images/sonic-dead.webp'; // Altera a imagem do Sonic para indicar o fim de jogo
            sonic.style.width = '130px'; // Define a largura da imagem do Sonic
            sonic.style.marginLeft = '20px'; // Define a margem esquerda da imagem do Sonic
            gameOverText.style.display = 'block'; // Exibe o texto de fim de jogo
            restartButton.style.display = 'block'; // Exibe o botão de reiniciar
            mainMenu_Button.style.display = 'block'; // Exibe o botão de menu principal
            podePular = false; // Define que o jogador não pode mais pular
            clearInterval(loop); // Limpa o intervalo do loop principal
    }
}
}, 100); // Define o intervalo de verificação de colisão

// Adiciona um evento de clique ao botão de reiniciar
restartButton.addEventListener('click', () => {
    location.reload(); // Recarrega a página para reiniciar o jogo
});

// Adiciona um evento de clique ao botão de menu principal
mainMenu_Button.addEventListener('click', () => {
    window.location.href = "index_3.html"; // Redireciona para a página do menu principal
});

document.addEventListener('keydown', jump); // Adiciona um evento de tecla pressionada para fazer o Sonic pular