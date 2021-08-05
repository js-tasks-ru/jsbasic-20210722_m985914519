function camelize(str) {
  let arr;
  arr = str.split('-')
  for (let i = 1; i < arr.length; i++) {
    let str = arr[i];
    arr[i] = str[0].toUpperCase() + str.slice(1)
  }
  return arr.join('');
}
