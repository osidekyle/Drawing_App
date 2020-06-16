window.addEventListener('load',resizing);
window.addEventListener('load',()=>{
    
    const canvas= document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const slider = document.getElementById("myRange");
    const downloadButton = document.querySelector('.download-button');
    const clearButton = document.querySelector('.clear-button');
    const color = document.getElementById('color-input');
    const imageLoader = document.getElementById('imageLoader');
    const eraser = document.querySelector(".eraser");


    
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

        context.strokeStyle=color.value;
        context.globalCompositeOperation = "source-over";

        if(eraser.checked){
            context.globalCompositeOperation = "destination-out";  
            context.strokeStyle = "rgba(255,255,255,1)";
        }
        
            
        
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
        context.clearRect(0,0,canvas.width,canvas.height);
        imageLoader.value="";
    });





    //Upload Image button listener and function
    imageLoader.onchange=
    function (e){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                canvas.width=img.width
                canvas.height=img.height
                context.drawImage(img,0,0)
            }
            img.src=event.target.result
        }
        reader.readAsDataURL(e.target.files[0]);
        imageLoader.value="";
    };

    
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
    imageLoader.value=""
   
}




