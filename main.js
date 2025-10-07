const cardsBlock = document.querySelector('.cards')
const leftBtn = document.querySelector('.left')
const rightBtn = document.querySelector('.right')
const cards = document.querySelectorAll('.card')
const scrollIndicators = document.querySelector('.scroll__element')
const scrollIndicatorDots = document.querySelectorAll('.scroll__element > div')

let currentSlide = 0

function getCardsPerSlide() {
    const screenWidth = window.innerWidth

    if (screenWidth >= 1025) return 4
    

    if (screenWidth >= 769) return 3
    

    if (screenWidth >= 481) return 2
    

    return 1
}


function getTotalSlides() {
    const cardsPerSlide = getCardsPerSlide()
    return Math.ceil(cards.length / cardsPerSlide)
}

let totalSlides = getTotalSlides()


function toggleIndicators() {
    const screenWidth = window.innerWidth
    if (scrollIndicators) {
        if (screenWidth <= 1100) {
            scrollIndicators.style.display = 'none'
        } else {
            scrollIndicators.style.display = 'flex'
        }
    }
}

cardsBlock.style.transition = 'transform 0.3s ease-in-out'
toggleIndicators()
updateCarousel()

rightBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++
        updateCarousel()
    }
})

leftBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--
        updateCarousel()
    }
})

function updateCarousel() {
    const cardsPerSlide = getCardsPerSlide()
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cardsBlock).gap)
    const translateX = -currentSlide * cardWidth * cardsPerSlide
    
    cardsBlock.style.transform = `translateX(${translateX}px)`
    

    leftBtn.style.borderColor = currentSlide > 0 
        ? 'rgba(238, 10, 118, 1)' 
        : 'rgba(187, 190, 186, 1)'
    
    rightBtn.style.borderColor = currentSlide < totalSlides - 1 
        ? 'rgba(238, 10, 118, 1)' 
        : 'rgba(187, 190, 186, 1)'
    

    if (window.innerWidth > 1100) {
        updateIndicators()
    }
}


function updateIndicators() {
    scrollIndicatorDots.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.style.backgroundColor = 'rgba(238, 10, 118, 1)'
        } else {
            indicator.style.backgroundColor = 'rgba(226, 227, 225, 1)'
        }
    })
}

window.addEventListener('resize', () => {
    totalSlides = getTotalSlides()
    

    if (currentSlide >= totalSlides) {
        currentSlide = Math.max(0, totalSlides - 1)
    }
    
    toggleIndicators()
    updateCarousel()
})


let startX = 0
let currentX = 0

cardsBlock.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
})

cardsBlock.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX
})

cardsBlock.addEventListener('touchend', () => {
    const diff = startX - currentX
    

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            if (currentSlide < totalSlides - 1) {
                currentSlide++
                updateCarousel()
            }
        } else {
            if (currentSlide > 0) {
                currentSlide--
                updateCarousel()
            }
        }
    }
})


window.addEventListener('load', () => {
    totalSlides = getTotalSlides()
    toggleIndicators()
    updateCarousel()
})