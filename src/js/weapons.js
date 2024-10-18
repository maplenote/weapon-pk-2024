// export const peoples = peoples || {};

var modulePeoples = require('./peoples.js')

const noWeapon = {
  "name": "空手",
  "imagePath": {
    "handHeld": null,
    "flyOut": null,
    "effectName": null,
  },
  "durability": 100000, //耐久，執行一次扣1
  "attack": { //攻擊
    "powerRange": [1, 10], //攻擊力範圍
    "criticalHit": 0.5, //爆擊機率(爆極為2倍攻擊)
    "delaySec": 0.2 //攻擊速度
  },
  "defense": {
    "baseReduce": 0, //基礎增加防禦
    "extraReduce": //額外防禦
      {
        "powerRange": [0, 0], //額外防禦數值範圍
        "probability": 0, //觸發機率
        "delaySec": 0 //冷卻時間
      }
  },
  "scope": 0 //距離
};
const weapons = [
  {
    "name": "鐵劍",
    "imagePath": {
      "handHeld": "images/weapon1.png", //TODO 未放圖
      "flyOut": null,
      "effectName": null,
    },
    "durability": 100000, //耐久，執行一次扣1
    "attack": { //攻擊
      "powerRange": [80, 100], //攻擊力範圍
      "criticalHit": 0.30, //爆擊機率(爆極為2倍攻擊)
      "delaySec": 0.5 //攻擊速度
    },
    "defense": {
      "baseReduce": 0, //基礎增加防禦
      "extraReduce": //額外防禦
        {
          "powerRange": [10, 20], //額外防禦數值範圍
          "probability": 0.1, //觸發機率
          "delaySec": 0 //冷卻時間
        }
    },
    "scope": 4 //距離
  },
  {
    "name": "木弓",
    "imagePath": {
      "handHeld": "images/weapon2.png",
      "flyOut": "images/weapon2-1.png",
      "effectName": null,
    },
    "durability": 100000, //耐久，執行一次扣1
    "attack": { //攻擊
      "powerRange": [30, 50], //攻擊力範圍
      "criticalHit": 0.70, //爆擊機率(爆極為2倍攻擊)
      "delaySec": 0.8 //攻擊速度
    },
    "defense": {
      "baseReduce": 0, //基礎增加防禦
      "extraReduce": //額外防禦
        {
          "powerRange": [0, 0], //額外防禦數值範圍
          "probability": 0, //觸發機率
          "delaySec": 0 //冷卻時間
        }
    },
    "scope": 10 //距離
  },
  {
    "name": "炸彈",
    "imagePath": {
      "handHeld": null,
      "flyOut": "images/weapon3.png",
      "effectName": "bombEffect",
    },
    "durability": 5, //耐久，執行一次扣1
    "attack": { //攻擊
      "powerRange": [200, 300], //攻擊力範圍
      "criticalHit": 0, //爆擊機率(爆極為2倍攻擊)
      "delaySec": 1.2 //攻擊速度
    },
    "defense": {
      "baseReduce": 0, //基礎增加防禦
      "extraReduce": //額外防禦
        {
          "powerRange": [0, 0], //額外防禦數值範圍
          "probability": 0, //觸發機率
          "delaySec": 0 //冷卻時間
        }
    },
    "scope": 8 //距離
  }
];

function setWeapon(name, index) {
  modulePeoples.peoples[name1].weaponObj = index;
}

function initWeapon() {
  setWeapon('man1', null);
  setWeapon('man2', null);
}


module.exports = {
  noWeapon,
  weapons,
  setWeapon,
  initWeapon
};