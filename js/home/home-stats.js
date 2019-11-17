const stats = window.localStorage.getItem('stats') ? JSON.parse(window.localStorage.getItem('stats')) : {}

const winrate = parseInt(stats.won / stats.playcount * 100)

let hours = stats.playtime ? parseInt(stats.playtime / 1000 / 60 / 60) : 0
let minutes = stats.playtime ? parseInt(stats.playtime / 1000 / 60 % 60) : 0
let seconds = stats.playtime ? parseInt(stats.playtime / 1000 % 60) : 0

//** Show / Hide hard diff **// 
stats.normalbeaten ? hardDiff.style.display = "block" : hardDiff.style.display = "none";
//** Show / Hide insane diff **// 
stats.hardbeaten ? insaneDiff.style.display = "block" : insaneDiff.style.display = "none";

const playtimeDiv = document.querySelector('#home-stats-playtime')
const playcountDiv = document.querySelector('#home-stats-playcount')
const wonDiv = document.querySelector('#home-stats-won')
const lostDiv = document.querySelector('#home-stats-lost')
const winrateDiv = document.querySelector('#home-stats-winrate')

playtimeDiv.innerHTML = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
playcountDiv.innerHTML = stats.playcount ? Number(stats.playcount) : 0
wonDiv.innerHTML = stats.won ? Number(stats.won) : 0
lostDiv.innerHTML = stats.lost ? Number(stats.lost) : 0
winrateDiv.innerHTML = winrate ? winrate + '%' : 0 + '%'