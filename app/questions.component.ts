import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { Answer } from './question';
import { Eval } from './user';
import { QuestionService } from './question.service';

@Component({

	moduleId: module.id,
	selector: 'my-questions',
	templateUrl: '../app/questions.component.html'

})

export class QuestionsComponent implements OnInit {

	constructor(private questionService: QuestionService) { }

	question: Question;				// active question
	questionShow: boolean = true;	// *ngIf cancelled after last question
	selected: Answer;				// active selection
	selectedYes: boolean = true;	// an option has been selected, enabling submit
	index: number = 0;				// index for text array
	score: number = 0;
	scorePercent: number = 0;	
	totalPoints: number = 0;
	submitted: boolean = false;		// disable answer buttons when true
	feedback: string = '';
	errorMessage: string;
	docReady: boolean = false;			// *ngIf waits for server data
	incorrectAnswer: boolean = false;	// switch for color of response div
	correctAnswer: boolean = false;		// switch for color of response div

	// evaluation: Eval = [ {title: 'Lift Attendant Training Program', date:  }];

	ngOnInit(): void { 
		this.questionService.loadQuestions().subscribe(() => {
			this.question = this.questionService.getCurrentQuestion();
			// setTimeout(() => this.docReady = true, 0);
			this.docReady = true;
		});
	}

	selectAnswer(answer) {
		if (this.submitted) {
			return;
		}
		this.selected = answer;
		this.selectedYes = false;
	}

	submitAnswer() {
		if (this.submitted) {
			return;
		}

		this.submitted = true;

		if (this.selected.status === true) {
			this.correctAnswer = true;
			this.score = this.score + this.question.points;
			this.totalPoints = this.totalPoints + this.question.points;
			var num = (this.score / this.totalPoints) * 100;
			this.scorePercent = Math.round(num);
			this.feedback = this.question.resCorrect;
		};

		if (this.selected.status === false) {
			this.incorrectAnswer = true;
			this.totalPoints = this.totalPoints + this.question.points;
			var num = (this.score / this.totalPoints) * 100;
			this.scorePercent = Math.round(num);
			this.feedback = this.question.resIncorrect;

		}; 
	}

	nextQuestion() {
		this.submitted = false;
		this.selectedYes = true;
		this.correctAnswer = false;
		this.incorrectAnswer = false;
		let questionArray = this.questionService.questions;
		this.index = this.questionService.index;
		
		if (questionArray[this.index + 1] === undefined) {
			this.questionService.submitEvaluation();
			return this.questionShow = false;
		}
		
		this.questionService.index++;
		this.question = this.questionService.getCurrentQuestion();
	}

}
