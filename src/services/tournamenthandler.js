export default {
    players: [],
    poules: [],
    finals: [],

    generatePoules(players){
      this.players = players;

      // Reset items localstorage
      localStorage.removeItem('players');
      localStorage.removeItem('poules');

        // Set amount of players per poule
      let playersCount = 3;
      if (this.players.length === 8 || this.players.length === 16){
        playersCount = 4;
      }
      
      // Fill poule with players
      let pouleID = 1
      let poule = {id: pouleID, players: [], matches: []}
      let poule_index = 0;
      for (let i = 0; i < this.players.length; i++){
        this.players[i].poule_index = poule_index;
        poule.players.push(this.players[i]);
        poule_index++;
        
        // Add poule to array if it has enough players
        if (poule.players.length === playersCount){
          let clone = JSON.parse(JSON.stringify(poule));
          this.poules.push(clone);

          // Reset poule object
          pouleID++;
          poule_index = 0;
          poule = {id: pouleID, players: [], matches: []}
        }
      }

      // Set matches
      let matchID = 1;
      let match = {id: matchID, home_player: {}, home_score: 0, away_player: {}, away_score: 0, winner: {}}
      for (let i = 0; i < this.poules.length; i++){
        for (let j = 0; j < this.poules[i].players.length - 1; j++){
          for (let k = j + 1; k < this.poules[i].players.length; k++){
            match.home_player = this.poules[i].players[j];
            match.away_player = this.poules[i].players[k];
            
            // Add match to poule
            let clone = JSON.parse(JSON.stringify(match));
            this.poules[i].matches.push(clone);

            // Reset match object
            matchID++;
            match = {id: matchID, home_player: {}, home_score: 0, away_player: {}, away_score: 0, winner: {}}
          }
        }
      }

      // Save poules in localstorage
      localStorage.setItem('poules', JSON.stringify(this.poules));

      // Go to poule page
      location.href = '/poule';
    },
    getPoules(){
      this.poules = JSON.parse(localStorage.getItem('poules'));
      return this.poules;
    },
    validateScore(match){
      // Home wins
      if (parseInt(match.home_score) === 6 && parseInt(match.away_score) < 5 || 
      parseInt(match.home_score) === 7 && parseInt(match.away_score) === 5){
          return true;
      }

      // Away wins
      if (parseInt(match.home_score) < 5 && parseInt(match.away_score) === 6 || 
      parseInt(match.home_score) === 5 && parseInt(match.away_score) === 7){
          return true;
      }
      return false;
    },
    updatePoules(poules){
      localStorage.setItem('poules', JSON.stringify(poules));
      this.poules = poules;
    },
    allMatchesFinished(poules){
      for (var i = 0; i < poules.length; i++){
        for (var j = 0; j < poules[i].matches.length; j++){
          if (poules[i].matches[j].winner.id === undefined){
            return false;
          }
        }
      }
      return true;
    },
    generateFinals(){
      // Loop through all poules
      for (var i = 0; i < this.poules.length; i++){
        // Compare points to set no 1 & no 2
        this.poules[i].players.sort(function(a,b){ return b.points - a.points});
      }

      if (this.poules.length === 4){
        // Quarter finals
        this.finals.push({home_player: this.poules[0].players[0], away_player: this.poules[1].players[1], home_score: 0, away_score: 0});
        this.finals.push({home_player: this.poules[0].players[1], away_player: this.poules[1].players[0], home_score: 0, away_score: 0});

        this.finals.push({home_player: this.poules[2].players[0], away_player: this.poules[3].players[1], home_score: 0, away_score: 0});
        this.finals.push({home_player: this.poules[2].players[1], away_player: this.poules[3].players[0], home_score: 0, away_score: 0});
      }
      else{
        // Half finals
        this.finals.push({home_player: this.poules[0].players[0], away_player: this.poules[1].players[1], home_score: 0, away_score: 0});
        this.finals.push({home_player: this.poules[0].players[1], away_player: this.poules[1].players[0], home_score: 0, away_score: 0});
      }

      // Set finals
      localStorage.setItem('finals', JSON.stringify(this.finals));

      // Go to knockout page
      location.href = '/knockout';
    },
    getFinals(){
      this.finals = JSON.parse(localStorage.getItem('finals'));
      return this.finals;
    }
  }