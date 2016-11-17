import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './user';
import { ApiService } from './api.service';

@Injectable()
export class UserService {

	constructor(private apiService: ApiService) {
		
	}
	
}
