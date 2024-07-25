import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Employee } from "../employee";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { EmployeeService } from "../employee.service";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";

@Component({
  selector: "app-edit-employee",
  standalone: true,
  imports: [CommonModule, RouterModule, EmployeeFormComponent],
  template: `
    <h2>Edit an employee</h2>
    <app-employee-form
      [initialState]="employee"
      (formSubmitted)="editEmployee($event)"
    ></app-employee-form>
  `,
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditEmployeeComponent implements OnInit {
  employee: BehaviorSubject<Employee> = new BehaviorSubject({} as Employee);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    if (!id) {
      alert("No id provide");
    }

    this.employeeService
      .getEmployee(id!)
      .subscribe((emp) => this.employee.next(emp));
  }

  editEmployee(employee: Employee) {
    this.employeeService
      .updateEmployee(this.employee.value._id || "", employee)
      .subscribe({
        next: () => {
          this.router.navigate(["/employees"]);
        },
        error: (error) => {
          alert("Failed to update employee");
          console.error(error);
        },
      });
  }
}
