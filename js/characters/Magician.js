import Character from "../Character"

export default class Magician extends Character {
    constructor(level) {
        super()
        this.health = 50
        this.attack = 10
        this.defence = 40
        this.type = 'magician'
        this.level = level
    }
}
