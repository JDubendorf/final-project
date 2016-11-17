import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';

import { User } from './user';

@Component({
	moduleId: module.id,
	selector: 'my-login',
	templateUrl: '../app/login.component.html'

})

export class LoginComponent implements OnInit {

	constructor (private authService: AuthService, 
		private apiService: ApiService, 
		private router: Router) {}

	error: string = '';
	userLogin = { username: '', password: ''};

	user: User = {
		firstName: '',
		lastName: '',
		username: '',
		password: '',
		email: '',
		mountain: 'default',
		role: 'learner',
		evaluations: []
	};

	ngOnInit(): void {

	}

	submitLogin() {
		if (this.userLogin.username.length === 0) {
			this.error = 'username cannot be empty';
		} else {
			this.authService.userLogin(this.userLogin.username, this.userLogin.password).subscribe((res) => {
				console.log('user auth', res);
				if (res.status === 'success') {
					console.log('uss success');
					this.router.navigate(['/video']);
				} else {
					console.log('failship enterfail');
				}
			});
		}
	}

	addUser() {
		this.apiService.post('/user/register', this.user, this.authService.getJWT()).subscribe((res) => {
			if (res.status === 'success') {
				this.authService.user = res.user;
				this.router.navigate(['/video']);
			} else {
				this.error = res.message;
			}
		});
	}

}

