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

// The Recursive Backtracker algorithm
function generateMaze(grid, startX = 0, startY = 0) {
    let stack = [];
    let current = grid[startY][startX];
    current.visited = true;
    stack.push(current);

    const getNeighbors = (cell) => {
        let neighbors = [];
        let { x, y } = cell;

        // Possible neighbor positions (top, right, bottom, left)
        const directions = [
            { dx: 0, dy: -1, wallA: "top", wallB: "bottom" },
            { dx: 1, dy: 0, wallA: "right", wallB: "left" },
            { dx: 0, dy: 1, wallA: "bottom", wallB: "top" },
            { dx: -1, dy: 0, wallA: "left", wallB: "right" }
        ];

        for (let dir of directions) {
            let nx = x + dir.dx;
            let ny = y + dir.dy;
            if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight && !grid[ny][nx].visited) {
                neighbors.push({ cell: grid[ny][nx], direction: dir });
            }
        }
        return neighbors;
    };

    while (stack.length > 0) {
        let neighbors = getNeighbors(current);
        if (neighbors.length > 0) {
            let { cell: next, direction } = neighbors[Math.floor(Math.random() * neighbors.length)];
            current.walls[direction.wallA] = false;
            next.walls[direction.wallB] = false;
            next.visited = true;
            stack.push(next);
            current = next;
        } else {
            current = stack.pop();
        }
    }
}

const grid = createGrid(gridWidth, gridHeight);
generateMaze(grid);

// Draw the maze on the canvas
function drawMaze(grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const cell = grid[y][x];
            const x1 = x * cellSize;
            const y1 = y * cellSize;

            // Draw walls
            if (cell.walls.top) ctx.strokeRect(x1, y1, cellSize, 1);
            if (cell.walls.right) ctx.strokeRect(x1 + cellSize, y1, 1, cellSize);
            if (cell.walls.bottom) ctx.strokeRect(x1, y1 + cellSize, cellSize, 1);
            if (cell.walls.left) ctx.strokeRect(x1, y1, 1, cellSize);
        }
    }
}

drawMaze(grid);
