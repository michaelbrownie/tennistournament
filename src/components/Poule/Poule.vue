<template>
<b-container class="home-container">
  <b-row v-for="poule in poules">
    <b-card cols="6" :title="'Stand poule ' + poule.id"
          tag="article"
          class="mb-2 card">
      <b-list-group v-for="player in poule.players">
        <b-list-group-item>{{player.name}}</b-list-group-item>
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
                <td><b-form-input v-model="match.home_score" type="number"></b-form-input></td>
                <td>{{match.away_name}}</td>
                <td><b-form-input v-model="match.away_score" type="number"></b-form-input></td>
                <td><b-button v-on:click="savescore(match.id)" variant="primary">Save</b-button></td>
              </tr>
            </tbody>
          </table>
    </b-card>
  </b-row>
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
      savescore(id) {
        for (var i = 0; i < this.poules.length; i++){
          for (var j = 0; j < this.poules[i].matches.length; j++){
            if(this.poules[i].matches[j].id === id){
              alert(this.poules[i].matches[j].home_score)
            }
          }
        }
          
      },
      startFinals(){
        
      }
    },
    mounted() {
      this.poules = JSON.parse(localStorage.getItem('poules'));
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
