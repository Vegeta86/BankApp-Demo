import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from 'src/app/shared/dialog/loading-dialog/loading-dialog.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('visible => void', animate('500ms'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  rutSubscription!: Subscription;
  formState = 'visible';


  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      rut: new FormControl('', Validators.required),
      email: new FormControl('')
    });


  }

  setRut() {
    const rutControl = this.loginForm.get('rut');
    if (rutControl) {
      this.rutSubscription = rutControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.formatRut(value))
        )
        .subscribe(value => rutControl.setValue(value, { emitEvent: false }));
    }
  }

  formatRut(value: string): string {
    let rut = value.replace(/\./g, '').replace('-', '');
    rut = rut.substring(0, rut.length - 1) + '-' + rut.substring(rut.length - 1);
    return rut;
  }

  ngOnDestroy() {
    if (this.rutSubscription) {
      this.rutSubscription.unsubscribe();
    }
  }

  login() {
    if (this.loginForm.valid && this.loginForm.get('rut')?.value.length > 2) {
      this.openDialog();
      this.formState = 'void';
      setTimeout(() => {
        const rut = this.loginForm.get('rut')?.value;
        this.router.navigate(['/client', rut]);
      }, 500);
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      width: '250px',
      data: {},
      disableClose: true
    });

    setTimeout(() => {
      dialogRef.close();
    }, 1000);
  }
}
