export class User{
  constructor(
    public _id: string,
    public name: string,
    public lastname: string,
    public email: string,
    public password,
    public role: string
  ){}
}

export class Session{
  constructor(
    public nameSession: string,
    public typeSession: string,
    public scriptSession: string,
    public profileSession: string,
    public cascadeEffectSession: number
  ){}
}
