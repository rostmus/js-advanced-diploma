import GamePlay from "./GamePlay";
import { generateTeam } from "./generators";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import themes from "./themes";


export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.generate = []
    this.playerTeam = ['Bowman', 'Magician', "Swordsman"];
    this.rivalTeam = ['Undead', 'Vampire', 'Daemon']
    this.cellNumber = 64;
  }
  /*
*генерация моей команды
**/
  generateMyTeam() {
    const team = generateTeam(this.playerTeam, 3, 3);
    let numberArr = [];
    for (let i = 0; i < 64; i++) {
      if (i % 8 === 0) {
        numberArr.push(i);
        numberArr.push(i + 1);
      }
    }
    for (let i = 0; i < team.characters.length; i++) {
      const generatePosition = numberArr[Math.floor(Math.random() * numberArr.length)];
      const positionCharacter = new PositionedCharacter(team.characters[i], generatePosition);
      this.generate.push(positionCharacter);
    }
    this.team = team;
  }
  /*
*генерация команды противника
**/

  generateRivalTeam() {
    const rivalTeam = generateTeam(this.rivalTeam, 3, 3)
    let numberArr = [];
    for(let i = 0; i < 64; i++) {
      if(i % 8 === 0) {
        numberArr.push(i - 1)
        numberArr.push(i - 2)
      }
    }
    for (let i = 0; i < this.team.characters.length; i++) {
      const generatePosition = numberArr[Math.floor(Math.random() * numberArr.length)];
      const positionCharacter = new PositionedCharacter(rivalTeam.characters[i], generatePosition);
      this.generate.push(positionCharacter);
    }
    // this.team.characters.push(rivalTeam.characters)
    rivalTeam.characters.forEach((el)=> {
      this.team.characters.push(el)
    })
  }
  /*
  *инициализация
  **/
  init() {
    this.gamePlay.drawUi(themes.random());
    this.generateMyTeam();
    this.generateRivalTeam();
    this.gamePlay.redrawPositions(this.generate);
    this.cellEnter();
    this.cellLeave();
    this.cellClick()
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  cellEnter() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
  }

  cellLeave() {
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
  }

  cellClick() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    let flag = true
    const cell = this.gamePlay.cells[index]
    for(let i = 0; i < this.cellNumber; i++) {
      this.gamePlay.deselectCell(i)
    }
    this.playerTeam.forEach((el)=> {
      if(cell.querySelector('.character').className.split(/\s+/)[1] == el.toLowerCase()) {
        this.gamePlay.selectCell(index)
      }
    })
    // GamePlay.showError('Первым ходит игрок!')
    // TODO: react to click
  }

  onCellEnter(index) {
    const cell = this.gamePlay.cells[index];
    if (cell.querySelector('.character')) {
      const characterCell = cell.querySelector('.character').className.split(/\s+/)[1];
      this.team.characters.forEach((el) => {
        if (characterCell == el.type) {
          const title = `&#127894: ${el.level} &#9876:${el.attack} &#128737:${el.defence} &#10084:${el.health}`;
          this.gamePlay.showCellTooltip(title, index);
          this.showMessage(cell, this.gamePlay.cells[index].title);
        }
      })
    }
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    const cell = this.gamePlay.cells[index];
    if (cell.querySelector('.character')) {
      this.hiddenMessage(cell);
    }
    // TODO: react to mouse leave
  }
  /*
  *показывает характеристики
  **/
  showMessage(element, string) {
    const newElement = `<div class="cell__message">${string}</div>`
    element.insertAdjacentHTML('beforeend', newElement);
  }
  /*
  *скрывает характеристики
  **/
  hiddenMessage(element) {
    const list = element.querySelectorAll('.cell__message');
    list.forEach((el) => {
      el.remove();
    })
  }
}
