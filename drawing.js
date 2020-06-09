window.addEventListener('load',()=>{
    const canvas= document.querySelector('#canvas');
    const context = canvas.getContext('2d');



  
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
        context.linewidth=10;
        context.lineCap='round';
        context.lineTo(e.clientX,e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX,e.clientY);
        
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

window.addEventListener('resize',resizing());