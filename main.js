import './style.css'
import Effect from './effect'

// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

let myCanvas = document.getElementById('myCanvas')
// myCanvas.settings(willReadFrequently, true)
// let myVideo = document.getElementById('myVideo')
let myVideo = document.createElement('video')

navigator.mediaDevices.getUserMedia(
    {
        video: true
    }
).then(function(rawData) {
    myVideo.srcObject = rawData
    myVideo.play()

    // copy to canvas, where we can manipulate and make fx
    myVideo.onloadeddata = function() {
        myCanvas.width = myVideo.videoWidth
        myCanvas.height = myVideo.videoHeight

        // const ctx = myCanvas.getContext("2d")
        // ctx.drawImage(myVideo,0,0,myCanvas.width, myCanvas.height)

        new Effect(myCanvas, myVideo)
    }
}).catch((err) => alert(err))