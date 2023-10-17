import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilesUserComponent } from './admin-files-user.component';

describe('AdminFilesUserComponent', () => {
  let component: AdminFilesUserComponent;
  let fixture: ComponentFixture<AdminFilesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminFilesUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
