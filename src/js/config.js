var config = {
  perWidth: 10, //最小單位
  stepWidth: 30, //一步寬度
  arenaWidth: 900,//場地寬
  arenaHeight: 300,//場地高
  baseHp: 100,//基礎(最大)血量
  baseMSTime: 500, //以500毫秒為一單位時間
  speed: 1,//目前速率
}

function setConfig(key, val) {
  config[key] = val;
}

function getRandom(min, max, step = null) {
  min = Number(min);
  max = Number(max);
  step = Number(step);
  if (Number.isNaN(min) || Number.isNaN(max)) {
    throw "params not numeric value";
  }
  // 允許部傳遞 step，並處理指定 0 的狀況
  if (Number.isNaN(step) || step === 0) {
    const minDecimals = (min.toString().split(".")[1] || "").length;
    const maxDecimals = (max.toString().split(".")[1] || "").length;
    step = Math.pow(10, -1 * Math.max(minDecimals, maxDecimals));
  }
  // 計算可選值的總數（gap），無需取絕對值
  const gap = Math.floor((max - min) / step) + 1;

  // 生成 0 到 gap - 1 之間的隨機整數
  const randomIndex = Math.floor(Math.random() * gap);

  // 計算 step 的小數點位數
  const decimals = (step.toString().split('.')[1] || []).length;

  // 計算並返回具體的隨機數值，確保返回指定的小數位
  return (min + randomIndex * step).toFixed(decimals);
}