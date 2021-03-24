let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let paddleleft=document.querySelector(".left");
let paddleright=document.querySelector(".right");
let boardcord=board.getBoundingClientRect();



let x=true;
let y=true;
let leftplayerslife=3;
let rightplayerslife=3;
//for paddle
document.addEventListener("keydown",function(e)
{
  if(e.key=="w")
  {
    movepaddle(paddleleft,-window.innerHeight*0.1);
  }else if(e.key=="s")
  {
    movepaddle(paddleleft,window.innerHeight*0.1);
  }else if(e.key=="ArrowUp")
  {
    movepaddle(paddleright,-window.innerHeight*0.1);
  }else if(e.key=="ArrowDown")
  {
    movepaddle(paddleright,window.innerHeight*0.1);
  }

})
function setColor(idx)
{
    let allicons=document.querySelectorAll(".fas.fa-circle");
    allicons[idx].style.color="#000000";
}
function movepaddle(currpaddle,change)
{
    let currpaddlebounds=currpaddle.getBoundingClientRect();
    if(currpaddlebounds.top+change>=boardcord.top && currpaddlebounds.bottom+change<=boardcord.bottom)
    {
    currpaddle.style.top= currpaddlebounds.top+change+"px";
    }
}

//for ball
function moveball()
{
  let ballcord=ball.getBoundingClientRect();
  
 
  let balltop=ballcord.top;
  let ballleft=ballcord.left;
  let ballright=ballcord.right;
  let ballbottom=ballcord.bottom;
  let boardtop=boardcord.top;
  let boardleft=boardcord.left;
  let boardright=boardcord.right;
  let boardbottom=boardcord.bottom;

  let hastouchedleft=ballleft<boardleft;
  let hastouchedright=ballright>boardright;
  
  if(hastouchedright||hastouchedleft)
  {
      if(hastouchedright)
      {
        rightplayerslife--;
        setColor(3+rightplayerslife);
        if(rightplayerslife==0)
        {
          alert("Game Over. Player B has won");
          document.location.reload();
        }
        else{
          return resetgame();
         }
      }
       
       else
     {
        leftplayerslife--;
        setColor(leftplayerslife);
        if(leftplayerslife==0)
        {
           alert("Game Over. Player A has won");
           document.location.reload();
        }
        else{
         return  resetgame();
        }
    }
}
  function resetgame()
  {
      ball.style.top=window.innerHeight*0.40+"px";
      ball.style.left=window.innerWidth*0.40+"px";
      requestAnimationFrame(moveball);
  }

  if(balltop<=boardtop||ballbottom>=boardbottom)
  {
      x=!x;
  }
 /* if(ballleft<=boardleft||ballright>boardright)
  {
    y=!y;
  }*/
let leftpaddlebound=paddleleft.getBoundingClientRect();
let rightpaddlebound=paddleright.getBoundingClientRect();
 if(ballleft<=leftpaddlebound.right && ballright>=leftpaddlebound.right && balltop+30>=leftpaddlebound.top && ballbottom-30<=leftpaddlebound.bottom)
 {
     y=!y;
 }
 if(ballleft<=rightpaddlebound.right && ballright>=rightpaddlebound.right && balltop+30>=rightpaddlebound.top && ballbottom-30<=rightpaddlebound.bottom)
 {
     y=!y;
 }
  ball.style.top= x==true?balltop+4+"px":balltop-4+"px";
  ball.style.left=y==true?ballleft+4+"px":ballleft-4+"px";
  requestAnimationFrame(moveball);
}
requestAnimationFrame(moveball);
