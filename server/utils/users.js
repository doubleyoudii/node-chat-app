class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    //remove user

    var delUser = this.users.filter((el) => el.id === id)[0];
    // var delIndex = this.users.indexOf(delUser);

    if (delUser) {
      // this.users.splice(delindex, 1);
      this.users = this.users.filter((el) => el.id !== id);
    }

    return delUser;
  }

  getUser (id) {
    //get User
    // var hiUser = this.users.filter((el) => el.id === id);


    return this.users.filter((el) => el.id === id)[0];
  }

  getUserList (room) {
    //get user Lists
    var users = this.users.filter((el) => el.room === room);

    var namesArray = users.map((el) => el.name);

    return namesArray;
  }


}



module.exports = {Users};