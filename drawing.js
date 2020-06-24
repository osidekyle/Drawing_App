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
    const undoButton = document.querySelector('.undo');

    
    //variables
    let painting=false;

    function startPosition(e){
        context.beginPath();
        points=[];
        painting=true;
        draw(e);
    }
    function endPosition(){
        painting=false;
        context.beginPath();
        sep_paths.push(points);
        
    }

    

   
    
    var points=[];
    var sep_paths=[];
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
        points.push({x:e.clientX+document.documentElement.scrollLeft,y:e.clientY+document.documentElement.scrollTop-70,mode:context.globalCompositeOperation,width:context.lineWidth,color:context.strokeStyle});
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX+document.documentElement.scrollLeft,e.clientY+document.documentElement.scrollTop-70);
        
    }

    
    function undo(){
        console.log(sep_paths);
        sep_paths.splice(-1,1);
        context.clearRect(0,0,window.innerWidth,window.innerHeight);
        sep_paths.forEach(path=>{
            context.beginPath();
            context.moveTo(path[0].x,path[0].y)
            for(let i=0;i<path.length;i++){
                context.strokeStyle=path[i].color;
                context.globalCompositeOperation=path[i].mode;
                context.lineWidth=path[i].width;
                context.lineTo(path[i].x,path[i].y);
            }
            context.stroke();
        });
        
        
}












    //Listeners
    undoButton.onclick=function(){
        undo();
    }
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',endPosition);
    canvas.addEventListener('mousemove',draw);
    
    
    
    
    
    
    
    downloadButton.onclick = function(){
        download(canvas,'drawing.png');  
    }


    clearButton.addEventListener('click',()=>{
        context.clearRect(0,0,canvas.width,canvas.height);
        imageLoader.value="";
        sep_paths=[];
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
        imageLoader.value=""
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


//



