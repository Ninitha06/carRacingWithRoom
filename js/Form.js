class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting1 = createElement('h2');
    this.greeting2 = createElement('h3');
  
    var logoImage = 'images/logo.png';
    this.logo = createImg(logoImage);

    this.createRoom = createButton("Create Room");
    this.roomNo = createElement('h2');
    this.joinRoom = createButton("Join Room");

  }
  hide(){
    this.greeting1.hide();
    this.greeting2.hide();
    this.button.hide();
    this.input.hide();
    this.roomNo.hide();
    this.createRoom.hide();
    this.joinRoom.hide();
  }

  display(){

    this.button.hide();
    this.input.hide();
    this.createRoom.position(displayWidth/2 -100, displayHeight/2-100);
    this.joinRoom.position(displayWidth/2 -100, displayHeight/2);
    this.createRoom.class("customButton");
    this.joinRoom.class("customButton");
    this.logo.position(width /4, 10);

    this.createRoom.mousePressed(()=>{
      this.createRoom.hide();
      this.joinRoom.hide();
      this.button.show();
      this.input.show();
      player.roomCode = 'G' + Math.random().toString(36).substr(2, 9);
     
      this.roomNo.html("Your Room Id : " + player.roomCode);
      this.roomNo.position(displayWidth/2-150, displayHeight/4);
      player.updateCount(0);
      game.update(0);
      playerCount = 0;
      gameState = 0;
      player.getCount();
      game.getState();
      game.updateRoomIsFull(0);
      this.displayNameForm();
    });

    this.joinRoom.mousePressed(()=>{
      this.createRoom.hide();
      this.joinRoom.hide();

      var roomInput = createInput('');
      roomInput.position(displayWidth/2 - 100 , displayHeight/2 - 80);
      var enterButton = createButton("Enter");
      enterButton.position(displayWidth/2 -50, displayHeight/2);
      enterButton.class("customButton");
      roomInput.class("customInput");
      this.roomNo.html("Enter your Room Id");
      this.roomNo.position(displayWidth/2-150, displayHeight/4);
      
      enterButton.mousePressed(()=>{
        roomInput.hide();
        enterButton.hide();
        this.button.show();
        this.input.show();
        player.roomCode = roomInput.value();

        player.getCountOnce();
        game.getState();
      
        this.roomNo.html("Your Room Id : " + player.roomCode);
        this.roomNo.position(displayWidth/2-150, displayHeight/4);

        setTimeout(()=>this.displayNameForm(),1000);
        
      })
      

      
    });
    
  }

  displayNameForm(){
    
    this.input.position(displayWidth/2 - 100 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 -50, displayHeight/2);
  
    this.button.class("customButton");
    this.input.class("customInput");
  
    

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      this.roomNo.hide();
      player.name = this.input.value();

      playerCount+=1;
      player.index = playerCount;
     
      switch(playerCount){
        case 1 : xPosition = 375;
                break;
        case 2 : xPosition = 575;
                break;
        case 3 : xPosition = 775;
                break;
        case 4 : xPosition = 975;
                break;
      }
      player.xDistance = xPosition;
      player.update();
      player.updateCount(playerCount);
      this.greeting1.html("Hello " + player.name);
      this.greeting1.position(displayWidth/2-70, displayHeight/4);
      this.greeting2.html("Waiting for other players to join...");
      this.greeting2.position(displayWidth/2 - 150, displayHeight/3);
    });

  }
}
