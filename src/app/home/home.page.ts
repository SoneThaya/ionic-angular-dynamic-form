import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import AdvancedJson from '../../assets/advanced_form.json';
import FormJSon from '../../assets/simple_form.json';

export interface Options {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  children?: Array<FormControlObject>;
}

export interface FormControlObject {
  key: string;
  type: string;
  options: Options;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myForm: FormGroup;
  advancedForm = AdvancedJson;
  simpleForm = FormJSon;

  constructor(private fb: FormBuilder, private alertCtrl: AlertController) {
    console.log(this.simpleForm);
    this.myForm = this.fb.group({});

    // Make the API call here
    this.createControls(this.advancedForm);
  }

  createControls(controls: Array<FormControlObject>) {
    for (let control of controls) {
      if (control.type === 'group') {
        const newGroup = new FormGroup({});

        control.options.children.map((child) => {
          const newControl = new FormControl();
          newGroup.addControl(child.key, newControl);
        });
        this.myForm.addControl(control.key, newGroup);
      } else if (control.type === 'array') {
        const newArray = new FormArray([]);

        const oneGroup = new FormGroup({});
        control.options.children.map((child) => {
          oneGroup.addControl(child.key, new FormControl());
        });
        newArray.push(oneGroup);
        this.myForm.addControl(control.key, newArray);
      }
    }
  }

  addArrayGroup(arrayName, objectSchemaChildren) {
    const control = this.getFormArray(arrayName);

    const oneGroup = new FormGroup({});
    objectSchemaChildren.map((child) => {
      oneGroup.addControl(child.key, new FormControl());
    });
    control.push(oneGroup);
  }

  removeArrayGroup(arrayName, index) {
    const control = this.getFormArray(arrayName);
    control.removeAt(index);
  }

  getFormArray(key) {
    return <FormArray>this.myForm.controls[key];
  }

  // simple form
  // createControls(controls: Array<FormControlObject>) {
  //   for (let control of controls) {
  //     const newFormControl = new FormControl();

  //     if (control.options.required) {
  //       newFormControl.setValidators(Validators.required);
  //     }

  //     this.myForm.addControl(control.key, newFormControl);
  //   }
  //   console.log('My form: ', this.myForm);
  // }

  async submitForm() {
    const alert = await this.alertCtrl.create({
      header: 'Your Form',
      message: JSON.stringify(this.myForm.value),
      buttons: ['OK'],
    });

    alert.present();
  }
}
