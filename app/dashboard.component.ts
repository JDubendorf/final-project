import { Component, OnInit } from '@angular/core'; 
import { Question } from './question';
import { QuestionService } from './question.service';

@Component({

	moduleId: module.id,
	selector: 'my-dashboard',
	templateUrl: '../app/dashboard.component.html'
	
})

export class DashboardComponent implements OnInit {

	constructor(private questionService: QuestionService) { }

	questions = [];

	getQuestions(): void {
    	this.questions = this.questionService.questions;
  	}

	ngOnInit(): void {
    	this.getQuestions();
  	}

}
