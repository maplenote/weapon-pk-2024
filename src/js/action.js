// import $ from 'jquery';
var modulePeoples = require("./peoples.js");
var moduleConfig = require("./config.js");
var moduleWeapons = require("./weapons.js");
var timeManager = require("./timeManager.js");

var postion;
var $instantMsgDom = $("#instantMsg");

function speedMsec(msec) {
  // 注意：此函式保留用於相容現有 CSS 轉場動畫時間，
  // 但新的動作排程應直接使用 timeManager
  let rate = Math.ceil(moduleConfig.config.speed);
  if (rate < 0) {
    return msec * rate * -1;
  } else if (rate === 0) {
    //異常
    return msec;
  } else {
    return msec / rate;
  }
}

function action() {
  if (modulePeoples.getHp("man1") === 0 || modulePeoples.getHp("man2") === 0) {
    return false;
  }
  // console.log("into action");
  let rand = moduleConfig.getRandom(1, 2); //隨機取得1或2
  ifMove("man" + rand);
  ifMove("man" + ((rand % 2) + 1));

  // 使用 timeManager 來排程下一次動作
  if (modulePeoples.getHp("man1") > 0 && modulePeoples.getHp("man2") > 0) {
    timeManager.scheduleAction(action, moduleConfig.config.baseMSTime);
  }
}

function initPositon() {
  // console.log("into init");
  if (timeManager.hasScheduledActions()) {
    return false;
  }

  postion = {
    man1: {
      x: 0,
      y: moduleConfig.config.arenaHeight - moduleConfig.config.stepWidth * 3,
      direction: 1,
    },
    man2: {
      x: moduleConfig.config.arenaWidth - moduleConfig.config.stepWidth * 2,
      y: moduleConfig.config.arenaHeight - moduleConfig.config.stepWidth * 3,
      direction: -1,
    },
    distance: Math.ceil(
      (moduleConfig.config.arenaWidth - moduleConfig.config.stepWidth * 4) /
        moduleConfig.config.stepWidth
    ),
  };
  setPosition("man1");
  setPosition("man2");
  $(".hand1,.hand2").css("rotate", "1deg");
}

function pauseAction() {
  // 使用 timeManager 來暫停動作
  timeManager.pause();
}

function resetAction() {
  // 使用 timeManager 來重置所有動作
  timeManager.cancelAllScheduledActions();
  timeManager.reset();
  modulePeoples.initPeople();
  initPositon(); //必須在initPeople之後
}

function ifMove(name) {
  // console.log("into ifMove");
  if (postion.distance > getWeaponScope(name)) {
    //目前距離大於武器距離就繼續移動
    postion[name].x =
      postion[name].x + moduleConfig.config.stepWidth * postion[name].direction;
    postion.distance--;
    setPosition(name);
  } else {
    attack(name);
  }
}

function setPosition(name) {
  // console.log("into setPosition");
  modulePeoples.peoples[name].jqueryObj
    .css("left", postion[name].x + "px")
    .css("opacity", 100);
  modulePeoples.peoples[name].jqueryObj
    .css("top", postion[name].y + "px")
    .css("opacity", 100);
  $instantMsgDom.text("目前距離" + postion.distance); //+'<br />'+instantMsgDom.innerHTML;
}

function setSpeed(btnVal) {
  let tranMs = 500; //base: 500ms
  btnVal = +btnVal;
  moduleConfig.setConfig("speed", btnVal);

  // 設定 TimeManager 的速度
  // 正值轉換為倍數，負值轉換為倒數 (例如：-2 → 0.5)
  let speedFactor;
  if (btnVal < 0) {
    speedFactor = 1 / Math.abs(btnVal);
  } else if (btnVal === 0) {
    speedFactor = 1; // 避免除以零
  } else {
    speedFactor = btnVal;
  }

  timeManager.setSpeed(speedFactor);

  //處理動態移動速度(在下次觸發動作前必須移動完畢)
  $(".people").css(
    "transitionDuration",
    speedMsec(moduleConfig.config.baseMSTime) + "ms"
  );
}

function takeWeapon(name, index) {
  if (index === null || moduleWeapons.weapons[index] === undefined) {
    modulePeoples.peoples[name].weaponObj = JSON.parse(
      JSON.stringify(moduleWeapons.noWeapon)
    ); //空手
  } else {
    modulePeoples.peoples[name].weaponObj = JSON.parse(
      JSON.stringify(moduleWeapons.weapons[index])
    ); //clone object
  }
}

function attack(name) {
  let weaponObj = getWeaponObj(name);
  let $people = modulePeoples.peoples[name].jqueryObj;
  let criticalHitFlag = false;
  if (postion.distance > weaponObj.scope) {
    return false;
  }
  if (weaponObj.durability <= 0) {
    return false;
  }
  let thisPower = moduleConfig.getRandom(
    weaponObj.attack.powerRange[0],
    weaponObj.attack.powerRange[1]
  );
  if (Math.random() <= weaponObj.attack.criticalHit) {
    criticalHitFlag = true;
    thisPower = thisPower * 2;
  }
  $people.find(".hand1").css("rotate", moduleConfig.getRandom(-60, 60) + "deg");
  $people.find(".hand2").css("rotate", moduleConfig.getRandom(-30, 30) + "deg");
  // 使用 TimeManager 可以輕鬆實現攻擊速度控制
  modulePeoples.loosBlood(
    modulePeoples.getAdversaryName(name),
    thisPower,
    criticalHitFlag
  );
  // weaponObj.attack.powerRange
  weaponObj.durability--; //扣耐久
}

function getWeaponScope(name) {
  let weaponObj = getWeaponObj(name);
  return weaponObj.scope;
}

function getWeaponObj(name) {
  let weaponObj = modulePeoples.peoples[name].weaponObj;
  if (weaponObj === null) {
    weaponObj = JSON.parse(JSON.stringify(moduleWeapons.noWeapon)); //空手
  }
  return weaponObj;
}

$(function () {
  resetAction();

  $("#startBtn").click(function () {
    // 初次點擊「開始」按鈕時
    if (!timeManager.isRunning) {
      timeManager.start();
      action();
    } else {
      // 暫停後點擊「開始」按鈕時
      timeManager.resume();
    }
    $("#pauseBtn,#resetBtn")
      .removeClass("pure-button-disabled")
      .prop("disabled", false);
    $("#startBtn").addClass("pure-button-disabled").prop("disabled", true);
  });

  $("#pauseBtn").click(function () {
    pauseAction();
    $("#startBtn").removeClass("pure-button-disabled").prop("disabled", false);
    $("#pauseBtn").addClass("pure-button-disabled").prop("disabled", true);
  });

  $("#resetBtn").click(function () {
    resetAction();
    $("#startBtn").removeClass("pure-button-disabled").prop("disabled", false);
    $("#pauseBtn,#resetBtn")
      .addClass("pure-button-disabled")
      .prop("disabled", true);
    $("#allMsg").html("");
  });

  $("input[name='speed']").on("change", function () {
    setSpeed($("input[name='speed']:checked").val());
    $("input[name='speed']")
      .parent("label")
      .removeClass("pure-button-active")
      .find("input:checked")
      .parent("label")
      .addClass("pure-button-active");
  });
});
