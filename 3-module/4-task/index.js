function showSalary(users, age) {
  let filtredUsers;
  filtredUsers = users.filter(i => i.age <= age);
  let result = '';

  filtredUsers.forEach((element, index) => {
    result = result + `${element.name}, ${element.balance}`
    if (index + 1 < filtredUsers.length) {
      result = result + '\n'
    }
  });
  return result
}
