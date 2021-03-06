const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;

class Position extends Schema {
  constructor () {
    super();

    this.x =  20 * Math.random();
    this.y = 15 + 10* Math.random();
    this.z = 10* Math.random();
    this.rot = 0;
  }
  setPosition (obj){
    this.x = obj.x;
    this.y = obj.y;
    this.z = obj.z;
    this.rot = obj.rot;
  }

}
schema.defineTypes(Position, {
  x: "number",
  y: "number",
  z: "number",
  rot: "number"
});


class Action extends Schema {
  constructor () {
    super();
    this._jump = false  ;
    this._turnLeft = false;
    this._turnRight = false;
    this._walk = false;
    this._walkMod = false;
    this._walkback = false;
    this._stepLeft = false,
    this._stepRight = false;
}
  setAction(act){
    this._jump = act._jump;
    this._walk = act._walk;
    this._walkMod = act._walkMod;
    this._walkback = act._walkback;
    this._turnLeft = act._turnLeft;
    this._turnRight = act._turnRight;
  }

  getAction(){
    var obj = {
      _jump: this._jump,
      _turnLeft: this._turnLeft,
      _turnRight: this._turnRight,
      _walk: this._walk,
      _walkMod: this._walkMod,
      _walkback: this._walkback,
      _stepLeft: this._stepLeft,
      _stepRight: this._stepRight,
    }
    return obj;
  }

}
schema.defineTypes(Action, {
  _jump: "boolean",
  _turnLeft: "boolean",
  _turnRight: "boolean",
  _walk: "boolean",
  _walkMod: "boolean",
  _walkback: "boolean",
  _stepLeft: "boolean",
  _stepRight: "boolean"
});


class Player extends Schema {
  constructor () {
    super();
    this.position = new Position();
    this.action = new Action();
    this.name = ""
}
  setPlayerAction(act){
    this.action.setAction(act);
  }
  setPlayerPosition(pos){
    this.position.setPosition(pos);
  }
}
schema.defineTypes(Player, {
    position: Position,
    action: Action,
    name: "string",
  });


class StateHandler extends Schema {
    constructor () {
        super();

        this.players = new MapSchema();
    }
}
schema.defineTypes(StateHandler, {
    players: { map: Player }
});


module.exports = {Position,Action,Player,StateHandler}