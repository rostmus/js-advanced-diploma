import Team from "./Team";
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman'

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
  switch(random) {
    case 0: return character = new Bowman(levelRandom);
    case 1: return character = new Magician(levelRandom);
    default: return character = new Swordsman(levelRandom);
      break;
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
