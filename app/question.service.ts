import { Injectable } from '@angular/core';  
import { Observable } from 'rxjs/Observable';

import { Question } from './question';
import { Answer } from './question';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable()
export class QuestionService {

	index = 0;
	questions: Question[] = [];

	constructor(private apiService: ApiService, private authService: AuthService) {
		
	}

	loadQuestions(): Observable<any> {
		return new Observable((observer) => {
			if (this.questions.length) {
				observer.next(true);
				observer.complete();
			} else {
				this.apiService.get('/api/test').subscribe((data) => {
					for (let d of data) {
						this.questions.push(d);
					}
					observer.next(true);
					observer.complete();
					console.log('Questions in service: ' + this.questions);
				});
			}
		});
	}

	getCurrentQuestion() {
		return this.questions[this.index];
	}

	submitEvaluation(): void {
		this.apiService.post('/api/eval', JSON.stringify(this.questions), 
			this.authService.getJWT()).subscribe((data) => {

		});
	}
}
