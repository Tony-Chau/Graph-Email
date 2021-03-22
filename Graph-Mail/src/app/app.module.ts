import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsComponent } from './page/forms/forms.component';
import { RecordsComponent } from './page/records/records.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: "form", pathMatch: "full"},
      {path: 'form', component: FormsComponent},
      {path: 'records', component: RecordsComponent},
      {path: 'record', redirectTo: "records", pathMatch: "full"},
      {path: 'forms', redirectTo: "form", pathMatch: "full"}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
