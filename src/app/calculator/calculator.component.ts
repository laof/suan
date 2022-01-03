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
  yearModel = 20;
  rateModel = 'year';
  firstPaymentModel = 3;
  typeModel = 'A';

  tabsetIndex = 0;
  borrowTotal = 0;

  data = {
    total: 0,
    interest: 0,
    months: 0,
  };

  monthsList: string[] = [];

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

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  month() {
    try {
      return this.validateForm.value.return === 'A';
    } catch (e) {
      return false;
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      total: [null, [Validators.required]],
      firstPayment: [null],
      rateType: [null],
      rate: [null, [Validators.required]],
      time: [null],
      return: [null],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const time = this.validateForm.value.time;
      const interest =
        this.borrowTotal * (this.validateForm.value.rate / 100) * time;
      this.data.total = interest + this.borrowTotal;
      this.data.interest = interest;
      // @ts-ignore

      if (this.validateForm.value.return === 'A') {
        this.data.months = (this.data.total / (12 * time)) * 10000;
      } else {
        this.monthsList = new Array(12 * time)
          .fill(true)
          .map((item: any, i: number) => {
            return `第${i + 1}期，---`;
          });
      }

      this.tabsetIndex++;
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  back() {
    this.tabsetIndex--;
  }

  updateBorrowTotal(): void {
    const total = this.validateForm.get('total')?.value;
    const first = this.validateForm.get('firstPayment');
    this.borrowTotal = total - total * (first?.value * 0.1);
  }
}
