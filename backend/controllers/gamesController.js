import { getDB } from "../db/dbConn.js";


export const getGames = async (req,res) => {
    try {
        const {round, group, homeTeam, awayTeam, homeScore, awayScore} = req.query;
        let db = getDB();
        let query = {};
        if (round) query.round = round;
        if (group) query.group = group;
        if (homeTeam) query.homeTeam = homeTeam;
        if (awayTeam) query.awayTeam = awayTeam;
        if (homeScore) query.homeScore = parseInt(homeScore);
        if (awayScore) query.awayScore = parseInt(awayScore);
        if (round === "Knockout") {
            const games = await db.collection("games").find({ round: {$ne: "Group Stage"} }).toArray();
            res.json(games);
            return;
        }
        const games = await db.collection("games").find(query).toArray();     
        res.json(games);
    } catch (err) {
        console.log(err);
    }
}

export const countGames = async (req, res) => {
    console.log("Counting games with query:", req.query);
    try {
        const { round } = req.query;
        let db = getDB();
        let query = {};
        if (round) {
            console.log(round);
            query.round = round;
            if (round === "Knockout") {
                const games = await db.collection("games").countDocuments({ round: { $ne: "Group Stage" } });
                res.json({totalKnockout: games});
                return;
            }
            const totalGames = await db.collection("games").countDocuments(query);
            res.json({totalGroupStage: totalGames});
        } else {
            console.log("No round specified, counting all games");
            const totalGames = await db.collection("games").countDocuments();
            res.json({totalGames: totalGames});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getGameById = async (req, res) => {
    try {
        let db = getDB();
        const { gameId } = req.params;
        const game = await db.collection("games").findOne({ gameId: Number(gameId) });
        res.json(game);
    } catch (err) {
        console.log(err);
    }
}

export const createGame = async (req, res) => {
    try {
        let db = getDB();
        const newGame = req.body;
        newGame.matchNo = Number(newGame.matchNo);
        await db.collection("games").insertOne(newGame);        
        res.json({ message: "Game created successfully" });
    } catch (err) {
        console.log(err);
    }   
}

export const updateGame = async (req, res) => {
    try {
        let db = getDB();
        const gameId  = req.params.matchNo;
        const winner = req.body;
        await db.collection("games").updateOne({ matchNo: Number(gameId) }, { $set: { winner: winner.winner } });
        res.json({ message: "Game updated successfully" });
    } catch (err) {
        console.log(err);
    }
}

export const deleteGame = async (req, res) => {
    console.log("Deleting game with matchNo:", req.params.matchNo);
    try {
        let db = getDB();
        const gameId  = req.params.matchNo;
        await db.collection("games").deleteOne({ matchNo: Number(gameId) });
        res.json({ message: "Game deleted successfully" });
    }
    catch (err) {
        console.log(err);
    }
}