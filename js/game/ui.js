import { startDate } from './game.js'
import { config, saveConfig } from './config.js'

const uiBombs = document.querySelector('#game-ui-bombs')
const uiTime = document.querySelector('#game-ui-time')
const uiControls = document.querySelector('#game-ui-controls')

export const updateUiTimer = () => {
    let minutes = ('0' + parseInt((Date.now() - startDate) / 1000 / 60)).slice(-2)
    let seconds = ('0' + parseInt((Date.now() - startDate) / 1000 % 60)).slice(-2)
    uiTime.innerHTML = `${minutes}:${seconds}`
}

export const timer = setInterval(() => {
    updateUiTimer()
}, 1000);

export const updateUiBombs = bombs => {
    uiBombs.innerHTML = `<i class="fas fa-bomb"></i> ${bombs}`
}

export const updateUiControls = () => {
    uiControls.innerHTML = config.swapControls ? '<i class="fas fa-flag"></i>' : '<i class="fas fa-eye"></i>'
}
uiControls.addEventListener('click', e => {
    e.preventDefault()
    config.swapControls = !config.swapControls
    updateUiControls()
    saveConfig()
})

updateUiControls()