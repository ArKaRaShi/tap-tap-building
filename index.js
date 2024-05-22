const defaultIndexOffset = 1;

class Theme {
	static getPallete(theme) {
		if (theme === "minimal") {
			return {
				sky: "#87CEEB",
				earthLayer1: "#7CFC00",
				earthLayer2: "#66CDAA",
				earthLayer3: "#228B22",
				earthLayer4: "#8B4513",
				brick1: "#B55239",
				brick2: "#8B3A2E",
				door: "#3B3B3B",
				glass: "#F4F4F4",
				roof: "#6E4B3A",
			};
		}

		// Bricks: #B55239 (Brick Red)
		// Sky: #87CEEB (Sky Blue)
		// Door: #3B3B3B (Charcoal Gray)
		// Window: #F4F4F4 (Soft White)
		// Grass Layer 1: #7CFC00 (Lawn Green)
		// Grass Layer 2: #66CDAA (Medium Aquamarine)
		// Grass Layer 3: #228B22 (Forest Green)
		// Earth Floor: #8B4513 (Saddle Brown)
	}
}

class Random {
	/**
	 *
	 * @param multiplier
	 * @param modder
	 * @param weightArray Length must equal to modder
	 * @returns A random number in range(0, modder)
	 */
	dynamicRandom(multiplier, modder, weightArray) {
		let randomNumber = Math.floor(Math.random() * multiplier) % modder;
		if (!weightArray) {
			return randomNumber;
		}
		let numbers = Array();
		for (let i = 0; i < weightArray.length; i++) {
			numbers = [...numbers, ...Array(weightArray[i]).fill(i)];
		}
		return numbers[randomNumber];
	}
}

class CanvasTools {
	constructor(gameBits, skyHeight) {
		this.gameBits = gameBits;
		this.skyHeight = skyHeight;
	}

	getPixelWidthAndHeight(canvas) {
		const canvasMaxWidth = canvas.width;
		const canvasMaxHeight = canvas.height;
		const rect = canvas.getBoundingClientRect();
		const pixelWidth = canvasMaxWidth / this.gameBits;
		const pixelHeight = canvasMaxHeight / this.gameBits;
		return { width: pixelWidth, height: pixelHeight };
	}

	createAndAppendCanvas(parentSelector, canvasId) {
		const parentComponnent = document.querySelector(parentSelector);
		const canvas = document.createElement("canvas");
		canvas.id = canvasId;
		canvas.classList.add("canvas");
		parentComponnent.appendChild(canvas);
	}

	// /**
	//  * This function direction support only to top, to right which slope must be 0 or infinity
	//  * @param {*} firstCoordinate
	//  * @param {*} secondCoordinate
	//  */
	// drawLine(firstCoordinate, secondCoordinate) {
	// 	function mappingPixel(point, multiplier, bits) {
	// 		return (point % bits) * multiplier;
	// 	}
	// 	function mappingCoordinateY(point, bits) {
	// 		return Math.abs((point % bits) - bits);
	// 	}
	// 	const gameBits = this.gameBits;
	// 	let x1 = firstCoordinate.x;
	// 	// let y1 = mappingCoordinateY(firstCoordinate.y, gameBits);
	// 	let x2 = secondCoordinate.x;
	// 	// let y2 = mappingCoordinateY(secondCoordinate.y, gameBits);
	// 	let y1 = firstCoordinate.y;
	// 	let y2 = secondCoordinate.y;

	// 	const canvasRow =
	// 		this.skyHeight -
	// 		Math.floor(y1 / this.gameBits) -
	// 		defaultIndexOffset;
	// 	const canvasColumn = Math.floor(x1 / this.gameBits);
	// 	const canvasId = `#canvas-${canvasRow}-${canvasColumn}`;

	// 	let canvas = document.getElementById(canvasId);
	// 	if (!canvas) {
	// 		console.log(canvasRow, canvasColumn);
	// 		const parentId = `#sky-${canvasRow}-${canvasColumn}`;
	// 		this.createAndAppendCanvas(parentId, canvasId);
	// 		canvas = document.getElementById(canvasId);
	// 	}
	// 	const pixel = this.getPixelWidthAndHeight(canvas);
	// 	const pixelWidth = pixel.width,
	// 		pixelHeight = pixel.height;
	// 	console.log(pixelWidth, pixelHeight * y1);
	// 	const topBound = (canvasRow + defaultIndexOffset) * this.gameBits;
	// 	const rightBound = (canvasColumn + defaultIndexOffset) * this.gameBits;
	// 	const bottomBound = canvasRow * this.gameBits;
	// 	const leftBound = canvasColumn * this.gameBits;

	// 	const pixelx1 = mappingPixel(x1, pixelWidth, gameBits);
	// 	const pixely1 = mappingPixel(y1, pixelHeight, gameBits);
	// 	const pixelx2 = mappingPixel(x2, pixelWidth, gameBits);
	// 	const pixely2 = mappingPixel(y2, pixelHeight, gameBits);

	// 	console.log(pixelx1, pixely1);
	// 	console.log(pixelx2, pixely2);
	// 	const ctx = canvas.getContext("2d");
	// 	ctx.beginPath();
	// 	ctx.moveTo(pixelx1, pixely1);
	// 	// console.log(rightBound);

	// 	if (y1 == y2) {
	// 		if (x2 >= rightBound) {
	// 			ctx.lineTo(
	// 				mappingPixel(rightBound - x1, pixelWidth, gameBits + 1),
	// 				pixely1
	// 			);
	// 			this.drawLine({ x: rightBound, y: y1 }, secondCoordinate);
	// 		} else {
	// 			console.log(mappingPixel(x2 - leftBound, pixelWidth));
	// 			ctx.lineTo(
	// 				mappingPixel(x2 - leftBound, pixelWidth, gameBits + 1),
	// 				pixely2
	// 			);
	// 		}
	// 	} else {
	// 		if (y2 >= topBound) {
	// 			ctx.lineTo(
	// 				pixelx1,
	// 				mappingPixel(topBound - y1, pixelHeight, gameBits + 1)
	// 			);
	// 			this.drawLine(firstCoordinate, { x: x1, y: topBound });
	// 		} else {
	// 			ctx.lineTo(
	// 				pixelx1,
	// 				mappingPixel(y2 - bottomBound, pixelHeight, gameBits + 1)
	// 			);
	// 		}
	// 	}

	// 	ctx.lineWidth = 5;
	// 	ctx.strokeStyle = "glass";
	// 	ctx.stroke();
	// }
	drawBox(x, y, color) {
		if (color == -1) return;
		const gameBits = this.gameBits;
		const targetRow = this.skyHeight - 1 - Math.floor(y / gameBits),
			targetCol = Math.floor(x / gameBits);
		const componentId = `${targetRow}-${targetCol}`;
		let canvas = document.querySelector(`#canvas-${componentId}`);
		if (!canvas) {
			this.createAndAppendCanvas(
				`#sky-${componentId}`,
				`canvas-${componentId}`
			);
			canvas = document.querySelector(`#canvas-${componentId}`);
		}
		const pixelDetails = this.getPixelWidthAndHeight(canvas);
		const pixelWidth = pixelDetails.width,
			pixelHeight = pixelDetails.height;
		const targetPixelX = (x % gameBits) * pixelWidth,
			targetPixelY = (gameBits - (y % gameBits) - 1) * pixelHeight;
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(targetPixelX, targetPixelY, pixelWidth, pixelHeight);
	}

	// drawObject(obj) {
	// 	const startPixel = obj.start;
	// 	const objectWidth = obj.details[0].length,
	// 		objectHeight = obj.details.length;
	// 	for (let floor = startPixel; floor < objectHeight; floor++) {
	// 		for (let pixel = startPixel; pixel < objectWidth; pixel++) {
	// 			this.drawBox(floor, pixel, obj.details[floor][pixel]);
	// 		}
	// 	}
	// }
}

class ObjectMananger {
	theme;
	palette;

	constructor(randomFactor, maxBuildingLevel) {
		this.random = new Random();
		this.randomFactor = randomFactor;
		this.maxBuildingLevel = maxBuildingLevel;
		this.objectPreset = [
			{
				type: "house",
				formatInColor: false,
				details: [
					["roof", "roof", "roof"],
					["brick1", "brick1", "brick"],
					["brick1", "brick1", "brick1"],
					["brick1", "door", "brick1"],
				].reverse(),
			},
			{
				type: "apartment",
				formatInColor: false,
				details: [
					["roof", "roof", "roof", "roof", "roof"],
					["brick2", "brick2", "brick2", "brick2", "brick2"],
					["brick2", "glass", "brick2", "glass", "brick2"],
					["brick2", "brick2", "brick2", "brick2", "brick2"],
					["brick2", "glass", "brick2", "glass", "brick2"],
					["brick2", "brick2", "brick2", "brick2", "brick2"],
					["brick2", "glass", "brick2", "glass", "brick2"],
					["brick2", "brick2", "brick2", "brick2", "brick2"],
					["brick2", "glass", "brick2", "glass", "brick2"],
					["brick2", "brick2", "brick2", "brick2", "brick2"],
					["brick2", "door", "brick2", "brick2", "brick2"],
				].reverse(),
			},
		];
	}

	randomBuilding() {
		const index = this.random.dynamicRandom(
			this.randomFactor,
			this.objectPreset.length
		);
		return this.objectPreset[index];
	}

	changeObjectColors() {
		const mapping = (index, callback) => {
			const array2d = this.objectPreset[index].details;
			for (let i = 0; i < array2d.length; i++) {
				for (let j = 0; j < array2d[0].length; j++) {
					callback(array2d, i, j);
				}
			}
		};
		for (let index = 0; index < this.objectPreset.length; index++) {
			if (this.objectPreset[index].formatInColor) {
				let mappingPairArray = [];
				Object.entries(this.palette).map((entry) => {
					mappingPairArray = [
						...mappingPairArray,
						[entry[0], entry[1]],
					];
				});
				mapping(index, (array2d, i, j) => {
					mappingPairArray.filter((pair) => {
						if (array2d[i][j] == pair[1]) {
							array2d[i][j] == pair[0];
						}
					});
				});
			}
			mapping(index, (array2d, i, j) => {
				if (array2d[i][j] == "sky") {
					array2d[i][j] = -1;
				}
				if (array2d[i][j] != -1) {
					array2d[i][j] = this.palette[`${array2d[i][j]}`];
				}
			});
			console.log(this.objectPreset[index].details);
			this.objectPreset[index].formatInColor = true;
		}
	}

	setTheme(theme) {
		this.theme = theme;
		this.palette = Theme.getPallete(theme);
		this.changeObjectColors();
	}
}

class GameDriver {
	tmpObject;
	objectIterator;
	theme;
	palette;

	constructor(gameBits, randomFactor, maxBuildingLevel) {
		this.state = 0;
		this.coreRow = 6;
		this.coreColumn = 12;
		this.skyBoxRatio = 2;
		this.earthBoxRatio = 1;
		this.skyHeight = Math.ceil(
			(this.skyBoxRatio / (this.skyBoxRatio + this.earthBoxRatio)) *
				this.coreRow
		);
		this.buildSpeed = 4;
		this.constructing = false;
		this.placementMemory = [];
		this.gameBits = gameBits;
		this.randomFactor = randomFactor;
		this.maxBuildingLevel = maxBuildingLevel;
		this.random = new Random();
		this.objectMananger = new ObjectMananger(
			randomFactor,
			maxBuildingLevel
		);
		this.canvasTools = new CanvasTools(gameBits, this.skyHeight);
	}

	buildWorld() {
		function createAndAppendElement(
			parentSelector,
			newElementTag,
			quantity,
			makeId,
			callback
		) {
			const parentComponnent = document.querySelector(parentSelector);
			for (let i = 0; i < quantity; i++) {
				let component = document.createElement(newElementTag);
				if (callback && makeId) {
					callback(component, i);
				} else if (callback) {
					callback(component);
				}
				parentComponnent.appendChild(component);
			}
		}

		createAndAppendElement("main", "div", 1, false, (each) => {
			each.classList.add("core");
			each.style.gridTemplateRows = `repeat(${this.coreRow}, 1fr)`;
			each.style.gridTemplateColumns = `repeat(${this.coreColumn}, 1fr)`;
		});

		createAndAppendElement(
			".core",
			"div",
			this.skyHeight * this.coreColumn,
			true,
			(each, uniqueIterator) => {
				each.id = `sky-${Math.floor(
					uniqueIterator / this.coreColumn
				)}-${uniqueIterator % this.coreColumn}`;
				each.classList.add("sky", "in-core-box");
			}
		);

		let earthHeight = this.coreRow - this.skyHeight;
		const earthGroundLayerColors = ["#228B22", "#8B4513", "#8B4513"];
		const layerHeightPercent = `${
			(1 / earthGroundLayerColors.length) * 100
		}%`;
		createAndAppendElement(
			".core",
			"div",
			this.coreColumn,
			false,
			(each) => {
				each.classList.add("earth", "in-core-box");
				earthGroundLayerColors.forEach((color) => {
					let component = document.createElement("div");
					component.classList.add("in-core-box");
					component.style.height = layerHeightPercent;
					component.style.backgroundColor = color;
					each.appendChild(component);
				});
			}
		);

		earthHeight--;
		createAndAppendElement(
			".core",
			"div",
			earthHeight * this.coreColumn,
			false,
			(each) => {
				each.classList.add("earth", "in-core-box");
			}
		);
	}

	getRandomBuilding() {
		this.tmpObject = this.objectMananger.randomBuilding();
		this.tmpObject.startX = this.random.dynamicRandom(
			this.randomFactor,
			160
		);
		this.tmpObject.endX =
			this.tmpObject.startX + this.tmpObject.details[0].length;
		this.tmpObject.startY = 0;
		this.tmpObject.endY = 0;
		this.tmpObject.totalRect =
			this.tmpObject.details[0].length * this.tmpObject.details.length;
	}

	buildObjectComplete() {
		if (this.objectIterator.counter >= this.tmpObject.totalRect)
			return true;
		return false;
	}

	drawObjectComponent() {
		let toBuild = this.buildSpeed;
		while (toBuild > 0) {
			if (this.buildObjectComplete()) return;

			let color =
				this.tmpObject.details[this.objectIterator.itrRow][
					this.objectIterator.itrCol
				];
			if (color == -1) {
				this.forwardIterator();
				continue;
			}

			this.canvasTools.drawBox(
				this.objectIterator.pixelX,
				this.objectIterator.pixelY,
				color
			);
			this.forwardIterator();
			toBuild--;
		}
	}

	setIteratorDefault() {
		this.objectIterator = {
			counter: 0,
			itrRow: 0,
			itrCol: 0,
			pixelX: this.tmpObject.startX,
			pixelY: this.tmpObject.startY,
		};
	}

	forwardIterator() {
		this.objectIterator.counter++;
		this.objectIterator.itrCol =
			this.objectIterator.counter % this.tmpObject.details[0].length;
		this.objectIterator.itrRow = Math.floor(
			this.objectIterator.counter / this.tmpObject.details[0].length
		);
		this.objectIterator.pixelX =
			this.tmpObject.startX +
			(this.objectIterator.counter % this.tmpObject.details[0].length);
		this.objectIterator.pixelY =
			this.tmpObject.startY +
			Math.floor(
				this.objectIterator.counter / this.tmpObject.details[0].length
			);
	}

	canPlace() {
		const startX = this.tmpObject.startX,
			endX = this.tmpObject.endX;
		for (let i = 0; i < this.placementMemory.length; i++) {
			let targetStartX = this.placementMemory[i].startX;
			let targetEndX = this.placementMemory[i].endX;

			// compare base to target
			if (startX >= targetStartX && startX <= targetEndX) return false;
			if (endX >= targetStartX && endX <= targetEndX) return false;

			// compare target to base
			if (targetStartX >= startX && targetStartX <= endX) return false;
			if (targetEndX >= startX && targetEndX <= endX) return false;
		}
		return true;
	}

	memorizePlacement() {
		this.placementMemory.push({
			startX: this.tmpObject.startX,
			endX: this.tmpObject.endX,
		});
	}

	setTheme(theme) {
		this.theme = theme;
		this.palette = Theme.getPallete(theme);
		this.objectMananger.setTheme(theme);
	}

	playTapSound() {
		let audioContext = new (window.AudioContext || window.AudioContext)();
		let source = audioContext.createBufferSource();

		// Load and decode the audio file
		fetch("tapsound.mp3")
			.then((response) => response.arrayBuffer())
			.then((data) => audioContext.decodeAudioData(data))
			.then((buffer) => {
				source.buffer = buffer;
				source.connect(audioContext.destination);
				source.start(0);
			})
			.catch((e) => console.error("Error with decoding audio data", e));
	}

	changeState(newState) {
		this.state = newState;
		console.log(this.state);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const game = new GameDriver(16, 100, 3);
	game.setTheme("minimal");
	game.buildWorld();
	document.addEventListener("click", (Event) => {
		if (game.state == 0) {
			if (!game.constructing) {
				game.getRandomBuilding();
				while (!game.canPlace()) {
					game.getRandomBuilding();
				}
				game.setIteratorDefault();
				game.constructing = true;
			}
			game.playTapSound();
			game.drawObjectComponent();
			console.log(
				`${(
					(game.objectIterator.counter / game.tmpObject.totalRect) *
					100
				).toFixed(2)}%`
			);
			if (game.buildObjectComplete()) {
				game.memorizePlacement();
				game.changeState(1);
				game.constructing = false;
			}
		}
		if (game.state == 1) {
			game.changeState(0);
		}
	});
});
