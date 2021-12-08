import { RdDeserializable } from '../../interfaces/deserializable/rd-deserializable';

export class RdLogin {
    email: string;
    password: string;
    public loginDetail: RdLogin[];
    constructor(input: any) {
        Object.assign(this, input);
        return this;
    }
    // RdDeserializable(input: any): this {
    //     // Iterate over all cars for our user and map them to a proper `Car` model
    //     this.loginDetail = input.map(loginDetail => new RdLogin().RdDeserializable(loginDetail));
    //     return this;
    // }

}
