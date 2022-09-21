import Character from "../Character"

export default class Bowman extends Character {
    constructor(level) {
        super()
        this.health = 50
        this.attack = 25
        this.defence = 25
        this.type = 'bowman'
        this.level = level
    }
}
