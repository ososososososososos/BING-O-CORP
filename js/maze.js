const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 40;
const gridWidth = Math.floor(canvas.width / cellSize);
const gridHeight = Math.floor(canvas.height / cellSize);

// Create a grid representation
function createGrid(width, height) {
    const grid = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push({
                x: x,
                y: y,
                walls: { top: true, right: true, bottom: true, left: true },
                visited: false
            });
        }
        grid.push(row);
    }
    return grid;
}

// Recursive Backtracking Maze Generation
function generateMaze(grid, x = 0, y = 0) {
    let stack = [];
    let current = grid[y][x];
    current.visited = true;

    const directions = [
        { x: 0, y: -1, wall: "top", opposite: "bottom" },
        { x: 1, y: 0, wall: "right", opposite: "left" },
        { x: 0, y: 1, wall: "bottom", opposite: "top" },
        { x: -1, y: 0, wall: "left", opposite: "right" }
    ];

    function getNeighbors(cell) {
        return directions
            .map(d => {
                let nx = cell.x + d.x;
                let ny = cell.y + d.y;
                if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight && !grid[ny][nx].visited) {
                    return { cell: grid[ny][nx], direction: d };
                }
                return null;
            })
            .filter(n => n !== null);
    }

    function removeWall(a, b, dir) {
        a.walls[dir.wall] = false;
        b.walls[dir.opposite] = false;
    }

    do {
        let neighbors = getNeighbors(current);
        if (neighbors.length > 0) {
            let { cell: next, direction } = neighbors[Math.floor(Math.random() * neighbors.length)];
            next.visited = true;
            stack.push(current);
            removeWall(current, next, direction);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    } while (stack.length > 0);
}

const grid = createGrid(gridWidth, gridHeight);
generateMaze(grid);

// Draw the maze
function drawMaze(grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const cell = grid[y][x];
            const x1 = x * cellSize;
            const y1 = y * cellSize;

            // Draw walls
            if (cell.walls.top) {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x1 + cellSize, y1);
                ctx.stroke();
            }
            if (cell.walls.right) {
                ctx.beginPath();
                ctx.moveTo(x1 + cellSize, y1);
                ctx.lineTo(x1 + cellSize, y1 + cellSize);
                ctx.stroke();
            }
            if (cell.walls.bottom) {
                ctx.beginPath();
                ctx.moveTo(x1, y1 + cellSize);
                ctx.lineTo(x1 + cellSize, y1 + cellSize);
                ctx.stroke();
            }
            if (cell.walls.left) {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x1, y1 + cellSize);
                ctx.stroke();
            }
        }
    }

    // Draw start position (Top-left corner)
    ctx.fillStyle = "green";
    ctx.font = "bold 18px Arial";
    ctx.fillText("START", 10, 20);

    // Draw end position (Bottom-right corner)
    ctx.fillStyle = "red";
    ctx.fillText("END", canvas.width - 50, canvas.height - 10);
}

drawMaze(grid);
