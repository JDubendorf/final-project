export class Question {

	questionType: string;
	index: number;
	points: number;
	query: string;
	answers: Answer[];
	resCorrect: string;
	resIncorrect: string;
	mountain: string;

}

export class Answer {
  
	option: string;
	status: boolean;
	index: number;

}

