const expect = require('expect');

const {Users} = require('./users.js')

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('it should return a new user', () => {
    var user = { id: '234', name: 'Name', room: 'Room' };
    var collection = new Users();
    var resUser = collection.addUser(user.id, user.name, user.room);
    expect(resUser).toExist();
    expect(collection.users[0]).toBe(resUser);
    expect(resUser).toInclude(user);
  });
  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toInclude('Mike');
    expect(userList).toInclude('Julie');
  });
  it('should remove a user', () => {
    var toRemove = users.users[0];
    var removed = users.removeUser(toRemove.id);
    expect(removed.id).toBe(toRemove.id);
    expect(users.users).toNotInclude(toRemove);
    expect(users.users.length).toBe(2);
  });
  it('should not remove a user', () => {
    var removed = users.removeUser(99);
    expect(removed).toNotExist();
    expect(users.users.length).toBe(3);
  });
  it('should return a us.userser', () => {
    var searched = users.users[1];
    var resUser = users.getUser(searched.id);
    expect(resUser).toBe(searched);
  })
});
