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

  // reactangle properties
  let x, y, w, h, fill, stroke, blend

  // amount of rectangles generated
  const num = 40
  const degrees = -30

  // being used to control each random generation of the frame
  // stops the random from happening constantly
  const rects = []

  // picks from 2 riso-colors at a time
  const rectColors = [
    random.pick(risoColors),
    random.pick(risoColors),
  ]

  // for generating background colour
  const bgColor = random.pick(risoColors).hex

  // draws the polygon twice to make sure the outline stroke is not covered
  const mask = {
    radius: width * 0.4,
    sides: 3,
    x: width * 0.5,
    y: height * 0.58
  }

  // generating rects
  for (let i = 0; i < num; i++ ) {

    x = random.range(0, width)
    y = random.range(0, height)
    w = random.range(600, width)
    h = random.range(40, 200)

    // applying colour - added throughout object
    // accepts names, hexes, rgb, rgba
    fill = random.pick(rectColors).hex
    stroke = random.pick(rectColors).hex

    // ternary operator for controlling blending options
    blend = (random.value() > 0.5 ) ? 'overlay' : 'source-over'

    // pushing to object
    rects.push({ x, y, w, h, fill, stroke, blend })
  }

  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    // triangle!
    context.save()
    // centres the drawing
    context.translate(mask.x, mask.y)

    // draws shapes based on drawPolygon function
    drawPolygon({ context, radius: mask.radius, sides: mask.sides})

    // context.beginPath()
    // context.moveTo(0, -300)
    // context.lineTo(300, 200)
    // context.lineTo(-300, 200)
    // context.closePath()

    // context.lineWidth = 10
    // context.strokeStyle = 'black'
    // context.stroke()
    context.clip()
    // end of triangles


    // loop that draws rectangles
    rects.forEach(rect => {

    // destructed rectangle / renderer
    const { x, y, w, h, fill, stroke, blend } = rect
    
    // using canvas-sketch-utils for HSL shadows
    let shadowColor

    // saves and resets(?)
    context.save()
    // anchors the rectangle in the centre
    context.translate(-mask.x, -mask.y)
    context.translate(x, y)
    context.strokeStyle = stroke
    context.fillStyle = fill
    context.lineWidth = 10

    // colour blending options
    context.globalCompositeOperation = blend

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

    // additional outline for blending/shadow
    context.lineWidth = 2
    context.strokeStyle = 'black'
    context.stroke()
 
    context.restore()
    })

    context.restore()

    // polygon outline
    // appears infront of rectangles
    context.save()
    context.translate(mask.x, mask.y)
    context.lineWidth = 10
    drawPolygon({ context, radius: mask.radius - context.lineWidth, sides: mask.sides})
    context.globalCompositeOperation = 'color-burn'
    
    context.strokeStyle = 'black'
    context.stroke()
    context.restore()

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

// draws exact shapes using math functions
const drawPolygon = ({ context, radius = 100, sides = 3}) => {
  const slice = Math.PI * 2 / sides

  context.beginPath()
  context.moveTo(0, -radius)

  for (let i = 1; i < sides; i++) {
    const theta = i * slice - Math.PI * 0.5
    context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius)
  }
  context.closePath()
}

canvasSketch(sketch, settings);
