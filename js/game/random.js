import { seed } from './settings.js'

let randomIterator = 0

export const random = () => {
    let val = Math.sin(seed + ++randomIterator) * 10000
    return val - Math.floor(val)
}

export const randomSeed = len => Date.now() % (10 ** len)