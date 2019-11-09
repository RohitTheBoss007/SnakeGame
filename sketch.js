const BG_COLOUR= '#231f20';
const SNAKE_COLOUR='#c2c2c2';
const FOOD_COLOUR='#e66916';

const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid blue";


canvas.width=canvas.height=600;
const FR=15;
const S=15;
const T=canvas.width/S;

let pos,snake,vel,food,prevKey=0;


function init()
{
    prevKey=0;
    pos={x:10,y:10};
    vel={x:0,y:0};


    snake=[
        {x:8,y:10},
        {x:9,y:10}, 
        {x:10,y:10},  
    ]

    randomFood();

}
init();

function randomFood()
{
    food={
        x: Math.floor(Math.random()*T),
        y: Math.floor(Math.random()*T),
    }

    for(let cell of snake)
    {
        if(cell.x==food.x&&cell.y==food.y)
        {
            return randomFood();
        }
    }
}

document.addEventListener('keydown',keydown);
function keydown(e)
{

    if((e.keyCode==37||e.keyCode==65)&&prevKey!=39&&prevKey!=68)
    {
        prevKey=e.keyCode;
        return vel={x:-1,y:0};
    }
    if((e.keyCode==38||e.keyCode==87)&&prevKey!=40&&prevKey!=83)
    {
        prevKey=e.keyCode;
        return vel={x:0,y:-1};
    }
    if((e.keyCode==39||e.keyCode==68)&&prevKey!=37&&prevKey!=65)
    {
        prevKey=e.keyCode;
        return vel={x:1,y:0};
    }
    if((e.keyCode==40||e.keyCode==83)&&prevKey!=38&&prevKey!=87)
    {
        prevKey=e.keyCode;
        return vel={x:0,y:1};
    }
    else return;

    

}

setInterval(()=>{

    requestAnimationFrame(gameLoop);
},1000/FR);

function gameLoop()
{
    ctx.fillStyle=BG_COLOUR;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle=SNAKE_COLOUR;
    for(let cell of snake)
    {
        ctx.fillRect(cell.x*S,cell.y*S,S,S);
    }


    ctx.fillStyle=FOOD_COLOUR;
    ctx.fillRect(food.x*S,food.y*S,S,S);

    pos.x+=vel.x;
    pos.y+=vel.y;

    if(pos.x<0||pos.x>T||pos.y<0||pos.y>T)
    {
        init();
    }

    if(food.x==pos.x&&food.y==pos.y){
        snake.push({...pos});
        pos.x+=vel.x;
        pos.y+=vel.y;
        randomFood();
    }

    if(vel.x||vel.y)
    {
        for(let cell of snake)
        {
            if(cell.x==pos.x&&cell.y==pos.y)
            {
                return init();
            }
        }
    snake.push({...pos});
    snake.shift();
    }
    
}

















