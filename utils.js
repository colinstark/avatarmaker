function drawInlineSVG(svgElement, ctx, callback) {
  var svgURL = new XMLSerializer().serializeToString(svgElement);
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(this, 0, 0);
    callback();
  }
  img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);
}
// core.style.fill = "#00FFAA";
//drawInlineSVG(theSVG, ctx);

let name = "Xavier";
leName.innerHTML = name;
nameSum = name.split("").reduce((acc, char) => {
  return acc + char.charCodeAt(0);
}, 0)

let colors = ["#F9D7DE", "#BEEDFF", "#FFD9C4"];
let selectedColor = colors[nameSum % colors.length];


const ctx = canvas.getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 256, 640);
const bg_gradient = ctx.createLinearGradient(0, 0, 0, 512)

bg_gradient.addColorStop(0, selectedColor);
bg_gradient.addColorStop(1, "#FFFFFF");

// Add three color stops
gradient.addColorStop(0, selectedColor);
gradient.addColorStop(0.15, "#FFFFFF");
gradient.addColorStop(0.4, selectedColor);
gradient.addColorStop(0.6, "#FFFFFF");
gradient.addColorStop(1, selectedColor);

ctx.fillStyle = bg_gradient;
ctx.fillRect(0, 0, 512, 512);
ctx.fillStyle = gradient;

ctx.scale(2,2)
ctx.translate(-180, -80);
ctx.fill(p2);
ctx.translate(-100, -80);
ctx.fill(p2);
