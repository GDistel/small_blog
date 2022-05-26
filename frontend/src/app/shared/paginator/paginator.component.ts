import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {
  @Input('total') length!: number;
  @Input('limit') pageSize = 3;
  @Input('page') pageIndex = 0;
  
  @Input() pageSizeOptions: number[] = [3, 10, 30, 50];
  @Output() pageEvent = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnInit(): void {
  }

}
