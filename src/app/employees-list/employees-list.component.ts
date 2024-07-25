import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { distinctUntilChanged, Observable, startWith, Subject } from "rxjs";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-employees-list",
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <h2 class="text-center m-5">Employees List</h2>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Level</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of employees$ | async">
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.level }}</td>
          <td>
            <button
              class="btn btn-primary me-1"
              [routerLink]="['edit/', employee._id]"
            >
              Edit
            </button>
            <button
              class="btn btn-danger me-1"
              (click)="deleteEmployee(employee._id || '')"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary mt-3" [routerLink]="['new']">
      Add a new Employee
    </button>
    <!-- <div *ngIf="(employees$ | async) === null">Loading...</div> -->
  `,
  styles: ``,
})
export class EmployeesListComponent implements OnInit {
  employees$!: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees(),
    });
  }

  private fetchEmployees() {
    this.employees$ = this.employeeService.getEmployees();
  }
}
