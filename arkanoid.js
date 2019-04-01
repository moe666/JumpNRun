var context, controller, rectangle, loop, obstacle;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 780;
context.canvas.width = 1020;

rectangle = {

  height:32,
  jumping:true,
  width:32,
  x:14, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
      case 65:// A key
        controller.left = key_state;
      break;

      case 38:// up key
      case 32:// SPACE key
      case 87:// W key
        controller.up = key_state;
      break;

      case 39:// right key
      case 68:// D key
        controller.right = key_state;
      break;
    }

  }

};

loop = function() {

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 20;
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity -= 0.8;

  }

  if (controller.right) {

    rectangle.x_velocity += 0.8;

  }

  rectangle.y_velocity += 1.5;// gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.92;// friction
  rectangle.y_velocity *= 0.96;// friction

  // if rectangle is falling below floor line
  //                                                                            X achse = rechts links  Y achse = hoch runter
  if (rectangle.y > 555.7 - 16 - 28) {

    rectangle.jumping = false;
    rectangle.y = 555.7 - 16 - 28;
    rectangle.y_velocity = 0;

  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {

    rectangle.x = 1020;

  } else if (rectangle.x > 1020) {// if rectangle goes past right boundary

    rectangle.x = -32;

  }

  context.fillStyle = "#13008e"; //Background
  context.fillRect(0, 0, 1020, 560);// x, y, width, height
  context.fillStyle = "#edcb9e";// Character
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = "#188710"; //Ground
  context.lineWidth = 32;
  context.beginPath();
  context.moveTo(0, 560);
  context.lineTo(1020, 560);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

// function myFunction() {
//     document.getElementById("#neustart").reset();
// }
