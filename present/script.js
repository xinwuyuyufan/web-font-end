!(function () {
  let canvas = document.querySelector("#canvas");
  let context = canvas.getContext("2d");
  // canvas 宽高
  function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    clearCanvas();
  }

  function clearCanvas() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  function mouseDownHandler(e) {
    let x = e.clientX;
    let y = e.clientY;

    create(x, y);
  }
  document.addEventListener("mousedown", mouseDownHandler);
  let particles = [];
  setInterval(function () {
    create(Math.random() * canvas.width, Math.random() * canvas.height);
  }, 100);
  function create(x, y) {
    let count = 100;
    let radius = 0;
    let hue = Math.floor(Math.random() * 51) + 150;
    var hueVariance = 30;
    for (let i = 0; i < count; i++) {
      let angle = (360 / count) * i;
      let radians = (angle * Math.PI) / 180;
      radius++;
      let p = {};
      p.x = x;
      p.y = y;
      p.radians = radians;

      p.size = 2;
      p.speed = Math.random() * 5 + 0.4;
      p.radius = radius;
      p.hue =
        Math.floor(Math.random() * (hue + hueVariance - (hue - hueVariance))) +
        (hue - hueVariance);
      p.brightness = Math.floor(Math.random() * 31) + 50;
      p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
      particles.push(p);
    }
  }
  function Fireworks() {
    clearCanvas();
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      let vx = Math.cos(p.radians) * p.radius;
      let vy = Math.sin(p.radians) * p.radius + 0.4;
      p.x += vx;
      p.y += vy;

      p.radius *= 1 - p.speed / 100;
      p.alpha -= 0.005;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      context.beginPath();
      context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
      context.closePath();
      context.fillStyle =
        "hsla(" + p.hue + ",100%," + p.brightness + "%," + p.alpha + ")";
      context.fill();
    }
  }
  //   requestAnimationFrame
  function tick() {
    context.globalCompositeOperation = "destination-out";
    context.fillStyle = "rgba(0,0,0," + 10 / 100 + ")";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "lighter";
    Fireworks();
    requestAnimationFrame(tick);
  }
  tick();
})();
