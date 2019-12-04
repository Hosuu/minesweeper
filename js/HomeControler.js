export default class HomeControler {
    constructor(settings) {

        this.settings = settings

        this.toggledMenu = false
        this.initEventListeners()
        this.createPageAnimation()
    }

    initEventListeners() {

        document.addEventListener('click', event => {
            if (event.target.hasAttribute('cta'))
                this.cta(event.target.getAttribute('cta'), event)
        })

    }

    createPageAnimation() {

        this.PageAnimation = gsap.timeline({ defaults: { duration: .75, ease: 'power2.out' } });

        this.PageAnimation
            .set('.home-section', { opacity: 1 })
            .set('.home-title', { y: window.innerHeight / 2 - 50 })
            .from('.home-title', .75, { ease: "power2.out", scale: 0, opacity: 0 })
            .to('.home-title', 1, { y: 0, ease: "power2.out" })
            .from('#easy-diff', .5, { opacity: 0, y: 75 }, "-=0.25")
            .from('#home-version', .5, { opacity: 0 }, "<")
            .from('#normal-diff', .5, { opacity: 0, y: 75 }, "<.15")
            .from('#hard-diff', .5, { opacity: 0, y: 75 }, "<.15")
            .from('#insane-diff', .5, { opacity: 0, y: 75 }, "<.15")
            .from('#mods-btn', { ease: "back.out(2)", scale: 0 }, "<.35")
            .from('#start-btn', 1, { ease: "back.out(2)", scale: 0 }, "<.1")
            .from('.home-menu-btn', .75, { scale: 0, y: 80, ease: "back.out(3)" }, "<.25")
            .from('#htp-btn', { y: 250 }, "<.25")
            .from('#stats-btn', { y: 250 }, "<.1")
            // .from('#shop-btn', { y: 250 }, "<")
            .from('#config-btn', { y: 250 }, "<.08")
        // .from('#wheel-btn', { y: 250 }, "<")
    }

    restartPageAnimation() {
        this.PageAnimation.restart()
    }

    cta(action, event) {
        console.log('[CTA]', action)
        switch (action) {

            case 'easy':
            case 'normal':
            case 'hard':
            case 'insane':
                //** Set difficulty **//
                this.settings.changeDifficulty(action)
                //** Visual **//
                const divs = Array.from(event.composedPath()[1].children)
                divs.filter(e => e.getAttribute('cta') != action).forEach(e => gsap.to(e, .25, { opacity: .8, scale: .9, }))
                gsap.to(event.target, .25, { opacity: 1, scale: 1.1, })
                break;

            case 'mods':
            case 'stats':
                this.showModal(action); break;

            case 'start': this.startGame(); break;
            case 'toggle-menu': this.toggleMenu(); break;
            case 'htp': this.howToPlay(); break;
            case 'config': this.config(); break;

            default: console.error('[CTA ERROR] Action not recognized')
        }

    }

    toggleMenu() {
        this.toggledMenu = !this.toggledMenu

        const menuY = document.querySelector('#home-menu').getBoundingClientRect().top - 80 + window.pageYOffset

        if (this.toggledMenu) {
            gsap.to(document.body, { y: -menuY, ease: 'power3.inOut', duration: .75 })
            gsap.to(event.target, { rotate: 180, ease: 'power3.inOut', duration: .75 })
        }
        else {
            gsap.to(document.body, { y: 0, ease: 'power3.inOut', duration: .75 })
            gsap.to(event.target, { rotate: 0, ease: 'power3.inOut', duration: .75 })
        }

    }

    startGame() {
        this.settings.saveSettings()
        window.location.replace('html/game.html')
    }

    showModal() {
        alert('Dev Build, WIP')
    }
    howToPlay() {
        alert('Dev Build, WIP')
    }
    config() {
        alert('Dev Build, WIP')
    }
}