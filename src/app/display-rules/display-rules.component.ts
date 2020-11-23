import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-rules',
  templateUrl: './display-rules.component.html',
  styleUrls: ['./display-rules.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DisplayRulesComponent implements OnInit {

  inclusionRules = new FormGroup({});
  exclusionRules = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }

}
