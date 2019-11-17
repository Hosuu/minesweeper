//** Import Field class **//
import Field from './field.js'
import endGame from './endgame.js'
import { settings } from './settings.js'
import { random } from './random.js'

export const startDate = Date.now()

const gameBoard = document.querySelector('#game-board')

//** Generate board **//
export const fields = new Array()
for (let y = 0; y < settings.rows; y++) {
    for (let x = 0; x < settings.cols; x++) {
        let field = document.createElement('div')
        field.classList.add('field')
        fields.push(new Field(x, y, field))
        gameBoard.appendChild(field)
    }
}

//** Set CSS board size **//
gameBoard.style.gridTemplateColumns = `repeat(${settings.cols}, 45px)`
gameBoard.style.gridTemplateRows = `repeat(${settings.rows}, 45px)`

//** spawn bombs **//
let bombsToPlace = settings.mines
while (bombsToPlace > 0) {
    let id = Math.floor(random() * fields.length)
    if (!fields[id].bomb) {
        fields[id].placeBomb()
        bombsToPlace--
    }
}

fields.forEach(f => {
    //** Init Event listeners on fields **//
    f.initEventListeners()
    //** Init Event listeners on fields **//
    f.fetchNeighbors()
    //** Init Event listeners on fields **//
    f.conutBombsAround()
})

export const gameOver = () => {
    let bombs = fields.filter(f => f.bomb == true)
    bombs.forEach(f => {
        f.revealed = true
        f.htmlElement.classList.add("bomb")
        f.htmlElement.innerHTML = '<i class="fas fa-bomb"></i>'
    })

    endGame(false)
}

export const winCheck = () => {

    let winState = fields.every(f => {
        if (!f.bomb) return f.revealed
        else return true
    })

    if (!winState) return

    let bombs = fields.filter(f => f.bomb == true)
    bombs.forEach(f => {
        f.revealed = true
        f.htmlElement.classList.add("flag")
        f.htmlElement.innerHTML = '<i class="fas fa-flag"></i>'
    })

    endGame(true)
}

//** Reveal first empty tile **//
fields.find(f => f.bombsAround == 0 && f.neighbors.length == 8).reveal()

//** Block context menu on whole page **//
document.body.addEventListener('contextmenu', e => e.preventDefault())