import { Employe } from "./employe";
import { stat } from "./task.enum";

export class Task {
	_id : number| undefined;
	name: string | undefined;
    deadline : string| undefined;
	owner : Employe[] = [];
    status : stat[]  ;
    constructor() { }
}
