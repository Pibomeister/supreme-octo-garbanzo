const expect = require('expect');
const {Users} = require('./users.js');

describe('Users', ()=> {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Estupida',
        room: 'Mi Pelo'
      }, {
        id: '2',
        name: 'Eugenia',
        room: 'Culero'
      }, {
        id: '3',
        name: 'Burrito',
        room: 'Mi Pelo'
      }];
  });
  it('should add new user', () =>{
    var users = new Users();
    var user = {id: '123', name: 'Kylo Ren', room: 'Knights of Ren'};
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var user = users.removeUser('1');

    expect(user).toExist();
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var user = users.removeUser('99');

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var user = users.getUser('1');

    expect(user).toExist().toEqual(users.users[0]);
  });

  it('should not find user', () => {
    var user = users.getUser('99');

    expect(user).toNotExist();
  });


  it('should return names for group Mi Pelo', ()=>{
    var userList = users.getUserList('Mi Pelo');
    expect(userList).toEqual(['Estupida', 'Burrito']);
  });

  it('should return names for group Culero', ()=>{
    var userList = users.getUserList('Culero');
    expect(userList).toEqual(['Eugenia']);
  });

});
