import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchUserComponent } from './form-search-user.component';

describe('FormSearchUserComponent', () => {
  let component: FormSearchUserComponent;
  let fixture: ComponentFixture<FormSearchUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormSearchUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSearchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
