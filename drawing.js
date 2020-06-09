window.addEventListener('load',()=>{
    const canvas= document.querySelector('#canvas');
    const context = canvas.getContext('2d');



  
    //variables
    let painting=false;

    
    //Listeners

    
});

//Resizing
function resizing(){
    canvas.height = window.innerHeight;
    canvas.width= window.innerWidth;
}

window.addEventListener('resize',resizing());