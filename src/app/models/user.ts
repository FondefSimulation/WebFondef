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

export class Event{
  constructor(
    public event: string,
    public type: string,
    public identifier: string,
    public value: number,
    public time: number,
    public probability: number,
    public depEvents: number,
    public depAct: number,
    public desc: string
  ){}
}

export class Script{
  constructor(
    public name: string,
    public time: number,
    public stage: string
  ){}
}
