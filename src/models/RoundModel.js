
class RoundModel {
    
    constructor(_id) {

        this.id = _id || null;
        
        this.course = null;
        this.players = null;
        this.fairwayScores = [];
    }

    toJSON() {
        return {
            course: this.course,
            players: this.players,
            fairwayScores: this.fairwayScores
        };
    }
}

export default RoundModel;