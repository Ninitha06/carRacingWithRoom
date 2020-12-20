class Player {
  constructor(){
    this.index = null;
    this.yDistance = 0;
    this.xDistance = 0;
    this.name = null;
    this.rank = null;
    this.roomCode = null;
  }

  getCount(){
    var playerCountRef = database.ref(this.roomCode + '/playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref(this.roomCode).update({
      playerCount: count
    });
  }

  async getCountOnce(){
    console.log(player.roomCode);
      var playerCountRef = await database.ref(player.roomCode + '/playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
  }

  update(){
    var playerIndex = this.roomCode + "/players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      yDistance:this.yDistance,
      xDistance : this.xDistance
    });
  }

  getPlayerInfo(){
    var playerInfoRef = database.ref(this.roomCode + '/players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsAtEnd() {
    database.ref(this.roomCode + '/CarsAtEnd').on("value",(data)=>{
      this.rank = data.val();
    })
  }

 updateCarsAtEnd(rank) {
    database.ref(this.roomCode).update({
      CarsAtEnd:rank
    })
  }
}
