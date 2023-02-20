const myStorage = window.localStorage;
let Tiles, STpos;
if (myStorage.getItem("myTiles")) {
  Tiles = myStorage.getItem("myTiles").split(",");
  STpos = myStorage.getItem("STpos") * 1;
  for (let i = 0; i < Tiles.length; i++) {
    Tiles[i] = Tiles[i] * 1;
  }
} else {
  Tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  STpos = 15;
}

const c1 = document.getElementById("c1");
const ctx = c1.getContext("2d");

let swipe = (a, b) => {
  var t = Tiles[a];
  Tiles[a] = Tiles[b];
  Tiles[b] = t;
  return Tiles;
};

let DrawTiles = (state) => {
  for (let i = 0; i < 16; i++) {
    let y = ((i - (i % 4)) / 4) * 100;
    let x = (i % 4) * 100;
    ctx.beginPath();
    if (i === STpos) {
      ctx.fillStyle = "tranperent";
    } else {
      ctx.fillStyle = "brown";
    }
    ctx.fillRect(x, y, x + 100, y + 100);
    if (i === STpos) {
      ctx.strokeStyle = "tranperent";
    } else {
      ctx.strokeStyle = "wheat";
    }
    ctx.strokeRect(x, y, x + 100, y + 100);
    ctx.font = "35px Verdana";
    if (i === STpos) {
    } else {
      ctx.fillStyle = "white";
      ctx.fillText(`${state[i]}`, x + 28, y + 60);
    }
    ctx.closePath();
  }
};
let CheckWin = () => {
  let win = true;
  for (let i = 0; i < 15; i++) {
    if (Tiles[i] * 1 + 1 !== Tiles[i + 1] * 1) {
      win = false;
    }
  }

  if (win) {
    alert("Congratulations");
  }
};
let save = (state, STpos) => {
  myStorage.clear();
  myStorage.setItem("myTiles", Tiles.join(","));
  myStorage.setItem("STpos", `${STpos}`);
};
let blank = () => {
  Tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  STpos = 15;
  save(Tiles, STpos);
  DrawTiles(Tiles);
};

let mToLeft = () => {
  if (Tiles[STpos - 1] && (STpos - 1) % 4 !== 3) {
    Tiles = swipe(STpos, STpos - 1);
    STpos--;
    DrawTiles(Tiles);
    CheckWin();
  }
};
let mToRight = () => {
  if (Tiles[STpos + 1] && (STpos + 1) % 4 !== 0) {
    Tiles = swipe(STpos, STpos + 1);
    STpos++;
    DrawTiles(Tiles);
    CheckWin();
  }
};
let mToUp = () => {
  if (Tiles[STpos - 4]) {
    Tiles = swipe(STpos, STpos - 4);
    STpos -= 4;
    DrawTiles(Tiles);
    CheckWin();
  }
};
let mToDown = () => {
  if (Tiles[STpos + 4]) {
    Tiles = swipe(STpos, STpos + 4);
    STpos += 4;
    DrawTiles(Tiles);
    CheckWin();
  }
};
function hint() {
  alert(
    "hint: You can play using Arrows, F for scrambling, R for reset the game, H to show this hint again "
  );
}

document.onkeyup = (e) => {
  let Kcode = e.keyCode;
  switch (Kcode) {
    case 38 || 87:
      mToDown();
      save(Tiles, STpos);
      break;
    case 40 || 83:
      mToUp();
      save(Tiles, STpos);
      break;
    case 37 || 65:
      mToRight();
      save(Tiles, STpos);
      break;
    case 39 || 68:
      mToLeft();
      save(Tiles, STpos);
      break;
    case 70:
      for (let i = 0; i < 300; i++) {
        let random = Math.floor(Math.random() * 4);
        switch (random) {
          case 0:
            mToUp();
            break;
          case 1:
            mToDown();
            break;
          case 2:
            mToLeft();
            break;
          case 3:
            mToRight();
            break;
          default:
            break;
        }
      }
      save(Tiles, STpos);
      DrawTiles(Tiles);
      break;
    case 82:
      blank();
      break;
    case 72:
      hint();
      break;
    default:
      break;
  }
};

if (!myStorage.getItem("hint")) {
  hint();
  myStorage.setItem("hint", "true");
}
DrawTiles(Tiles);
