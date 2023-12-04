document.addEventListener('DOMContentLoaded', () => {
    const cardImages = [
        'Marcos.jpg',
        'Bonnie.jpg',
        'Mami.jpg',
        'Tamara.jpg',
        'Maca.jpg',
        'Tayri.jpg',
        'Magui.jpg',
        'Cindy.jpg',
        'Marcos.jpg',
        'Bonnie.jpg',
        'Mami.jpg',
        'Tamara.jpg',
        'Maca.jpg',
        'Tayri.jpg',
        'Magui.jpg',
        'Cindy.jpg'
    ];

    let openedCards = [];
    let isProcessing = false;

    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');

    resetButton.addEventListener('click', () => {
        shuffleCards();
        resetGame();
    });

    function shuffleCards() {
        for (let i = cardImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardImages[i], cardImages[j]] = [cardImages[j], cardImages[i]];
        }
    }

    function resetGame() {
        openedCards = [];
        isProcessing = false;
        gameBoard.innerHTML = '';
        createCards();
    }

    function createCards() {
        for (let i = 0; i < cardImages.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.cardIndex = i;

            // Set the background image to a hidden image initially
            card.style.backgroundImage = 'url(hidden.jpg)';

            card.addEventListener('click', () => handleCardClick(card));
            gameBoard.appendChild(card);
        }
    }

    function handleCardClick(card) {
        if (isProcessing || openedCards.length >= 2) {
            return;
        }

        if (!card.style.backgroundImage.includes(cardImages[card.dataset.cardIndex])) {
            card.style.backgroundImage = `url(${cardImages[card.dataset.cardIndex]})`;
            openedCards.push(card);

            if (openedCards.length === 2) {
                isProcessing = true;
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = openedCards;

        if (cardImages[card1.dataset.cardIndex] === cardImages[card2.dataset.cardIndex]) {
            card1.removeEventListener('click', handleCardClick);
            card2.removeEventListener('click', handleCardClick);
        } else {
            setTimeout(() => {
                card1.style.backgroundImage = 'url(hidden.jpg)';
                card2.style.backgroundImage = 'url(hidden.jpg)';
            }, 1000);
        }

        openedCards = [];
        isProcessing = false;
    }

    shuffleCards();
    createCards();
});




