import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkTheme = 'dark';
  private lightTheme = 'light';
  private defaultTheme = this.lightTheme;

  constructor() { }

  setInitialAppTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(savedTheme);
    } else {
      document.body.classList.add(this.defaultTheme);
    }
  }
}
