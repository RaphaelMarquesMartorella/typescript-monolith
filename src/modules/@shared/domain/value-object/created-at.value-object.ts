import ValueObject from "./value-object.interface";

export default class CreatedAt implements ValueObject {
  private _createdAt: Date;

  constructor(createdAt?: Date) {
    this._createdAt = createdAt || new Date();
  }
  get createdAt(): Date {
    return this._createdAt;
  }
}
