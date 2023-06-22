import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/User';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  color: ThemePalette = 'primary';
  users: User[] = [];
  tasks: Task = {
    taskId: null,
    taskName: '',
    description: '',
    dueDate: '',
    assignedTo: { userId: null },
    priority: '',
    status: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  taskId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedTo: [null, Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllUsers();
    this.getTaskId();
  }

  submitTask() {
    const formValues = this.taskForm.value;
    const requiredFields = ['taskName', 'description', 'dueDate', 'assignedTo', 'priority', 'status'];

    for (const field of requiredFields) {
      if (this.isEmpty(formValues[field])) {
        this.showErrorSnackbar('Please fill in all required fields');
        return;
      }
    }

    if (this.taskId) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }




  addTask() {
    this.taskService.addTask(this.tasks).subscribe(
      (data) => {
        console.log('Response:', data);
        this.showSuccessSweetAlert('Success', 'Task added successfully');
        this.resetForm();
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error(error);
        this.showErrorSnackbar('Failed to add Task');
      }
    );
  }

  updateTask() {
    const updatedTask: Task = {
      taskId: this.tasks.taskId,
      taskName: this.taskForm.value.taskName,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      assignedTo: { userId: this.taskForm.value.assignedTo },
      priority: this.taskForm.value.priority,
      status: this.taskForm.value.status,
      createdAt: this.tasks.createdAt,
      updatedAt: new Date()
    };

    this.taskService.updateTask(updatedTask).subscribe(
      (data) => {
        console.log('Response:', data);
        this.showSuccessSweetAlert('Success', 'Task updated successfully');
        this.resetForm();
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error(error);
        this.showErrorSnackbar('Failed to update task');
      }
    );
  }


  private isEmpty(value: any): boolean {
    const trimmedValue = String(value).trim();
    return trimmedValue === '';
  }

  resetForm() {
    this.taskForm.reset();
    this.taskId = null;
  }

  private getTaskId() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.taskId = +id;
        this.getTask();
      }
    });
  }

  getTask() {
    if (this.taskId) {
      this.taskService.getTaskByTaskId(this.taskId).subscribe(
        (data: any) => {
          this.tasks = data as Task;
          this.populateTaskForm();
        },
        (error: any) => {
          console.error(error);
          this.showErrorSnackbar('Failed to get Task');
        }
      );
    }
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error(error);
        this.showErrorSnackbar('Failed to get Users');
      }
    );
  }

  populateTaskForm() {
    this.taskForm.patchValue({
      taskName: this.tasks.taskName,
      description: this.tasks.description,
      dueDate: this.tasks.dueDate,
      assignedTo: this.tasks.assignedTo.userId,
      priority: this.tasks.priority,
      status: this.tasks.status
    });
  }

  showSuccessSweetAlert(title: string, message: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000
    });
  }
}
