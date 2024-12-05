class Sound extends Sprite {
    constructor(src, loop = true) {
        super();
        this.audio = new Audio(src);
        this.audio.loop = loop; // Whether the sound should loop continuously
        this.hasStarted = false; // Ensure sound starts only after user interaction

        // Wait for user interaction to start the sound
        document.addEventListener(
            "click",
            () => this.startSound(),
            { once: true } // Ensures this only runs once
        );
    }

    startSound() {
        if (!this.hasStarted) {
            this.audio
                .play()
                .then(() => {
                    this.hasStarted = true; // Mark as started
                    console.log("Sound started playing.");
                })
                .catch((error) => {
                    console.error("Error starting sound:", error);
                });
        }
    }

    update() {
        // No need to update anything for sound
        return false; // No removal condition
    }

    draw() {
        // Sound does not render anything visually
    }
}
 