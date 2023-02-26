const canvasSketch = require('canvas-sketch');
// maths for triangle
const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {

  let x, y, w, h;
  // maths variables for triangle radius and angle
  // let angle, rx, ry

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    x = width * 0.5
    y = height * 0.5
    w = width * 0.6
    h = height * 0.1

    // saves and resets(?)
    context.save()
    // anchors the rectangle in the centre
    // added '250' as it was off centre
    context.translate(x, y)
    context.strokeStyle = 'blue'

    // calling the rectangle object
    drawSkewedRect({ context })
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
