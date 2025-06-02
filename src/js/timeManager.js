/**
 * 時間管理器 - 控制遊戲中的時間流速、暫停和繼續
 */
class TimeManager {
  constructor() {
    this.isPaused = true; // 初始狀態為暫停
    this.speedFactor = 1; // 1 = 正常速度, 2 = 2倍速, 0.5 = 半速
    this.gameTime = 0; // 遊戲內部時間累積 (毫秒)
    this.realTimeStart = 0; // 實際時鐘開始時間
    this.pauseStartTime = 0; // 暫停開始的時間點
    this.totalPausedTime = 0; // 總暫停時間
    this.scheduledActions = []; // 排程動作佇列
    this.lastUpdateTime = 0; // 上次更新時間
    this.isRunning = false; // 遊戲是否已經開始運行
  }

  /**
   * 開始時間管理器
   */
  start() {
    if (this.isRunning) return;

    this.realTimeStart = performance.now();
    this.lastUpdateTime = this.realTimeStart;
    this.isPaused = false;
    this.isRunning = true;
    this.update();
  }

  /**
   * 暫停遊戲時間
   */
  pause() {
    if (!this.isPaused && this.isRunning) {
      this.isPaused = true;
      this.pauseStartTime = performance.now();
    }
  }

  /**
   * 繼續遊戲時間
   */
  resume() {
    if (this.isPaused && this.isRunning) {
      this.totalPausedTime += performance.now() - this.pauseStartTime;
      this.isPaused = false;
      this.lastUpdateTime = performance.now();
      this.update();
    }
  }

  /**
   * 重置時間管理器
   */
  reset() {
    this.isPaused = true;
    this.gameTime = 0;
    this.realTimeStart = 0;
    this.pauseStartTime = 0;
    this.totalPausedTime = 0;
    this.scheduledActions = [];
    this.lastUpdateTime = 0;
    this.isRunning = false;
  }

  /**
   * 設定時間速度
   * @param {number} newSpeedFactor - 速度倍數 (1 = 正常, 2 = 2倍速, 0.5 = 半速)
   */
  setSpeed(newSpeedFactor) {
    // 設定新的時間速度前，更新目前的遊戲時間
    this.updateGameTime();
    this.speedFactor = newSpeedFactor;
  }

  /**
   * 更新遊戲時間
   */
  updateGameTime() {
    if (!this.isPaused && this.isRunning) {
      const now = performance.now();
      const realTimeDelta = now - this.lastUpdateTime;
      this.gameTime += realTimeDelta * this.speedFactor;
      this.lastUpdateTime = now;
    }
  }

  /**
   * 排定一個動作在指定的延遲後執行
   * @param {Function} callback - 要執行的函式
   * @param {number} delay - 延遲時間 (遊戲時間毫秒)
   * @returns {number} 排程的遊戲時間點，可用於取消
   */
  scheduleAction(callback, delay) {
    this.updateGameTime();
    const scheduledGameTime = this.gameTime + delay;
    const actionId = Date.now() + Math.random();

    this.scheduledActions.push({
      callback,
      scheduledGameTime,
      actionId,
    });

    return actionId; // 返回動作 ID，可用於取消
  }

  /**
   * 取消已排程的動作
   * @param {number} actionId - 動作 ID
   */
  cancelScheduledAction(actionId) {
    this.scheduledActions = this.scheduledActions.filter(
      (action) => action.actionId !== actionId
    );
  }

  /**
   * 取消所有排程動作
   */
  cancelAllScheduledActions() {
    this.scheduledActions = [];
  }

  /**
   * 更新循環 - 檢查和執行排程的動作
   */
  update() {
    if (this.isPaused || !this.isRunning) return;

    this.updateGameTime();

    // 執行所有應該執行的動作
    const actionsToRun = [];
    this.scheduledActions = this.scheduledActions.filter((action) => {
      if (action.scheduledGameTime <= this.gameTime) {
        actionsToRun.push(action.callback);
        return false; // 從佇列中移除
      }
      return true; // 保留在佇列中
    });

    // 執行所有需要執行的動作
    actionsToRun.forEach((callback) => callback());

    // 安排下一次更新
    requestAnimationFrame(() => this.update());
  }

  /**
   * 取得目前遊戲時間
   * @returns {number} 遊戲時間 (毫秒)
   */
  getGameTime() {
    this.updateGameTime();
    return this.gameTime;
  }

  /**
   * 檢查是否有任何排程中的動作
   * @returns {boolean} 是否有排程中的動作
   */
  hasScheduledActions() {
    return this.scheduledActions.length > 0;
  }
}

module.exports = new TimeManager(); // 匯出單例
