import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { AnswersComponent } from './pages/answers/answers.component';
import { SurveyComponent } from './pages/survey/survey.component';

const routes: Routes = [
  //{ path:'template',component: TemplateComponent },
  { path:'survey',component: SurveyComponent },
  { path:'answers/:code/:phoneNumber',component: AnswersComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'survey'}


  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
