import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { AnswersComponent } from './pages/answers/answers.component';

const routes: Routes = [
  { path:'template',component: TemplateComponent },
  { path:'answers',component: AnswersComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'template'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
