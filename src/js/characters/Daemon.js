import Character from "../Character"

export default class Daemon extends Character {
    constructor(level) {
        super()
        this.health = 50
        this.attack = 10
        this.defence = 10
        this.type = 'daemon'
        this.level = level
    }
}
