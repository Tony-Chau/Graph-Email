import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { FormComponent } from './page/form/form.component';
import { RecordsComponent } from './page/records/records.component';
import { InputComponent } from './widget/input/input.component';
import { SplitComponent } from './widget/split/split.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RecordsComponent,
    InputComponent,
    SplitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'form', component: FormComponent},
      {path: 'records', component: RecordsComponent},
      {path: '', redirectTo: "form", pathMatch: "full"},
      {path: 'record', redirectTo: "records", pathMatch: "full"},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
