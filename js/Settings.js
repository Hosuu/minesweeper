import Randomizer from './Randomizer.js'

const defaults = {
    difficulty: 'normal',
    mods: [true]
}

const diffs = [
    {
        name: 'easy',
        rows: 9,
        cols: 9,
        mines: 10,
    },
    {
        name: 'normal',
        rows: 15,
        cols: 15,
        mines: 35,
    },
    {
        name: 'hard',
        rows: 40,
        cols: 20,
        mines: 150,
    },
    {
        name: 'insane',
        rows: 50,
        cols: 30,
        mines: 375,
    },
    {
        name: 'custom',
        rows: null,
        cols: null,
        mines: null,
    },
]

export default class Settings {
    constructor() {
        //** Catch Url Parms **// 
        const urlSettings = JSON.parse(new URLSearchParams(window.location.search).get('settings'))
        const urlSeed = JSON.parse(new URLSearchParams(window.location.search).get('seed'))

        this.seed = new Randomizer().generateSeed()

        //** If Url Parms exist load settings from them **// 
        if (urlSettings || urlSeed) {
            this.loadSettings(urlSettings)
            this.seed = urlSeed ? urlSeed : this.seed
            console.log('[Settings Init] (Url Parms) ', this)
        }
        //** If Url Parms not exist load last settings **// 
        else if (window.localStorage.getItem('minesweeper-settings')) {
            const lastSettings = JSON.parse(window.localStorage.getItem('minesweeper-settings'))
            this.loadSettings(lastSettings)
            console.log('[Settings Init] (Last settings) ', this)
        }
        //** If last settings were not found load defaults **// 
        else {
            console.error('Last Settings cannot be loaded setting defaults!')
            this.setByDiffName(defaults.difficulty)
            this.mods = defaults.mods
            console.log('[Settings Init] (Default) ', this)
        }
    }

    saveSettings() {
        window.localStorage.setItem('minesweeper-settings', JSON.stringify(this))
        console.log('[Settings Save] Saved! ', this)
    }

    removeSettings() {
        window.localStorage.removeItem('minesweeper-settings')
    }

    loadSettings(settingsObj) {
        this.cols = settingsObj.cols ? settingsObj.cols : diffs.find(diff => diff.name == defaults.difficulty).cols
        this.rows = settingsObj.rows ? settingsObj.rows : diffs.find(diff => diff.name == defaults.difficulty).rows
        this.mines = settingsObj.mines ? settingsObj.mines : diffs.find(diff => diff.name == defaults.difficulty).mines
        this.mods = settingsObj.mods ? settingsObj.mods : defaults.mods
    }

    changeDifficulty(difficulty) {
        if (!diffs.some(diff => diff.name == difficulty))
            return console.error('[Settings Update] Difficulty name not recognized')
        this.setByDiffName(difficulty)
        console.log('[Settings Update] ', this)
    }

    setByDiffName(difficulty) {
        this.cols = diffs.find(diff => diff.name == difficulty).cols
        this.rows = diffs.find(diff => diff.name == difficulty).rows
        this.mines = diffs.find(diff => diff.name == difficulty).mines
    }

}