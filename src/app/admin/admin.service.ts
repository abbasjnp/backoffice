import { Injectable } from '@angular/core';
import { DataService } from '../core/http/data.service';
import { CommonService } from '../shared/index.shared';
import { environment } from '../../environments/environment';
import { HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private dataService: DataService,
    private common: CommonService
  ) {}

  serviceUrl = environment.baseUrl + 'authentication/';
  // docUploadUrl = environment.baseUrl;
  public selectedSociety: any;
  public selectedEmployee: any;
  public selectedResident: any;

  // -------------- Society --------------------------
  public getSocitiesList(successCall, errorCall) {
    const url = this.serviceUrl + 'socity/';
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public deleteSocietyById(id, successCall, errorCall) {
    const url = this.serviceUrl + 'socity/' + id;
    this.dataService.delete(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public addSociety(obj, successCall, errorCall) {
    this.dataService.post(this.serviceUrl + 'socity/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  public updateSociety(id, obj, successCall, errorCall) {
    this.dataService.put(this.serviceUrl + 'socity/' + id + '/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  // -------------- Resident --------------------------
  public getResidentsList(successCall, errorCall) {
    const url = this.serviceUrl + 'get_residents/';
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  // -------------- Employee --------------------------
  public getEmployeesList(successCall, errorCall) {
    const url = this.serviceUrl + 'employee/';
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public getEmployeeDetailsById(id, successCall, errorCall) {
    const url = this.serviceUrl + 'employee/' + id + '/';
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public deleteEmployeeById(id, successCall, errorCall) {
    const url = this.serviceUrl + 'employee/' + id + '/';
    this.dataService.delete(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  // public addEmployee(obj, successCall, errorCall) {
  //   this.dataService.post(this.serviceUrl + 'employee/', obj).subscribe(
  //     (res: any) => {
  //       successCall(res);
  //     },
  //     err => {
  //       // this.logout();
  //       errorCall();
  //     }
  //   );
  // }

  // public updateEmployee(id, obj, successCall, errorCall) {
  //   this.dataService.put(this.serviceUrl + 'employee/' + id + '/', obj).subscribe(
  //     (res: any) => {
  //       successCall(res);
  //     },
  //     err => {
  //       // this.logout();
  //       errorCall();
  //     }
  //   );
  // }

  public getSocietyNamesLookup(successCall, errorCall) {
    const url = this.serviceUrl + 'get_socities/?search=';
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  public uploadDoc(docPath, file, progressCall, successCall, errorCall) {
    this.dataService
      .uploadFile(this.serviceUrl + docPath + '/', file, false)
      .subscribe(
        (event: any) => {
          switch (event.type) {
            // handle the upload progress event received
            case HttpEventType.UploadProgress:
              const percentDone = Math.round(
                (100 * event.loaded) / event.total
              );
              progressCall(percentDone);
              break;
            // handle the response event received
            case HttpEventType.Response:
              // When getting the full response body
              let res = event.body;
              if (res.success) {
                successCall(res);
              } else {
                errorCall(res);
              }
              break;
          }
        },
        (error: any) => {
          console.log(
            ' Error while uploading Document :  ' + JSON.stringify(error)
          );
          errorCall(error);
        }
      );
  }

  public uploadEmployeePicAndDoc(url, method, formData, successCall, errorCall) {
    this.dataService
      .uploadEmployeeFile(this.serviceUrl + url, method, formData)
      .subscribe(
        (event: any) => {
          switch (event.type) {
            // handle the upload progress event received
            // case HttpEventType.UploadProgress:
            //   const percentDone = Math.round(
            //     (100 * event.loaded) / event.total
            //   );
            //   progressCall(percentDone);
            //   break;
            // handle the response event received
            case HttpEventType.Response:
              // When getting the full response body
              let res = event.body;
              if (res.success) {
                successCall(res);
              } else {
                errorCall(res);
              }
              break;
          }
        },
        (error: any) => {
          console.log(
            ' Error while uploading Document :  ' + JSON.stringify(error)
          );
          errorCall(error);
        }
      );
  }

}
