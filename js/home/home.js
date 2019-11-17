//** Settings section **//
const settings = window.localStorage.getItem('settings') ?
    JSON.parse(window.localStorage.getItem('settings')) : { rows: 9, cols: 9, mines: 10 }

//** after loading last settings set them on inputs **//
const rowsInput = document.querySelector('#rows')
const colsInput = document.querySelector('#cols')
const minesInput = document.querySelector('#mines')

const coverSpan = document.querySelector('#bombCover')
const calcBombRatio = () => coverSpan.innerHTML = Math.min(100, Math.round(minesInput.value / (rowsInput.value * colsInput.value) * 100))

colsInput.value = settings.cols
rowsInput.value = settings.rows
minesInput.value = settings.mines
calcBombRatio()



//** Start **//
const startBtn = document.querySelector('#home-play-btn')

startBtn.addEventListener('click', () => settingsCheck() ? startGame() : null)

const startGame = () => {
    window.localStorage.setItem("settings", JSON.stringify(settings))
    window.location.replace('html/game.html')
}