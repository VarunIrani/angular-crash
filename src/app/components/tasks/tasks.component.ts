import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import Task from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskToDelete: Task) {
    this.taskService.deleteTasks(taskToDelete).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== taskToDelete.id);
    });
  }

  toggleReminder(taskToToggle: Task) {
    taskToToggle.reminder = !taskToToggle.reminder;
    this.taskService.updateTaskReminder(taskToToggle).subscribe();
  }

  addTask(taskToAdd: Task) {
    this.taskService.addTask(taskToAdd).subscribe((task) => {
      this.tasks.push(task);
    });
  }

}
