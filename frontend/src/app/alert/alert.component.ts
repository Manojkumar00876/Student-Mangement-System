import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() isVisible = false;
  @Input() isSuccess = false;
  @Input() isDanger = false;
  @Input() message = '';

  closeAlert() {
    this.isVisible = false;
  }
}