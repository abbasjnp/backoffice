import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, DataService } from './index.core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: []
})
export class CoreModule {}
