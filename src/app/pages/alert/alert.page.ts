import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  public allergenAlert = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
  {
    text: 'OK',
    role: 'confirm',
    handler: () => {
      this.router.navigate(['/tabs/tab1'])
      console.log('Alert confirmed');
    },
  },
  ];

  setResult(ev){
    console.log('Dismissed with role: ${ev.dettail.role}');
  }

}
