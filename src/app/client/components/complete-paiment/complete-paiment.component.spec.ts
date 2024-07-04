import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePaimentComponent } from './complete-paiment.component';

describe('CompletePaimentComponent', () => {
  let component: CompletePaimentComponent;
  let fixture: ComponentFixture<CompletePaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletePaimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletePaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
