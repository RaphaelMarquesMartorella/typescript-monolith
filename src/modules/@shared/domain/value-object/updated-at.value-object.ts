import ValueObject from "./value-object.interface";

export default class UpdatedAt implements ValueObject {
  private _updatedAt: Date;

  constructor(updatedAt?: Date) {
    this._updatedAt = updatedAt || new Date();
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
}
