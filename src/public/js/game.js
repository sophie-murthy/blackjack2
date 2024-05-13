const submit = document.querySelector('input[type="submit"]');
submit.addEventListener('click', afterSubmit);

let inputCards, computer, player, newDeck;
function afterSubmit(evt) {
    evt.preventDefault();
    this.closest('form').classList.toggle("hidden");
    inputCards = document.querySelector("input[type='text']").value;
    const deck = getDeck(inputCards);
    [computer, player, newDeck] = dealHands(deck);

    const mainDiv = document.querySelector('.game');
    const outcome = document.createElement('h1');
    outcome.classList.add('outcome');
    mainDiv.appendChild(outcome);

    const compText = document.createElement('p');
    compText.textContent = 'Computer Hand - Total: ?';
    compText.classList.add('computer-text');
    mainDiv.appendChild(compText);

    const computerDiv = document.createElement('div');
    computerDiv.classList.add('computer');
    mainDiv.appendChild(computerDiv);
    const comp1 = createCardElement(computer[0]);
    const flipped = document.createElement('div');
    flipped.classList.add('card', 'flipped');
    computerDiv.appendChild(comp1);
    computerDiv.appendChild(flipped);

    const playerText = document.createElement('p');
    playerText.textContent = 'Player Hand - Total: ' + getHandValue(player);
    playerText.classList.add('player-text');
    mainDiv.appendChild(playerText);

    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player');
    mainDiv.appendChild(playerDiv);
    const player1 = createCardElement(player[0]);
    const player2 = createCardElement(player[1]);
    playerDiv.appendChild(player1);
    playerDiv.appendChild(player2);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    mainDiv.appendChild(buttonsDiv);

    const hitButton = document.createElement('button');
    hitButton.textContent = 'Hit';
    hitButton.classList.add('hit');
    buttonsDiv.appendChild(hitButton);
    hitButton.addEventListener('click', hit);

    const standButton = document.createElement('button');
    standButton.textContent = 'Stand';
    standButton.classList.add('stand');
    buttonsDiv.appendChild(standButton);
    standButton.addEventListener('click', stand);
    if (getHandValue(player) === 21) {
        document.querySelector('.outcome').textContent = 'BLACKJACK!';
        buttonsDiv.style.display = 'none';
        flipped.style.display = 'none';
        const comp2 = createCardElement(computer[1]);
        computerDiv.appendChild(comp2);
        document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + getHandValue(computer);
    }
}

function generateDeck() {
    const deck = [];
    const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};
    for (let i = 1; i < 14; i++) {
        for (const j in suits) {
            let card;
            if (i <= 10 && i > 1) {
                card = {suit: suits[j], rank: i +""};
            } else if (i === 11) {
                card = {suit: suits[j], rank: 'J'};
            } else if (i === 12) {
                card = {suit: suits[j], rank: 'Q'};
            } else if (i === 13) {
                card = {suit: suits[j], rank: 'K'};
            } else if (i === 1) {
                card = {suit: suits[j], rank: 'A'};
            }
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(arr1) {
    const arr =[...arr1]
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
    return arr;
}

function getDeck(inputCards) {
    const deck = generateDeck();
    const shuffled = shuffle(deck);
    const suits = ['♠️', '❤️', '♣️', '♦️'];
    const addedCards = [];
    if (inputCards) {
        inputCards = inputCards.split(',');
        for (const card of inputCards) {
            const suit = Math.floor(Math.random() * 4);
            const newCard = {suit: suits[suit], rank: card};
            addedCards.push(newCard);
        }
    }
    const finalDeck = [...addedCards, ...shuffled];
    return finalDeck;

}

function dealHands(cards) {
    const computerHand = [];
    const playerHand = [];
    for (let i = 0; i < 4; i = i + 2) {
        computerHand.push(cards[i]);
        playerHand.push(cards[i+1]);
    }
    cards = cards.slice(4);
    return [computerHand, playerHand, cards];
}

function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    const topCorner = document.createElement('div');
    topCorner.classList.add('card-corner', 'top');
    cardDiv.appendChild(topCorner);
    const rank = document.createElement('span');
    rank.classList.add('rank');
    rank.textContent = card.rank;
    topCorner.appendChild(rank);
    const suit = document.createElement('span');
    suit.classList.add('suit');
    suit.textContent = card.suit;
    topCorner.appendChild(suit);
    const center = document.createElement('div');
    center.classList.add('card-center', 'suit');
    center.textContent = card.suit;
    cardDiv.appendChild(center);
    const bottomCorner = document.createElement('div');
    bottomCorner.classList.add('card-corner', 'bottom');
    cardDiv.appendChild(bottomCorner);
    const rank2 = document.createElement('span');
    rank2.classList.add('rank');
    rank2.textContent = card.rank;
    bottomCorner.appendChild(rank2);
    const suit2 = document.createElement('span');
    suit2.classList.add('suit');
    suit2.textContent = card.suit;
    bottomCorner.appendChild(suit2);
    return cardDiv;
}


function getHandValue(hand) {
    let total = 0;
    let total2 = 0;
    for (const card of hand) {
        if (card.rank === 'A') {
            total += 11;
            total2 += 1;
        } else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
            total += 10;
            total2 += 10;
        } else {
            total += parseInt(card.rank);
            total2 += parseInt(card.rank);
        }
    }
    if (total > 21) {
        return total2;
    } else {
        return total;
    }
}

function hit(evt) {
    const playerDiv = document.querySelector('.player');
    const nextCard = newDeck[0];
    player.push(nextCard);
    const card = createCardElement(nextCard);
    playerDiv.appendChild(card);
    const playerText = document.querySelector('.player-text');
    const total = getHandValue(player);
    playerText.textContent = 'Player Hand - Total: ' + total;
    newDeck = newDeck.slice(1);
    
    if (total > 21) {
        playerText.textContent = 'Player Hand - Total: ' + total;
        document.querySelector('.outcome').textContent = 'BUST! YOU LOSE!';
        this.closest('.buttons').style.display = 'none';
        document.querySelector('.flipped').style.display = 'none';
        const comp2 = createCardElement(computer[1]);
        document.querySelector('.computer').appendChild(comp2);
        document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + getHandValue(computer);
    }

    if (total === 21) {
        playerText.textContent = 'Player Hand - Total: ' + total;
        document.querySelector('.outcome').textContent = 'BLACKJACK!';
        this.closest('.buttons').style.display = 'none';
        document.querySelector('.flipped').style.display = 'none';
        const comp2 = createCardElement(computer[1]);
        document.querySelector('.computer').appendChild(comp2);
        document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + getHandValue(computer);
    }


}

function stand(evt) {
    this.closest('.buttons').style.display = 'none';
    document.querySelector('.flipped').style.display = 'none';
    const comp2 = createCardElement(computer[1]);
    document.querySelector('.computer').appendChild(comp2);
    document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + getHandValue(computer);
    let total = getHandValue(computer);
    while (total <= 17) {
        if (total == 17) {
            for (const card of computer) {
                if (card.rank == 'A') {
                    const newCard = newDeck[0];
                    newDeck = newDeck.slice(1);
                    computer.push(newCard);
                    const card = createCardElement(newCard);
                    document.querySelector('.computer').appendChild(card);
                    total = getHandValue(computer);
                    document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + total;
                    break;
                }
            }
        } else {
            const newCard = newDeck[0];
            newDeck = newDeck.slice(1);
            computer.push(newCard);
            const card = createCardElement(newCard);
            document.querySelector('.computer').appendChild(card);
            total = getHandValue(computer);
            document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + total;

        }
    }

    const playerTotal = getHandValue(player);
    if (total > 21) {
        document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + total;
        document.querySelector('.outcome').textContent = 'BUST! YOU WIN!';
    } else if (playerTotal > total) {
        document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + total;
        document.querySelector('.outcome').textContent = 'YOU WIN!';
    } else if (playerTotal < total) {
        document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + total;
        document.querySelector('.outcome').textContent = 'YOU LOSE!';
    } else {
        document.querySelector('.computer-text').textContent = 'Computer Hand - Total: ' + total;
        document.querySelector('.outcome').textContent = 'PUSH!';
    }

    
}