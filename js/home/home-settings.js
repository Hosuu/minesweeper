const inputs = document.querySelectorAll('input')

const easyDiff = document.querySelector('#home-easy-btn')
const normalDiff = document.querySelector('#home-normal-btn')
const hardDiff = document.querySelector('#home-hard-btn')
const insaneDiff = document.querySelector('#home-insane-btn')

//** Calc Bomb ratio **// 
inputs.forEach(i => i.oninput = () => calcBombRatio())


//** Animation reset on wrong input **//
const rowsDiv = document.querySelector('.home-settings-rows')
rowsDiv.addEventListener('animationend', e => e.target.style.animation = "null")

const colsDiv = document.querySelector('.home-settings-cols')
colsDiv.addEventListener('animationend', e => e.target.style.animation = "null")

const minesDiv = document.querySelector('.home-settings-mines')
minesDiv.addEventListener('animationend', e => e.target.style.animation = "null")

const errorDiv = document.querySelector('.home-settings-error')
errorDiv.addEventListener('animationend', e => e.target.style.animation = "null")

//?? Difficulty buttons ??//
//** Easy **// 
easyDiff.addEventListener('click', () => {
    colsInput.value = 9
    rowsInput.value = 9
    minesInput.value = 10
    calcBombRatio()
})
//** Normal **// 
normalDiff.addEventListener('click', () => {
    colsInput.value = 15
    rowsInput.value = 15
    minesInput.value = 35
    calcBombRatio()
})
//** Hard **// 
hardDiff.addEventListener('click', () => {
    colsInput.value = 40
    rowsInput.value = 20
    minesInput.value = 150
    calcBombRatio()
})
//** Insane **// 
insaneDiff.addEventListener('click', () => {
    colsInput.value = 50
    rowsInput.value = 30
    minesInput.value = 375
    calcBombRatio()
})

//** Checking inputs **//
const settingsCheck = () => {

    const rows = rowsInput.value;
    if (rows >= 2 && rows <= 150) settings.rows = rows
    else {
        rowsDiv.style.animation = "wrong-input .5s linear"
        errorDiv.innerHTML = "Specify value in rage <b>2-150</b>"
        errorDiv.style.animation = "error 1.5s linear"
        return false
    }

    const cols = colsInput.value;
    if (cols >= 2 && cols <= 150) settings.cols = cols
    else {
        colsDiv.style.animation = "wrong-input .5s linear"
        errorDiv.innerHTML = "Specify value in rage <b>2-150</b>"
        errorDiv.style.animation = "error 1.5s linear"
        return false
    }

    const mines = minesInput.value;
    if (mines >= 2 && mines <= cols * rows - 2) settings.mines = mines
    else {
        minesDiv.style.animation = "wrong-input .5s linear"
        errorDiv.innerHTML = `Specify value in rage <b>2-${cols * rows - 2}</b>`
        errorDiv.style.animation = "error 1.5s linear"
        return false
    }

    return true
}
