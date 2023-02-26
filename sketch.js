const canvasSketch = require('canvas-sketch');
// maths for skewing
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const risoColors = require('riso-colors')
const Color = require('canvas-sketch-util/color')

const settings = {
  dimensions: [ 1080, 1080 ],
  // animate: true
};

const sketch = ({ context, width, height }) => {

  let x, y, w, h, fill, stroke

  const num = 20
  const degrees = -30

  // being used to control each random generation of the frame
  // stops the random from happening constantly
  const rects = []

  // picks from 3 riso-colors at a time
  const rectColors = [
    random.pick(risoColors),
    random.pick(risoColors),
    random.pick(risoColors),
  ]

  // for generating background colour
  const bgColor = random.pick(risoColors).hex

  // generating rects
  for (let i = 0; i < num; i++ ) {

    x = random.range(0, width)
    y = random.range(0, height)
    w = random.range(200, 600)
    h = random.range(40, 200)

    // applying colour - added throughout object
    // accepts names, hexes, rgb, rgba
    fill = random.pick(rectColors).hex
    stroke = random.pick(rectColors).hex

    rects.push({ x, y, w, h, fill, stroke })
  }

  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    rects.forEach(rect => {

    // destructed rect
    const { x, y, w, h, fill, stroke } = rect
    
    // using canvas-sketch-utils for HSL shadows
    let shadowColor

    // saves and resets(?)
    context.save()
    // anchors the rectangle in the centre

    context.translate(x, y)
    context.strokeStyle = stroke
    context.fillStyle = fill
    context.lineWidth = 10

    // calling the rectangle object
    drawSkewedRect({ context, w, h, degrees })

    // using HSL for generating shadows
    shadowColor = Color.offsetHSL(fill, 0, 0, -20)
    shadowColor.rgba[3] = 0.5
    context.shadowColor = Color.style(shadowColor.rgba)
    context.shadowOffsetX = -10
    context.shadowOffsetY = 20

    context.fill()

    context.shadowColor = null
    context.stroke()

    // experiment
    
 
    context.restore()
    })
  };
};

// function with canvas as an obect
// context is where we draw
const drawSkewedRect = ({ context, w = 600, h = 200, degrees = -45 }) => {

  // triangle code
  // angle is in degrees
  // method is from canvas-sketch-util
  // maths variables for triangle radius and angle
  // let angle, rx, ry
  const angle = math.degToRad(degrees)
  const rx = Math.cos(angle) * w
  const ry = Math.sin(angle) * w

  
  context.save()
  context.translate(rx * -0.5, (ry + h) * -0.5)

  context.beginPath()
  context.moveTo(0, 0)
  context.lineTo(rx, ry)
  context.lineTo(rx, ry + h)
  context.lineTo(0, h)
  context.closePath()
  context.stroke()

  context.restore()

}

canvasSketch(sketch, settings);
