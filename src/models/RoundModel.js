
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