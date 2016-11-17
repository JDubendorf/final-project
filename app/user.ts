export class User { 

	firstName: string;
	lastName: string;
	username: string;
	password: string;
	email: string;
	mountain: string;
	role: string;
	evaluations: Eval[];

}

export class Eval {
	
	title: string;
	date: string;
	result: number; 

}


