<template>
<b-container class="home-container">
<main id="tournament">
    <ul class="round round-2" v-if="quarterfinals !== undefined">
        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top winner">Lousville <b-form-input type="number"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">Colo St <b-form-input type="number"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top winner">Oregon <b-form-input type="number"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">Saint Louis <b-form-input type="number"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top ">Memphis <b-form-input type="number"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom winner">Mich St <b-form-input type="number"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top ">Creighton <b-form-input type="number"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom winner">Duke <b-form-input type="number"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
    </ul>
    <ul class="round round-3">
        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top winner">{{semifinals[0].home_player.name}} <b-form-input type="number"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">{{semifinals[0].away_player.name}} <b-form-input type="number"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top ">{{semifinals[1].home_player.name}} <b-form-input type="number"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom winner">{{semifinals[1].away_player.name}} <b-form-input type="number"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
    </ul>
    <ul class="round round-4">
        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top winner">{{final.home}} <b-form-input type="number"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">{{final.home}} <b-form-input type="number"></b-form-input></li>
        
        <li class="spacer">&nbsp;</li>
    </ul>       
</main>
</b-container>
</template>

<script>
import TournamentHandler from '../../services/tournamenthandler.js'

export default {
  name: 'Knockout',
  data () {
    return {
        quarterfinals: undefined,
        semifinals: undefined,
        final: {home: '', away: ''}
    }
  },
    methods: {
    },
    mounted() {
        if (TournamentHandler.getFinals().length > 2){
            this.quarterfinals = TournamentHandler.getFinals();
        }
        else{
            this.semifinals = TournamentHandler.getFinals();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
    /* display: block; */
    float: right;
    width: 70px;
    margin: 5px 0px 5px 0px;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/** Bracket styling from: https://codepen.io/aronduby/pen/qliuj */
/*
 *  Flex Layout Specifics
*/
main{
  display:flex;
  flex-direction:row;
}
.round{
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:200px;
  list-style:none;
  padding:0;
}
  .round .spacer{ flex-grow:1; }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow:.5; }

  .round .game-spacer{
    flex-grow:1;
  }

/*
 *  General Styles
*/
body{
  font-family:sans-serif;
  font-size:small;
  padding:10px;
  line-height:1.4em;
}

li.game{
  padding-left:20px;
}

  li.game.winner{
    font-weight:bold;
  }
  li.game span{
    float:right;
    margin-right:5px;
  }

  li.game-top{ border-bottom:1px solid #aaa; }

  li.game-spacer{ 
    border-right:1px solid #aaa;
    min-height:40px;
  }

  li.game-bottom{ 
    border-top:1px solid #aaa;
  }
</style>
