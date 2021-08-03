function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    if (salaries[key] && salaries[key] !== Infinity && salaries[key] !== -Infinity && typeof(salaries[key]) === 'number') {
      sum = sum + salaries[key];
    }
  }
  return sum;
}
