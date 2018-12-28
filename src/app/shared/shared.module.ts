import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell/shell.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [SidebarComponent, HeaderComponent],
  imports: [CommonModule, AppMaterialModule, RouterModule],
  declarations: [
    HeaderComponent,
    ShellComponent,
    ConfirmDialogComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
