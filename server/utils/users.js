class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var removed = this.getUser(id);
    if (removed) {
      this.users = this.users.filter((user) => user != removed);
    }
    return removed;
  }
  getUser (id) {
    var find = this.users.filter((i) => i.id === id);
    if (find.length == 1) {
      return find[0];
    } else {
      return null;
    }
  }
  getUserList (room) {
    var roomUsers = this.users.filter((user) => user.room === room);
    var namesArray = roomUsers.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};
