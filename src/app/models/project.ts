import { Employe } from "./employe";
import { Task } from "./task";

export class Project {
	_id : number| undefined;
	name: string | undefined;
    startDate : Date | undefined;
	endDate : Date | undefined;
    team : Employe[] | undefined ;
    tasks : string='to do' ;
    projectManager : Employe | undefined ;
    projectManagerData: Employe | undefined ;
	constructor() { }
}