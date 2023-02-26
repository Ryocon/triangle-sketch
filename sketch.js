const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {

  let x, y, w, h;
  // maths variables for triangle radius and angle
  let radius, angle

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
    context.translate(x, y)
    context.translate(w * -0.5, h * -0.5)

    context.strokeStyle = 'blue'

    // a way of drawing the rectangle
    // context.strokeRect(w * -0.5, h * 0.5, w, h)

    // rectangle drawn point by point
    // easier to move and control

    // below code is for a rectangle
    // context.beginPath()
    // context.moveTo(0, 0)
    // context.lineTo(w, 0)
    // context.lineTo(w, h)
    // context.lineTo(0, h)
    // context.closePath()
    // context.stroke()


    // triangle code

    
    radius = 200
    // angle is in degrees
    angle = 30

    x = Math.cos(angle) * radius
    y = Math.sin(angle) * radius


    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(200, 0)
    context.stroke()


    context.restore()

  };
};

canvasSketch(sketch, settings);
