import { Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  constructor(private dataStorageService : DataStorageService){}

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
