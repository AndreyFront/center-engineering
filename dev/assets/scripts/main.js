window.onload = () => {
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

    fixedHeader()
    map()
}