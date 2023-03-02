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
})();
