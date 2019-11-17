import { startDate, gameBoard, fields } from './game.js'
import { settings, seed } from './settings.js'

const endGameScreen = document.querySelector('.game-end-bg')
const endGameState = document.querySelector('.game-end-state')
const endGameTime = document.querySelector('.game-end-time')
const endGameBombs = document.querySelector('.game-end-bombs')

const gameUi = document.querySelector('.game-ui')

const againBtn = document.querySelector('#game-again-btn')
const homeBtn = document.querySelector('#game-back-btn')
const shareBtn = document.querySelector('#game-share-btn')

const shareText = document.querySelector('#game-share-text')
//** Set settings to coppy with share Btn **//
shareText.value = `${window.location.origin + window.location.pathname}?settings=${JSON.stringify(settings)}&seed=${seed}`

export default function endGame(won) {
    won ? endGameState.innerHTML = "You Won" : endGameState.innerHTML = "You Lost"
    const timeStamp = Date.now()
    const timeSpent = timeStamp - startDate
    gameBoard.classList.add('game-ended')
    gameUi.classList.add('game-ended')

    //** Update game stats **//
    const stats = window.localStorage.getItem('stats') ? JSON.parse(window.localStorage.getItem('stats')) : {}
    stats.playtime = stats.playtime ? stats.playtime + timeSpent : timeSpent
    stats.playcount = stats.playcount ? stats.playcount + 1 : 1
    won ? stats.won ? stats.won++ : stats.won = 1 : stats.lost ? stats.lost++ : stats.lost = 1

    //** If won nomral flag it to unlock hard diff **//
    if (settings.rows == 15 && settings.cols == 15 && settings.mines == 35 && won && !stats.normalbeaten) {
        stats.normalbeaten = true
        homeBtn.style.color = "yellow"
        homeBtn.style.animation = 'scale-in .5s ease both 1.65s, pulse 1s ease infinite 2.15s'
    }
    //** If won hard flag it to unlock insane diff **//
    if (settings.rows == 20 && settings.cols == 40 && settings.mines == 150 && won && !stats.hardbeaten) {
        stats.hardbeaten = true
        homeBtn.style.color = "red"
        homeBtn.style.animation = 'scale-in .5s ease both 1.65s, pulse .5s ease infinite 2.15s'
    }
    window.localStorage.setItem('stats', JSON.stringify(stats))



    //** Calc game lenght **//
    let minutes = ('0' + parseInt(timeSpent / 1000 / 60)).slice(-2)
    let seconds = ('0' + parseInt(timeSpent / 1000 % 60)).slice(-2)
    let miliseconds = ('0' + parseInt(timeSpent / 10 % 100)).slice(-2)
    endGameTime.innerHTML = `<i class="fas fa-stopwatch" style="width: 40px"></i>   ${minutes}:${seconds}.${miliseconds}`
    //** Calc Bombs left **//
    endGameBombs.innerHTML = `<i class="fas fa-bomb" style="width: 40px"></i> ${fields.filter(e => e.bomb && !e.flaged).length} left`

    endGameScreen.style.display = "flex"
}


againBtn.addEventListener("click", () => window.location.search = '')
homeBtn.addEventListener("click", () => window.location.replace('../index.html'))
shareBtn.addEventListener("click", () => share())

const share = () => {
    shareBtn.innerHTML = '<i class="fas fa-share"></i> Link coppied'
    setTimeout(() => shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share this map', 2000);

    shareText.select();
    shareText.setSelectionRange(0, 99999);

    document.execCommand("copy");
}