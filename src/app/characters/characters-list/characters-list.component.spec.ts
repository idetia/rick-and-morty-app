import { keyframes } from '@angular/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharactersListComponent } from './characters-list.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;
  let mockCharactersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersListComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have same value the entering search input and the form element`, async () => {
    component = fixture.componentInstance;

    const searchInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('.search-field input');
    searchInputElement.value = 'Rick';
    searchInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const searchValueFromGroup = component.filterForm.get('search');
      expect(searchInputElement.value).toEqual(searchValueFromGroup?.value);
      expect(searchValueFromGroup?.errors).toBeNull();
    });
  });

  it(`should have not pass the validation`, async () => {
    component = fixture.componentInstance;

    const searchInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('.search-field input');
    searchInputElement.value = 'R';
    searchInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const searchValueFromGroup = component.filterForm.get('search');
      expect(searchValueFromGroup?.errors).not.toBeNull();
    });
  });
});
