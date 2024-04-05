class UserDto {
  _id;
  email;
  name;
  constructor(model) {
    this._id = model._id;
    this.email = model.email;
    this.name = model.name;
  }
}

export default UserDto;
