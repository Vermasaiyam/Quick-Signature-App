const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontPicker = document.getElementById("fontSize");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0,0,800,500);

colorPicker.addEventListener('change', (e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvasColor.addEventListener('change', (e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500);
})

canvas.addEventListener('mousedown', (e)=>{
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
})

canvas.addEventListener('mousemove', (e)=>{
    if (isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
    }
})

canvas.addEventListener('mouseup', (e)=>{
    isDrawing = false;
})

canvas.addEventListener('mouseout', ()=>{
    isDrawing = false;
})

fontPicker.addEventListener('change', (e)=>{
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click', ()=>{
    ctx.clearRect(0,0,800,500);
})

saveButton.addEventListener('click', ()=>{
    localStorage.setItem('canvasContent', canvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-canvas.png';

    link.href = canvas.toDataURL();
    link.click();
})

retrieveButton.addEventListener('click', ()=>{
    let savedCanvas = localStorage.getItem('canvasContent');
    if (savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0,0);
    }     
})

