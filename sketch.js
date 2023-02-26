const canvasSketch = require('canvas-sketch');
// maths for skewing
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ],
  // animate: true
};

const sketch = ({ context, width, height }) => {

  let x, y, w, h;

  const num = 20
  const degrees = -30

  // being used to control each random generation of the frame
  // stops the random from happening constantly
  const rects = []

  for (let i = 0; i < num; i++ ) {

    x = random.range(0, width)
    y = random.range(0, height)
    w = random.range(200, 600)
    h = random.range(40, 200)

    rects.push({ x, y, w, h })
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    rects.forEach(rect => {

    // destructed rect
    const { x, y, w, h, } = rect

    // saves and resets(?)
    context.save()
    // anchors the rectangle in the centre

    context.translate(x, y)
    context.strokeStyle = 'blue'

    // calling the rectangle object
    drawSkewedRect({ context, w, h, degrees })
    context.stroke()
 
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
