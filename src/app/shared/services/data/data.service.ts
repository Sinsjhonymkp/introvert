import { inject, Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { map, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly storeService = inject(StoreService);

  public getQuatityCheckedCategory() {
    return this.storeService
      .getData()
      .pipe(
        map(
          (data) => data.filter((category) => category.cheked === true).length
        )
      );
  }
  public getQuatityCheckedStage() {
    return this.storeService.getData().pipe(
      map((data) =>
        data.map(
          (category) =>
            category.stages.filter((stage) => stage.cheked === true).length
        )
      ),
      map((stageQuanity) => stageQuanity.reduce((a, b) => a + b))
    );
  }
}
