//set secondary menus to display none
document.getElementById('sizeMenu').style.display = 'none';
document.getElementById('colorMenu').style.display = 'none';

//color button declarations and listeners
var purple = document.getElementById('purple');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var red = document.getElementById('red');
var black = document.getElementById('black');
var colorPurple = "#cb3594";
var colorGreen = "#00ff00";
var colorRed = "#ff0000";
var colorBlue = "#0000ff";
var colorWhite = "#FFFFFF";
var colorBlack = "#000000";
var currentColor = colorRed;
var clickColor = new Array();

//show color menu when color icon is clicked
color.addEventListener('click', function() {
    document.getElementById('colorMenu').style.display = 'block';
});

black.addEventListener('click', function(){
	currentColor = colorBlack;
    if(currentTool == toolEraser){
        currentTool = toolPaint;
        resetIcons();
      document.getElementById('paint').src="icons/pencil-selected.png";
    }
    document.getElementById('color').src="icons/color-black.png";
    document.getElementById('colorMenu').style.display = 'none';
});
green.addEventListener('click', function(){
	currentColor = colorGreen;
	if(currentTool == toolEraser){
        currentTool = toolPaint;
        resetIcons();
      document.getElementById('paint').src="icons/pencil-selected.png";
    }
    document.getElementById('color').src="icons/color-green.png";
    document.getElementById('colorMenu').style.display = 'none';
});
blue.addEventListener('click', function(){
	currentColor = colorBlue;
	if(currentTool == toolEraser){
        currentTool = toolPaint;
        resetIcons();
      document.getElementById('paint').src="icons/pencil-selected.png";
    }
    document.getElementById('color').src="icons/color-blue.png";
    document.getElementById('colorMenu').style.display = 'none';
});
red.addEventListener('click', function(){
	currentColor = colorRed;
	if(currentTool == toolEraser){
        currentTool = toolPaint;
        resetIcons();
      document.getElementById('paint').src="icons/pencil-selected.png";
    }
    document.getElementById('color').src="icons/color-red.png";
    document.getElementById('colorMenu').style.display = 'none';
});

//sizes
var small = document.getElementById('small');
var normal = document.getElementById('normal');
var large = document.getElementById('large');
var huge = document.getElementById('huge');
var sizeSmall = 1;
var sizeNormal = 5;
var sizeLarge = 10;
var sizeHuge = 15;
var clickSize = new Array();
var currentSize = sizeNormal;

size.addEventListener('click', function() {
    document.getElementById('sizeMenu').style.display = 'block';
});

small.addEventListener('click', function(){
	currentSize = sizeSmall;
    document.getElementById('size').src="icons/small.png";
    document.getElementById('sizeMenu').style.display = 'none';
});
normal.addEventListener('click', function(){
	currentSize = sizeNormal;
    document.getElementById('size').src="icons/normal.png";
    document.getElementById('sizeMenu').style.display = 'none';
});
large.addEventListener('click', function(){
	currentSize = sizeLarge;
    document.getElementById('size').src="icons/large.png";
    document.getElementById('sizeMenu').style.display = 'none';
});
huge.addEventListener('click', function(){
	currentSize = sizeHuge;
    document.getElementById('size').src="icons/huge.png";
    document.getElementById('sizeMenu').style.display = 'none';
});

//tool buttons
var paint = document.getElementById('paint');
var eraser = document.getElementById('eraser');
var textbox = document.getElementById('textbox');
var bucket = document.getElementById('bucket');
var clear = document.getElementById('clear');
var toolPaint = "paint";
var toolEraser = "eraser";
var toolBucket = "bucket";
var toolText = "text";
var currentTool = toolPaint;
var clickTool = new Array();

paint.addEventListener('click', function(){
	currentTool = toolPaint;
    resetIcons();
    document.getElementById('paint').src="icons/pencil-selected.png";
});
eraser.addEventListener('click', function(){
	currentTool = toolEraser;
    resetIcons();
    document.getElementById('eraser').src="icons/eraser-selected.png";
});
bucket.addEventListener('click', function(){
	currentTool = toolBucket;
    resetIcons();
    document.getElementById('bucket').src="icons/bucket-selected.png";
});
textbox.addEventListener('click', function(){
	currentTool = toolText;
    resetIcons();
    document.getElementById('textbox').src="icons/text-selected.png";
});
//reset icons function
function resetIcons() {
    document.getElementById('paint').src="icons/pencil.png";
    document.getElementById('eraser').src="icons/eraser.png";
    document.getElementById('textbox').src="icons/text.png";
    document.getElementById('bucket').src="icons/bucket.png";
}

//clear function
clear.addEventListener('click', function(){
	context.clearRect(0,0, context.canvas.width, context.canvas.height);
	clickColor = [];
	clickSize = [];
	clickX = [];
	clickY = [];
	clickDrag = [];
	clickTool = [];
      if (document.getElementById("input1")){
        for(var j = clickPara.length; j > 0; j--){
            document.body.removeChild(document.getElementById("input1"));
            clickPara.pop();
        }
    }
});


//creating the clicks that will be recorded
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickPara = new Array();
var paint;

//canvas creation
var canvasDiv = document.getElementById('canvasDiv');
var canvas = document.createElement('canvas');
canvas.setAttribute('width', '300px');
canvas.setAttribute('height', '400px');
canvas.setAttribute('style', 'border: solid 3px #d3d3d3');
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);

if(typeof G_vmlCanvasManager != 'undefined'){
	canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

//simple drawing
//touching the mouse or finger
$('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    
    if(currentTool == toolText){
        addTextBox(mouseX, mouseY);
    }else if (currentTool == toolBucket){
        fillArea(mouseX, mouseY);
    }else{
        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    }
});
canvas.addEventListener('touchstart', function(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;
	
	paint = true;
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	redraw();
});

//drag the finger or mouse
$('#canvas').mousemove(function(e){
	if(paint){
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});

canvas.addEventListener('touchmove', function(e){
	if(paint){
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});

//lift the mouse or finger
$('#canvas').mouseup(function(e){
	paint = false;
});

canvas.addEventListener('mouseup', function(e){
	paint = false;
});

//mouse leaving the pageX
$('#canvas').mouseleave(function(e){
	paint = false;
});

canvas.addEventListener('mouseleave', function(e){
	paint = false;
});

//puts the clicked spots into the click arrays.
function addClick(x, y, dragging){
    context = canvas.getContext('2d');
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	if(currentTool == toolEraser){
		clickColor.push(colorWhite);
	}else{
		clickColor.push(currentColor);
	}
	clickSize.push(currentSize);
	clickTool.push(currentTool);
}

function redraw(){
	context.lineJoin = "round";
	
	for(var i=0; i < clickX.length; i++){
		context.beginPath();
		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i]-1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.strokeStyle = clickColor[i];
		context.lineWidth = clickSize[i];
		context.stroke();
	}
}

//bucket tool
function fillArea(x, y) {

    // Initialize drawing grid buffer to 'not-drawn' state
    var drawnArea = new Array(canvas.width * canvas.height);
    for(var i = 0; i < drawnArea.length; i++) 
    {
        drawnArea[i] = 0;
    }    

    // Setup base color, fill color pixel
    var baseColor = context.getImageData(x, y, 1, 1).data;
    var cColor = parseInt(currentColor.replace("#", "0x"));
    var fillPixel = context.createImageData(1,1);
    fillPixel.data[0] = ((cColor >> 16) % 256);    // Red
    fillPixel.data[1] = ((cColor >> 8)  % 256); // Green
    fillPixel.data[2] = (cColor         % 256);    // Blue    
    fillPixel.data[3] = 255;
    
    // Inverted recursive function
    var stack = new Array();
    var firstPixel = [x, y];
    stack.push(firstPixel);

    // Fill the entire area
    while(stack.length != 0) {
        
        // Draw Pixel, mark it as such, remove pixel
        x = stack[stack.length - 1][0];
        y = stack[stack.length - 1][1];
        context.putImageData(fillPixel, x, y);                
        drawnArea[x + (y * canvas.width)] = 1;
        stack.pop();        
        
        // Setup neighbors
        var neighbors = [ [x+1, y], [x-1, y], [x, y-1], [x, y+1] ];

        // Check each neighbor    
        for(var i = 0; i < 4; i++) 
        {
            // Bounds check, previously marked check            
            if( (neighbors[i][0] > 0 && neighbors[i][0] < canvas.width) && 
                (neighbors[i][1] > 0 && neighbors[i][1] < canvas.height) &&
                (drawnArea[neighbors[i][0] + (neighbors[i][1] * canvas.width)] != 1))
            {
                // Check for base color of neighbor
                var neighborPixel = context.getImageData(neighbors[i][0], neighbors[i][1], 1,1); 
                if( (neighborPixel.data[0] == baseColor[3]) && 
                    (neighborPixel.data[1] == baseColor[2]) && 
                    (neighborPixel.data[2] == baseColor[1]) && 
                    (neighborPixel.data[3] == baseColor[0]))
                {                    
                    stack.push(neighbors[i]);
                }
            }
        }        
    }
}

//text tool
function addTextBox(mouseX, mouseY){
    var input = document.createElement('p');
        input.setAttribute("name","input1");
        input.setAttribute("id","input1");
        var newText = document.createTextNode("Lorem Ipsum");
        input.contentEditable = true;
        input.appendChild(newText);
        document.body.appendChild(input);
        input.style.position = "absolute";
        input.style.left = mouseX + "px";
        input.style.top = mouseY - 18 + "px";
        input.style.color = currentColor;
        //input.style.font-size = currentSize * 10 + "%";
        clickPara.push(input);
        this.select()
}

//css for icons
