import { Component, OnInit } from '@angular/core'; 

import { AuthService } from './auth.service';
import { User } from './user';

@Component({

	moduleId: module.id,
	selector: 'my-navbar',
	templateUrl: '../app/navbar.component.html'
	
})

export class NavbarComponent implements OnInit {
	
	constructor(private authService: AuthService) { }
	
	private user: User;

	ngOnInit() {
		this.user = this.authService.user;
		this.authService.getUserFromServer();
	}
}
