//changeText function
function changeText(){
  let text = document.getElementById("changingText")
  text.innerHTML = "Don't get a vasectomy..."
  text = document.getElementById("changingText").style.color = "red"
}

// start
let gameOver = false
let gameWon = false

//playerVariables
let xPos = 150
let yPos = 150
let velX = 0
let velY = 0
let color = "pink"

//enemyVariables
let enemyXPos = [30,30,270,270,270,30]
let enemyYPos = [30,10,30,270,150,150]
let eVelX = [5,5,0,5,2,6]
let eVelY = [0,2.5,5,0,6,2]
let eColor = ["crimson","crimson","crimson","crimson","crimson","crimson"]
let eActive = [true, true, true, true, true, true]

//shotsvariables
let shotXPos = Array()
let shotYPos = Array()
let sVelX = Array()
let sVelY = Array()
let sColor
let sActive = Array()

//creatingCanvasAndPen
let cnvs = document.getElementById("ballCnvs")
let pen = cnvs.getContext("2d")

//functions
function updtPos(){
  if (!gameOver){
    xPos += velX
    yPos += velY
  }
  if (xPos <= 20)
    xPos = 20
  if (yPos <= 20)
    yPos = 20
  if (xPos >= 280)
    xPos = 280
  if (yPos >= 280)
    yPos = 280
  for (let i = 0; i < enemyXPos.length; i++){
    if (!gameOver){
      enemyXPos[i] += eVelX[i]
      enemyYPos[i] += eVelY[i]
    }  
    if (enemyXPos[i] <= 20){
      enemyXPos[i] = 20
      eVelX[i] *= -1
    }
    if (enemyYPos[i] <= 20){
      enemyYPos[i] = 20
      eVelY[i] *= -1
    }
    if (enemyXPos[i] >= 280){
      enemyXPos[i] = 280
      eVelX [i] *= -1
    }
    if (enemyYPos[i] >= 280){
      enemyYPos[i] = 280
      eVelY[i] *= -1
    }
  }
  for (let i = 0; i < shotXPos.length; i++){
    if (!gameOver){
      shotXPos[i] += sVelX[i]
      shotYPos[i] += sVelY[i]
    }  
    if (shotXPos[i] <= 5){
      shotXPos[i] = 5
      sVelX[i] *= -1
    }
    if (shotYPos[i] <= 5){
      shotYPos[i] = 5
      sVelY[i] *= -1
    }
    if (shotXPos[i] >= 295){
      shotXPos[i] = 295
      sVelX [i] *= -1
    }
    if (shotYPos[i] >= 295){
      shotYPos[i] = 294
      sVelY[i] *= -1
    }
  }
    
}

function ballColor(e){
  let colors = ["pink","turquois","purple","yellow","gold","lavender","teal","powderBlue","orange","maroon","silver","darkSlateGray","mistyRose","thistle"]
  if (e.key == "c"){
    color = colors[Math.floor(Math.random()* colors.length)]
  }
}

function shoot(){
  shotXPos[shotXPos.length] = xPos 
  shotYPos[shotYPos.length] = yPos - 20
  sVelX[sVelX.length] = 0
  sVelY[sVelY.length] = -5
  sColor = color
  sActive[sActive.length] = true
}


function draw(){
  pen.clearRect(0,0,300,300)
  pen.beginPath()
  pen.arc(xPos,yPos,20,0,Math.PI*2)
  pen.fillStyle = color
  pen.fill()
  for (let i = 0; i < enemyXPos.length; i++){
    if (eActive[i]){
      pen.beginPath()
      pen.arc(enemyXPos[i],enemyYPos[i],20,0,Math.PI*2)
      pen.fillStyle = eColor[i]
      pen.fill()
    }
  }
  for (let i = 0; i < shotXPos.length; i++){
    if(sActive[i]){
      pen.beginPath()
      pen.arc(shotXPos[i],shotYPos[i],5,0,Math.PI*2)
      pen.fillStyle = color
      pen.fill()
    }
  }
  updtPos()
  playerCollision()
  collision()
  checkWin()
}

function controls(e){
  let key = e.key
  if (key == "w"){
    velY = -10
  }
  if (key == "a"){
    velX = -10
  }
  if (key == "s"){
    velY = 10
  }
  if (key == "d"){
    velX = 10
  }
  if (key == "p" && !gameOver && !gameWon){
    shoot()
  }
}

function stop(){
  velX = 0
  velY = 0
}


function collision(){
for (let i = 0; i < enemyXPos.length; i++){
  for (let j = 0; j < shotXPos.length; j++){
    diffXPos = Math.abs(enemyXPos[i] - shotXPos[j])
    diffYPos = Math.abs(enemyYPos[i] - shotYPos[j])
    if (eActive[i] && sActive[j] && diffXPos <= 20 && diffYPos <= 20){
      eActive[i] = false
      eVelX[i] = 0
      eVelY[i] = 0
      sActive[j] = false
      sVelX[j] = 0
      sVelY[j] = 0
    }
  }
}
}

function playerCollision(){
  for (let i = 0; i < enemyXPos.length; i++){
    diffXPos = Math.abs(enemyXPos[i] - xPos)
    diffYPos = Math.abs(enemyYPos[i] - yPos)
    if (eActive[i] && !gameWon && diffXPos <= 20 && diffYPos <= 20){
      gameOver = true
      stop()
      pen.beginPath()
      pen.fillStyle = color
      pen.font = "30px serif"
      pen.fillText ("YOU LOSE!",75,150)
    }
  }
  for (let i = 0; i < shotXPos.length; i++){
    diffXPos = Math.abs(shotXPos[i] - xPos)
    diffYPos = Math.abs(shotYPos[i] - yPos)
    if (sActive[i] && !gameWon && diffXPos <= 15 && diffYPos <= 15){
      gameOver = true
      stop()
      pen.beginPath()
      pen.fillStyle = color
      pen.font = "30px serif"
      pen.fillText ("YOU LOSE!",75,150)
    }
  }
}

function checkWin(){
  let counter = 0
  for (let i = 0; i < eColor.length; i++){
    if (eActive[i] == false)
      counter++
  }
  if (counter == eActive.length){
    gameWon = true
    pen.beginPath()
    pen.fillStyle = color
    pen.font = "30px serif"
    pen.fillText ("YOU WIN!",75,150)
  }
}

/*
//drawing triangle
pen.beginPath()
pen.strokeStyle = "red"
pen.moveTo(50,50)
pen.lineTo(250,250)
pen.lineTo(250,50)
pen.lineTo(50,50)
pen.stroke()

//drawing circle
pen.beginPath()
pen.fillStyle = "purple"
pen.arc(150,150,50,0,Math.PI*2,true)
pen.fill()
*/

//Events
addEventListener("click",changeText)
//addEventListener("keypress",controls)
//addEventListener("keydown",ballColor)
//addEventListener("keyup",stop)
addEventListener("keydown",controls)
addEventListener("keydown",ballColor)
addEventListener("keyup",stop)
setInterval(draw, 17)