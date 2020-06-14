window.addEventListener('load',resizing);
window.addEventListener('load',()=>{
    
    const canvas= document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const slider = document.getElementById("myRange");
    const downloadButton = document.querySelector('.download-button');
    const clearButton = document.querySelector('.clear-button');
    const color = document.querySelector('.color-input');

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
        context.color=color.value;
        context.lineWidth=slider.value;
        context.lineCap='round';
        context.lineTo(e.clientX+document.documentElement.scrollLeft,e.clientY+document.documentElement.scrollTop-70);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX+document.documentElement.scrollLeft,e.clientY+document.documentElement.scrollTop-70);
        
    }

    
    //Listeners
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',endPosition);
    canvas.addEventListener('mousemove',draw);
    downloadButton.onclick = function(){
        download(canvas,'drawing.png');  
    }
    clearButton.addEventListener('click',()=>{
        context.clearRect(0,0,canvas.width,canvas.height)
    });

    
});

//Resizing
function resizing(){
    canvas.height = window.innerHeight;
    canvas.width= window.innerWidth;
}

window.addEventListener('resize',resizing);


//Download
function download(canvas, filename){
    var lnk=document.createElement('a'),e;
    lnk.download=filename;
    lnk.href = canvas.toDataURL("image/png;base64");
    if(document.createEvent){
        e=document.createEvent('MouseEvents');
        e.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,0,null);
        lnk.dispatchEvent(e);
    }
    else if(lnk.fireEvent){
        lnk.fireEvent("onclick");
    }
   
}