import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
/* ANGULAR MATERIAL */
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, debounce, debounceTime, distinct, distinctUntilChanged, map } from 'rxjs';


const MATERIAL_MODULES = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];

@Component({
  selector: 'app-form-search-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,  ...MATERIAL_MODULES],
  templateUrl: './form-search-user.component.html',
  styleUrls: ['./form-search-user.component.scss'],
})
export class FormSearchUserComponent {
  @Output()
  public readonly isFormValid$!:Observable<boolean>;

  @Output()
  public submitted = new EventEmitter<{document:string}>();

  showSpinner = false;
  formSearch!: FormGroup;
  private _fb = inject(FormBuilder)

  constructor(){
    this.buildForm();
    this.isFormValid$ = this.formSearch.statusChanges.pipe(
      debounceTime(300),
      map(()=>this.formSearch.valid),
      distinctUntilChanged()
    )
  }

  onSubmit(){

    this.showSpinner = true;
    setTimeout(() => {
      this.submitted.emit(this.formSearch.value);
      this.showSpinner = false;
    }, 2000);


  }

  buildForm(){
    this.formSearch = this._fb.nonNullable.group({
      document:['',[Validators.required,Validators.minLength(7),Validators.pattern('^[0-9]+$')]]

    })
  }
}
