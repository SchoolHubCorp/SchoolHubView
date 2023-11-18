import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-searching-field',
  templateUrl: './searching-field.component.html',
  styleUrls: ['./searching-field.component.scss']
})
export class SearchingFieldComponent {
  @Input() searchList!: string[];
  @Input() searchItem!: string;
  @Input() defaultValue!: string;
  @Output() selectedClass: EventEmitter<string> = new EventEmitter();
  
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.myControl.patchValue(this.defaultValue);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  classSelected(selectedClass: string){
    this.selectedClass.emit(selectedClass);
    console.log('Selected class', selectedClass);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log('Check', filterValue);
    if (this.searchList) {
      return this.searchList.filter(option => option.toLowerCase().includes(filterValue));
    }
    return [];
  }
}
