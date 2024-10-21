const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 80;
canvas.height = window.innerHeight - 200;

let painting = false;
let brushColor = '#000';
let brushSize = 5;
let eraserActive = false; // New variable to track eraser state

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = eraserActive ? '#FFFFFF' : brushColor; // Use white color for eraser

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('colorPicker').addEventListener('input', (e) => {
    brushColor = e.target.value;
    eraserActive = false; // Deactivate eraser when changing color
});

document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
});

document.getElementById('eraser').addEventListener('click', () => {
    eraserActive = !eraserActive; // Toggle eraser state
    if (eraserActive) {
        document.getElementById('eraser'); 
    } else {
        document.getElementById('eraser'); 
    }
});

function takeScreenshot() {
    html2canvas(document.querySelector("#whiteboard")).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'whiteboard-screenshot.png';
        link.click();
    });
}
