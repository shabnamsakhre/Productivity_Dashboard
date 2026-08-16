function openFeature() {
    const allElem = document.querySelectorAll('.elem')
    const fullElem = document.querySelectorAll('.fullElem')
    const fullElemCloseBtn = document.querySelectorAll('.close')

    allElem.forEach((elm) => {
        elm.addEventListener('click', () => {
            fullElem[elm.id].style.display = 'block'
        })
    })

    fullElemCloseBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            fullElem[btn.id].style.display = 'none'
        })
    })
}

openFeature()