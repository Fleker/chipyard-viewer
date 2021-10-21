import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistersComponent } from './dialog-registers.component';

describe('DialogRegistersComponent', () => {
  let component: DialogRegistersComponent;
  let fixture: ComponentFixture<DialogRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRegistersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
