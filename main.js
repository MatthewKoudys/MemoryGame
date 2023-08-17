const tilesContainer = document.querySelector(".tiles");
const colors = [
    "#172713",
    "#681916",
    "#ffb852",
    "#7e8743",
    "#00d973",
    "#d60036",
    "#b8b8ff",
    "#9c52f2",
    "#340059",
    "#b5d1cc"
];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game State
// first variable to updated as the game goes through is the number of tiles that are being revealed..
// how many tiles has the user gotten "correct?"

let revealedCount = 0;
let activeTile = null;
// activeTile refers to the tile the user has clicked on. This will refer to the <div> itself.

let awaitingEndOfMove = false;

// awaitingEndOfMove is the time two unmatched tiles are still showing.
//  while the user is waiting it's value will be true.

// first create a <div> using JS
function buildTile(color) {
	const element = document.createElement("div");
   // in CSS we already have a class of .tile to be assinged to every tile
	element.classList.add("tile");
	element.setAttribute("data-color", color);
	element.setAttribute("data-revealed", "false");

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");

		if (
			awaitingEndOfMove
			|| revealed === "true"
			|| element == activeTile
		) {
			return;
		}

		// Reveal this color
		element.style.backgroundColor = color;

		if (!activeTile) {
			activeTile = element;

			return;
		}

		const colorToMatch = activeTile.getAttribute("data-color");

		if (colorToMatch === color) {
			element.setAttribute("data-revealed", "true");
			activeTile.setAttribute("data-revealed", "true");

			activeTile = null;
			awaitingEndOfMove = false;
			revealedCount += 2;

			if (revealedCount === tileCount) {
				alert("Congratulations. Please refresh this page if you would like to play again.");
			}

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			activeTile.style.backgroundColor = null;
			element.style.backgroundColor = null;

			awaitingEndOfMove = false;
			activeTile = null;
		}, 1000);
	});

	return element;
}

// time to render out some times. first thing to do is get a random index for the colorsPicklistArray
for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const tile = buildTile(color);
	// this should pass the color chosen from the array.

	// this should remove a single (1) element at the randomIndex
	colorsPicklist.splice(randomIndex, 1);
	tilesContainer.appendChild(tile);
}