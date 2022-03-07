const grid = document.querySelector('.grid')
const reset = document.querySelector('#reset')
const scores = Array.from(document.querySelectorAll('.score')).reverse()

// reset function
reset.addEventListener('click', () => {
	const allDiamonds = Array.from(document.querySelectorAll('.diamond'))
	// wipe the diamonds
	for (let i = 0; i < allDiamonds.length; i++){
		allDiamonds[i].classList.remove('diamond')
	}
	// reset the coordinates of diamonds
	for (let i = 0; i < diamonds.length; i++ ){
		diamonds[i].left = 10
		diamonds[i].bottom = i * 50 + 10
	}
	// reset scores
	for (let i = 0; i < scores.length; i++ ){
		scores[i].textContent = 0
		scores[i].style.color = 'black'
	}
	// redraw the diomands
	drawDiamonds()
})

class diamond {
	constructor(xAxis, yAxis, color) {
	    this.left = xAxis
		this.bottom = yAxis
		this.color = color
	}
}

const diamonds = [
	new diamond(10, 10, 'blue'),
	new diamond(10, 60, 'green'),
	new diamond(10, 110, 'red'),
	new diamond(10, 160, 'yellow'),
]

function drawDiamonds(){
	for (let i = 0; i < diamonds.length; i++){
		const diamond = document.createElement('div')
		diamond.classList.add('diamond')
		diamond.style.left = diamonds[i].left + 'px'
		diamond.style.bottom = diamonds[i].bottom + 'px'
		diamond.style['background-color'] = diamonds[i].color
		diamond.setAttribute('diamond-id', i)
		grid.appendChild(diamond)
		diamond.addEventListener('click', moveDiamond)
	}
}


function moveDiamond(){
	const diamondId = this.getAttribute('diamond-id')
	const allDiamonds = Array.from(document.querySelectorAll('.diamond'))
	// wipe current diamonds
	for (let i = 0; i < allDiamonds.length; i++){
		allDiamonds[i].classList.remove('diamond')
	}
	// update coodinates (move)
	diamonds[diamondId].left += 50
	drawDiamonds()
	displayScores()
	// check win
	if (diamonds[diamondId].left === 510){
		const allDiamonds = Array.from(document.querySelectorAll('.diamond'))
		for (let i = 0; i < allDiamonds.length; i++){
			allDiamonds[i].removeEventListener('click', moveDiamond)
		}
	}	
}

function displayScores(){
	for(let i = 0; i < scores.length; i++){
		scores[i].textContent = Math.floor((diamonds[i].left - 10) / 50)
		if (Math.floor((diamonds[i].left - 10) / 50) === 10){
			scores[i].style.color = 'red'
		}
	}
}

drawDiamonds()
