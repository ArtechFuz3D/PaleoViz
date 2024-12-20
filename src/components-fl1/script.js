// const button1 = document.getElementById("button1")
// let audio1 = new Audio()
// audio1.src = 'tracks/rhinestone.mp3'
const file = document.getElementById('fileupload')

const container = document.getElementById('container')
const canvas = document.getElementById('canvas1')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
let audioSource
let analyser



container.addEventListener('click', function() {
    const audio1 = document.getElementById('audio1')

    audio1.src = 'tracks/wegotfunk.mp3'
    const audioContext = new AudioContext()
    audio1.play()


    audioSource = audioContext.createMediaElementSource(audio1)
    analyser = audioContext.createAnalyser()
    audioSource.connect(analyser)
    analyser.connect(audioContext.destination)
    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const barWidth = (canvas.width/2)/bufferLength
    let barHeight
    let x
    
    function animate(){
        x = 0
        ctx.clearRect(0,0,canvas.width, canvas.height )
        analyser.getByteFrequencyData(dataArray)
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)

        requestAnimationFrame(animate)
    }
    animate()
})

file.addEventListener('change', function() {
    // console.log(this.files)
    const files = this.files
    const audio1 = document.getElementById('audio1')
    audio1.src = URL.createObjectURL(files[0])
    audio1.update()
    audio1.load()
    audio1.play()

    audioSource = audioContext.createMediaElementSource(audio1)
    analyser = audioContext.createAnalyser()
    audioSource.connect(analyser)
    analyser.connect(audioContext.destination)
    analyser.fftSize = 8
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const barWidth = (canvas.width/2)/bufferLength
    let barHeight
    let x
    function animate(){
        x = 0
        ctx.clearRect(0,0,canvas.width, canvas.height)
        analyser.getByteFrequencyData(dataArray)
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)
        requestAnimationFrame(animate)
    }
    animate()
})

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLength; i++){
        // move up screen
        barHeight =  dataArray[i] + (canvas.height/4 )
        // barHeight =  dataArray[i]
        // const red = 100
        const red = i * barHeight/20
        // const green = 100
        const green = i * 2
        // const blue = Math.random(i * barHeight/4)
        const blue = barHeight/2
        ctx.fillStyle = 'white'
        ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight -30, barWidth, 20)
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')'
        ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth
    }
    for (let i = 0; i < bufferLength; i++){
        // barHeight = dataArray[i]
        barHeight =  dataArray[i] + (canvas.height/4 )
        // const red = 100
        const red = i * barHeight/20
        // const green = 100
        const green = i * 2
        // const blue = Math.random(i * barHeight/4)
        // const blue = barHeight/2
        const blue = barHeight
        // ctx.fillStyle = 'white'
        ctx.fillStyle = 'white'
        ctx.fillRect(x, canvas.height - barHeight -30, barWidth, 20)
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')'
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth
    }
}

