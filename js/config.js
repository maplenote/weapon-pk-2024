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

function getDecimalLength(floatNum) {
  let decimalMatch = /^\d+\.(\d+)?$/.exec(floatNum);
  if (decimalMatch === null) {
    return 0;
  }
  return decimalMatch[1].length;
}


function getRandom(min, max) {
  //要確實頭尾數字都得到相同機率，就不能只是 Math.round(Math.random() * (max - min)) + min，
  // 這樣 max 跟 min 的機率是中間各值的一半而已
  let pow;
  let decimal = getDecimalLength(min);
  if (getDecimalLength(max) > decimal) {
    decimal = getDecimalLength(max);
  }
  pow = Math.pow(10, decimal);
  min = parseFloat(min) * pow;
  max = parseFloat(max) * pow;
  // console.log(min,max,pow,decimal);
  if (min > max) { //若大小值傳錯順序
    return (Math.floor(Math.random() * (min - max +1 )) + max) / pow;
  } else {
    return (Math.floor(Math.random() * (max - min +1)) + min) / pow;
  }
}

// var testArr = {};
// minT=1.01;
// maxT=1.50;
// for(let i=0;i<100000;i++){
//   returnNum=getRandom(minT, maxT);
//   if(testArr ['t'+returnNum]===undefined) {
//     testArr ['t'+returnNum]=0;
//   }
//   testArr ['t'+returnNum]++;
//
// }
// console.log(testArr);