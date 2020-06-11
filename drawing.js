window.addEventListener('load',resizing);
window.addEventListener('load',()=>{
    
    const canvas= document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const slider = document.getElementById("myRange");

    
  
    //variables
    let painting=false;

    function startPosition(e){
        painting=true;
        draw(e);
    }
    function endPosition(){
        painting=false;
        context.beginPath();
    }


    function draw(e){
        if(!painting){
            return
        }
        context.lineWidth=slider.value;
        context.lineCap='round';
        context.lineTo(e.clientX,e.clientY-70);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX,e.clientY-70);
        
    }
    //Listeners
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',endPosition);
    canvas.addEventListener('mousemove',draw);

    
});

//Resizing
function resizing(){
    canvas.height = window.innerHeight;
    canvas.width= window.innerWidth;
}

window.addEventListener('resize',resizing);
