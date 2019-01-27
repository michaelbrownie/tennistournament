<template>
<b-container class="home-container">
<main id="tournament">
    <ul class="round round-2" v-if="quarterfinals !== undefined">
        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top winner">{{quarterfinals[0].home_player.name}} 
            <b-form-input type="number" v-model="quarterfinals[0].home_score" v-on:change="updateScore(0, 'quarter')"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">{{quarterfinals[0].away_player.name}} 
            <b-form-input type="number" v-model="quarterfinals[0].away_score" v-on:change="updateScore(0, 'quarter')"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top winner">{{quarterfinals[1].home_player.name}} 
            <b-form-input type="number" v-model="quarterfinals[1].home_score" v-on:change="updateScore(1, 'quarter')"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">{{quarterfinals[1].away_player.name}} 
            <b-form-input type="number" v-model="quarterfinals[1].away_score" v-on:change="updateScore(1, 'quarter')"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top ">{{quarterfinals[2].home_player.name}} 
            <b-form-input type="number" v-model="quarterfinals[2].home_score" v-on:change="updateScore(2, 'quarter')"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">{{quarterfinals[2].away_player.name}} 
            <b-form-input type="number" v-model="quarterfinals[2].away_score" v-on:change="updateScore(2, 'quarter')"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top ">{{quarterfinals[3].home_player.name}} 
            <b-form-input type="number" v-model="quarterfinals[3].home_score" v-on:change="updateScore(2, 'quarter')"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">{{quarterfinals[3].away_player.name}} 
            <b-form-input type="number" v-model="quarterfinals[3].away_score" v-on:change="updateScore(2, 'quarter')"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
    </ul>
    <ul class="round round-3">
        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top winner">{{semifinals[0].home_player.name}} 
            <b-form-input type="number" v-model="semifinals[0].home_score" v-on:change="updateScore(0, 'semi')"></b-form-input>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">{{semifinals[0].away_player.name}} 
            <b-form-input type="number" v-model="semifinals[0].away_score" v-on:change="updateScore(0, 'semi')"></b-form-input></li>

        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top ">{{semifinals[1].home_player.name}} 
            <b-form-input type="number" v-model="semifinals[1].home_score" v-on:change="updateScore(1, 'semi')"></b-form-input>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom winner">{{semifinals[1].away_player.name}} 
            <b-form-input type="number" v-model="semifinals[1].away_score" v-on:change="updateScore(1, 'semi')"></b-form-input>
        </li>

        <li class="spacer">&nbsp;</li>
    </ul>
    <ul class="round round-4">
        <li class="spacer">&nbsp;</li>
        
        <li class="game game-top winner">{{final.home}} <b-form-input type="number"></b-form-input></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom ">{{final.away}} <b-form-input type="number"></b-form-input></li>
        
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
        semifinals: [{home_player: {}, away_player: {}, home_score: 0, away_score: 0}, {home_player: {}, away_player: {}, home_score: 0, away_score: 0}],
        final: {home: '', away: ''}
    }
  },
    methods: {
        updateScore(index, type){
            if (type === 'semi'){
                if (TournamentHandler.validateScore(this.semifinals[index])){
                    if (index === 0){
                        if (this.semifinals[index].home_score > this.semifinals[index].away_score){
                            this.final.home = this.semifinals[index].home_player.name;
                     }
                     else{
                         this.final.home = this.semifinals[index].away_player.name;
                     }
                  }
                  else{
                      if (this.semifinals[index].home_score > this.semifinals[index].away_score){
                          this.final.away = this.semifinals[index].home_player.name;
                      }
                      else{
                          this.final.away = this.semifinals[index].away_player.name;
                       }
                   }
             }
            } else{
                if (TournamentHandler.validateScore(this.quarterfinals[index])){
                    let semiIndex = 0;
                    if (index > 1){
                        semiIndex = 1;
                    }

                    if (index % 2 === 0){
                        if (this.quarterfinals[index].home_score > this.quarterfinals[index].away_score){
                            this.semifinals[semiIndex].home_player = this.quarterfinals[index].home_player
                     }
                     else{
                         this.semifinals[semiIndex].home_player = this.quarterfinals[index].away_player
                     }
                    }
                    else{
                        if (this.quarterfinals[index].home_score > this.quarterfinals[index].away_score){
                            this.semifinals[semiIndex].away_player = this.quarterfinals[index].home_player
                     }
                     else{
                         this.semifinals[semiIndex].away_player = this.quarterfinals[index].away_player
                     }
                    }
                }
            }
            
        },
        updateQuarter(index){
            alert(index);
            if (TournamentHandler.validateScore(this.quarterfinals[index])){
                if (index === 0){
                    if (this.semifinals[index].home_score > this.semifinals[index].away_score){
                        this.final.home = this.semifinals[index].home_player.name;
                    }
                    else{
                        this.final.home = this.semifinals[index].away_player.name;
                    }
                }
                else{
                    if (this.semifinals[index].home_score > this.semifinals[index].away_score){
                        this.final.away = this.semifinals[index].home_player.name;
                    }
                    else{
                        this.final.away = this.semifinals[index].away_player.name;
                    }
                }
            }
        }

    },
    mounted() {
        if (TournamentHandler.getFinals().length > 2){
            this.quarterfinals = TournamentHandler.getFinals();
        }
        else{
            this.semifinals = TournamentHandler.getFinals();
        }
        console.log(this.quarterfinals);
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
