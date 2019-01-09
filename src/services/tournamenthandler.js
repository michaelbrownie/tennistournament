export default {
    players: ['jantje', 'pietje'],

    addPlayers(players) {
      this.players = players;
      console.log(this.players);
    },
    getPlayers(){
        return this.players;
    }
  }