/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer;

init();

function nextPlayer() {
  var diceDOM = document.querySelector('.dice');
  //next player
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  diceDOM.style.display = 'none';
}


document.querySelector('.btn-roll').addEventListener('click', function(){
  var diceDOM = document.querySelector('.dice');
  //generate random number
  var dice = Math.floor( Math.random() * 6 ) + 1;

  //display result
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-'+ dice + '.png';
  //update roundScore if rolled number if not rolling 1
  if(dice !== 1){
    //add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //next player
    nextPlayer();
  }
});

//Hold button pressed
document.querySelector('.btn-hold').addEventListener('click', function(){
  var playerScoreDOM = document.getElementById('score-'+activePlayer);
  //add current score to global score
  scores[activePlayer] += roundScore;
  playerScoreDOM.textContent = scores[activePlayer];


  //update UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  //check if a player won the game

  if(scores[activePlayer] >= 20){
    //game over player wins
    document.querySelector('#name-'+ activePlayer).textContent="Winner!!";
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
  } else {
    //next player
    nextPlayer();
  }
});

//New Game button
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('.dice').style.display = 'none';

  for(var i=0;i<2;i++){

    document.getElementById('score-'+ i).textContent = 0;
    document.getElementById('current-' + i).textContent = 0;
    document.getElementById('name-'+ i).textContent="Player " + (i+1);
    document.querySelector('.player-'+ i + '-panel').classList.remove('winner');
    document.querySelector('.player-'+ i +'-panel').classList.remove('active');

  }

  document.querySelector('.player-0-panel').classList.add('active');

  // document.getElementById('score-1').textContent = 0;
  // document.getElementById('current-1').textContent = 0;
  // document.querySelector('#name-1').textContent="Player 2";
}
