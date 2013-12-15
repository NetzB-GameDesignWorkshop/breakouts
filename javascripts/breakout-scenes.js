;Quintus.BreakoutScenes = function(Q) {

  Q.scene("title",function(stage) {
    Q.state.set("level",0);

    // Clear the hud out
    Q.clearStage(1); 

    var bg = stage.insert(new Q.Background({ type: Q.SPRITE_UI }));
    bg.on("touch",function() {  Q.stageScene("level1");  });

    stage.insert(new Q.Title());

                var verb = Q.touchDevice ? 'Tap': 'Click';

    stage.insert(new Q.UI.Text({
      label: verb + " to start",
      align: 'center',
      x: Q.width/2,
      y: 280,
      weight: "normal",
      size: 20
    }));


    stage.insert(new Q.UI.Text({
      label: "during the game: use L/R arrow\nkeys to skip levels",
      align: 'center',
      x: Q.width/2,
      y: 370,
      weight: "normal",
      size: 20
    }));
  });


  Q.scene("goBackToGameOver",function(stage) {
    console.log("gameOver");
    console.log("window.location.href: "+ window.location.href)
    console.log("document.URL: "+ document.URL)

    var array = ARIS.parseURLParams(window.location.href);
    var playerId = array.playerId[0];
    var gameId = array.gameId[0];

    console.log("playerId: "+playerId);
    console.log("gameId: "+gameId);

    ARIS.closeMe();
    //window.open("aris://closeMe()", "_self");
  });

  Q.scene("goBackToWinner",function(stage) {
    console.log("winner");
    console.log("window.location.href: "+ window.location.href)
    console.log("document.URL: "+ document.URL)

    var array = ARIS.parseURLParams(window.location.href);
    var playerId = array.playerId[0];
    var gameId = array.gameId[0];

    console.log("playerId: "+playerId);
    console.log("gameId: "+gameId);

    ARIS.closeMe();
    //window.open("aris://closeMe()", "_self");
  });


  Q.scene("gameOver",function(stage) {

    var bg = stage.insert(new Q.Background({ type: Q.SPRITE_UI }));
    //bg.on("touch",function() {  Q.stageScene("title");  });
    bg.on("touch",function() {  Q.stageScene("goBackToGameOver");  });

    stage.insert(new Q.Title());

    stage.insert(new Q.UI.Text({
      label: "Game Over!",
      align: 'center',
      x: Q.width/2,
      y: 350,
      weight: "normal",
      size: 20
    }));

  });

  Q.scene("winner",function(stage) {

    var bg = stage.insert(new Q.Background({ type: Q.SPRITE_UI }));
    //bg.on("touch",function() {  Q.stageScene("title");  });
    bg.on("touch",function() {  Q.stageScene("goBackToWinner");  });

    stage.insert(new Q.Title());

    stage.insert(new Q.UI.Text({
      label: "You Win!",
      align: 'center',
      x: Q.width/2,
      y: 350,
      weight: "normal",
      size: 20
    }));

  });

  Q.scene("hud",function(stage) {

    console.log("stage: "+stage);

    stage.insert(new Q.Score());
    stage.insert(new Q.Lives());
    stage.insert(new Q.Level());
  }, { stage: 1 });

  function setupLevel(levelAsset,stage) {

    if(Q.useTiles) {
      stage.collisionLayer(new Q.GameTiles());
    } else {
      stage.insert(new Q.Background());
    }

    stage.insert(new Q.BlockTracker({ data: Q.asset(levelAsset) }));

    stage.insert(new Q.Ball({ x: 50, y: 100 }));
    stage.insert(new Q.Countdown());
    stage.insert(new Q.Paddle());

  }

  Q.scene("level1",function(stage) {
    // Set up the game state
    Q.state.reset({ score: 0, lives: 2, level: 1 });
    
    // Add the hud in 
    Q.stageScene("hud"); 

    // Call the helper methods to get the 
    // level all set up with blocks, a ball and a paddle
    setupLevel("level1",stage);
    
    // Set up a listener for when the stage is complete
    // to load the next level



    stage.on("complete",function() { Q.stageScene("winner"); });

  });

  // Level Skipping
  Q.input.on('left',function() {
    var level = Q.state.get("level");

    if(level > 1) {
      Q.stageScene('level' + (level-1));
    } else {
      Q.stageScene('title');
    }
  });

  Q.input.on('right',function() {
    var level = Q.state.get("level") || 0;

    if(level < 4) {
      Q.stageScene('level' + (level+1));
    } else {
      Q.stageScene('winner');
    }
  });
};