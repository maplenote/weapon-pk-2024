<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script
          src="https://code.jquery.com/jquery-3.7.1.min.js"
          integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
          crossorigin="anonymous"></script>
  <script src="js/config.js?<?php echo filemtime("js/config.js"); ?>"
          type="application/javascript"></script>
  <script src="js/weapons.js?<?php echo filemtime("js/weapons.js"); ?>"
          type="application/javascript"></script>
  <script defer src="js/peoples.js?<?php echo filemtime("js/peoples.js"); ?>"
          type="application/javascript"></script>
  <script defer src="js/action.js?<?php echo filemtime("js/action.js"); ?>"
          type="application/javascript"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css"
        integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
  <link rel="stylesheet" href="css/index.css?<?php echo filemtime("css/index.css"); ?>" />
  <title>Play Game</title>
</head>
<body>
<div class="btnBox height3em">
  <input type="button" id="startBtn" value="開始" class="pure-button" />
  <input type="button" id="pauseBtn" value="暫停" disabled class="pure-button pure-button-disabled" />
  <input type="button" id="resetBtn" value="重置" disabled class="pure-button pure-button-disabled" />
</div>
<div class="btnBox height3em">
  速度
  <div class="inline-block pure-button-group" role="group">
    <label class="pure-button"><input type="radio" name="speed" value="-3" /> - 3×</label>
    <label class="pure-button"><input type="radio" name="speed" value="-2" /> - 2×</label>
    <label class="pure-button pure-button-active"><input type="radio" name="speed" value="1" checked /> 1×</label>
    <label class="pure-button"><input type="radio" name="speed" value="2" /> + 2×</label>
    <label class="pure-button"><input type="radio" name="speed" value="3" /> + 3×</label>
  </div>
</div>
<div class="arena">
  <div id="hp1" class="hp">
    <div class="blood"></div>
    <span class="bloodText"></span></div>
  <div id="hp2" class="hp">
    <div class="blood"></div>
    <span class="bloodText"></span></div>
  <div id="man1" class="people">
    <ul class="loosBox"></ul>
    <div class="weapon"></div>
  </div>
  <div id="man2" class="people">
    <ul class="loosBox"></ul>
    <div class="weapon"></div>
  </div>
</div>

<div class="msg">
  <div id="instantMsg"></div>
  <div id="allMsg"></div>
</div>
</body>
</html>