
var moduleConfig = require('./config.js')

var peoples = {
  man1: {
    jqueryObj: null,
    hp: 0,
    weaponObj: null //空手
  },
  man2: {
    jqueryObj: null,
    hp: 0,
    weaponObj: null
  }
}

function initPeople() {
  peoples.man1.jqueryObj = $("#man1");
  peoples.man2.jqueryObj = $("#man2");
  setHp('man1', moduleConfig.config.baseHp);
  setHp('man2', moduleConfig.config.baseHp);
}

function getAdversaryName(name) {
  let no = +(name.substring(name.length - 1, name.length));
  return ((no === 1) ? "man2" : "man1");
}


function getHp(name) {
  return peoples[name].hp;
}

function loosBlood(name, blood, hitFlag) {
  let $loosBox = $("#" + name + " .loosBox");
  let $li = $("<li" + ((hitFlag) ? " class='cHit'" : "") + ">- " + blood + ((hitFlag) ? " ! " : "") + "</li>");
  $li.css('left', moduleConfig.getRandom(-1.6, 1.6, 0.2) + 'em'); //隨機一下位置才不會疊在一起
  $loosBox.append($li);
  setTimeout(function () {
    $li.remove()
  }, 5000); //5秒後刪除<li>防止過多

  $("#allMsg").prepend("<div class='" + getAdversaryName(name) + "'> Attack " + blood + ((hitFlag) ? "(爆擊)" : "") + "</div>");
  setHp(name, peoples[name].hp - blood);
}

function setHp(name, hp) {
  let $hp;
  hp = Math.round(hp);//四捨五入取整數
  if (hp <= 0) {
    peoples[name].hp = 0;
  } else if (hp >= moduleConfig.config.baseHp) {
    peoples[name].hp = moduleConfig.config.baseHp;//不可設定超過基礎(最大)血量
  } else {
    peoples[name].hp = hp;
  }
  if (name === 'man1') {
    $hp = $("#hp1");
  }
  if (name === 'man2') {
    $hp = $("#hp2");
  }
  $hp.find(".blood").width(Math.ceil((peoples[name].hp / moduleConfig.config.baseHp) * 100) + '%');
  $hp.find(".bloodText").text(peoples[name].hp + ' / ' + moduleConfig.config.baseHp);
}

module.exports = {
  peoples,
  initPeople,
  getAdversaryName,
  getHp,
  loosBlood,
  setHp
};