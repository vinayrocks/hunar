export class RdEvent {
  Id:Number=0;
  EventName: String='';
  EventDescription:String='';
  EventMedia: String='';
  EventSkill:String='';
  EventCategory:String='';
  UserId:Number=0;
  Email:String='';
  FirstName:String='';
  EventStatus:Number=1;
  EventStatusDate:Date=new Date();
  public rdRadian: RdEvent[];
  constructor(input: any){
    Object.assign(this, input);
    return this;
  }
}
