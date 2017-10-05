import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../../domain/program';

@Component({
  selector: 'app-show-program',
  templateUrl: './show-program.component.html',
  styleUrls: ['./show-program.component.css']
})
export class ShowProgramComponent implements OnInit {
  @Input() program: Program;
  constructor() { }

  ngOnInit() {
    console.log(this.program);
  }

}
