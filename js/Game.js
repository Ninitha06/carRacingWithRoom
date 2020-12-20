class Game {
  constructor(){

  }

  async getRoomIsFullOnce(){
    console.log("Called");
    var roomIsFullData  = await database.ref(player.roomCode + '/roomIsFull').once("value");
    console.log("Executed");
    if(roomIsFullData.exists()){
      console.log("hey");
      roomIsFull = roomIsFullData.val();
      console.log("Room is full")
    }

  }

  updateRoomIsFull(room){
    database.ref(player.roomCode).update({
      roomIsFull: room
    });
  }

  getState(){
    var gameStateRef  = database.ref(player.roomCode + '/gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref(player.roomCode).update({
      gameState: state
    });
  }

  async start(){
   
    if(gameState === null){
      player = new Player();
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
  car1.addImage("car1",car1_img);
  car2 = createSprite(300,200);
  car2.addImage("car2",car2_img);
  car3 = createSprite(500,200);
  car3.addImage("car3",car3_img);
  car4 = createSprite(700,200);
  car4.addImage("car4",car4_img);
  cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    this.getRoomIsFullOnce();
    player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(70,70,70));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = allPlayers[plr].xDistance
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].yDistance;
        
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(cars[index-1].x, cars[index-1].y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
  
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      driveSound.play(); 
      driveSound.stop(0.5);
      player.yDistance +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      driveSound.play();
      driveSound.stop(0.5);
      player.xDistance -=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      driveSound.play();
      driveSound.stop(0.5);
      player.xDistance +=10
      player.update();
    }

    if(player.yDistance > 3860){
      gameState = 2;
      player.rank +=1
      player.updateCarsAtEnd(player.rank);

      driveSound.stop();
      finishSound.play();
     // console.log("You finished successfully at rank " + player.rank);
      //textSize(30);
      //text("Your Rank : " + player.rank,displayWidth/2-70, y-120);

      swal({
        title: `Awesome! Rank ${player.rank}`,
        text: "You reached the finish line successfully",
        imageUrl: "images/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Ok",
      });
    }

    car1.collide(car2);
    car1.collide(car3);
    car1.collide(car4);
    car2.collide(car3);
    car2.collide(car4);
    car3.collide(car4);
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
