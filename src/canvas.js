import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


// Event Listeners


addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
function Star(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
        // x: 3,
        x: utils.randomIntFromRange(-30, 30),
        y: 30
    }
    this.gravity = 1
    this.friction = 0.4
}

Star.prototype.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Star.prototype.update = function () {
    this.draw()

    if (this.x + this.radius + this.velocity.x > canvas.width || this.x + this.radius + this.velocity.x < this.radius + 20) {
        this.velocity.x = -this.velocity.x * this.friction
        this.shatter()
    } else {
        this.x += this.velocity.x * 0.92
    }

    if (this.y + this.radius + this.velocity.y > canvas.height - floorHeight / 2) {
        this.velocity.y = -this.velocity.y * this.friction
        this.shatter()
    } else {
        this.velocity.y += this.gravity
    }

    this.y += this.velocity.y
}

Star.prototype.shatter = function () {
    this.radius -= 2
    for (let i = 0; i < 8; i++) {
        miniStars.push(new MiniStar(this.x, this.y, 2))
    }
}

function MiniStar(x, y, radius, color) {
    Star.call(this, x, y, radius, color)
    this.velocity = {
        x: utils.randomIntFromRange(-5, 5),
        y: utils.randomIntFromRange(-15, 15)
    }
    this.friction = 0.8
    this.gravity = 0.1
    this.ttl = 50
    this.opacity = 1
}

MiniStar.prototype.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(255, 255, 255, ${this.opacity}`
    c.fill()
    c.closePath()
}

MiniStar.prototype.update = function () {
    this.draw()

    if (this.y + this.radius + this.velocity.y > canvas.height - floorHeight / 2) {
        this.velocity.y = -this.velocity.y * this.friction
    } else {
        this.velocity.y += this.gravity
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
    this.ttl -= 1
    this.opacity -= 1 / this.ttl
}

function drawMountain(count, height, color) {
    for (let i = 0; i < count; i++) {
        const mWidth = canvas.width / count
        c.beginPath()
        c.moveTo(i * mWidth, canvas.height)
        c.lineTo(i * mWidth + mWidth + 325, canvas.height)
        c.lineTo(i * mWidth + mWidth / 2, canvas.height - height)
        c.lineTo(i * mWidth - 325, canvas.height)
        c.fillStyle = color;
        c.fill()
        c.closePath()
    }
}

// Implementation
let stars
let miniStars
let backgroundStars
let floorHeight = 100

function init() {
    stars = []
    miniStars = []
    backgroundStars = []


    for (let i = 0; i < utils.randomIntFromRange(1, 3); i++) {
        setInterval(() => {
            stars.push(new Star(innerWidth / 2 + utils.randomIntFromRange(-innerWidth / 2, innerWidth / 2),
                10, 6, '#e3eaef'));
        }, utils.randomIntFromRange(1500, 3000))
    }

    for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const r = Math.random() * 3
        backgroundStars.push(new Star(x, y, r, 'white'))
    }
}

function createGradient(y1, y2, colorStop1, colorStop2) {
    const bgGradient = c.createLinearGradient(0, y1, 0, y2)
    bgGradient.addColorStop(0, colorStop1)
    bgGradient.addColorStop(1, colorStop2)
    return bgGradient
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = createGradient(0, canvas.height, '#171e26', '#3d586b');
    c.fillRect(0, 0, canvas.width, canvas.height)

    backgroundStars.forEach(backgroundStars => {
        backgroundStars.draw()
    })

    drawMountain(1, canvas.height - 50, createGradient(-50, 150, '#c9c9c9', '#262728'));
    drawMountain(2, canvas.height - 100, createGradient(0, 230, '#c9c9c9', '#262728'));
    drawMountain(3, canvas.height - 200, createGradient(100, 300, '#c9c9c9', '#2b2d2c'));

    c.fillStyle = '#393939'
    c.fillRect(0, canvas.height - floorHeight, canvas.width, floorHeight / 2)

    stars.forEach((star, index) => {
        star.update()
        if (star.radius === 0) {
            stars.splice(index, 1)
        }
    })


    miniStars.forEach((miniStar, index) => {
        miniStar.update()
        if (miniStar.ttl === 0) {
            miniStars.splice(index, 1)
        }
    })
    c.fillStyle = '#393939'
    c.fillRect(0, canvas.height - floorHeight / 2, canvas.width, floorHeight / 2)

}

init()
animate()