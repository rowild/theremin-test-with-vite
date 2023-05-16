import { getLocationsWithColor, average } from './utils'

export default class Effect {
    constructor(canvas, video) {
        this.canvas = canvas
        this.video = video
        this.ctx = canvas.getContext("2d", { willReadFrequently: true })

        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
        // Theremin Sinus Sound
        const audioCtx = new AudioContext()

        this.osc = audioCtx.createOscillator()
        this.osc.frequency.value = 0
        this.osc.start()

        this.gainNode = audioCtx.createGain()
        this.gainNode.gain.value = 0.14
        // this.gain.connect(audioCtx.destination)

        this.osc.connect(this.gainNode).connect(audioCtx.destination)

        // Volume
        // const volumeControl = document.querySelector("#volume");
        // volumeControl.addEventListener("input",
        //     () => { gainNode.gain.value = volumeControl.value; },
        //     false
        //   );

        // initiate animation
        this.#animate()
    }

    #animate() {
        const { canvas, video, ctx } = this
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // get image (=video) data
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        const locs = getLocationsWithColor(imgData, { r:0, g:0, b:255 })

        // This is kind of a "debugging code"
        ctx.fillStyle = "yellow"

        locs.forEach(loc => {
            ctx.fillRect(loc.x, loc.y, 1, 1)
        })

        // draw a circle around the found locations
        if(locs.length > 0) {
            const center = average(locs)

            // For setting the frequency
            const p = 1 - center.y / canvas.height
            const freq = 200 + 500*p // between 200 and 700; linear interpolation
            this.osc.frequency.value = freq

            // This red dot in the center of the yellow area is also kind of a debugging code
            ctx.beginPath()
            ctx.fillStyle = "red"
            ctx.arc(center.x, center.y, 5, 0, Math.PI*2)
            ctx.fill()

            // Y-axis: draw a horizontal line where the marker is
            ctx.beginPath()
            ctx.strokeStyle = "maroon" // blue
            ctx.lineWidth = 5
            ctx.moveTo(0, center.y)
            ctx.lineTo(canvas.width, center.y)
            ctx.stroke()
        }
        else {
            // set frequency to an inaudible value, if no values are found
            this.osc.frequency.value = 0
        }

        requestAnimationFrame(this.#animate.bind(this))
    }

}
