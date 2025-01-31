const noisy = true
const mode = "overlay"
let inputs = {
	name: "NAME",
	tags: "tag, tag",
	_nameSum: 0,
	_tagSum: 0
}

let params = {
	color: colors[0],
	shape: shapes[0],
	strategy: strategies[0],
	colorStrategy: colorStrategies[0],
	flip: false
}

function update(newName, newTags) {
	inputs = {
		...inputs,
		name: newName,
		tags: newTags,
		_nameSum: calculateSum(newName),
		_tagSum: calculateSum(newTags)
	}

	params = {
		...params,
		color: getSpecificValueOf(colors, inputs._nameSum),
		shape: getSpecificValueOf(shapes, inputs._tagSum),
		strategy: getSpecificValueOf(strategies, inputs._nameSum + inputs._tagSum),
		colorStrategy: getSpecificValueOf(colorStrategies, inputs._nameSum + inputs._tagSum),
		flip: (inputs._nameSum + inputs._tagSum) % 2 == 0
	}

	ctx.width = canvas.width
	ctx.height = canvas.height

	console.log(params, inputs)
	paint(ctx)
}

function calculateSum(name) {
	return name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

function getSpecificValueOf(arr, hash) {
	console.log("getting", arr[hash % arr.length], arr.length)
	return arr[hash % arr.length]
}

function paint(ctx) {
	ctx.globalCompositeOperation = mode;
	ctx.fillStyle = params.color
	ctx.fillRect(0, 0, ctx.width, ctx.height)

	ctx.globalAlpha = 0.9;
	ctx.fillStyle = makeGradient(params.color, 0, ctx.height, ctx)
	ctx.fillRect(0, 0, ctx.width, ctx.height)
	ctx.globalAlpha = 1;
	// ctx.globalCompositeOperation = 'normal';

	var svg = new Blob([shape(params.shape, params.colorStrategy, gradientColor)], {
		type: "image/svg+xml;charset=utf-8"
	});
	var url = URL.createObjectURL(svg);

	let img = new Image();
	img.addEventListener('load', e => {
		let target = getShapeImageParameters(e.target)
		console.log("FIRST", target)
		ctx.scale(1, 1)
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.drawImage(e.target, target.x, target.y, target.width, target.height);
	});
	img.src = url;

	if (["mirror", "mirror-offset"].includes(params.strategy)) {
		let img2 = new Image();
		img2.addEventListener('load', e => {
			let target = getShapeImageParameters(e.target, true)
			console.log("SECOND", target)
			ctx.scale(-1, -1)
			ctx.drawImage(e.target, target.x, target.y, target.width, target.height);
			ctx.scale(1, 1)
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		});
		img2.src = url;
	}

	if (noisy) {
		makeNoise(ctx)
	}


}

function getShapeImageParameters(target, second = false) {
	let upscaleFactor = getUpscaleFactor(target)
	let scale = 0.7
	let offsetX = 0.5
	let offsetY = 0.5

	switch (params.strategy) {
		case "overscale":
			scale = 0.8
			break;

		case "offset-left":
			scale = 1.3
			offsetX = 0.1
			break;

		case "offset-right":
			scale = 1.3
			offsetX = 0.9
			break;

		case "offset-top":
			scale = 1.3
			offsetY = 0.1
			break;

		case "offset-bottom":
			scale = 1.3
			offsetY = 0.9
			break;

		case "mirror":
			scale = 1
			offsetX = second ? -0.4 : 0.6
			offsetY = second ? -0.4 : 0.6
			break;

		case "mirror-offset":
			scale = 1
			offsetX = second ? -0.2 : 0.8
			offsetY = second ? -0.2 : 0.8
			break;

	}

	return {
		x: (ctx.width * offsetX) - (target.width * upscaleFactor * scale / 2),
		y: (ctx.height * offsetY) - (target.height * upscaleFactor * scale / 2),
		width: target.width * upscaleFactor * scale,
		height: target.height * upscaleFactor * scale
	}

}

function getUpscaleFactor(target) {
	let scaleX = (ctx.width / target.width)
	let scaleY = (ctx.height / target.height)
	return scaleX > scaleY ? scaleY : scaleX
}

function makeGradient(color, to_x, to_y, ctx) {
	let gradient = ctx.createLinearGradient(0, 0, to_x, to_y);
	gradient.addColorStop(0, color);
	gradient.addColorStop(1, "#FFFFFF");
	return gradient
}

function makeNoise(ctx, opacity = 0.1) {
	let alpha = 255 * opacity;
	let imageData = ctx.getImageData(0, 0, ctx.width, ctx.height)
	let pixels = imageData.data
	let n = pixels.length
	let i = 0;
	while (i < n) {
		let fluctuation = (Math.random() - 0.5) * (256 * opacity)
		pixels[i++] = (pixels[i] + fluctuation)
		pixels[i++] = (pixels[i] + fluctuation)
		pixels[i++] = (pixels[i] + fluctuation)
		pixels[i++] = 255;
	}
	// Black and white version
	// while (i < n) {
	// 	pixels[i++] = pixels[i++] = pixels[i++] = (Math.random() * 256) | 0;
	// 	pixels[i++] = alpha;
	// }
	ctx.putImageData(imageData, 0, 0);
	return ctx;
}
