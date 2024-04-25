const canvas = document.getElementById('drawingCanvas'); // Corrected ID
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);

function startDrawing(event) {
    isDrawing = true;
    draw(event);
}

function draw(event) {
    if (!isDrawing) return;
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function endDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Added to fix issue where stroke would continue drawing after mouse release
}

function saveDrawing() {
    const dataURL = canvas.toDataURL();
    let drawings = JSON.parse(localStorage.getItem('drawings')) || [];
    drawings.push(dataURL);
    localStorage.setItem('drawings', JSON.stringify(drawings));
    window.location.href = '/trout/pages/gallery.html'; // Correct path if needed
}
