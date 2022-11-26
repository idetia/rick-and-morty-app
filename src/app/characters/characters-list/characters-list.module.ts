import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersListRoutingModule } from './characters-list-routing.module';
import { CharactersListComponent } from './characters-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CharactersListComponent],
  imports: [CommonModule, CharactersListRoutingModule, ReactiveFormsModule],
})
export class CharactersListModule {}
