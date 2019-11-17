const modalBg = document.querySelector('.home-modal-bg')
const modalContainer = document.querySelector('.home-modal-container')

const modsInner = document.querySelector('#home-mods-inner')
const howInner = document.querySelector('#home-how-to-play-inner')
const statsInner = document.querySelector('#home-stats-inner')

const modsBtn = document.querySelector('#home-mods-btn')
const howBtn = document.querySelector('#home-how-to-play-btn')
const statsBtn = document.querySelector('#home-stats-btn')

modalBg.addEventListener('click', e => hideModal(e))
modsBtn.addEventListener('click', () => showModal('mods'))
howBtn.addEventListener('click', () => showModal('how'))
statsBtn.addEventListener('click', () => showModal('stats'))

const showModal = window => {

    modalBg.style.animation = "show-modal-bg .4s both ease"
    modalContainer.style.animation = "appear-modal .5s backwards ease .1s"

    switch (window) {
        case 'mods':
            modsInner.style.display = "flex"
            howInner.style.display = "none"
            statsInner.style.display = "none"
            break;

        case 'how':
            modsInner.style.display = "none"
            howInner.style.display = "flex"
            statsInner.style.display = "none"
            break;

        case 'stats':
            modsInner.style.display = "none"
            howInner.style.display = "none"
            statsInner.style.display = "flex"
            break;
    }

}

const hideModal = (e) => {
    const path = e.path || (e.composedPath && e.composedPath()) || composedPath(e.target);
    if (path[0] != modalBg) return
    modalBg.style.animation = "hide-modal-bg .45s ease both .1s"
    modalContainer.style.animation = "disappear-modal .55s ease both"
}