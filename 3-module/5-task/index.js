function getMinMax(str) {
  let min = 0;
  let max = 0;
  let arr = str.split(' ').map(i => i = +i).filter(i => i);
  arr.forEach(i => {
    min = i < min ? i : min;
    max = i > max ? i : max;
  }
  )
  return {min: min, max: max}
}
