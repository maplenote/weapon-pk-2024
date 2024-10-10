<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="js/config.js?<?php echo filemtime("js/config.js"); ?>"
          type="application/javascript"></script>
  <script src="js/weapons.js?<?php echo filemtime("js/weapons.js"); ?>"
          type="application/javascript"></script>
  <script defer src="js/peoples.js?<?php echo filemtime("js/peoples.js"); ?>"
          type="application/javascript"></script>
  <script defer src="js/action.js?<?php echo filemtime("js/action.js"); ?>"
          type="application/javascript"></script>
  <link rel="stylesheet" href="https://unpkg.com/scss-reset/reset.css" />
  <link rel="stylesheet" href="css/index.css?<?php echo filemtime("css/index.css"); ?>" />
  <title>Play Game</title>
</head>
<body>
<div class="arena">
  <div id="hp1" class="hp"><div class="Blood"></div><span class="BloodText"></span></div>
  <div id="hp2" class="hp"><div class="Blood"></div><span class="BloodText"></span></div>
  <div id="man1" class="people"><div class="weapon"></div></div>
  <div id="man2" class="people"><div class="weapon"></div></div>
  <div id="instantMsg"></div>
</div>
</body>
</html>