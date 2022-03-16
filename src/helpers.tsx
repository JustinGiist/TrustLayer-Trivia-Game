import { Record } from "./components/TriviaGame/TriviaGame";
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function compare(a: Record, b: Record) {
  if (a.points < b.points) {
    return 1;
  }
  if (a.points > b.points) {
    return -1;
  }
  return 0;
}
export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export const RecursiveBinarySearch = (
  list: any[],
  target: any,
  field?: string
) => {
  if (list.length === 1) {
    if (field ? list[0][field] === target : list[0] === target) {
      console.log(field ? list[0][field] : list[0]);
      return field ? list[0][field] : list[0];
    } else {
      return console.log("Not found");
    }
  }
  let midpoint = Math.floor(list.length / 2);
  if (field ? list[midpoint][field] === target : list[midpoint] === target) {
    console.log(field ? list[midpoint][field] : list[midpoint]);
    return field ? list[midpoint][field] : list[midpoint];
  }

  if (field ? list[midpoint][field] < target : list[midpoint] < target) {
    RecursiveBinarySearch(list.slice(midpoint + 1, list.length), target, field);
  } else {
    RecursiveBinarySearch(list.slice(0, midpoint), target, field);
  }
};
