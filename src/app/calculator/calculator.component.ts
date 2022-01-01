import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  tabsetIndex = 0;
  yearModel = 20;
  rateModel = 'year';
  firstPaymentModel = 3;
  typeModel = 'A';

  resultList = new Array(40).fill(true).map((v: any, index: number) => {
    const y = (index + 1) * 5;
    return {
      label: `${y}年 （${y * 12}期）`,
      value: y,
    };
  });

  yearList = new Array(6).fill(true).map((v: any, index: number) => {
    const y = (index + 1) * 5;
    return {
      label: `${y}年 （${y * 12}期）`,
      value: y,
    };
  });

  rateList = [
    {
      label: '年化利率',
      value: 'year',
    },
    {
      label: '月利率(厘)',
      value: 'month',
    },
  ];

  firstPaymentList: any[] = new Array(10)
    .fill(true)
    .map((v: any, i: number) => {
      return {
        label: i ? `${i}0% (${i} 成)` : '0',
        value: i,
      };
    });

  provinceChange(value: string): void {
    // this.selectedCity = this.cityData[value][0];
  }

  title = 'calculator';
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      let f = true;
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        } else {
          f = false;
        }
      });

      this.validateForm.validator;
      console.log(f);

      this.tabsetIndex++;
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    //@ts-ignore
    Promise.resolve().then(() =>
      //@ts-ignore
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
      //@ts-ignore
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null],
      year: [null],
      type: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      website1: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
    });
  }
}
