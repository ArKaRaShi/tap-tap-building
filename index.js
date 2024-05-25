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
				brick3: "#CD5C5C",
				door: "#3B3B3B",
				glass: "#F4F4F4",
				roof: "#6E4B3A",
				treeTrunk: "#8B5A2B",
				treeLeaf1: "#006400",
				treeLeaf2: "#228B22",
				grass1: "#32CD32",
				grass2: "#006400",
				shirt1: "#4682B4",
				shirt2: "#2F4F4F",
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
	static dynamicRandom(multiplier, modder, weightArray) {
		let randomNumber = Math.floor(Math.random() * multiplier) % modder;
		if (!weightArray) {
			return randomNumber;
		}
		let numbers = Array();
		for (let i = 0; i < weightArray.length; i++) {
			numbers = [...numbers, ...Array(weightArray[i]).fill(i)];
		}
		randomNumber = Math.floor(Math.random() * multiplier) % numbers.length;
		return numbers[randomNumber];
	}

	static randZeroOne(multiplier) {
		if (multiplier) return Math.floor(Math.random() * multiplier) % 2;
		return Math.floor(Math.random() * 10) % 2;
	}
}

class CanvasTools {
	constructor(gameBits, skyHeight) {
		this.gameBits = gameBits;
		this.skyHeight = skyHeight;
	}

	createAndAppendCanvas(parentSelector, canvasId) {
		const parentComponnent = document.querySelector(parentSelector);
		const canvas = document.createElement("canvas");
		canvas.id = canvasId;
		canvas.classList.add("canvas");
		parentComponnent.appendChild(canvas);
	}

	queryCanvas(x, y) {
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
		return canvas;
	}

	calPixelWidthAndHeight(canvas) {
		const canvasMaxWidth = canvas.width;
		const canvasMaxHeight = canvas.height;
		const pixelWidth = canvasMaxWidth / this.gameBits;
		const pixelHeight = canvasMaxHeight / this.gameBits;
		return { width: pixelWidth, height: pixelHeight };
	}

	calTargetPixelXandY(x, y, pixelWidth, pixelHeight) {
		const gameBits = this.gameBits;
		const targetPixelX = (x % gameBits) * pixelWidth;
		const targetPixelY = (gameBits - (y % gameBits) - 1) * pixelHeight;
		return { x: targetPixelX, y: targetPixelY };
	}

	getColorAtXY(x, y) {
		function rgbaToHex(r, g, b) {
			const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
			return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
		}

		const canvas = this.queryCanvas(x, y);
		const pixelDetails = this.calPixelWidthAndHeight(canvas);
		const pixelWidth = pixelDetails.width,
			pixelHeight = pixelDetails.height;
		const targetPixel = this.calTargetPixelXandY(
			x,
			y,
			pixelWidth,
			pixelHeight
		);
		const targetPixelX = targetPixel.x,
			targetPixelY = targetPixel.y;
		const ctx = canvas.getContext("2d");
		const imgData = ctx.getImageData(
			targetPixelX,
			targetPixelY,
			pixelWidth,
			pixelHeight
		);
		const resultPixel = imgData.data;
		const hexColor = rgbaToHex(
			resultPixel[0],
			resultPixel[1],
			resultPixel[2]
			// resultPixel[3] / 255
		);
		return hexColor;
	}

	drawBox(x, y, color) {
		if (color == -1) return;
		const canvas = this.queryCanvas(x, y);
		const pixelDetails = this.calPixelWidthAndHeight(canvas);
		const pixelWidth = pixelDetails.width,
			pixelHeight = pixelDetails.height;
		const targetPixel = this.calTargetPixelXandY(
			x,
			y,
			pixelWidth,
			pixelHeight
		);
		const targetPixelX = targetPixel.x,
			targetPixelY = targetPixel.y;
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(targetPixelX, targetPixelY, pixelWidth, pixelHeight);
	}

	drawText(x, y, text) {
		const canvas = this.queryCanvas(x, y);
		const pixelDetails = this.calPixelWidthAndHeight(canvas);
		const pixelWidth = pixelDetails.width,
			pixelHeight = pixelDetails.height;
		const targetPixel = this.calTargetPixelXandY(
			x,
			y,
			pixelWidth,
			pixelHeight
		);
		const targetPixelX = targetPixel.x,
			targetPixelY = targetPixel.y;
		const ctx = canvas.getContext("2d");
		ctx.font = "36px serif";
		ctx.fillText(text, targetPixelX, targetPixelY);
	}

	clearAll(x, y) {
		const canvas = this.queryCanvas(x, y);
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	clearAtXY(x, y) {
		const canvas = this.queryCanvas(x, y);
		const pixelDetails = this.calPixelWidthAndHeight(canvas);
		const pixelWidth = pixelDetails.width,
			pixelHeight = pixelDetails.height;
		const targetPixel = this.calTargetPixelXandY(
			x,
			y,
			pixelWidth,
			pixelHeight
		);
		const targetPixelX = targetPixel.x,
			targetPixelY = targetPixel.y;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(targetPixelX, targetPixelY, pixelWidth, pixelHeight);
	}
}

// class MovingObject {
// 	theme;
// 	palette;

// 	constructor(randomFactor) {
// 		this.random = new Random();
// 		this.randomFactor = randomFactor;
// 	}

// 	setTheme(theme) {
// 		this.theme = theme;
// 		this.palette = Theme.getPallete(theme);
// 	}

// 	getColors(keyPattern, excludeArray) {
// 		const regex = keyPattern;
// 		let colorsArray = [];
// 		Object.entries(this.palette).forEach((entry) => {
// 			let key = entry[0],
// 				value = entry[1];
// 			if (excludeArray) {
// 				if (excludeArray.includes(key)) return;
// 			}
// 			let searchResult = key.search(regex);
// 			if (searchResult != -1) {
// 				colorsArray = [...colorsArray, value];
// 			}
// 		});
// 		return colorsArray;
// 	}

// 	createHuman() {
// 		const colors = this.getColors("shirt");
// 		const randColor =
// 			colors[Random.dynamicRandom(this.randomFactor, colors.length)];
// 		return { type: "human", formatInColor: true, details: randColor };
// 	}
// }

class ObjectDynamicCreation {
	theme;
	palette;

	constructor(randomFactor) {
		this.randomFactor = randomFactor;
		this.serveObject = [
			"short-grass",
			"tall-grass",
			"small-tree",
			"small-house",
			"medium-house",
			"small-apartment",
			"medium-apartment",
		];
	}

	setTheme(theme) {
		this.theme = theme;
		this.palette = Theme.getPallete(theme);
	}

	getColors(keyPattern, excludeArray) {
		const regex = keyPattern;
		let colorsArray = [];
		Object.entries(this.palette).forEach((entry) => {
			let key = entry[0],
				value = entry[1];
			if (excludeArray) {
				if (excludeArray.includes(key)) return;
			}
			let searchResult = key.search(regex);
			if (searchResult != -1) {
				colorsArray = [...colorsArray, value];
			}
		});
		return colorsArray;
	}

	randMappingToColors(keyArray, colors) {
		let subComponent = [];
		for (let i = 0; i < keyArray.length; i++) {
			let key = keyArray[i];
			if (key == "sky") {
				subComponent.push(-1);
				continue;
			}
			let randomIndex = Random.dynamicRandom(
				this.randomFactor,
				colors[key].length
			);
			subComponent.push(colors[key][randomIndex]);
		}
		return subComponent;
	}

	shortGrass() {
		const colors = {
			grass: this.getColors("grass"),
		};
		let detailsComponent = [];
		detailsComponent.push(this.randMappingToColors(["grass"], colors));
		return {
			type: "short-grass",
			formatInColor: true,
			details: detailsComponent.reverse(),
		};
	}

	tallGrass() {
		const colors = {
			grass: this.getColors("grass"),
		};
		let detailsComponent = [];
		detailsComponent.push(this.randMappingToColors(["grass"], colors));
		detailsComponent.push(this.randMappingToColors(["grass"], colors));
		return {
			type: "tall-grass",
			formatInColor: true,
			details: detailsComponent.reverse(),
		};
	}

	smallTree() {
		const colors = {
			treeTrunk: this.getColors("treeTrunk"),
			treeLeaf: this.getColors("treeLeaf"),
		};
		let detailsComponent = [];

		detailsComponent.push(
			this.randMappingToColors(Array(3).fill("treeLeaf"), colors)
		);
		detailsComponent.push(
			this.randMappingToColors(Array(3).fill("treeLeaf"), colors)
		);
		detailsComponent.push(
			this.randMappingToColors(["sky", "treeTrunk", "sky"], colors)
		);
		return {
			type: "small-tree",
			formatInColor: true,
			details: detailsComponent.reverse(),
		};
	}

	smallHouse() {
		let bricksColors = this.getColors("brick");
		const colors = {
			wall: [
				bricksColors[
					Random.dynamicRandom(this.randomFactor, bricksColors.length)
				],
			],
			roof: [this.palette.roof],
			door: this.getColors("door"),
		};
		let detailsComponent = [];

		const width = 3;

		// 3rd floor
		detailsComponent.push(
			this.randMappingToColors(Array(width).fill("roof"), colors)
		);

		// 2nd floor
		detailsComponent.push(
			this.randMappingToColors(Array(width).fill("wall"), colors)
		);

		// 1st floor
		let tmpComponent = this.randMappingToColors(
			Array(width).fill("wall"),
			colors
		);
		tmpComponent[1] =
			colors.door[
				Random.dynamicRandom(this.randomFactor, colors.door.length)
			];
		detailsComponent.push(tmpComponent);

		return {
			type: "small-house",
			formatInColor: true,
			details: detailsComponent.reverse(),
		};
	}

	mediumHouse() {
		let bricksColors = this.getColors("brick");
		const colors = {
			wall: [
				bricksColors[
					Random.dynamicRandom(this.randomFactor, bricksColors.length)
				],
			],
			roof: [this.palette.roof],
			glass: this.getColors("glass"),
			door: this.getColors("door"),
		};
		let detailsComponent = [];

		const width = 5;
		const doorPosition = 1 + 2 * Random.dynamicRandom(this.randomFactor, 2);

		// 3rd floor
		detailsComponent.push(
			this.randMappingToColors(Array(width).fill("roof"), colors)
		);

		// 2nd floor
		detailsComponent.push(
			this.randMappingToColors(Array(width).fill("wall"), colors)
		);

		// 1st floor
		let tmpComponent = this.randMappingToColors(
			Array(width).fill("wall"),
			colors
		);
		const windowOffset = doorPosition == 1 ? 2 : -2;
		tmpComponent[doorPosition] =
			colors.door[
				Random.dynamicRandom(this.randomFactor, colors.door.length)
			];
		tmpComponent[doorPosition + windowOffset] =
			colors.glass[
				Random.dynamicRandom(this.randomFactor, colors.glass.length)
			];
		detailsComponent.push(tmpComponent);

		return {
			type: "medium-house",
			formatInColor: true,
			details: detailsComponent.reverse(),
		};
	}

	smallApartment() {
		let bricksColors = this.getColors("brick");
		const colors = {
			wall: [
				bricksColors[
					Random.dynamicRandom(this.randomFactor, bricksColors.length)
				],
			],
			roof: [this.palette.roof],
			glass: this.getColors("glass"),
			door: this.getColors("door"),
		};
		let detailsComponent = [];

		const width = 5;

		// rooftop
		detailsComponent.push(
			this.randMappingToColors(Array(width).fill("roof"), colors)
		);

		// floor 3 - 8
		const glassPattern = [
			["wall", "glass", "wall", "glass", "wall"],
			["wall", "glass", "glass", "glass", "wall"],
		];
		const randPattern = Random.dynamicRandom(
			this.randomFactor,
			glassPattern.length
		);
		const upperFloor = Array(width).fill("wall");
		const lowerFloor = glassPattern[randPattern];
		for (let i = 0; i < 3; i++) {
			detailsComponent.push(this.randMappingToColors(upperFloor, colors));
			detailsComponent.push(this.randMappingToColors(lowerFloor, colors));
		}

		// 2nd floor
		detailsComponent.push(
			this.randMappingToColors(Array(width).fill("wall"), colors)
		);

		// 1st floor
		const doorPosition =
			1 + Random.dynamicRandom(this.randomFactor, width - 2);

		const doorColor =
			colors.door[
				Random.dynamicRandom(this.randomFactor, colors.door.length)
			];

		let tmpComponent = this.randMappingToColors(
			new Array(width).fill("wall"),
			colors
		);
		tmpComponent[doorPosition] = doorColor;
		detailsComponent.push(tmpComponent);

		return {
			type: "small-apartment",
			formatInColor: true,
			details: detailsComponent.reverse(),
		};
	}

	mediumApartment() {
		let bricksColors = this.getColors("brick", ["brick3"]);
		const colors = {
			wall: [
				bricksColors[
					Random.dynamicRandom(this.randomFactor, bricksColors.length)
				],
			],
			roofItem: [this.palette.brick3],
			roof: [this.palette.roof],
			glass: this.getColors("glass"),
			door: this.getColors("door"),
		};
		let detailsComponent = [];

		const width = 7;

		const tallRoofItemPosition =
			1 + Random.dynamicRandom(this.randomFactor, width - 3);
		let weightArray = Array(width).fill(1);
		weightArray[0] = 0;
		weightArray[weightArray.length - 1] = 0;
		weightArray[tallRoofItemPosition] = 0;
		const shortRoofItemPosition = Random.dynamicRandom(
			this.randomFactor,
			width,
			weightArray
		);
		const tallRoofItemColor =
			colors.roofItem[
				Random.dynamicRandom(this.randomFactor, colors.roofItem.length)
			];
		const shortRoofItemColor =
			colors.roofItem[
				Random.dynamicRandom(this.randomFactor, colors.roofItem.length)
			];
		let tmpComponent;

		// rooftop item 2nd floor
		tmpComponent = this.randMappingToColors(
			new Array(width).fill("sky"),
			colors
		);
		tmpComponent[tallRoofItemPosition] = tallRoofItemColor;
		detailsComponent.push(tmpComponent);

		// rooftop item 1st floor
		tmpComponent = this.randMappingToColors(
			new Array(width).fill("sky"),
			colors
		);
		tmpComponent[tallRoofItemPosition] = tallRoofItemColor;
		tmpComponent[shortRoofItemPosition] = shortRoofItemColor;
		detailsComponent.push(tmpComponent);

		// rooftop
		detailsComponent.push(
			this.randMappingToColors(Array(width).fill("roof"), colors)
		);

		// floor 3 - 12
		const glassPattern = [
			["wall", "glass", "wall", "glass", "wall", "glass", "wall"],
			["wall", "glass", "glass", "glass", "wall", "glass", "wall"],
			["wall", "glass", "wall", "glass", "glass", "glass", "wall"],
			["wall", "glass", "glass", "glass", "glass", "glass", "wall"],
		];
		const randPattern = Random.dynamicRandom(
			this.randomFactor,
			glassPattern.length
		);
		const upperFloor = Array(width).fill("wall");
		const lowerFloor = glassPattern[randPattern];
		for (let i = 0; i < 5; i++) {
			detailsComponent.push(this.randMappingToColors(upperFloor, colors));
			detailsComponent.push(this.randMappingToColors(lowerFloor, colors));
		}

		// 2nd floor
		detailsComponent.push(
			this.randMappingToColors(Array(width).fill("wall"), colors)
		);

		// 1st floor
		const doorPosition =
			1 + Random.dynamicRandom(this.randomFactor, width - 3);

		const doorColor =
			colors.door[
				Random.dynamicRandom(this.randomFactor, colors.door.length)
			];

		tmpComponent = this.randMappingToColors(
			new Array(width).fill("wall"),
			colors
		);
		tmpComponent[doorPosition] = doorColor;
		tmpComponent[doorPosition + 1] = doorColor;
		detailsComponent.push(tmpComponent);

		return {
			type: "medium-apartment",
			formatInColor: true,
			details: detailsComponent.reverse(),
		};
	}

	isObjectServe(type) {
		return this.serveObject.includes(type);
	}

	getAllServeObject() {
		return this.serveObject;
	}

	getObject(type) {
		switch (type) {
			case "short-grass":
				return this.shortGrass();
			case "tall-grass":
				return this.tallGrass();
			case "small-tree":
				return this.smallTree();
			case "small-house":
				return this.smallHouse();
			case "medium-house":
				return this.mediumHouse();
			case "small-apartment":
				return this.smallApartment();
			case "medium-apartment":
				return this.mediumApartment();
		}
	}
}

class ObjectMananger {
	theme;
	palette;

	constructor(randomFactor) {
		this.randomFactor = randomFactor;
		this.objectDynamicCreation = new ObjectDynamicCreation(randomFactor);
		this.randWeight = { tree: 3, house: 3, apartment: 1, grass: 3 };
		this.objectPreset = [
			{
				type: "small-house",
				formatInColor: false,
				details: [
					["roof", "roof", "roof"],
					["brick1", "brick1", "brick1"],
					["brick1", "door", "brick1"],
				].reverse(),
			},
			{
				type: "small-apartment",
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
			{
				type: "small-tree",
				details: [
					["treeLeaf1", "treeLeaft2", "treeLeaf2"],
					["treeLeaf2", "treeLeaft2", "treeLeaf1"],
					["sky", "treeTrunk", "sky"],
				].reverse(),
			},
		];
		this.objectGenres = this.arrangeGenres();
	}

	arrangeGenres() {
		const availableObject = [
			...new Set([
				...this.objectDynamicCreation.getAllServeObject(),
				...this.objectPreset.map(({ type }) => type),
			]),
		];
		const genreNames = [
			...new Set(availableObject.map((type) => type.split("-")[1])),
		];

		let objectGenres = {};
		genreNames.forEach((genre) => {
			let contains = availableObject.filter(
				(type) => type.search(genre) != -1
			);
			objectGenres[genre] = contains;
		});
		return objectGenres;
	}

	randomObject() {
		const objectGenres = this.objectGenres;
		const genreKeyNames = Object.keys(objectGenres);

		let weightArray = genreKeyNames.map(
			(keyName) => this.randWeight[keyName]
		);

		const genreDetails =
			objectGenres[
				genreKeyNames[
					Random.dynamicRandom(
						this.randomFactor,
						genreKeyNames.length,
						weightArray
					)
				]
			];
		const type =
			genreDetails[
				Random.dynamicRandom(this.randomFactor, genreDetails.length)
			];

		if (this.objectDynamicCreation.isObjectServe(type)) {
			return this.objectDynamicCreation.getObject(type);
		}

		let presetIndex;
		for (let i = 0; i < this.objectPreset.length; i++) {
			if (type == this.objectPreset[i].type) {
				presetIndex = i;
				break;
			}
		}
		return this.objectPreset[presetIndex];
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
			this.objectPreset[index].formatInColor = true;
		}
	}

	setTheme(theme) {
		this.theme = theme;
		this.palette = Theme.getPallete(theme);
		this.changeObjectColors();
		this.objectDynamicCreation.setTheme(theme);
	}

	getObjectLowestLength() {
		let lowest = this.objectPreset[0].details[0].length;
		this.objectPreset.forEach((each) => {
			if (each < lowest) lowest = each;
		});
		return lowest;
	}

	getObjectLongestLength() {
		let longest = this.objectPreset[0].details[0].length;
		this.objectPreset.forEach((each) => {
			if (each > longest) longest = each;
		});
		return longest;
	}
}

class GameDriver {
	tmpObject;
	objectIterator;
	theme;
	palette;
	countRandom;

	constructor(property) {
		this.mobile = property.mobile;
		this.randomFactor = property.randomFactor;
		this.gameBits = property.gameBits;
		this.coreRow = property.coreRow;
		this.coreColumn = property.coreColumn;
		this.skyBoxRatio = property.skyBoxRatio;
		this.earthBoxRatio = property.earthBoxRatio;
		this.buildSpeed = property.buildSpeed;
		this.skyHeight = Math.ceil(
			(this.skyBoxRatio / (this.skyBoxRatio + this.earthBoxRatio)) *
				this.coreRow
		);
		this.objectMananger = new ObjectMananger(this.randomFactor);
		this.canvasTools = new CanvasTools(this.gameBits, this.skyHeight);
		this.state = 0;
		this.totalRectBuild = 0;
		this.totalTap = 0;
		this.constructing = false;
		this.placementMemory = [];
		this.dynamicObjectMemory = [];
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
			each.style.webkitTouchCallout = "none";
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
				each.style.webkitTouchCallout = "none";
			}
		);

		let earthHeight = this.coreRow - this.skyHeight;
		const earthGroundLayerColors = [
			this.palette.earthLayer3,
			this.palette.earthLayer4,
			this.palette.earthLayer4,
		];
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
				each.style.webkitTouchCallout = "none";
				earthGroundLayerColors.forEach((color) => {
					let component = document.createElement("div");
					component.classList.add("in-core-box");
					component.style.height = layerHeightPercent;
					component.style.backgroundColor = color;
					component.style.webkitTouchCallout = "none";
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
				each.style.webkitTouchCallout = "none";
			}
		);
	}

	getRandomObject() {
		this.tmpObject = this.objectMananger.randomObject();
		this.tmpObject.startX =
			Random.dynamicRandom(
				this.randomFactor * this.randomFactor,
				this.gameBits * this.coreColumn -
					this.objectMananger.getObjectLongestLength() -
					3 // -1(index offset) -2(screen offset)
			) + 1; // (start offset);
		this.tmpObject.endX =
			this.tmpObject.startX + this.tmpObject.details[0].length;
		this.tmpObject.startY = 0;
		this.tmpObject.endY = 0;
		this.tmpObject.totalRect =
			this.tmpObject.details[0].length * this.tmpObject.details.length;
	}

	updateTotalRectText() {
		const x = this.gameBits * 6,
			y = this.gameBits * 3 + 10;
		this.canvasTools.clearAll(x, y);
		this.canvasTools.drawText(x, y, `Block build: ${this.totalRectBuild}`);
	}

	buildObjectComplete() {
		if (this.objectIterator.counter >= this.tmpObject.totalRect) {
			return true;
		}
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
			this.totalRectBuild++;
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

	resetCountRandom() {
		this.countRandom = 0;
	}

	increaseAndCheckMaxRandom() {
		this.countRandom++;
		if (this.countRandom >= 300) {
			return true;
		}
		return false;
	}

	changeState(newState) {
		this.state = newState;
	}

	isConstructing() {
		return this.constructing;
	}

	setConstructing(newState) {
		this.constructing = newState;
	}

	getConstructingProgress() {
		return `${(
			(this.objectIterator.counter / this.tmpObject.totalRect) *
			100
		).toFixed(2)}%`;
	}

	createOverlay() {
		const overlay = document.createElement("div");
		overlay.classList.add("overlay");
		return overlay;
	}

	createElement(property) {
		const component = document.createElement(property.tag);
		if ("id" in property) {
			component.id = property.id;
		}
		if ("classArray" in property) {
			property.classArray.forEach((each) =>
				component.classList.add(each)
			);
		}
		if ("textContent" in property) {
			component.textContent = property.textContent;
		}
		return component;
	}

	playGuide() {
		const parent = document.querySelector("main");
		let overlay = document.querySelector("#playGuide-overlay");
		let guide = document.querySelector("#playGuide-popup");
		if (!overlay) {
			overlay = this.createOverlay();
			overlay.id = "playGuide-overlay";
			parent.appendChild(overlay);
		}
		if (!guide) {
			guide = this.createElement({
				tag: "div",
				classArray: ["popup"],
				id: "playGuide-popup",
			});
			const p1 = this.createElement({
				tag: "p",
				classArray: ["b-text"],
				textContent: this.mobile ? "Hold to play!" : "Click to play!",
			});
			guide.appendChild(p1);
			parent.appendChild(guide);
		}
	}

	removePlayGuide() {
		const overlay = document.querySelector("#playGuide-overlay");
		const guide = document.querySelector("#playGuide-popup");
		if (overlay) overlay.parentNode.removeChild(overlay);
		if (guide) guide.parentNode.removeChild(guide);
	}

	axisGuide() {
		const parent = document.querySelector("main");
		let overlay = document.querySelector("#axisGuide-overlay");
		let guide = document.querySelector("#axisGuide-popup");
		if (!overlay) {
			overlay = this.createOverlay();
			overlay.id = "axisGuide-overlay";
			parent.appendChild(overlay);
		}
		if (!guide) {
			guide = this.createElement({
				tag: "div",
				classArray: ["popup"],
				id: "axisGuide-popup",
			});
			const p1 = this.createElement({
				tag: "p",
				classArray: ["b-text"],
				textContent: "Play in horizontal",
			});
			guide.appendChild(p1);
			parent.appendChild(guide);
		}
	}

	removeAxisGuide() {
		const overlay = document.querySelector("#axisGuide-overlay");
		const guide = document.querySelector("#axisGuide-popup");
		if (overlay) overlay.parentNode.removeChild(overlay);
		if (guide) guide.parentNode.removeChild(guide);
	}

	summarize() {
		const parent = document.querySelector("main");
		let overlay = document.querySelector("#summary-overlay");
		let summary = document.querySelector("#summary-popup");
		if (!overlay) {
			overlay = this.createOverlay();
			overlay.id = "summary-overlay";
			overlay.addEventListener("click", (Event) => {
				if (Event.target == overlay) {
					const summary = document.querySelector("#summary-popup");
					summary.style.display = "none";
					overlay.style.display = "none";
				}
			});
			parent.appendChild(overlay);
		}
		if (!summary) {
			summary = this.createElement({
				tag: "div",
				classArray: ["popup"],
				id: "summary-popup",
			});
			const p1 = this.createElement({
				tag: "p",
				classArray: ["b-text"],
				textContent: "You got a big town!",
			});
			const p2 = this.createElement({
				tag: "p",
				classArray: ["n-text"],
				textContent: `Total tap: ${this.totalTap}`,
			});
			const p3 = this.createElement({
				tag: "p",
				classArray: ["n-text"],
				textContent: `Total box build: ${this.totalRectBuild}`,
			});
			summary.appendChild(p1);
			summary.appendChild(p2);
			summary.appendChild(p3);
			parent.appendChild(summary);
		}
		summary.style.display = "";
		overlay.style.display = "";
	}

	increaseTap(value) {
		this.totalTap += value;
	}

	handleEvent(Event) {
		if (this.state == 0) {
			this.removePlayGuide();
			this.changeState(1);
		} else if (this.state == 1) {
			if (!this.isConstructing()) {
				this.getRandomObject();
				this.resetCountRandom();
				while (!this.canPlace()) {
					this.getRandomObject();
					if (this.increaseAndCheckMaxRandom()) {
						this.changeState(2);
						return;
					}
				}
				this.setIteratorDefault();
				this.setConstructing(true);
			}
			this.playTapSound();
			this.increaseTap(1);
			this.drawObjectComponent();
			// this.updateTotalRectText();
			// console.log(this.getConstructingProgress());
			if (this.buildObjectComplete()) {
				this.memorizePlacement();
				this.setConstructing(false);
			}
		} else if (this.state == 2) {
			this.summarize();
			this.changeState(3);
		} else if (this.state == 3) {
			this.changeState(2);
		}
	}

	setup() {
		this.setTheme("minimal");
		this.buildWorld();
	}

	runMobile() {
		let firstTimePlayGuide = true;
		let correctAxis;
		this.setup();

		const core = document.querySelector(".core");
		let width, height;
		setInterval(() => {
			width = core.offsetWidth;
			height = core.offsetHeight;
			if (width > height) {
				correctAxis = true;
				this.removeAxisGuide();
				if (firstTimePlayGuide) {
					this.playGuide();
				}
			} else {
				correctAxis = false;
				const playGuide = document.querySelector("#playGuide-overlay");
				if (playGuide) {
					this.removePlayGuide();
				}
				this.axisGuide();
			}
		}, 500);

		let intervalID;
		let holdStart = 0;
		document.addEventListener("touchstart", (Event) => {
			if (!firstTimePlayGuide && correctAxis) {
				intervalID = setInterval(() => {
					this.handleEvent(Event);
				}, 400);
			}
			holdStart = Date.now(); // Record the timestamp when touch start

			const playGuide = document.querySelector("#playGuide-overlay");
			if (playGuide) {
				if (Event.target == playGuide) {
					this.removePlayGuide();
					firstTimePlayGuide = false;
				}
			}
			Event.preventDefault();
		});

		document.addEventListener("touchmove", (Event) => {
			Event.preventDefault(); // Prevent scrolling while holding
		});

		document.addEventListener("touchend", (Event) => {
			clearInterval(intervalID); // Clear the interval
			const holdTime = Date.now() - holdStart;
			if (holdTime >= 200) {
				// Adjust the threshold as needed
				Event.preventDefault(); // Prevent default behavior if touch was held
			}
		});
	}

	runPC() {
		this.setup();
		this.playGuide();
		document.addEventListener("click", (Event) => {
			this.handleEvent(Event);
		});
	}

	run() {
		if (this.mobile) {
			this.runMobile();
		} else {
			this.runPC();
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	function isMobileDevice() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}

	let gameProp = {
		randomFactor: 100,
		gameBits: 16,
		coreRow: 6,
		coreColumn: 13,
		skyBoxRatio: 2,
		earthBoxRatio: 1,
		buildSpeed: 2,
	};

	if (isMobileDevice()) {
		console.log("User is on a mobile device");
		gameProp.mobile = true;
	} else {
		gameProp.mobile = false;
	}

	const game = new GameDriver(gameProp);
	game.run();
});
