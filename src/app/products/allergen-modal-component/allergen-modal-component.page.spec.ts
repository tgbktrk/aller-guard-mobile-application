import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllergenModalComponentPage } from './allergen-modal-component.page';

describe('AllergenModalComponentPage', () => {
  let component: AllergenModalComponentPage;
  let fixture: ComponentFixture<AllergenModalComponentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergenModalComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
