import Team from "./Team";
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Daemon from  './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire'

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const characterList = allowedTypes
  const random = Math.floor(Math.random() * characterList.length)
  const levelRandom = Math.floor(Math.random() * maxLevel)
  let character
  if(allowedTypes.find((el)=> el == "Bowman")) {
    switch(random) {
      case 0: return character = new Bowman(levelRandom);
      break;
      case 1: return character = new Magician(levelRandom);
      break
      default: return character = new Swordsman(levelRandom);
    }
  } else {
    switch(random) {
      case 0: return character = new Daemon(levelRandom);
      break;
      case 1: return character = new Vampire(levelRandom);
      break
      default: return character = new Undead(levelRandom);
    }
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const teamArr = []
  for (let i = 0; i <= characterCount; i++) {
    teamArr.push(characterGenerator(allowedTypes, maxLevel))
  }
  let team
  return  team = new Team(teamArr)
}
