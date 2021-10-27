export class AplicationException extends Error {
  constructor(message: string = "An unexpected error ocurred.") {
    super(message); //sobrecarga de clase
  }
}
