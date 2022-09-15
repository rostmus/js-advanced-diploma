import Character from "../Character"

export default class Bowman extends Character() {
    constructor(level) {
        super(health)
        this.attack = 25
        this.defence = 25
        this.type = 'bowman'
        this.level = level
    }
}
