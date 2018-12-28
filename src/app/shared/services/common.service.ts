import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './../../core/auth/auth.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Injectable()
export class CommonService {
  public valid_CSV_EXCEL_Exts = new Array('.xlsx', '.xls', '.csv');
  public user: any;
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _router: Router,
    private _authService: AuthService
  ) {}

  public getFileExtension(fileName) {
    return fileName.split('.').pop();
  }

  public showMessage(msg) {
    this.snackBar.open(msg, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'back-green'
    });
  }

  public showError(error) {
    this.snackBar.open(error, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'back-red'
    });
  }
  public openConfirmDialog(data, resolveCall) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        resolveCall();
      }
    });
  }

  public checkExcelCSVFile(fileName, callback) {
    let fileExt = fileName;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (this.valid_CSV_EXCEL_Exts.indexOf(fileExt) < 0) {
      callback(false, '');
    } else {
      callback(true, fileExt);
    }
  }

}
