window.onload = () => {
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
        ymaps.ready(init)
    
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

    fixedHeader()
    menu()
    map()
    footer()
    ourPrinciples()
}