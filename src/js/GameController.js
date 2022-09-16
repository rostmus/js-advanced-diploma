import GamePlay from "./GamePlay";
import { generateTeam } from "./generators";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import themes from "./themes";


export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    /*
    *генерация карты
    **/
    this.gamePlay.drawUi(themes.random());
    const team = generateTeam(['Bowman', 'Magician', "Swordsman"], 4, 3)
    let generate = []
    let numberArr = []
    for (let i = 0; i < 64; i ++) {
      if(i % 8 === 0) {
        numberArr.push(i)
        numberArr.push(i+1)
      }
    }
    for (let i = 0; i < team.characters.length; i++) {
      const generatePosition = numberArr[Math.floor(Math.random() * numberArr.length)]
      const positionCharacter = new PositionedCharacter(team.characters[i], generatePosition)
      generate.push(positionCharacter)
    }
    this.gamePlay.redrawPositions(generate)
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    this.gamePlay(this.onCellEnter)
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
