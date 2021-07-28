function factorial(n) {
  if (n < 0) {
    return;
  } else if (n === 0 || n === 1) {
    return 1;
  } else {
    let sum = 1;
    while (n > 1) {
      sum = sum * n
      n--;
    }
    return sum
  }
}
