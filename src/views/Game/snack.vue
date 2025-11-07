<template>
  <div class="container noselect">
    <!-- 顶部按钮区域 -->
    <div class="top-buttons">
      <button id="replay" @click="reset"><i class="fas fa-play"></i>RESTART</button>
      <!-- <router-link to="/game" class="toMenu iconfont icon-shouye">返回菜单</router-link> -->
      <button class="toMenu iconfont icon-shouye" @click="goToGame">返回大厅</button>
    </div>
    <div class="wrapper">
      <!-- <button id="replay" @click="reset">
        <i class="fas fa-play"></i>
        RESTART
      </button> -->
      <div id="canvas" ref="canvasContainer">
      </div>
    </div>
    <div id="author">
      <div>当前得分：</div>
      <h1>{{ displayedScore }}</h1>
    </div>



    <!-- 固定在最右边的游戏规则浮层 -->
    <div class="rules-float">
      <h3>游戏规则</h3>
      <ul>
        <li>规则1：如何开始游戏<br>点击任意移动按键立即开始游戏<br>按下空格可重新开始游戏</li>
        <li>规则2：得分方式<br>吃下方块，不能触碰到自己</li>
        <li>规则3：操作<br>键盘上按击↑ ↓ ← → 移动</li>
      </ul>
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToGame = () => {
  router.push('/home').then(() => {
    window.location.reload() // 👈 刷新当前新跳转的页面
  })
}
const canvasContainer = ref(null)
const displayedScore = ref('00')

let CTX, dom_canvas
let W, H, cellSize, cellsCount
let snake, food, currentHue, requestID
let isGameOver = false
let score = 0
let maxScore = localStorage.getItem('maxScore') || 0
let particles = []
let splashingParticleCount = 20
let cells = 20

const KEY = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
  resetState() {
    this.ArrowUp = false
    this.ArrowRight = false
    this.ArrowDown = false
    this.ArrowLeft = false
  },
  listen() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && this.ArrowDown) return
      if (e.key === 'ArrowDown' && this.ArrowUp) return
      if (e.key === 'ArrowLeft' && this.ArrowRight) return
      if (e.key === 'ArrowRight' && this.ArrowLeft) return
      this[e.key] = true
      Object.keys(this)
        .filter(k => k !== e.key && typeof this[k] === 'boolean')
        .forEach(k => this[k] = false)
    })
  }
}

const helpers = {
  Vec: class {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
    add(v) {
      this.x += v.x
      this.y += v.y
      return this
    }
    mult(v) {
      if (v instanceof helpers.Vec) {
        this.x *= v.x
        this.y *= v.y
      } else {
        this.x *= v
        this.y *= v
      }
      return this
    }
  },
  isCollision(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y
  },
  drawGrid() {
    CTX.lineWidth = 1.1
    CTX.strokeStyle = "#232332"
    for (let i = 1; i < cells; i++) {
      const pos = (W / cells) * i
      CTX.beginPath()
      CTX.moveTo(pos, 0)
      CTX.lineTo(pos, H)
      CTX.stroke()
      CTX.moveTo(0, pos)
      CTX.lineTo(W, pos)
      CTX.stroke()
    }
  },
  randHue() {
    return ~~(Math.random() * 360)
  },
  hsl2rgb(hue, s, l) {
    const chroma = (1 - Math.abs(2 * l - 1)) * s
    const h = hue / 60
    const x = chroma * (1 - Math.abs(h % 2 - 1))
    let r = 0, g = 0, b = 0
    if (h < 1) [r, g] = [chroma, x]
    else if (h < 2) [r, g] = [x, chroma]
    else if (h < 3) [g, b] = [chroma, x]
    else if (h < 4) [g, b] = [x, chroma]
    else if (h < 5) [r, b] = [x, chroma]
    else if (h <= 6) [r, b] = [chroma, x]
    const m = l - chroma / 2
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
  },
  garbageCollector() {
    particles = particles.filter(p => p.size > 0)
  }
}

class Snake {
  constructor() {
    this.pos = new helpers.Vec(W / 2, H / 2)
    this.dir = new helpers.Vec(0, 0)
    this.size = W / cells
    this.color = 'white'
    this.history = []
    this.total = 1
    this.delay = 5
  }
  draw() {
    CTX.fillStyle = this.color
    CTX.shadowBlur = 20
    CTX.shadowColor = "rgba(255,255,255,.3)"
    CTX.fillRect(this.pos.x, this.pos.y, this.size, this.size)
    CTX.shadowBlur = 0
    for (let i = 0; i < this.history.length - 1; i++) {
      const { x, y } = this.history[i]
      CTX.fillStyle = "rgba(225,225,225,1)"
      CTX.fillRect(x, y, this.size, this.size)
    }
  }
  walls() {
    if (this.pos.x >= W) this.pos.x = 0
    if (this.pos.y >= H) this.pos.y = 0
    if (this.pos.x < 0) this.pos.x = W - cellSize
    if (this.pos.y < 0) this.pos.y = H - cellSize
  }
  controlls() {
    const dir = this.size
    if (KEY.ArrowUp) this.dir = new helpers.Vec(0, -dir)
    if (KEY.ArrowDown) this.dir = new helpers.Vec(0, dir)
    if (KEY.ArrowLeft) this.dir = new helpers.Vec(-dir, 0)
    if (KEY.ArrowRight) this.dir = new helpers.Vec(dir, 0)
  }
  selfCollision() {
    for (const p of this.history) {
      if (helpers.isCollision(this.pos, p)) isGameOver = true
    }
  }
  update() {
    this.walls()
    this.draw()
    this.controlls()
    if (!--this.delay) {
      if (helpers.isCollision(this.pos, food.pos)) {
        incrementScore()
        particleSplash()
        food.spawn()
        this.total++
      }
      this.history[this.total - 1] = new helpers.Vec(this.pos.x, this.pos.y)
      for (let i = 0; i < this.total - 1; i++) {
        this.history[i] = this.history[i + 1]
      }
      this.pos.add(this.dir)
      this.delay = 5
      if (this.total > 3) this.selfCollision()
    }
  }
}

class Food {
  constructor() {
    this.size = cellSize
    this.spawn()
  }
  draw() {
    CTX.globalCompositeOperation = "lighter"
    CTX.shadowBlur = 20
    CTX.shadowColor = this.color
    CTX.fillStyle = this.color
    CTX.fillRect(this.pos.x, this.pos.y, this.size, this.size)
    CTX.shadowBlur = 0
    CTX.globalCompositeOperation = "source-over"
  }
  spawn() {
    let randX = ~~(Math.random() * cells) * this.size
    let randY = ~~(Math.random() * cells) * this.size
    for (let path of snake.history) {
      if (helpers.isCollision(new helpers.Vec(randX, randY), path)) return this.spawn()
    }
    this.color = currentHue = `hsl(${helpers.randHue()}, 100%, 50%)`
    this.pos = new helpers.Vec(randX, randY)
  }
}

class Particle {
  constructor(pos, color, size, vel) {
    this.pos = pos
    this.color = color
    this.size = size / 2
    this.vel = vel
    this.gravity = -0.2
  }
  draw() {
    const hsl = this.color.match(/\d+/g).map(Number)
    const [r, g, b] = helpers.hsl2rgb(hsl[0], hsl[1] / 100, hsl[2] / 100)
    CTX.shadowColor = `rgb(${r},${g},${b})`
    CTX.shadowBlur = 0
    CTX.fillStyle = `rgb(${r},${g},${b})`
    CTX.fillRect(this.pos.x, this.pos.y, this.size, this.size)
  }
  update() {
    this.draw()
    this.size -= 0.3
    this.pos.add(this.vel)
    this.vel.y -= this.gravity
  }
}

function incrementScore() {
  score++
  displayedScore.value = score.toString().padStart(2, '0')
}

function particleSplash() {
  for (let i = 0; i < splashingParticleCount; i++) {
    const vel = new helpers.Vec(Math.random() * 6 - 3, Math.random() * 6 - 3)
    const pos = new helpers.Vec(food.pos.x, food.pos.y)
    particles.push(new Particle(pos, currentHue, food.size, vel))
  }
}

function clear() {
  CTX.clearRect(0, 0, W, H)
}

function loop() {
  clear()
  if (!isGameOver) {
    requestID = requestAnimationFrame(loop)
    helpers.drawGrid()
    snake.update()
    food.draw()
    for (let p of particles) p.update()
    helpers.garbageCollector()
  } else {
    gameOver()
  }
}

function gameOver() {
  maxScore = Math.max(score, maxScore)
  localStorage.setItem('maxScore', maxScore)
  CTX.fillStyle = "#4cffd7"
  CTX.textAlign = "center"
  CTX.font = "bold 30px Poppins, sans-serif"
  CTX.fillText("GAME OVER", W / 2, H / 2)
  CTX.font = "15px Poppins, sans-serif"
  CTX.fillText(`SCORE ${score}`, W / 2, H / 2 + 60)
  CTX.fillText(`MAXSCORE ${maxScore}`, W / 2, H / 2 + 80)
}

function reset() {
  displayedScore.value = '00'
  score = 0
  snake = new Snake()
  food.spawn()
  KEY.resetState()
  isGameOver = false
  cancelAnimationFrame(requestID)
  loop()
}

onMounted(() => {
  dom_canvas = document.createElement('canvas')
  canvasContainer.value.appendChild(dom_canvas)
  CTX = dom_canvas.getContext('2d')
  W = dom_canvas.width = 400
  H = dom_canvas.height = 400
  KEY.listen()
  cellSize = W / cells
  cellsCount = cells * cells
  snake = new Snake()
  food = new Food()
  loop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(requestID)
})
</script>


<style>
@font-face {
  font-family: "game";
  src: url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;800&display=swap");
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
button:focus {
  outline: 0;
}

html,
body {
  height: 100%;
  font-family: "Poppins", sans-serif;
  color: #6e7888;
}
body {
  background-color: #222738;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6e7888;
}
canvas {
  background-color: #181825;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
#ui {
  display: flex;
  align-items: center;
  font-size: 10px;
  flex-flow: column;
  margin-left: 10px;
}
h2 {
  font-weight: 900;
  font-size: 10px;
  letter-spacing: 8px;
  margin-bottom: 30px;
  transform: rotate(270deg);
}
#score {
  margin-top: 20px;
  font-size: 30px;
  font-weight: 800;
  transform: rotate(-90deg);
}
.noselect {
  user-select: none;
}
#replay {
  font-size: 10px;
  padding: 10px 20px;
  background: #6e7888;
  border: none;
  color: #222738;
  border-radius: 40px;
  font-weight: 800;
  /* transform: rotate(270deg); */
  /* cursor: pointer; */
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
#replay:hover {
  background: #a6aab5;
  background: #4cffd7;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
#replay svg {
  margin-right: 8px;
}
@media (max-width: 600px) {
  #replay {
    margin-bottom: 20px;
  }
  #replay,
  h2 {
    transform: rotate(0deg);
  }
  #ui {
    flex-flow: row wrap;
    margin-bottom: 20px;
  }
  #score {
    margin-top: 0;
    margin-left: 20px;
  }
  .container {
    flex-flow: column wrap;
  }
}
#author {
  width: 100%;
  bottom: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: inherit;
  text-transform: uppercase;
  padding-left: 35px;
}
#author span {
  font-size: 10px;
  margin-left: 20px;
  color: inherit;
  letter-spacing: 4px;
}
#author h1 {
  font-size: 25px;
}
.wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.toHome{
  text-decoration-line: none;
  margin-right: 20px;
  margin-bottom: 50px;
}
.toMenu{
  text-decoration-line: none;
  margin-left: 20px;
  margin-bottom: 50px;
}




.rules-float {
  position: fixed;
  top: 100px;
  right: 0;
  width: 250px;
  height: auto;
  max-height: 80vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px); /* 毛玻璃效果 */
  color: #fff;
  padding: 20px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  overflow-y: auto;
}

.rules-float h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 20px;
  color: #00ffff;
  text-shadow: 0 0 5px #00ffff;
}

.rules-float ul {
  padding-left: 18px;
}

.rules-float li {
  margin-bottom: 8px;
  font-size: 14px;
}
</style>