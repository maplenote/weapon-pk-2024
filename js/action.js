var config = config || {};
var peoples = peoples || {};
var weapons = weapons || {};

var timer = 0;
var postion;
var $instantMsgDom = $('#instantMsg');

function speedMsec(msec) {
  let rate = Math.ceil(config.speed);
  if (rate < 0) {
    return msec * rate * -1;
  } else if (rate === 0) { //異常
    return msec;
  } else {
    return msec / rate;
  }
}

function action() {
  if (getHp("man1") === 0 || getHp("man2") === 0) {
    return false;
  }
  // console.log("into action");
  let rand = getRandom(1, 2); //隨機取得1或2
  ifMove("man" + rand);
  ifMove("man" + ((rand % 2) + 1));
  if (getHp("man1") > 0 && getHp("man2") > 0) {
    timer = setTimeout(action, speedMsec(config.baseMSTime));
  }
}

function initPositon() {
  // console.log("into init");
  if (timer !== 0) {
    return false;
  }
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

function pauseAction() {
  if (timer !== 0) {
    clearTimeout(timer);
    timer = 0;
  }
}

function resetAction() {
  pauseAction();
  initPositon();
  resetHp();
}

function ifMove(name) {
  // console.log("into ifMove");
  if (postion.distance > getWeaponScope(name)) { //目前距離大於武器距離就繼續移動
    postion[name].x = postion[name].x + config.stepWidth * postion[name].direction;
    postion.distance--;
    setPosition(name);
  } else {
    attack(name);
  }
}

function setPosition(name) {
  // console.log("into setPosition");
  peoples[name].jqueryObj.css('left', postion[name].x + 'px').css('opacity', 100);
  peoples[name].jqueryObj.css('top', postion[name].y + 'px').css('opacity', 100);
  $instantMsgDom.text('目前距離' + postion.distance); //+'<br />'+instantMsgDom.innerHTML;
}

function setSpeed(btnVal) {
  let tranMs = 500;//base: 500ms
  btnVal = +(btnVal);
  setConfig('speed', btnVal);
  //處理動態移動速度(在下次觸發setTimeout前必須移動完畢)
  $(".people").css("transitionDuration", speedMsec(config.baseMSTime) + 'ms');
}

function takeWeapon(name, index) {
  if (index === null || weapons[index] === undefined) {
    peoples[name].weaponObj = JSON.parse(JSON.stringify(noWeapon));//空手
  } else {
    peoples[name].weaponObj = JSON.parse(JSON.stringify(weapons[index])); //clone object
  }
}


function attack(name) {
  let weaponObj = getWeaponObj(name);
  let criticalHitFlag = false;
  if (postion.distance > weaponObj.scope) {
    return false;
  }
  if (weaponObj.durability <= 0) {
    return false;
  }
  let thisPower = getRandom(weaponObj.attack.powerRange[0], weaponObj.attack.powerRange[1]);
  if (Math.random() <= weaponObj.attack.criticalHit) {
    criticalHitFlag = true;
    thisPower = thisPower * 2;
  }
  //TODO 規劃時攻速未考慮到，setTimeout需要重新改寫
  loosBlood(getAdversaryName(name), thisPower, criticalHitFlag);
  // weaponObj.attack.powerRange
  weaponObj.durability--;//扣耐久
}


function getWeaponScope(name) {
  let weaponObj = getWeaponObj(name);
  return weaponObj.scope;
}

function getWeaponObj(name) {
  let weaponObj = peoples[name].weaponObj;
  if (weaponObj === null) {
    weaponObj = JSON.parse(JSON.stringify(noWeapon)); //空手
  }
  return weaponObj;
}

$(function () {
  resetAction();

  $("#startBtn").click(function () {
    action();
    $("#pauseBtn,#resetBtn").removeClass('pure-button-disabled').prop('disabled', false);
    $("#startBtn").addClass('pure-button-disabled').prop('disabled', true);
  });
  $("#pauseBtn").click(function () {
    pauseAction();
    $("#startBtn").removeClass('pure-button-disabled').prop('disabled', false);
    $("#pauseBtn").addClass('pure-button-disabled').prop('disabled', true);
  });
  $("#resetBtn").click(function () {
    resetAction();
    $("#startBtn").removeClass('pure-button-disabled').prop('disabled', false);
    $("#pauseBtn,#resetBtn").addClass('pure-button-disabled').prop('disabled', true);
    $("#allMsg").html('');
  });
  $("input[name='speed']").on('change', function () {
    setSpeed($("input[name='speed']:checked").val());
    $("input[name='speed']").parent('label').removeClass('pure-button-active')
      .find("input:checked").parent('label').addClass('pure-button-active');
  });
});
