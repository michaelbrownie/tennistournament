<template>
<b-container class="home-container">
    <b-row>
    <b-card title="Tennistournament"
    sub-title="6,8,12,16 players"
          img-src="https://wedstrijd.tips/wp-content/uploads/2018/01/weimbledon.png"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 40%; margin-left: 30%;"
          class="mb-2 card">
          <b-input-group>
            <b-form-input v-model="newPlayer"
              type="text"
              placeholder="Enter player">
            </b-form-input>
            <b-input-group-append>
              <b-button v-on:click="addPlayer">Add player!</b-button>
            </b-input-group-append>
            </b-input-group>

          <b-list-group v-for="player in playerList">
            <b-list-group-item>{{player.name}} 
            <strong class="float-right delete-player" v-on:click="deletePlayer(player.id)">X</strong>
            </b-list-group-item>
          </b-list-group>

          <b-card-footer style="margin-top: 20px;"><b-button v-on:click="startTournament"
                      variant="primary">Start tournament!</b-button></b-card-footer>
  </b-card>
    </b-row>
</b-container>
</template>

<script>
import TournamentHandler from '../../services/tournamenthandler.js'

export default {
  name: 'Home',
  data () {
    return {
      players: [],
      lastid: 1,
      showStartButton: false,
      newPlayer: '',
    }
  },
    methods: {
      addPlayer() {
        if (this.newPlayer.length > 0){
          this.players.push({name: this.newPlayer, id: this.lastid, points: 0});
          this.newPlayer = '';
          this.lastid++;
        }
      },
      deletePlayer(id){
        for(var i = 0; i < this.players.length; i++){
          if (this.players[i].id === id)
            this.players.splice(i,1)
        }
      },
      startTournament(){
        let pcount = this.players.length;
        if (pcount === 6 || pcount === 8 || pcount === 12 || pcount === 16){
          TournamentHandler.generatePoules(this.players);
        }
        else{
          alert('Tournament has to have 6, 8, 12, 16 players');
        }
      }
    },
    mounted() {
      //console.log(TournamentHandler.getPlayers())
    },
    computed: {
      playerList() {
        return this.players
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container{
  padding-top: 30px;
}

.delete-player{
  cursor: pointer;
}

.delete-player:hover{
  color: red;
}

.card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 0px;
  width: 50%;
  margin-left: 25%;
}
</style>
