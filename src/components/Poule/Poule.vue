<template>
<b-container class="home-container">
  <b-row v-for="poule in poules">
    <b-card cols="6" :title="'Stand poule ' + poule.id"
          tag="article"
          class="mb-2 card">
      <b-list-group v-for="player in poule.players">
        <b-list-group-item>{{player.name}} - {{player.points}}</b-list-group-item>
      </b-list-group>
    </b-card>

    <b-card cols="6" :title="'Wedstrijden poule ' + poule.id"
          tag="article"
          class="mb-2 card">
          <table class="table">
            <thead><tr><th colspan="2">Home</th><th colspan="2">Away</th></tr></thead>
            <tbody v-for="match in poule.matches">
              <tr>
                <td>{{match.home_name}}</td>
                <td><b-form-input v-model="match.home_score" v-on:change="updateScore(match, poule)" type="number"></b-form-input></td>
                <td>{{match.away_name}}</td>
                <td><b-form-input v-model="match.away_score" v-on:change="updateScore(match, poule)" type="number"></b-form-input></td>
              </tr>
            </tbody>
          </table>
    </b-card>
  </b-row>
  <b-button v-on:click="startFinals"
                      variant="primary">Start finals!</b-button>
</b-container>
</template>

<script>
import TournamentHandler from '../../services/tournamenthandler.js'

export default {
  name: 'Poule',
  data () {
    return {
      poules: []
    }
  },
    methods: {
      updateScore(match, poule) {
        if (TournamentHandler.validateScore(match)){
          // Check if there's already a winner
          let tmp = {};
          if (match.winner.id !== undefined){
            tmp = match.winner;
          }

          // Set winner
          if (match.home_score > match.away_score){
            match.winner = match.home_player;
          }
          else {
            match.winner = match.away_player;
          }
          
          // Deduct points if winner is corrected
          if (tmp.id !== match.winner.id && tmp.id !== undefined){
            poule.players[tmp.poule_index].points -= 3;
          }

          // Same winner, do nothing
          if (tmp.id === match.winner.id){
            return;
          }

          // Add points to winner
          poule.players[match.winner.poule_index].points += 3;

          // Update poule in localStorage
          TournamentHandler.updatePoules(this.poules);
        }
      },
      startFinals(){
        if (TournamentHandler.allMatchesFinished(this.poules)){
          TournamentHandler.generateFinals()
        }
        else{
          alert('not finished newb')
        }
      }
    },
    mounted() {
      this.poules = TournamentHandler.getPoules();
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
}
</style>
