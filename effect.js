import { getLocationsWithColor } from './utils'

export default class Effect {
    constructor(canvas, video) {
        this.canvas = canvas
        this.video = video
        this.ctx = canvas.getContext("2d", { willReadFrequently: true })

        // initiate animation
        this.#animate()
    }

    #animate() {
        const { canvas, video, ctx } = this
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // get image (=video) data
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        const theLocs = getLocationsWithColor(imgData, { r:0, g:0, b:255 })

        // ctx.fillstyle = "yellow"

        // locs.forEach(loc => {
        //     ctx.fillRect(loc.x, loc.y, 1, 1)
        // })

        requestAnimationFrame(this.#animate.bind(this))
    }

}
