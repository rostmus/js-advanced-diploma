import Character from "../Character"

export default class Swordsman extends Character {
    constructor(level) {
        super()
        this.health = 50
        this.attack = 40
        this.defence = 25
        this.type = 'swordsman'
        this.level = level
    }
}
