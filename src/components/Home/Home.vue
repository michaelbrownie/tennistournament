<template>
<b-container class="home-container">
    <b-row>
    <b-card title="Tennistoernooi"
          img-src="https://wedstrijd.tips/wp-content/uploads/2018/01/weimbledon.png"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 40%; margin-left: 30%;"
          class="mb-2 card">
          <b-form-input v-model="newPlayer"
                  type="text"
                  placeholder="Enter your name">
                  </b-form-input>
                  <b-button v-on:click="addPlayer">Add player!</b-button>
          <b-list-group v-for="player in playerList">
            <b-list-group-item>{{player}}</b-list-group-item>
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
      newPlayer: '',
    }
  },
    methods: {
      addPlayer() {
        if (this.newPlayer.length > 0){
          this.players.push(this.newPlayer);
          this.newPlayer = '';
        }
      },
      startTournament(){
        TournamentHandler.addPlayers(this.players);
        this.$router.push('/poule');
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

.card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 0px;
  width: 50%;
  margin-left: 25%;
}
</style>
