import Character from "../Character"

export default class Undead extends Character {
    constructor(level) {
        super()
        this.health = 50
        this.attack = 40
        this.defence = 10
        this.type = 'undead'
        this.level = level
    }
}
