//GLOBAL VARIABLES
//---------------------------------------
// Used to record how many times a letter can be pressed
var doubleWord = ['a','b','c',
				  'd','e','f',
				  'g','h','i',
				  'j','k','l',
				  'm','n','o',
				  'p','q','r',
				  's','t','u',
				  'v','w','x',
				  'y','z'];
//Holds the all the words
var wordBank =['jedi','yoda','wookie', 'vader','luke','anakin','bb8'];
//Holds choosenWord
var choosenWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Holds Blanks and successful guesses
var spacesAndSuccesses =[];
//User Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 9;
var rightGuessCounter = 0;
//FUNCTIONS
//----------------------------------------
function reset()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 9;
	wrongLetters =[];
	spacesAndSuccesses =[];
	doubleWord = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];
	test=false;
	startGame();
}
function startGame()
{
	//Chooses word randombly from the wordBank arraay thus "choosenword"
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen "word" into letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 9;
	wrongLetters =[];
	spacesAndSuccesses =[];
	doubleWord = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];

	//Populate blanks
	for(var i = 0; i< numBlanks; i++)
	{
		spacesAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = spacesAndSuccesses;
	}

	//Changes HTML 
	document.getElementById('wordToGuess').innerHTML = spacesAndSuccesses.join(' ');
	document.getElementById('wordToGuess').style.color = "blue"
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
	// Testing / Debugging
	console.log(choosenWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(spacesAndSuccesses);
}

function compareLetters(userKey)
{
				console.log('IS THIS THING ON?');
				//If, user key exist in choosen word then perform this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++; //adds one to counter ++ if user keys correctly
							spacesAndSuccesses[i] = userKey;
							document.getElementById('wordToGuess').innerHTML = spacesAndSuccesses.join(' ');
						}	
					}
					//Test / Debug
					console.log(spacesAndSuccesses);
				}
				//Else, user key doesn't exist in choosen word then perform Push to numguesses and wrongguesses 
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
					//Test this bad boy 
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}
			
			
		
}
function winLose()
{
	// When blanks are filled with right letters user wins
	if(rightGuessCounter === numBlanks)
	{
		//Counts users Wins 
		winCount++;
		//Changes the DOM
		document.getElementById('winCounter').innerHTML = winCount;
		alert('You Won, Nice work young Jedi');
		reset();
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		alert('You Lost, Welcome to the darkside hahahaaha');
		reset();
	}
}

//MAIN PROCCESS
//-------------------------------------------	
//Onkey function starts all the code 
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < doubleWord.length; i++)
	{	
		if(letterGuessed === doubleWord[i] && test === true)
		{
			var spliceDword = doubleWord.splice(i,1);
			//Test / Debug
			console.log('Double word is = ' + doubleWord[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}