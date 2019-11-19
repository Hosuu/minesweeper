import { fields, gameOver, winCheck } from './game.js'
import { settings } from './settings.js'
import { updateUiBombs } from './ui.js'
import { config } from './config.js'

export default class Field {
    constructor(x, y, htmlElement) {
        this.htmlElement = htmlElement
        this.x = x
        this.y = y
        this.revealed = false
        this.bomb = false
        this.neighbors = []
        this.bombsAround = 0
        this.flaged = false
    }

    initEventListeners() {

        //** Nomral click **//
        this.htmlElement.addEventListener("click", e => this.NormalClick())

        //** Alternative click **//
        this.htmlElement.addEventListener('contextmenu', e => { this.AlternativeClick(); e.preventDefault() })

        //** Animation reset **//
        this.htmlElement.addEventListener("animationend", () => this.htmlElement.style.animation = "null")
    }

    NormalClick() {
        if (!config.swapControls)
            this.reveal()
        else if (this.revealed)
            this.flagedReveal()
        else
            this.flagToggle()

    }

    AlternativeClick() {
        if (config.swapControls)
            this.reveal()
        else if (this.revealed)
            this.flagedReveal()
        else
            this.flagToggle()
    }

    reveal() {

        if (this.revealed || this.flaged) return

        if (this.bomb) return gameOver()

        this.revealed = true
        winCheck()

        this.htmlElement.classList.add("revealed")
        this.flaged = false
        this.htmlElement.classList.remove("flag")

        if (this.bombsAround == 0) {
            setTimeout(() => this.neighbors.forEach(f => f.reveal()), 10)
        }

    }

    flagedReveal() {
        if (this.neighbors.reduce((total, f) => total + f.flaged, 0) == this.bombsAround) {
            this.neighbors.forEach(f => { if (!f.flaged) f.reveal() })
        }
    }

    flagToggle() {

        if (this.revealed) return

        this.flaged = !this.flaged
        this.flaged ? this.htmlElement.classList.add("flag") : this.htmlElement.classList.remove("flag")
        this.htmlElement.innerHTML = this.flaged ? '<i class="fas fa-flag"></i>' : this.bombsAround
        updateUiBombs(settings.mines - fields.filter(e => e.flaged).length)
    }

    placeBomb() {
        this.bomb = true
    }

    fetchNeighbors() {
        if (this.bomb) return

        //** Straight lines **//
        field(this.x - 1, this.y) ? this.neighbors.push(field(this.x - 1, this.y)) : null
        field(this.x + 1, this.y) ? this.neighbors.push(field(this.x + 1, this.y)) : null
        field(this.x, this.y - 1) ? this.neighbors.push(field(this.x, this.y - 1)) : null
        field(this.x, this.y + 1) ? this.neighbors.push(field(this.x, this.y + 1)) : null

        //** Diagonal lines **//
        field(this.x - 1, this.y - 1) ? this.neighbors.push(field(this.x - 1, this.y - 1)) : null
        field(this.x + 1, this.y + 1) ? this.neighbors.push(field(this.x + 1, this.y + 1)) : null
        field(this.x + 1, this.y - 1) ? this.neighbors.push(field(this.x + 1, this.y - 1)) : null
        field(this.x - 1, this.y + 1) ? this.neighbors.push(field(this.x - 1, this.y + 1)) : null
    }

    conutBombsAround() {
        if (this.bomb) return
        this.bombsAround = this.neighbors.reduce((total, f) => total + f.bomb, 0)

        this.htmlElement.innerHTML = this.bombsAround > 0 ? this.bombsAround : ""
        if (this.bombsAround > 0)
            this.htmlElement.classList.add(`num${this.bombsAround}`)
    }
}

const field = (x, y) => {
    return fields.find(f => f.x == x && f.y == y)
}