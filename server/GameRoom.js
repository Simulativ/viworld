const { Room, Client } = require("colyseus");

var { StateHandler, Player } = require("./StateHandler");

class GameRoom extends Room {
    maxClients = 8;

    onCreate (options) {
        // this.setSimulationInterval(() => this.onUpdate());
        this.setState(new StateHandler());

        this.onMessage("motion", (client, message) => {
            this.state.players.get(client.sessionId).setPlayerPosition(message);
        });
        this.onMessage("action", (client, message) => {
            this.state.players.get(client.sessionId).setPlayerAction(message);
        });
    }

    onJoin (client,options) {
        const player = new Player();
        player.name = options.name;
        // console.log(`Player ${options.name} joined on the server`);
        this.broadcast("online", `${options.name} joined on the server`);
        this.state.players.set(client.sessionId, player);
    }

    // onUpdate () {
    //     this.state.players.forEach((player, sessionId) => {
    //         player.position.x += player.pressedKeys.x * 0.1;
    //         player.position.z -= player.pressedKeys.y * 0.1;
    //     });
    // }

    onLeave (client) {
        // console.log(`${this.state.players[client.sessionId].name} has left the game`)
        this.broadcast("online", `${this.state.players[client.sessionId].name} has left the game`);
        this.state.players.delete(client.sessionId);
    }

    onDispose () {
    }

}


module.exports = {GameRoom}