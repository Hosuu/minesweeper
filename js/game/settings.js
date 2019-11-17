import { randomSeed } from './random.js'

const searchQuerryParms = new URLSearchParams(window.location.search)

//** Load settings **// 
export const settings = searchQuerryParms.get("settings")
    ?
    JSON.parse(searchQuerryParms.get("settings"))   //** If aviable load from UrlParms **//  
    :
    JSON.parse(window.localStorage.getItem("settings"))
        ?
        JSON.parse(window.localStorage.getItem("settings")) //** If aviable load form LocalStorage **// 
        :
        window.location.replace('../index.html');   //** If no settings provided back to home **// 

//** Load seed from Url if proved. If not generate one **// 
let seedLength = 7 //** Seed lenght if generated**// 
export const seed = searchQuerryParms.get("seed") ? Number(searchQuerryParms.get("seed")) : randomSeed(seedLength)