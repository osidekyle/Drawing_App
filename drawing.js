//On load, resizes screen and fades in main bar
$(window).on('load',()=>{
    resizing();
    $("#main").find("*").hide().fadeToggle(750);

    //Element selectors
    const canvas= document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const downloadButton = document.querySelector('.download-button');
    const undoButton = document.querySelector('.undo');

    //variables
    let painting=false;
    var points=[];
    var sep_paths=[];

    //Function for when mouse down on canvas
    function startPosition(e){
        context.beginPath();
        points=[];
        painting=true;
        draw(e);
    }

    //Function for when mouse up on canvas
    function endPosition(){
        painting=false;
        context.beginPath();
        sep_paths.push(points);   
    }

        //Function for drawing on canvas, executes when mousedown and when mouse moves on canvas
    function draw(e){
        if(!painting){
            return
        }

        //Chooses color and composite operation
        context.strokeStyle=$("#color-input").val();
        context.globalCompositeOperation = "source-over";

        //Checks for eraser
        if($(".eraser").prop("checked")){
            context.globalCompositeOperation = "destination-out";  
            context.strokeStyle = "rgba(255,255,255,1)";
        }
        
        //Checks for line width
        context.lineWidth=$("#myRange").val();
        context.lineCap='round';
        
        //Drawing lines and appending drawing info to points
        context.lineTo(e.clientX+document.documentElement.scrollLeft,e.clientY+document.documentElement.scrollTop-70);
        points.push({x:e.clientX+document.documentElement.scrollLeft,y:e.clientY+document.documentElement.scrollTop-70,mode:context.globalCompositeOperation,width:context.lineWidth,color:context.strokeStyle});
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX+document.documentElement.scrollLeft,e.clientY+document.documentElement.scrollTop-70);   
    }

    //Function for undoing drawing
    function undo(){
        //Take off last segment
        sep_paths.splice(-1,1);
        //zclears canvas
        context.clearRect(0,0,window.innerWidth,window.innerHeight);
        //For each segment
        sep_paths.forEach(path=>{
            //Go to first coordinate
            context.beginPath();
            context.moveTo(path[0].x,path[0].y)
            for(let i=0;i<path.length;i++){
                //Draws all points in the segment
                context.strokeStyle=path[i].color;
                context.globalCompositeOperation=path[i].mode;
                context.lineWidth=path[i].width;
                context.lineTo(path[i].x,path[i].y);
            }
            context.stroke();
        });    
}

    //Listeners
    $(".undo").on('click',undo);
    $('#canvas').on('mousedown',startPosition);
    $('#canvas').on('mouseup',endPosition);
    $('#canvas').on('mousemove',draw);
    
    downloadButton.onclick = function(){
        download(canvas,'drawing.png');  
    }

    $(".clear-button").on('click',()=>{
        context.clearRect(0,0,canvas.width,canvas.height);
        $("#imageLoader").val()="";
        sep_paths=[];
    });

    //Upload Image button listener and function
    $("#imageLoader").on("change",
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
        $("#imageLoader").val()=""
    });   
});

//Resizing
function resizing(){
    canvas.height = window.innerHeight;
    canvas.width= window.innerWidth;
}

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
    $("#imageLoader").val()=""
}





