(() => {
	// put variables (connections to the web page / DOM) at the top
	const puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
				dropZoneContainer = document.querySelector(".puzzle-board"),
				dragZone = document.querySelector(".puzzle-pieces"),
				dragImages = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone");

	// functions go in the middle

	// e means event
	function dragStart(event) {
		console.log('started draggin');
		// take the dragged image and move it into the drop zone
		// move it from the left container to the drop zone (reparent it)
		event.dataTransfer.setData("savedID", this.id);
	}

	function draggedOver(event) {
		event.preventDefault();
		console.log('dragged over me');
		// allow an element to be dragged over and then dropped
	}

	function dropped(event) {
		// override the browser / element's default behaviour
		event.preventDefault();

		// check to see if there's an element here already (a dropped image)
		// if so, then kill this function
		if (this.childElementCount > 0) { return; } // like an exit keyword - don't execute anything past this

		let targetID = event.dataTransfer.getData("savedID");
		console.log('dropped somethin on me');
		// put the dragged image into this container
		// create a new img tag, set it source, and THEN append it
		event.target.appendChild(document.querySelector(`#${targetID}`))
	}

	//this function runs when the bottom nav buttons are clicked
	// it changes the bg image of the drop zone div using the style property
	function changeBGImage() {
		// 1. check all the drop zones
		// 2. if a drop zone has ana image in it, then it needs to go back where it came from
		// 3. append it back into the drag zone

		dropZones.forEach(zone => {
			if (zone.childNodes.length > 0) {
				dragZone.appendChild(zone.firstElementChild);
			}
		});

		// get the custom data attribute from the clicked button
		let currentImage = this.dataset.imageref;
		// `` is NOT a quote. it's a JavaScript template string
		dropZoneContainer.style.backgroundImage = `url(images/backGround${currentImage}.jpg)`;

		// this is an intermediate way to do the same thing V
		// dropZoneContainer.style.backgroundImage = `url(images/backGround${this.dataset.imageref}.jpg)`;
		// debugger;
	}

	// event handling at the bottom
	puzzleSelectors.forEach(button => button.addEventListener("click", changeBGImage));
	dragImages.forEach(piece => piece.addEventListener('dragstart', dragStart));

	dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", dropped);
	})

	// emulate a click on the first bottom button and run the bg image function
	changeBGImage.call(puzzleSelectors[0]);
})();
