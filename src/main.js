const Mode = {
	Mouse: 0,
	Touch: 1,
};

class RiveAnimation {
	/**
	 *
	 * @param {string} artboardName
	 * @param {string} path the url to the .riv file
	 * @param {string} canvas the ID name of the canvas where you want the file to be placed
	 * @param {boolean} [databinding=false] boolean value if the animation is using databinding or not
	 * @param {number} [inputMode=Mode.Mouse] Mode.Mouse or Mode.Touch depending on input type; alternatively you can use 0 or 1
	 */
	constructor(
		artboardName,
		path,
		canvas,
		databinding = false,
		inputMode = Mode.Mouse
	) {
		this.artboardName = artboardName;
		this.path = path;
		this.canvasElement = document.getElementById(canvas);
		this.databinding = databinding;
		this.inputMode = inputMode;
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
	"/animations/emerging_profiles_6.riv",
	"app"
).enable();

let tablet = new RiveAnimation(
	"Tablet",
	"/animations/emerging_profiles_6.riv",
	"tablet"
).enable();

let mobile = new RiveAnimation(
	"Mobile",
	"/animations/emerging_profiles_6.riv",
	"mobile"
).enable();

let sustain_desktop = new RiveAnimation(
	"Desktop",
	"/animations/sustainability_journey_5.riv",
	"sustain-desktop"
).enable();

let sustain_tablet = new RiveAnimation(
	"Tablet",
	"/animations/sustainability_journey_5.riv",
	"sustain-tablet"
).enable();

let sustain_mobile = new RiveAnimation(
	"Mobile",
	"/animations/sustainability_journey_5.riv",
	"sustain-mobile"
).enable();

let circles_desktop = new RiveAnimation(
	"Desktop",
	"/animations/Circles_3.riv",
	"circles-desktop",
	true,
	Mode.Mouse
).enable();

let circles_tablet = new RiveAnimation(
	"Tablet",
	"/animations/Circles_3.riv",
	"circles-tablet",
	true,
	Mode.Touch
).enable();

let circles_mobile = new RiveAnimation(
	"Mobile",
	"/animations/Circles_3.riv",
	"circles-mobile",
	true,
	Mode.Touch
).enable();
