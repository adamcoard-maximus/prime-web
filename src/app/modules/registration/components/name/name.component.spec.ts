import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameComponent } from './name.component';
import { FormsModule, NgForm } from '@angular/forms';

describe('NameComponent', () => {
  let component: NameComponent;
  let fixture: ComponentFixture<NameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameComponent ],
      imports: [
        FormsModule
      ],
      providers: [ NgForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
