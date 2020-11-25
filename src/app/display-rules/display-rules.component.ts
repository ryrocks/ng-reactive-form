import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { PAGE_NAME } from '../shared/contant'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { trigger, animate, state, style, transition } from '@angular/animations';

type PAGES = {
  value: string;
  name: string;
};
@Component({
  selector: 'app-display-rules',
  templateUrl: './display-rules.component.html',
  styleUrls: ['./display-rules.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [
    trigger('animationFields', [
      state('hide', style({
        opacity: 0,
        display: 'none',
      })),
      state('show', style({
        opacity: 1,
        display: 'unset',
      })),
      transition('hide <=> show', [
        animate('1s')
      ]),
    ])
  ]
})
export class DisplayRulesComponent implements OnInit, OnDestroy {

  readonly PAGE_NAME = PAGE_NAME;

  pages: PAGES[] = [
    { value: 'all', name: PAGE_NAME.ALL },
    { value: 'home', name: PAGE_NAME.HOME },
    { value: 'product-pages', name: PAGE_NAME.PRODUCT_PAGES },
    { value: 'password-pages', name: PAGE_NAME.PASSWORD_PAGES },
    { value: 'custom', name: PAGE_NAME.CUSTOM }
  ];

  inclusionRulesForm: FormGroup;
  exclusionRulesForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inclusionRulesForm = this.fb.group({
      rules: new FormArray([])
    });
    this.exclusionRulesForm = this.fb.group({
      rules: new FormArray([])
    });
    this.addRule('inclusion');
    this.addRule('exclusion');

    // this.inclusionRulesForm.get('rules').valueChanges.subscribe({
    //   next: value => console.log('formGroup', value)
    // });
  }

  ngOnDestroy(): void {

  }

  get inclusionRules() {
    const controls = this.inclusionRulesForm.controls;
    return controls.rules as FormArray;
  }

  get exclusionRules() {
    const controls = this.exclusionRulesForm.controls;
    return controls.rules as FormArray;
  }

  addRule(target) {
    if (target === 'inclusion') {
      this.inclusionRules.push(this.fb.group({
        targetPages: this.pages[0].value,
        isExactMatch: false,
        url: [null, { validators: Validators.required, updateOn: 'blur' }]
      }));
    } else {
      this.exclusionRules.push(this.fb.group({
        targetPages: this.pages[0].value,
        isExactMatch: false,
        url: [null, { validators: Validators.required, updateOn: 'blur' }]
      }));
    }
  }

  removeRule(rule, index) {
    if (rule.length === 1) return;
    rule.controls.splice(index, 1);
  }

  showCustomRelatedFields(rule) {
    return rule.controls.targetPages.value === 'custom';
  }

}

