import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ResgistrationService } from '../shared/services/resgistration.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Registration } from '../shared/models/regitration.interface';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  subscription?: Subscription = new Subscription();
  registrationForm!: FormGroup;
  // registrations$!: Observable<Registration[]>;

  registrationList?: Registration[];


  constructor(private swUpdate: SwUpdate, private fb: FormBuilder, private registrationService: ResgistrationService) {
    // console.log(this.swUpdate.isEnabled);

    this.swUpdate.checkForUpdate();

    this.swUpdate.versionUpdates.subscribe((version) => {
      // console.log(version);
      if (version.type === 'VERSION_READY') {
        window.location.reload();
      }
    });

  }

  ngOnInit() {
    // this.registrations$ = this.registrationService.registration$;
    // this.subscription?.add(this.registrationService.firstLoad());
    this.subscription?.add(this.registrationService.registration$.subscribe(
      response => {
        this.registrationList = response;
      }
    ))
    // this.registrationList = this.registrationService.registrationList;


    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.registrationForm?.valid) {
      this.registrationService.register(this.registrationForm.value);
    }
    // this.subscription?.add(this.registrationService.getAll().subscribe());
    this.registrationList = this.registrationService.getRegistration();
  }
  sendToBack() {
    this.registrationService.update(this.registrationForm.value);
  }

  editRegistry(id: number): void {
    // this.router.navigate(['/edit', id]);
  }
  onSynchrone(): void {
    // console.log("dans synchrone");

    this.registrationService.synch();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
