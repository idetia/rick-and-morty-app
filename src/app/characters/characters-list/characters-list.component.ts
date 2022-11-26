import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CharactersService } from 'src/app/services/characters.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import * as CharacterModel from '../../models/character.model';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public characterStatusAlive = CharacterModel.CHARACTER_STATUS_ALIVE;
  public characterStatusDead = CharacterModel.CHARACTER_STATUS_DEAD;
  public characterStatusUnknown = CharacterModel.CHARACTER_STATUS_UNKNOWN;
  public characterGenderMale = CharacterModel.CHARACTER_GENDER_MALE;
  public characterGenderFemale = CharacterModel.CHARACTER_GENDER_FEMALE;
  public characterGenderGenderless = CharacterModel.CHARACTER_GENDER_GENDERLESS;
  public characterGenderUnknown = CharacterModel.CHARACTER_GENDER_UNKNOWN;
  public charactersSubscription: Subscription | null;
  public formChagesSubscription: Subscription | null;
  public filterForm!: FormGroup;
  public characters: Array<CharacterModel.Character>;

  constructor(
    private charactersService: CharactersService,
    private localStorageService: LocalStorageService
  ) {
    this.loading = false;
    this.charactersSubscription = null;
    this.formChagesSubscription = null;
    this.characters = [];
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadCharacters();
  }

  ngOnDestroy(): void {
    this.charactersSubscription?.unsubscribe();
    this.formChagesSubscription?.unsubscribe();
  }

  // Load characters
  private loadCharacters(): void {
    const filters: any = {
      search: this.localStorageService.getData('filter_search'),
      status: this.localStorageService.getData('filter_status'),
      gender: this.localStorageService.getData('filter_gender'),
    };

    // Unsubscribe if subscription is active
    if (
      this.charactersSubscription != null &&
      !this.charactersSubscription.closed
    ) {
      this.charactersSubscription.unsubscribe();
    }

    this.loading = true;
    this.charactersSubscription = this.charactersService
      .getCharacters(filters)
      .subscribe({
        next: (result) => {
          this.characters = result;
          this.loading = false;
        },
        error: (error) => {
          this.characters = [];
          this.loading = false;
        },
      });
  }

  // Create the form
  private buildForm(): void {
    this.filterForm = new FormGroup({
      search: new FormControl(
        this.localStorageService.getData('filter_search') ?? '',
        [Validators.minLength(2)]
      ),
      status: new FormControl(
        this.localStorageService.getData('filter_status') ?? '',
        []
      ),
      gender: new FormControl(
        this.localStorageService.getData('filter_gender') ?? '',
        []
      ),
    });

    // Observe the changes that occur in the form
    this.formChagesSubscription = this.filterForm.valueChanges.subscribe(
      (formValues) => {
        this.localStorageService.setData(
          'filter_search',
          formValues.search ?? ''
        );

        this.localStorageService.setData(
          'filter_status',
          formValues.status ?? ''
        );

        this.localStorageService.setData(
          'filter_gender',
          formValues.gender ?? ''
        );

        this.loadCharacters();
      }
    );
  }
}
