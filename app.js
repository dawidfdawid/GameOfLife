let drawing = false;
let arr = [[0,0,0,1,0,0,0,0,0],[0,0,1,1,0,0,0,0,0]];

function initGrid(){
    let grid = document.getElementById("grid");
    let i;
    //let drawing;
    for (i=0; i<25; i++){
        let row = grid.insertRow(i);
        let j;
        for (j=0; j<40;j++){
            let cell = row.insertCell(j);
            cell.classList.add("no");
            cell.addEventListener("mousedown", cellChange);
            cell.addEventListener("mouseover", cellChange2);
        }
    }
    return;
}
let evolving;

let butt = document.getElementById("startb");
butt.addEventListener("click", evolve);

let clear  = document.getElementById("clear");
clear.addEventListener("click", clearGrid);

let stop = document.getElementById("stop");
stop.addEventListener("click", e => {
    clearInterval(evolving);
    evolving = 0;
})

let slider = document.getElementById("myRange");
slider.addEventListener("change", sliderEvolve);

window.addEventListener('mouseup', e => {
    if (drawing === true) {
      drawing = false;
    }
  });

function cellChange(){
    if (this.className === "no"){
        this.className = "yes";
    }
    else{
        this.className = "no";
    }
    drawing = true;
}
function cellChange2(){
    if (drawing === true){
        if (this.className === "no"){
            this.className = "yes";
        }
        else{
            this.className = "no";
        }
    }
}
let speed = document.getElementById("speed");

function liveNeighbors(i,j,grid){
    //let grid = document.getElementById('grid')
    let tablerows = grid.rows.length;
    let tablecols = grid.rows[0].cells.length;
    let pc;
    let pr;
    if (j-1<0) {
        pc = tablecols - 1; 
    }
    else {
        pc = j - 1;
    }
    let nc = (j+1) % tablecols;
    if (i-1<0) {
        pr = tablerows - 1; 
    }
    else {
        pr = i - 1;
    }
    let nr = (i+1) % tablerows;
    let xd = [pc , j , nc,pc, nc, pc , j , nc ];
    let yd = [pr , pr, pr,i , i , nr , nr ,nr ];
    let k;
    let total = 0;
    for (k = 0; k<8; k++){
        if (grid.rows[yd[k]].cells[xd[k]].className === "yes"){
            total++;
        }
    }
    return total;
}

function sliderEvolve(){
    speed.innerText = slider.value;
    clearInterval(evolving);
    //console.log(evolving)
    if (!evolving){
        {}
    }
    else{
    evolving = 0;
    evolving = setInterval(evolveBoard,slider.value);
    }
    
}

function evolveBoard(){
    let grid = document.getElementById('grid');
    //let arr = [[0,0,0,1,0,0,0,0,0],[0,0,1,1,0,0,0,0,0]];
    let i;
    let j;
    let gridclone = grid.cloneNode(true);
    for (i=0; i<grid.rows.length;i++){
        for (j=0; j<grid.rows[0].cells.length; j++){
            let liveN = liveNeighbors(i,j,gridclone);
            let cell; 
            if (gridclone.rows[i].cells[j].className === "yes"){
                cell = 1;
            } // current cell in for loop
            else{
                cell = 0;
            }
            
            if (arr[cell][liveN]){
                grid.rows[i].cells[j].className = "yes";
            } //current cell changes into new cell
            else{
                grid.rows[i].cells[j].className = "no";
            }
        }
    }
    if (gridclone.isEqualNode(grid)){
        clearInterval(evolving);
        evolving = 0;
    }
}

function clearGrid(){
    clearInterval(evolving);
    grid = document.getElementById("grid");
    let i;
    let j;
    for (i=0;i<grid.rows.length;i++){
        for (j=0;j<grid.rows[0].cells.length;j++){
            grid.rows[i].cells[j].className = "no";
        }
    }
    evolving = 0;
}

function evolve(){
    if (evolving){
        {}
    }
    else{
        evolving = 0;
        evolving = setInterval(evolveBoard,slider.value);
    }
}

let darr = document.getElementById("rule0");
darr.addEventListener('change',changeRuleArray);
let aarr = document.getElementById("rule1");
aarr.addEventListener('change',changeRuleArray);

function changeRuleArray(){
    let i;
    for (i=0;i<9;i++){
        if (darr[i].checked){
            arr[0][i] = 1;
        }
        else {
            arr[0][i] = 0;
        }
        if (aarr[i].checked){
            arr[1][i] = 1;
        }
        else {
            arr[1][i] = 0;
        }
    }
}


initGrid();

