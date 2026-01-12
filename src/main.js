const Mode = {
	Mouse: 0,
	Touch: 1,
};

class RiveAnimation {
	/**
	 *
	 * @param {string} artboardName
	 * @param {string} path the url to the .riv file
	 * @param {string} parentDiv the ID name of the div where you want the canvas to be created
	 * @param {boolean} [databinding=false] boolean value if the animation is using databinding or not
	 * @param {number} [inputMode=Mode.Mouse] Mode.Mouse or Mode.Touch depending on input type; alternatively you can use 0 or 1
	 */
	constructor(
		artboardName,
		path,
		parentDiv,
		databinding = false,
		inputMode = Mode.Mouse
	) {
		this.artboardName = artboardName;
		this.path = path;
		this.parentDiv = document.getElementById(parentDiv);
		this.createContainer();

		this.databinding = databinding;
		this.inputMode = inputMode;
	}

	createContainer() {
		this.canvasElement = document.createElement("canvas");
		this.canvasElement.style.width = "100%";
		this.canvasElement.style.height = "100%";
		this.canvasElement.classList.add("rive-canvas");

		this.parentDiv.appendChild(this.canvasElement);
	}

	enable() {
		this.animation = new rive.Rive({
			src: this.path,
			canvas: this.canvasElement,
			autoplay: true,
			artboard: this.artboardName,
			isTouchScrollEnabled: true,
			stateMachines: "State Machine 1",
			autoBind: false,
			layout: new rive.Layout({
				fit: rive.Fit.Contain,
				alignment: rive.Alignment.Center,
			}),
			onLoad: () => {
				this.computeSize();

				if (this.databinding) {
					const vm = this.animation.viewModelByName("Settings");
					const vmi = vm.instanceByIndex(this.inputMode);
					this.animation.bindViewModelInstance(vmi);
				}
			},
		});

		this.animation.on(rive.EventType.RiveEvent, this.onRiveEventReceived);

		window.addEventListener("resize", (e) => {
			this.animation.resizeDrawingSurfaceToCanvas();
		});

		window
			.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
			.addEventListener("change", this.computeSize);
	}

	onRiveEventReceived(riveEvent) {
		const eventData = riveEvent.data;
		if (eventData.type === rive.RiveEventType.General) {
			switch (eventData.name) {
				case "LeadersPopup":
					console.log("LeadersPopup");
					break;
				case "GrowersPopup":
					console.log("GrowersPopup");
					break;
				case "StagnantsPopup":
					console.log("StagnantsPopup");
					break;
				case "HoverIn":
					console.log("HoverIn");
					document.body.style.cursor = "pointer";
					break;
				case "HoverOut":
					console.log("HoverOut");
					document.body.style.cursor = "unset";
					break;
				default:
					console.log(`${eventData.name} not accounted for`);
			}
		}
	}

	computeSize() {
		this.animation.resizeDrawingSurfaceToCanvas();
	}
}

/**
 * The next lines are just for creating and linking the animations
 */
let desktop = new RiveAnimation(
	"Desktop",
	"/animations/emerging_profiles_7.riv",
	"app"
).enable();

let tablet = new RiveAnimation(
	"Tablet",
	"/animations/emerging_profiles_7.riv",
	"tablet"
).enable();

let mobile = new RiveAnimation(
	"Mobile",
	"/animations/emerging_profiles_7.riv",
	"mobile"
).enable();

let sustain_desktop = new RiveAnimation(
	"Desktop",
	"/animations/sustainability_journey_6.1.riv",
	"sustain-desktop"
).enable();

let sustain_tablet = new RiveAnimation(
	"Tablet",
	"/animations/sustainability_journey_6.1.riv",
	"sustain-tablet"
).enable();

let sustain_mobile = new RiveAnimation(
	"Mobile",
	"/animations/sustainability_journey_6.1.riv",
	"sustain-mobile"
).enable();

let circles_desktop = new RiveAnimation(
	"Desktop",
	"/animations/circles_4.riv",
	"circles-desktop",
	true,
	Mode.Mouse
).enable();

let circles_tablet = new RiveAnimation(
	"Tablet",
	"/animations/circles_4.riv",
	"circles-tablet",
	true,
	Mode.Touch
).enable();

let circles_mobile = new RiveAnimation(
	"Mobile",
	"/animations/circles_4.riv",
	"circles-mobile",
	true,
	Mode.Touch
).enable();
