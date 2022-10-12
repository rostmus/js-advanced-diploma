import GamePlay from "./GamePlay";
import { generateTeam } from "./generators";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import themes from "./themes";
import cursors from "./cursors";


export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.positionArr = []
    this.generate = []
    this.playerTeam = ['Bowman', 'Magician', "Swordsman"];
    this.rivalTeam = ['Undead', 'Vampire', 'Daemon']
    this.cellNumber = 64;
    this.flag = false
    this.borderCellRed = '<div class="cell__border-red"></div>'
    this.borderCellGreen = '<div class="cell__border-green"></div>'
    this.indexWell = [1, 9, 8, 7]
    this.wellMap = []
    this.attackMap = []
    this.characterMovArr = {}

  }
  /*
*генерация неповторяющихся позиций
**/
  generatePosition(arr) {
    let set = new Set();
    for (let i = 0; i < 10; i++) {
      let random = arr[Math.floor(Math.random() * arr.length)]
      set.add(random)
      if (set.size === 4) {
        break
      }
    }
    for (let key of set) {
      this.positionArr.push(key)
    }
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
    this.generatePosition(numberArr)
    for (let i = 0; i < team.characters.length; i++) {
      const generatePosition = this.positionArr[i];
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
    for (let i = 0; i < 64; i++) {
      if (i % 8 === 0) {
        numberArr.push(i - 1)
        numberArr.push(i - 2)
      }
    }
    this.generatePosition(numberArr)
    for (let i = 0; i < this.team.characters.length; i++) {
      const generatePosition = numberArr[Math.floor(Math.random() * numberArr.length)];
      const positionCharacter = new PositionedCharacter(rivalTeam.characters[i], generatePosition);
      this.generate.push(positionCharacter);
    }
    // this.team.characters.push(rivalTeam.characters)
    rivalTeam.characters.forEach((el) => {
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
  }
  /*
*поле магов и демонов
**/
  initMapMagDem(map) {
    for (let i = 0; i < this.indexWell.length; i++) {
      map.push(this.index + this.indexWell[i])
      map.push(this.index - this.indexWell[i])
    }
  }
  /*
*поле лучников и вампиров
**/
  initMapBowVam(map) {
    for (let i = 0; i < this.indexWell.length; i++) {
      map.push(this.index + this.indexWell[i])
      map.push(this.index - this.indexWell[i])
      map.push(this.index + this.indexWell[i] * 2)
      map.push(this.index - this.indexWell[i] * 2)
    }
  }
  /*
*поле мечников и зомби
**/
  initMapSwoUnd(map) {
    for (let i = 0; i < this.indexWell.length; i++) {
      map.push(this.index + this.indexWell[i])
      map.push(this.index - this.indexWell[i])
      map.push(this.index + this.indexWell[i] * 2)
      map.push(this.index - this.indexWell[i] * 2)
      map.push(this.index + this.indexWell[i] * 3)
      map.push(this.index - this.indexWell[i] * 3)
      map.push(this.index + this.indexWell[i] * 4)
      map.push(this.index - this.indexWell[i] * 4)
    }
  }
  /*
  *инициализация входа в клетку
  **/
  cellEnter() {
    if (this.flag === false) {
      this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    }
  }
  /*
  *инициализация выхода в клетку
  **/
  cellLeave() {
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
  }
  /*
  *инициализация нажатия на клетку
  **/
  cellClick() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }
  /*
  *обработчик нажатия
  **/
  onCellClick(index) {
    const cell = this.gamePlay.cells[index]
    this.flag = false
    for (let i = 0; i < this.cellNumber; i++) {
      this.gamePlay.deselectCell(i)
    }
    this.playerTeam.forEach((el) => {
      if (cell.querySelector('.character') && cell.querySelector('.character').className.split(/\s+/)[1] == el.toLowerCase()) {
        let character = cell.querySelector('.character').className.split(/\s+/)[1]
        this.gamePlay.selectCell(index)
        this.flag = true
        this.index = index
        this.wellMap = []
        this.characterMovArr.index = index
        this.characterMovArr.element = cell.querySelector('.character')
        console.log(this.characterMovArr)
        if (character === 'magician' || character === 'daemon') {
          this.initMapMagDem(this.wellMap);
          this.initMapSwoUnd(this.attackMap)
        }
        if (character === 'bowman' || character === 'vampire') {
          this.initMapBowVam(this.wellMap)
          this.initMapBowVam(this.attackMap)
        }
        if (character === 'swordsman' || character === 'undead') {
          this.initMapSwoUnd(this.wellMap)
          this.initMapMagDem(this.attackMap)
        }
      }
    })
  }
  /*
  *обработчик входа в клетку
  **/
  onCellEnter(index) {
    const cell = this.gamePlay.cells[index];
    let characterCell
    if (cell.querySelector('.character')) {
      characterCell = cell.querySelector('.character').className.split(/\s+/)[1];
      this.team.characters.forEach((el) => {
        if (characterCell == el.type) {
          const title = `&#127894: ${el.level} &#9876:${el.attack} &#128737:${el.defence} &#10084:${el.health}`;
          this.gamePlay.showCellTooltip(title, index);
          this.showMessage(cell, this.gamePlay.cells[index].title);
        }
      })
    }
    if (this.flag) {
      this.rivalTeam.forEach((el) => {
        if (el.toLowerCase() == characterCell) {
          this.attackMap.forEach((el) => {
            if (el === index && !cell.querySelector('.character')) {
              cell.style.cursor = cursors.crosshair
              cell.insertAdjacentHTML('beforeEnd', this.borderCellRed)
            }
          })
        }
      })
      this.wellMap.forEach((el) => {
        if (el === index && !cell.querySelector('.character')) {
          cell.insertAdjacentHTML('beforeEnd', this.borderCellGreen)
          this.movement(index)
        }
      })
    }
  }
  /*
  *обработчик выхода в клетку
  **/
  onCellLeave(index) {
    const cell = this.gamePlay.cells[index];
    if (cell.querySelector('.character')) {
      this.hiddenMessage(cell);
    }
    if (cell.querySelector('.cell__border-red')) {
      cell.querySelector('.cell__border-red').remove()
    }
    if (cell.querySelector('.cell__border-green')) {
      cell.querySelector('.cell__border-green').remove()
    }
  }

  /*
  *показывает характеристики
  **/
  showMessage(element, string) {
    const newElement = `<div class="cell__message">${string}</div>`
    element.insertAdjacentHTML('beforeEnd', newElement);
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
  
  movement(index) {
    const cell = this.gamePlay.cells[index];
    const cellOld = this.gamePlay.cells[this.characterMovArr.index]
    cell.addEventListener('dbclick', () => {
      cellOld.removeChild(this.characterMovArr.element)
    })
  }
}
