import { updateUiControls } from "./ui.js"

//** Load config **// 
export const config = window.localStorage.getItem("config") ? JSON.parse(window.localStorage.getItem("config")) : {}

export const saveConfig = () => {
    window.localStorage.setItem('config', JSON.stringify(config))
}