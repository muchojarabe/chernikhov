// 12.4.23

let anc, alc, mrg;

let entX, entY, pvrX, pvrY;

let colA, colB;

let img, vsb;

function preload() {
  img = loadImage("imagen.png");
}

function setup() {
  defMed();
  createCanvas(anc, alc);
  img.resize(anc, alc);
  image(img, 0, 0);

  colorMode(HSL, 100, 100, 100, 1);

  colA = 9.1666;
  colB = 7.2222;

  vsb = true;

  frameRate(60);
}

function draw() {
  if (vsb) {
    img.resize(anc, alc);
    image(img, 0, 0);
  } else {
    defPos();
    dibFig();
  }
}

function defMed() {
  if (windowWidth * 5 > windowHeight * 4) {
    mrg = Math.trunc(windowHeight / 40 + 10);
    alc = Math.trunc(windowHeight - mrg * 2);
    anc = Math.trunc(alc * 0.8);    
    document.getElementById("encaaa").style.marginBottom = "0px";
  } else {
    mrg = Math.trunc(windowWidth / 40 + 10);
    anc = Math.trunc(windowWidth - mrg * 2);
    alc = Math.trunc(anc * 1.25);
    document.getElementById("encaaa").style.marginBottom = 2 * mrg + "px";
  }

  document.getElementById("conttt").style.margin = mrg + "px";
}

function mousePressed() {
  if (0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height) {
    entX = mouseX;
    entY = mouseY;
    vsb = false;
    return false;
  }
}

function mouseReleased() {
  setup();
  return false;
}

function defPos() {
  // eje x
  pvrX = 50 + ((mouseX - entX) * 85) / anc;

  colA = pvrX - 40.8334;
  colB = pvrX - 42.7778;

  if (colA >= 100) colA -= 100;
  if (colB >= 100) colB -= 100;
  if (colA <= 0) colA += 100;
  if (colB <= 0) colB += 100;

  // eje y
  pvrY = 0.5 + (mouseY - entY) / alc;
  if (pvrY <= 0) pvrY = 0;
  if (pvrY >= 1) pvrY = 1;
}

function dibFig() {
  background(10.5555, 77, 84);

  stroke(37.7777, 21, 10);
  strokeJoin(ROUND);
  strokeWeight(anc * 0.0038);

  // cuadrado base
  fill(50, 51, 19);
  quad(
    anc * 0.1975,
    alc * 0.776, // vA
    anc * 0.4325,
    alc * 0.666, // vB
    anc * 0.755,
    alc * 0.75, // vC
    anc * 0.5225,
    alc * 0.864 // vD
  );

  // triangulo fondo
  fill(38.8888, 12, 45);
  triangle(
    anc * 0.4325,
    alc * 0.666, // vB
    anc * 0.755,
    alc * 0.75, // vC
    anc * (0.4769 + 0.3962 * pvrY),
    alc * (0.1892 - 0.0584 * pvrY) // vPu    **
  );

  // triangulo izquierda
  fill(29.4444, 7, 35);
  triangle(
    anc * 0.1975,
    alc * 0.776, // vA
    anc * 0.4325,
    alc * 0.666, // vB
    anc * (0.4769 - 0.6388 * pvrY),
    alc * (0.1892 + 0.0816 * pvrY) // vPi    *
  );

  // triangulo derecha
  fill(44.7222, 32, 35);
  triangle(
    anc * 0.755,
    alc * 0.75, // vC
    anc * 0.5225,
    alc * 0.864, // vD
    anc * (0.4769 + 0.7512 * pvrY),
    alc * (0.1892 + 0.2296 * pvrY) // vPd    *
  );

  // triangulo frente volador
  fill(41.6666, 26, 46);
  triangle(
    anc * (0.1975 - 0.025 * pvrY),
    alc * (0.776 - 0.78 * pvrY), // vAf    *
    anc * (0.5225 - 0.055 * pvrY),
    alc * (0.864 - 0.792 * pvrY), // vDf    *
    anc * (0.4769 + 0.3962 * pvrY),
    alc * (0.1892 - 0.0584 * pvrY) // vPu    **
  );

  strokeWeight(anc * 0.005);

  // triangulo amarillo izq
  fill(colA, 94, 53);
  triangle(
    anc * (0.1893 + 0.2814 * pvrY),
    alc * (0.3166 + 0.4588 * pvrY), // bO    **
    anc * (0.1118 + 0.2814 * pvrY),
    alc * (0.2966 + 0.4588 * pvrY), // bI    *
    anc * (0.1768 + 0.2814 * pvrY),
    alc * (0.1426 + 0.4588 * pvrY) // pO    **
  );

  // triangulo amarillo der
  fill(colB, 73, 42);
  triangle(
    anc * (0.1893 + 0.2814 * pvrY),
    alc * (0.3166 + 0.4588 * pvrY), // bO    **
    anc * (0.2493 + 0.2814 * pvrY),
    alc * (0.2846 + 0.4588 * pvrY), // bD    *
    anc * (0.1768 + 0.2814 * pvrY),
    alc * (0.1426 + 0.4588 * pvrY) // pO    **
  );

  noStroke();
  fill(230);
  rect(0, 0, alc * 0.12, alc * 0.032);
  fill(0);
  textSize(alc * 0.024);
  textAlign(CENTER);
  text("   ", alc * 0.056, alc * 0.024);
  textAlign(RIGHT);
  text(Math.trunc(pvrX), alc * 0.046, alc * 0.024);
  textAlign(LEFT);
  text(Math.trunc(pvrY * 100), alc * 0.066, alc * 0.024);
}

function windowResized() {
  defMed();
  resizeCanvas(anc, alc);
}
