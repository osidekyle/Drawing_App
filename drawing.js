window.addEventListener('load',resizing);
window.addEventListener('load',()=>{
    
    const canvas= document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const slider = document.getElementById("myRange");
    const downloadButton = document.querySelector('.download-button');
    const downloadLink = document.querySelector(".download-link");
  
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
        context.lineTo(e.clientX+document.documentElement.scrollLeft,e.clientY+document.documentElement.scrollTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX+document.documentElement.scrollLeft,e.clientY+document.documentElement.scrollTop);
        
    }

    function download(){
        var dataUrl = canvas.toDataURL('image/png');
        downloadLink.href=dataUrl;
        downloadLink.click()
    }
    //Listeners
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',endPosition);
    canvas.addEventListener('mousemove',draw);
    downloadLink.addEventListener('click',download)

    
});

//Resizing
function resizing(){
    canvas.height = window.innerHeight;
    canvas.width= window.innerWidth;
}

window.addEventListener('resize',resizing);
