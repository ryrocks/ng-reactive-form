import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, RequiredValidator } from '@angular/forms';

export class Rules {
  targetPages = '';
  isExactMatch = false;
  url = '';
}

const pages = {
  all: 'All Pages',
  home: 'Home Page',
  'product-pages': 'Product Pages',
  'password-pages': 'Password Page',
  custom: 'Custom'
}

@Component({
  selector: 'app-display-rules',
  templateUrl: './display-rules.component.html',
  styleUrls: ['./display-rules.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DisplayRulesComponent implements OnInit {

  inclusionRulesForm: FormGroup;
  exclusionRulesForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inclusionRulesForm = this.fb.group({
      rules: new FormArray([])
    });
    this.addInclusionRule();
  }

  get rules() {
    const controls = this.inclusionRulesForm.controls;
    return controls.rules as FormArray;
  }

  addInclusionRule() {
    this.rules.push(this.fb.group({
      targetPages: '',
      isExactMatch: false,
      url: ['', Validators.required]
    }));
  }

  removeInclusionRule(index) {
    if (this.rules.length === 1) return;
    this.rules.controls.splice(index, 1);
  }
}

