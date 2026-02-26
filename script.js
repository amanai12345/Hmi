

const jsonData = {
  shapes: [
    {
      props: {
        shape: "polyline",
        x: 615,
        y: 409.5,
        vertices: [
          { x: -51.058, y: 0 },
          { x: 384.8, y: 0 }
        ],
        strokeStyle: { style: "#737373" },
        lw: { value: "5" }
      }
    },

    {
      props: {
        shape: "polyline",
        x: 850,
        y: 570,
        vertices: [
          { x: 0, y: 0 },
          { x: 0, y: 77.872 }
        ],
        strokeStyle: { style: "#737373" },
        lw: { value: "2" }
      }
    },
    {
      props: {
        shape: "polygon",
        x: 1075,
        y: 389.5,
        vertices: [
          { x: 0, y: 0 },
          { x: -60, y: -20 },
          { x: -80, y: 40 },
          { x: 0, y: 40 }
        ],
        fillStyle: { style: "#ffffff" },
        strokeStyle: { style: "#000000" },
        lw: { value: 1 }
      }
    }
  ],
  canvasWidth: 1920,
  canvasHeight: 931,
  canvasColor: { style: "#b3b3b3" }
};


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const DPR = window.devicePixelRatio || 1;
const W = jsonData.canvasWidth;
const H = jsonData.canvasHeight;

canvas.width = W * DPR;
canvas.height = H * DPR;
canvas.style.width = W + "px";
canvas.style.height = H + "px";
ctx.setTransform(DPR, 0, 0, DPR, 0, 0);


function draw() {
  // background
  ctx.fillStyle = jsonData.canvasColor.style;
  ctx.fillRect(0, 0, W, H);

  jsonData.shapes.forEach(shape => {
    const p = shape.props;
    if (!p.vertices || p.vertices.length < 2) return;

    const pts = p.vertices.map(v => ({
      x: p.x + v.x,
      y: p.y + v.y
    }));

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }

    if (p.shape === "polygon") ctx.closePath();

    // fill (polygons)
    if (p.fillStyle?.style && p.fillStyle.style !== "None") {
      ctx.fillStyle = p.fillStyle.style;
      ctx.fill();
    }

    // stroke (both)
    if (p.strokeStyle?.style && p.strokeStyle.style !== "None") {
      ctx.strokeStyle = p.strokeStyle.style;
      ctx.lineWidth = Number(p.lw?.value || 1);
      ctx.lineCap = "round";
      ctx.stroke();
    }
  });
}

document.querySelectorAll(".palette button").forEach(button => {
  button.addEventListener("click", () => {
    const selectedColor = button.dataset.color;

    jsonData.shapes.forEach(shape => {
      const p = shape.props;

    
      if (p.shape === "polyline") {
        if (!p.strokeStyle) {
          p.strokeStyle = { style: selectedColor };
        } else {
          p.strokeStyle.style = selectedColor;
        }
      }

   
      if (p.shape === "polygon") {
        if (!p.fillStyle) {
          p.fillStyle = { style: selectedColor };
        } else {
          p.fillStyle.style = selectedColor;
        }
      }
    });

   
    draw();
  });
});
draw();
