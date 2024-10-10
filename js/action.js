var config = config || {};
var peoples = peoples || {};
var weapons = weapons || {};

var timer;
var postion;
var instantMsgDom = document.getElementById('instantMsg');

function action() {
  // console.log("into action");
  if (postion === undefined) {
    initPositon();
    timer = setTimeout(action, 500); //每500毫秒觸發一次
    return;
  }

  let rand = Math.ceil(Math.random() * 10 % 2); //隨機取得1或2
  ifMove("man" + rand);
  ifMove("man" + ((rand % 2) + 1));
  if (postion.distance > 1) //TODO 要改成血量
    timer = setTimeout(action, 500);
}

function initPositon() {
  // console.log("into init");
  postion = {
    man1: {
      x: 0,
      y: config.arenaHeight - config.stepWidth * 2,
      direction: 1
    },
    man2: {
      x: config.arenaWidth - config.stepWidth,
      y: config.arenaHeight - config.stepWidth * 2,
      direction: -1
    },
    distance: Math.ceil((config.arenaWidth - config.stepWidth * 2) / config.stepWidth)
  };
  setPosition("man1");
  setPosition("man2");
}

function ifMove(name) {
  // console.log("into ifMove");
  if (postion.distance > 1) { //要改成武器距離
    postion[name].x = postion[name].x + config.stepWidth * postion[name].direction;
    postion.distance--;
    setPosition(name);
  }
}

function setPosition(name) {
  // console.log("into setPosition");
  peoples[name].dom.style.left = postion[name].x + 'px';
  peoples[name].dom.style.top = postion[name].y + 'px';
  instantMsgDom.innerHTML = '目前距離'+postion.distance; //+'<br />'+instantMsgDom.innerHTML;
}


action();