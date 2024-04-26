import { Component } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  activeSection: string = '';
  selectedOptionIndex: number = 1;

  options = [
    { label: 'الرئيسية', icon: 'home', selected: true },
    { label: 'الكورسات', icon: 'book', selected: false },
    { label: 'تفاصيل الميزانية', icon: 'wallet', selected: false },
    { label: 'اكواد الشحن الخاصة بك', icon: 'code', selected: false },
    { label: 'تغيير كلمة السر', icon: 'key', selected: false },
    { label: 'الأعدادات', icon: 'cog', selected: false },
    { label: 'تسجيل الخروج', icon: 'sign-out-alt', selected: false }
  ];

  setActiveSection(index: number): void {
    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
    this.activeSection = this.options[index].label;
    this.selectedOptionIndex = index;
  }

}
