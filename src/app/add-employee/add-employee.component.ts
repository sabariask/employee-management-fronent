import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { CommonModule } from "@angular/common";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";

@Component({
  selector: "app-add-employee",
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  template: `
    <h2 class="text-center m-5">Add a new Employee</h2>
    <app-employee-form
      (formSubmitted)="addEmployee($event)"
    ></app-employee-form>
  `,
  styles: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddEmployeeComponent {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  addEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.router.navigate(["/employees"]);
      },
      error: (error) => {
        alert("Failed to create employee");
        console.error(error);
      },
    });
  }
}
