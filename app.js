const grid = document.querySelector('.grid')
const reset = document.querySelector('#reset')

class diamond {
	// diamond constructor
	constructor(xAxis, yAxis, color) {
	    this.diamond = document.createElement('div')
		this.diamond.classList.add('diamond')
		this.diamond.style.left = xAxis + 'px'
		this.diamond.style.bottom = yAxis + 'px'
		this.diamond.style['background-color'] = color
		grid.appendChild(this.diamond)
	}
	resetX(x){
		this.diamond.style.left = x + 'px'
	}
}

const diamonds = [
	new diamond(10, 10, 'blue'),
	new diamond(10, 60, 'green'),
	new diamond(10, 110, 'red'),
	new diamond(10, 160, 'yellow'),
]
//add click listener
for (let i = 0; i < diamonds.length; i++){
	diamonds[i].diamond.addEventListener('click', moveDiamond)
}
function moveDiamond(){
	// get current position and color
	const position = Number(this['style'].left.slice(0, -2))
	const color = this['style']['background-color']
	// move
	this['style'].left = position + 50 + 'px'
	displayScores(position, color)
	// win
	if (position === 460){
		for (let i = 0; i < diamonds.length; i++){
			diamonds[i].diamond.removeEventListener('click', moveDiamond)
		}
	}	
}

function displayScores(position, color){
	// identify the diamond with color
	const score = document.querySelector('#' + color + '-score')		
	score.textContent = Math.floor((position + 40) / 50)
	if (Math.floor((position + 40) / 50) === 10){
		score.style.color = 'red'
	}
}
// reset
reset.addEventListener('click', () => {
	const scores = document.querySelectorAll('.score')
	for (let i = 0; i < scores.length; i++){
		scores[i].textContent = 0
		scores[i].style.color = 'black'
		diamonds[i].resetX(10)
		diamonds[i].diamond.addEventListener('click', moveDiamond)
	}
})
