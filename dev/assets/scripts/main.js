function validateForm() {
    const forms = document.querySelectorAll('[data-validate-form]')

    if (!forms.length) return

    let needValidate = false

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-validate-form]')) {
            const form = el.closest('[data-validate-form]')
            const inputs = form.querySelectorAll('.input')
            const regExpName = /^[A-ZА-ЯЁ]+$/i

            const validate = () => {
                if (inputs.length) {
                    inputs.forEach(elInput => {
                        const input = elInput

                        if (input.hasAttribute('required')) {
                            const type = input.getAttribute('data-input-type')

                            if (input.value) {
                                const value = input.value

                                if (type === 'tel') {
                                    if (value.length < 16) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'name') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'surname') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'patronymic') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'address') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'email') {
                                    if (!validator.isEmail(value)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                            } else {
                                input.classList.add('input--error')
                            }
                        }
                    })
                }
            }

            if (needValidate) validate()

            if (el.closest('button[type="submit"]')) {
                event.preventDefault()

                needValidate = true

                let numberСorrectАields = 0

                if (inputs.length) {
                    validate()

                    inputs.forEach(elInput => {
                        if (!elInput.classList.contains('input--error')) {
                            numberСorrectАields++
                        } else {
                            elInput.classList.add('input--error')
                        }
                    })

                    if (numberСorrectАields === inputs.length) {
                        console.log('Send data')

                        if (form.hasAttribute('action')) {
                            form.submit()
                        }
                    }
                }
            }
        }
    })
}

function modal() {
    return new HystModal({
        linkAttributeName: "data-hystmodal",
        waitTransitions: true,
    })
}

function phoneMask() {
    const phoneMasks = document.querySelectorAll('[data-phone-mask]')

    if (!phoneMasks.length) return

    phoneMasks.forEach(phoneMask => {
        IMask(phoneMask, {
                mask: '+{7}(000)000-00-00'
            }
        )
    })
}

function smoothView(btn, el, startHeight = 0) {

    if (!btn && !el) return

    const add = () => {
        btn.classList.add('not-active')
        el.classList.add('not-active')
    }

    const remove = () => {
        btn.classList.remove('not-active')
        el.classList.remove('not-active')
    }

    let heightEl = el.offsetHeight
    add()
    el.style.height = `${startHeight}px`

    if (startHeight > 0) {
        if (heightEl < startHeight) {
            remove()
            el.style.height = `${heightEl}px`
        }
    }

    const update = () => {
        el.style.height = 'auto'
        setTimeout(() => {
            heightEl = el.offsetHeight
            el.style.height = `${heightEl}px`
        }, 100)
    }

    btn.addEventListener('click', () => {
        if (el.classList.contains('not-active')) {
            remove()
            el.style.height = `${heightEl}px`
        } else {
            add()
            el.style.height = `${startHeight}px`
        }
    })

    let observer = new MutationObserver(mutationRecords => {
        update()
    })
        
    observer.observe(el, {
        childList: true, 
        subtree: true,
        characterDataOldValue: true
    })
}

function page() {
    const main = document.querySelector('[data-page="main"]')
    const header = document.querySelector('[data-header="main"]')

    if (!main) return
    if (!header) return
    
    const wrapperContent = main.querySelector('[data-page="wrapper-content"]')

    if (wrapperContent) {
        wrapperContent.style.paddingTop = `${header.offsetHeight}px`
    } else {
        main.style.paddingTop = `${header.offsetHeight}px`
    }
}

function fixedHeader() {
    const header = document.querySelector('[data-header="main"]')

    if (!header) return

    window.addEventListener('scroll', (event) => {
        const scrolled = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

        if (scrolled >= 50) {
            header.classList.add('header--fixed')
        } else {
            header.classList.remove('header--fixed')
        }
    })
}

function menu() {
    const header = document.querySelector('[data-header="main"]')

    if (!header) return

    if (window.matchMedia("(max-width: 1200px)").matches) {
        const btnMenu = header.querySelector('[data-header="btn-menu"]')
        const menu = header.querySelector('[data-header="menu"]')

        btnMenu.addEventListener('click', () => {
            btnMenu.classList.toggle('active')
            header.classList.toggle('active-menu')
        })
    }
}

function footer() {
    const main = document.querySelector('[data-footer="main"]')

    if (!main) return

    if (window.matchMedia("(max-width: 992px)").matches) {
        const blockLinks = main.querySelectorAll('[data-footer="block-links"]')

        blockLinks.forEach(elBlockLink => {
            const linkHead = elBlockLink.querySelector('[data-footer="link-head"]')
            const linksList = elBlockLink.querySelector('[data-footer="links-list"]')

            smoothView(linkHead, linksList)
        })
    }
}

function map() {
    try {
        ymaps.ready(init)
    } catch (e) {
        console.log(e)
    }

    function init() {
        const map = document.querySelector('#map')

        if (!map) return

        const htmlMapContent = (name, place, image, text) => {
            return `
                <div class="map-content">
                    <div class="map-content__block-info">
                        <span class="map-content__name">${name}</span>
                        <span class="map-content__place">${place}</span>
                    </div>
                    <div class="map-content__block-image">
                        <img src="${image}" class="map-content__image"/>
                    </div>
                    <div class="map-content__block-text">
                        <span class="map-content__text">${text}</span>    
                    </div>
                </div>
            `
        }

        const myMap = new ymaps.Map(map, {
            center: [55.77101400, 37.63209300],
            zoom: 5,
            controls: ["zoomControl"]
        });

        myMap.controls.add('fullscreenControl', { float: 'left' })

        let pm = new ymaps.Placemark([55.77101400, 37.63209300], {
            balloonContent: htmlMapContent('АО «ЛОЭСК» Санкт-Петербург', 'ул. Витебская-Сортировочная, д. 1', './assets/images/image-5.jpg', 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст. '),
            preset: 'islands#blackStretchyIcon',
            draggable: true,
            iconCaption: "Санкт-Петербург"
        }, {
            iconLayout: 'default#image',
            iconImageHref: './assets/images/point-map.svg',
            iconImageSize: [16, 16],
            iconImageOffset: [-8, -8],
            hideIconOnBalloonOpen: false,
        })

        myMap.geoObjects.add(pm)

        pm.events.add('click', (event) => {
            myMap.setCenter(event.get('target').geometry.getCoordinates())
        })
    }
}

function ourPrinciples() {
    const main = document.querySelector('[data-our-principles="main"]')

    if (!main) return

    if (window.matchMedia("(max-width: 992px)").matches) {
        const wrapperContent = main.querySelector('[data-our-principles="wrapper-content"]')
        const titleSection = main.querySelector('[data-our-principles="title-section"]')

        if (wrapperContent && titleSection) {
            const cloned = titleSection.cloneNode(true)
            wrapperContent.prepend(cloned)
            titleSection.remove()
        }
    }
}

function project() {
    const projectCards = document.querySelectorAll('[data-project-card="main"]')
    const modal = document.querySelector('#m-project')

    if (!projectCards) return
    if (!modal) return

    if (window.matchMedia("(max-width: 992px)").matches) {
        projectCards.forEach(projectCard => {
            projectCard.setAttribute('data-hystmodal', '#m-project')
        })

        document.addEventListener('click', (event) => {
            const el = event.target
    
            if (el.closest('[data-project-card="main"]')) {
                const projectCard = el.closest('[data-project-card="main"]')
                const image = projectCard.querySelector('[data-project-card="image"]')
                const blockDescription = projectCard.querySelector('[data-project-card="block-description"]')
                const name = projectCard.querySelector('[data-project-card="name"]')
    
                const modalTitle = modal.querySelector('.m-project__title')
                const modalBlockImage = modal.querySelector('.m-project__block-image')
                const modalImage = modal.querySelector('.m-project__image')
    
                modalTitle.innerText = name.textContent
                modalImage.setAttribute('src', image.getAttribute('src'))
    
                const cloned = blockDescription.cloneNode(true)
                modalBlockImage.after(cloned)
            }
        })
    }
}

function runningLine() {
    Marquee3k.init()
}

function animateNum() {
    const animateNums = document.querySelectorAll('[data-animate-num]')

    if (!animateNums.length) return

    const numbersObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            const courseNumber = entry.target.getAttribute('data-animate-num')
            const count = new CountUp(
                entry.target,
                0,
                courseNumber,
                0,
                entry.target.dataset.duration || 4,
                {
                    separator: ' ',
                    prefix: entry.target.dataset.prefix || '',
                    suffix: entry.target.dataset.suffix || ''
                }
            )
            count.start(() => {
                // entry.target.parentElement.classList.add('numbers__item_done')
            })
            observer.unobserve(entry.target)
        }
      })
    })
    
    
    animateNums.forEach(num => {
        numbersObserver.observe(num)
    })
}

page()
validateForm()
modal()
phoneMask()
fixedHeader()
menu()
map()
footer()
ourPrinciples()
project()
runningLine()
animateNum()