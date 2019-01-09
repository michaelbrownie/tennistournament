export default {
    players: [],
    poules: [],

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
      for (let i = 0; i < this.players.length; i++){
        poule.players.push(this.players[i]);
        
        // Add poule to array if it has enough players
        if (poule.players.length === playersCount){
          let clone = JSON.parse(JSON.stringify(poule));
          this.poules.push(clone);

          // Reset poule object
          pouleID++;
          poule = {id: pouleID, players: [], matches: []}
        }
      }

      // Set matches
      let matchID = 1;
      let match = {id: matchID, home_id: 0, home_name: '', home_score: 0, away_id: 0, away_name: '', away_score: 0}
      for (let i = 0; i < this.poules.length; i++){
        for (let j = 0; j < this.poules[i].players.length - 1; j++){
          for (let k = j + 1; k < this.poules[i].players.length; k++){
            match.home_id = this.poules[i].players[j].id;
            match.home_name = this.poules[i].players[j].name;
            match.away_id = this.poules[i].players[k].id;
            match.away_name = this.poules[i].players[k].name;
            
            // Add match to poule
            let clone = JSON.parse(JSON.stringify(match));
            this.poules[i].matches.push(clone);

            // Reset match object
            matchID++;
            match = {id: matchID, home_id: 0, home_name: '', home_score: 0, away_id: 0, away_name: '', away_score: 0}
          }
        }
      }

      // Save players & poules in localstorage
      localStorage.setItem('players', JSON.stringify(this.players));
      localStorage.setItem('poules', JSON.stringify(this.poules));

      // Go to poule page
      location.href = '/poule';
    }
  }