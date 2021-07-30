const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// create box
const box = 32;

// creating control snake


// snake creation
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// creating food
let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*13+3) * box
}


// creating Score
let score = 0;

//Fast
let speed = 500;

// control the snake 

document.addEventListener("keydown",direction);

// function direction to move snake
let d;

function direction(event){

    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(event.keyCode == 38 && d != "DOWN"){ // && d != "DOWN"
        d = "UP";

    }else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";

    }else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
    }

}

// function collision

function collision(head, array){

    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y)
            return true;
    }
    return false;
}

// create speed function to make snake speed with function
function speedy(lvel){
    switch(lvel){
        case 1: speed /= 1; console.log("Speed : "+speed)
            break;
        case 2: speed /= 2; console.log("Speed : "+speed)
           break;
        case 3: speed /=3; console.log("Speed : "+speed)
            break;
        default: alert("Choice Not Available");
            break;
    }
}

// creating function draw
function draw(){

    ctx.clearRect(0,0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i==0)? "green":"white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y,box, box)

        console.log(snake.length);
    }

    // draw food
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x, food.y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(food.x, food.y,box, box)

    //box Limit
    ctx.strokeStyle = "Blue";
    ctx.strokeRect(box, box*3,box*17, box*13)

    // old position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // When snake eat
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*13+3) * box
        }
    }else{
        // Remove Tail
        snake.pop()
    }

    // Add new head
    let newhead = {
        x: snakeX,
        y: snakeY
    }


    // Game over
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 15*box || collision(newhead,snake)){

        clearInterval(game);
        //alert("GAME OVER !!!!!!!");
    }

    // add new snake head
    snake.unshift(newhead);


    ctx.fillStyle = "white";
    ctx.font = "45px changa one";
    ctx.fillText("SCORE : "+score,2*box, 1.5*box)

}

/** 
 * ********* start game *******************
 * */
let level = parseInt(prompt("Veillez choisir un Niveau :\n Lent: 1 \n Moyen: 2 \n Rapide: 3 "));

//change speed
speedy(level);

let game = setInterval(draw, speed);