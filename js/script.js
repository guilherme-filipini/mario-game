// Seleciona o elemento com a classe 'mario' e armazena na variável 'mario'
const mario = document.querySelector('.mario');
// Seleciona o elemento com a classe 'pipe' e armazena na variável 'pipe'
const pipe = document.querySelector('.pipe');
// Seleciona o elemento com o ID 'scoreButton' e armazena na variável 'scoreButton'
const scoreButton = document.getElementById('scoreButton');
// Seleciona o elemento com o ID 'gameOverText' e armazena na variável 'gameOverText'
const gameOverText = document.getElementById('gameOverText');
// Seleciona o elemento com o ID 'congratulations' e armazena na variável 'congratulations'
const congratulations = document.getElementById('congratulations');
// Seleciona o elemento com o ID 'restartButton' e armazena na variável 'restartButton'
const restartButton = document.getElementById('restartButton');
// Seleciona o elemento com o ID 'mainMenu_Button' e armazena na variável 'mainMenu_Button'
const mainMenu_Button = document.getElementById('mainMenu_Button');
// Seleciona o elemento com o ID 'jumpSound' e armazena na variável 'jumpSound'
const jumpSound = document.getElementById('jumpSound');
// Seleciona o elemento com o ID 'gameOverMario' e armazena na variável 'gameOverMario'
const gameOverMario = document.getElementById('gameOverMario');
// Seleciona o elemento com o ID 'marioSoundtrack' e armazena na variável 'marioSoundtrack'
const marioSoundtrack = document.getElementById('marioSoundtrack');
// Seleciona o elemento com o ID 'levelCompleteMario' e armazena na variável 'levelCompleteMario'
const levelCompleteMario = document.getElementById('levelCompleteMario');

// Inicializa a variável 'score' com o valor 0
let score = 0;

// Toca a trilha sonora do Mario
marioSoundtrack.play();

// Função para atualizar o score
const updateScore = () => {
    // Incrementa o score em 1
    score++;
    // Atualiza o texto do botão de score com o novo valor do score
    scoreButton.textContent = `Score: ${score}`;

    // Verifica se o score atingiu o valor de 20
    if (score >= 20) {
        // Define a variável 'gameOver' como false para indicar que o jogo não acabou
        gameOver = false;
        // Altera a imagem do elemento 'pipe' para indicar o fim do nível
        pipe.src = './images/level_end.png';
        // Chama a função para desbloquear um novo personagem
        desbloquearNovoPersonagem();
    }
}

// Inicializa a variável 'personagemDesbloqueado' como false
let personagemDesbloqueado = false;

// Função para desbloquear um novo personagem
const desbloquearNovoPersonagem = () => {
    // Verifica se o personagem já foi desbloqueado
    if (!personagemDesbloqueado) {
        // Remove a trilha sonora do Mario
        marioSoundtrack.remove();
        // Toca o áudio de conclusão do nível
        levelCompleteMario.play();
        // Exibe o botão de Main Menu
        mainMenu_Button.addEventListener('click', () => {
            window.location.href = "index_2.html";
        });
        mainMenu_Button.style.display = 'block';
        // Exibe a mensagem de parabéns
        congratulations.style.display = 'block';
        // Remove o elemento 'pipe'
        pipe.remove();

        // Mensagem de desbloqueio
        alert('Parabéns, você terminou a fase e desbloqueou um novo personagem!');
        // Define a variável 'personagemDesbloqueado' como true para indicar que o personagem foi desbloqueado
        personagemDesbloqueado = true;
        // Define que o jogador não pode mais pular
        podePular = false;
    }
}

let podePular = true

// Função para alterar a imagem do Mario quando ele pula
const jump = () => {
    if (podePular) {
        // Adiciona a classe 'jump' ao elemento 'mario' para iniciar a animação de pulo
        mario.classList.add('jump');
        // Toca o som de pulo
        jumpSound.play();
        // Altera a imagem do Mario para a de pulo
        mario.src = './images/mario_jump.gif';
        mario.style.width = '115px';
        // Define um tempo para reverter a imagem do Mario após o pulo
        setTimeout(() => {
            // Remove a classe 'jump' para encerrar a animação de pulo
            mario.classList.remove('jump');
            // Altera a imagem do Mario de volta para a imagem padrão
            mario.src = './images/mario.gif';
            mario.style.width = '150px';
        }, 500); // Adiciona um atraso de 500 milissegundos (0.5 segundos)
        // Chama a função para atualizar o score
        updateScore();
    }
}

// Inicializa a variável 'gameOver' como true
let gameOver = true;

// Loop para verificar colisões entre o Mario e o elemento 'pipe'
const loop = setInterval(() =>{

    const pipePosition = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');
    if(gameOver){
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        // Toca o som de fim de jogo do Mario
        gameOverMario.play();
        // Remove a trilha sonora do Mario
        marioSoundtrack.remove();
        podePular = false;
        // Remove a animação de movimentação do elemento 'pipe'
        pipe.style.animation = 'none';
        // Mantém a posição atual do 'pipe'
        pipe.style.left = `${pipePosition}px`;

        // Aplica a animação de descida ao Mario
        mario.style.animation = 'marioDescend 2s forwards';
        mario.style.bottom = `${marioPosition}px`;

        // Altera a imagem do Mario para indicar o fim do jogo
        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        
        // Exibe o texto de game over e os botões de reinício e retorno ao menu principal
        gameOverText.style.display = 'block';
        restartButton.style.display = 'block';
        mainMenu_Button.style.display = 'block';

        // Encerra o loop de verificação de colisão
        clearInterval(loop);
    }
}
}, 100);

// Adiciona um evento de clique ao botão de reinício para recarregar a página e reiniciar o jogo
restartButton.addEventListener('click', () => {
    location.reload();
});

mainMenu_Button.addEventListener('click', () => {
    window.location.href = "index.html";
});

// Adiciona um evento de escuta ao pressionar uma tecla, que chama a função 'jump' quando a tecla é pressionada
document.addEventListener('keydown', jump);


