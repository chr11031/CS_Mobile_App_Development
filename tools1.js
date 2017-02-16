//drawing
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

black.addEventListener('click', function(){
	currentColor = colorBlack;
	currentTool = toolPaint;
});
purple.addEventListener('click', function(){
	currentColor = colorPurple;
	currentTool = toolPaint;
});
green.addEventListener('click', function(){
	currentColor = colorGreen;
	currentTool = toolPaint;
});
blue.addEventListener('click', function(){
	currentColor = colorBlue;
	currentTool = toolPaint;
});
red.addEventListener('click', function(){
	currentColor = colorRed;
	currentTool = toolPaint;
});

//sizes
var small = document.getElementById('small');
var normal = document.getElementById('normal');
var large = document.getElementById('large');
var huge = document.getElementById('huge');
var sizeSmall = 3;
var sizeNormal = 5;
var sizeLarge = 7;
var sizeHuge = 10;
var clickSize = new Array();
var currentSize = sizeNormal;

small.addEventListener('click', function(){
	currentSize = sizeSmall;
});
normal.addEventListener('click', function(){
	currentSize = sizeNormal;
});
large.addEventListener('click', function(){
	currentSize = sizeLarge;
});
huge.addEventListener('click', function(){
	currentSize = sizeHuge;
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
});
eraser.addEventListener('click', function(){
	currentTool = toolEraser;
});
bucket.addEventListener('click', function(){
	currentTool = toolBucket;
});
textbox.addEventListener('click', function(){
	currentTool = toolText;
});

//clear function
clear.addEventListener('click', function(){
	context.clearRect(0,0, context.canvas.width, context.canvas.height);
	clickColor = [];
	clickSize = [];
	clickX = [];
	clickY = [];
	clickDrag = [];
	clickTool = [];
});

//creating the clicks that will be recorded
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

//canvas creation
var canvasDiv = document.getElementById('canvasDiv');
var canvas = document.createElement('canvas');
canvas.setAttribute('width', 600);
canvas.setAttribute('height', 300);
canvas.setAttribute('id', 'canvas');
canvas.setAttribute('style', 'border: 5px solid red;');
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
	
	paint = true;
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	redraw();
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