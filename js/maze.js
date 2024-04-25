const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 40;
const gridWidth = canvas.width / cellSize;
const gridHeight = canvas.height / cellSize;

// Create a grid representation
function createGrid(width, height) {
    const grid = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push({
                x: x,
                y: y,
                walls: {
                    top: true,
                    right: true,
                    bottom: true,
                    left: true
                },
                visited: false
            });
        }
        grid.push(row);
    }
    return grid;
}

// The Recursive Backtracker algorithm
function generateMaze(grid, x = 0, y = 0) {
    let stack = [];
    let current = grid[y][x];
    current.visited = true;

    const checkNeighbors = () => {
        let neighbors = [];
        
        // Get valid neighbors
        if (x > 0 && !grid[y][x - 1].visited) neighbors.push(grid[y][x - 1]);
        if (y > 0 && !grid[y - 1][x].visited) neighbors.push(grid[y - 1][x]);
        if (x < gridWidth - 1 && !grid[y][x + 1].visited) neighbors.push(grid[y][x + 1]);
        if (y < gridHeight - 1 && !grid[y + 1][x].visited) neighbors.push(grid[y + 1][x]);

        if (neighbors.length > 0) {
            let next = neighbors[Math.floor(Math.random() * neighbors.length)];
            return next;
        } else {
            return undefined;
        }
    };

    const removeWall = (a, b) => {
        if (a.x === b.x) {
            if (a.y > b.y) {
                a.walls.top = false;
                b.walls.bottom = false;
            } else {
                a.walls.bottom = false;
                b.walls.top = false;
            }
        } else {
            if (a.x > b.x) {
                a.walls.left = false;
                b.walls.right = false;
            } else {
                a.walls.right = false;
                b.walls.left = false;
            }
        }
    };

    do {
        let next = checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWall(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    } while (stack.length > 0);
}

const grid = createGrid(gridWidth, gridHeight);
generateMaze(grid);

// Simple maze rendering
function drawMaze(grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const cell = grid[y][x];
            const x1 = x * cellSize;
            const y1 = y * cellSize;
            if (cell.walls.top) ctx.strokeRect(x1, y1, cellSize, 1);
            if (cell.walls.right) ctx.strokeRect(x1 + cellSize, y1, 1, cellSize);
            if (cell.walls.bottom) ctx.strokeRect(x1, y1 + cellSize, cellSize, 1);
            if (cell.walls.left) ctx.strokeRect(x1, y1, 1, cellSize);
        }
    }
}

drawMaze(grid);
