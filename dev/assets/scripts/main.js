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

    fixedHeader()
}