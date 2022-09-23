import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
})
export class HeaderComponentComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  onSaveData() {
    this.dataStorageService.storeWorkouts();
  }
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onFetchData() {
    this.dataStorageService.fetchWorkouts().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
