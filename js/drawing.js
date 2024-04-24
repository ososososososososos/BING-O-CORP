document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800; // Match the width set in CSS
    canvas.height = 600; // Match the height set in CSS

    let drawing = false;

    function startDrawing(e) {
        drawing = true;
        draw(e); // This helps to draw points when clicking without moving the mouse
    }

    function endDrawing() {
        drawing = false;
        ctx.beginPath(); // Begin a new path to stop drawing when moving to a new position
    }

    function draw(e) {
        if (!drawing) return;
        
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', draw);
});
