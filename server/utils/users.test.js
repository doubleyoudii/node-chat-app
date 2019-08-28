const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();

    users.users = [{
      id: '1',
      name: 'William',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Kate',
      room: 'React Course'
    },{
      id: '3',
      name: 'Katie',
      room: 'Node Course'
    }];
  });

  it('should add new User', ()=> {
    var users = new Users();
    var user = {
      id: 123,
      name: 'kuyawill',
      room: 'tags'
    };

    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });


  it('should remover user', () => {
    // var delUser = users.removeUser(1);
    // expect(delUser).toNotBe(-1);
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '7';
    var user = users.removeUser(userId);

    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find specific user', () => {
    var userId = '3';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find specific user', () => {
    var userId = '7';
    var user = users.getUser(userId);

    expect(user).toBe(undefined);
  });

  it('should get users list', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['William', 'Katie']);
  })
});