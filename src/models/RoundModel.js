
class RoundModel {
    
    constructor(_id) {

        this._id = _id || null;
        
        this.course = {
            fairways: []
        };
        this.players = [];
        
        //this.fairwayScores = [];

        this.scores = {};
    }

    initScores() {

        if(this.players && this.course) {

            this.players.forEach((player) => {
                this.scores[player._id] = {};
                // For each player, store each fairway throw count and ob as it's own object,
                // and par value for convenience
                this.course.fairways.forEach((fairway) => {
                    this.scores[player._id][fairway.order] = {
                        throwCount: null,
                        ob: false,
                        par: fairway.par
                    };
                })
                // Also store the inital total throw count
                this.scores[player._id].totalThrowCount = 0;
                // .. total difference to played fairways total par
                this.scores[player._id].diffToPlayedFairwaysPar = null;
                // ...and the player(user) name for convenience
                this.scores[player._id].userName = player.username;
            });
        }
    }

    toSchema() {

        let players = this.players.map((player) => { return player._id });

        return {
            _id: this._id,
            courseId: this.course._id,
            players: players,
            scores: this.scores
        }
    }
    
    

}

export default RoundModel;