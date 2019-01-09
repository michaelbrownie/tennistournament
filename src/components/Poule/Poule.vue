<template>
<b-container class="home-container">
    <b-row>
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
      addResult() {
          
      },
      startFinals(){
        //TournamentHandler.addPlayers(this.players)
      }
    },
    mounted() {
      console.log(TournamentHandler.getPoules())
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
}
</style>
