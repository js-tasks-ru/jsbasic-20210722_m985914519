function makeFriendsList(friends) {
  let listFriends = '';
  friends.forEach(element => {
    listFriends += `<li>${element.firstName} ${element.lastName}</li>`;
  });
  console.log(listFriends)
  let ul = document.createElement('ul');
  ul.innerHTML = listFriends;
  return ul;
}
