import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Employee } from "../employee";

@Component({
  selector: "app-employee-form",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  template: `
    <form
      class="employee-form"
      autocomplete="off"
      [formGroup]="employeeForm"
      (ngSubmit)="submitForm()"
    >
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="name"
          formControlName="name"
          placeholder="name"
          required
        />
        <label for="name">Name</label>
      </div>
      <div
        *ngIf="name.invalid && (name.dirty || name.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="name.errors?.['required']">Name is required</div>
        <div *ngIf="name.hasError('minlength')">
          Name must be atleast 3 characters long
        </div>
      </div>

      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          formControlName="position"
          placeholder="position"
          required
        />
        <label for="position">Position</label>
      </div>
      <div
        *ngIf="position.invalid && (position.dirty || position.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="position.errors?.['required']">Position is required</div>
        <div *ngIf="position.errors?.['minlength']">
          Position must be atleast 6 characters long
        </div>
      </div>

      <div class="mb-3">
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            formControlName="level"
            name="level"
            id="level-junior"
            value="junior"
            required
          />
          <label class="form-check-label" for="level-junior">Junior</label>
        </div>
      </div>

      <div class="mb-3">
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            formControlName="level"
            name="level"
            id="level-mid"
            value="mid"
          />
          <label class="form-check-label" for="level-mid">Mid</label>
        </div>
      </div>

      <div class="mb-3">
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            formControlName="level"
            name="level"
            id="level-senior"
            value="senior"
          />
          <label class="form-check-label" for="level-senior">Senior</label>
        </div>
      </div>

      <button
        class="btn btn-primary"
        type="submit"
        [disabled]="employeeForm.invalid"
      >
        Add
      </button>
    </form>
  `,
  styles: `
  .employee-form{
    max-width: 560px;
    margin-left: auto;
    margin-right:auto;
  }
  `,
})
export class EmployeeFormComponent implements OnInit {
  @Input() initialState: BehaviorSubject<Employee> = new BehaviorSubject(
    {} as Employee
  );
  @Output() formSubmitted: EventEmitter<Employee> =
    new EventEmitter<Employee>();
  @Output() formValuesChanged: EventEmitter<Employee> =
    new EventEmitter<Employee>();
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get name() {
    return this.employeeForm.get("name")!;
  }

  get position() {
    return this.employeeForm.get("position")!;
  }

  get level() {
    return this.employeeForm.get("level")!;
  }

  ngOnInit(): void {
    this.initialState.subscribe((employee) => {
      this.employeeForm = this.fb.group({
        name: [employee.name, [Validators.required, Validators.minLength(3)]],
        position: [employee.position, [Validators.required, Validators.minLength(6)]],
        level: [employee.level, [Validators.required]],
      });
    });
    this.employeeForm.valueChanges.subscribe((val) => {
      console.log('Employee', this.employeeForm);
      this.formValuesChanged.emit(val as Employee);
    });
  }

  submitForm() {
    if (this.employeeForm.valid) {
      this.formSubmitted.emit(this.employeeForm.value as Employee);
    }
  }
}
