import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';
import { HttpClientModule } from '@angular/common/http';

import { JsonFormComponent } from '../components/json-form/json-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TestPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [TestPage, JsonFormComponent],
})
export class TestPageModule {}
