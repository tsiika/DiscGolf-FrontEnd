
class RoundModel {
    
    constructor(_id) {

        this.id = _id || null;
        
        this.course = {
            fairways: []
        };
        this.players = [];
        
        //this.fairwayScores = [];

        this.scores = {};
    }
    
}

export default RoundModel;