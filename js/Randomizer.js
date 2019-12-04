const defaults = {
    seedLenght: 7
}

export default class Randomizer {
    constructor(seed) {

        this.seed = seed ? seed : this.generateSeed(defaults.seedLenght);
        this.randomIterator = 0
    }

    random() {
        const value = Math.sin(this.seed + ++this.randomIterator) * 10000
        return value - Math.floor(value)
    }

    generateSeed(lenght) {
        return Date.now() % (10 ** (lenght ? lenght : defaults.seedLenght))
    }
}