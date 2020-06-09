window.addEventListener('load',()=>{
    const canvas= document.querySelector('#canvas');
    const context = canvas.getContext('2d');



  
    //variables
    let painting=false;

    function startPosition(){
        painting=true;
    }
    function endPosition(){
        painting=false;
    }


    function draw(e){
        if(!painting){
            return
        }
        
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