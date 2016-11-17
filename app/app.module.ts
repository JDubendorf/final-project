import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { QuestionService } from './question.service';
import { UserService } from './user.service';
import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { VideoComponent } from './video.component';
import { QuestionsComponent } from './questions.component';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar.component';


@NgModule({
	imports: [ 
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot([
			{
				path: 'questions',
				canActivate: [AuthService],
				component: QuestionsComponent
			},
			{
				path: 'dashboard',
				canActivate: [AuthService],
				component: DashboardComponent
			},
			{
				path: 'video',
				canActivate: [AuthService],
				component: VideoComponent
			},
			{
				path: '',
				redirectTo: '/login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent
			}
		])
	],
	declarations: [ 
		AppComponent,
		QuestionsComponent,
		DashboardComponent,
		VideoComponent,
		LoginComponent,
		NavbarComponent
	],
	providers: [
		QuestionService,
		UserService,
		ApiService,
		AuthService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule { 

}
