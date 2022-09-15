import Character from "../Character"

export default class Magician extends Character() {
    constructor(level) {
        super(health)
        this.attack = 10
        this.defence = 40
        this.type = 'magician'
        this.level = level
    }
}
