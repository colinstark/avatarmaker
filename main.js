const colors = ["222266", "#F9D7DE", "#BEEDFF", "#FFD9C4"];
let name = "NAME";
let tags = "ambient, test";
let nameSum = 0;
let tagSum = 0;

let params = {
	color: "000000",
	shape: "circle",
	strategy: "overscale", // overscale, mirror, mirror-offset
	flip: "false"
}

function update(newName, newTags){
	updateName(newName)
	updateTags(newTags)
	paint(ctx)
}

function updateName(str){
	name = str
	nameSum = calculateSum(str)
	params.color = getColor(name, colors)
}

function updateTags(str){
	tags = str
	tagSum = calculateSum(str)
}

function getColor(str, colors){
	return colors[nameSum % colors.length]
}

function calculateSum(name){
	return name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

function paint(ctx){
	ctx.fillStyle = params.color;
	ctx.fillRect(0, 0, 512, 512);

	// ctx.scale(2,2)
	// ctx.translate(-180, -80);
	// ctx.fill(p2);
}

function drawInlineSVG(svgElement, ctx, callback) {
  var svgURL = new XMLSerializer().serializeToString(svgElement);
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(this, 0, 0);
    callback();
  }
  img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);
}

function makeGradient(color, bg_color, to_x, to_y, ctx){
	let gradient = ctx.createLinearGradient(0, 0, to_x, to_y);
	gradient.addColorStop(0, selectedColor);
	gradient.addColorStop(1, "#FFFFFF");
	return gradient
}
