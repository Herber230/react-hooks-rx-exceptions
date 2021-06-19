export type ExceptionType = 'RequestException' | 'Unknown';

export class Exception {
  _originalException: any;
  _type: ExceptionType = 'Unknown';

  get originalException() {
    return this._originalException;
  }
  set originalException(value) {
    this._originalException = value;
  }
  setOriginalException(value: any) {
    this._originalException = value;
    return this;
  }

  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }
  setType(value: ExceptionType) {
    this._type = value;
    return this;
  }
}
