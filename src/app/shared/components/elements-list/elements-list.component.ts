import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { CloseAccordionDirective } from '../../directives/close-accordion.directive';
import { ICategories } from '../../interfaces/categories.interface';
import { StoreService } from '../../services/store/store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { DataService } from '../../services/data/data.service';
import { mockData } from '../../mockData/mockData';
import { StageColorDirective } from '../../directives/stage-color.directive';

@Component({
  selector: 'app-elements-list',
  imports: [CloseAccordionDirective, AsyncPipe, StageColorDirective],
  templateUrl: './elements-list.component.html',
  styleUrl: './elements-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsListComponent {
  private readonly changeRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly storeService = inject(StoreService);
  private readonly dataService = inject(DataService);
  public readonly categories$ = this.storeService.getData();
  public readonly categoriesQuantity$ =
    this.dataService.getQuatityCheckedCategory();
  public readonly stagesQuantity$ = this.dataService.getQuatityCheckedStage();

  public isOpened = signal(false);

  public markedAll = signal(false);

  public stagesQuantity = signal(0);
  public categoriesQuantity = signal(0);

  constructor() {
    this.stagesQuantity$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.stagesQuantity.set(data);
        this.changeRef.detectChanges();
      });
    this.categoriesQuantity$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        console.log('Categories Quantity Updated:', data);
        this.categoriesQuantity.set(data);
        this.changeRef.detectChanges();
      });

    this.accordionItems.map((item) =>
      this.storeService
        .addDataIfNotExist(item)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => console.log('data', data))
    );
  }

  public accordionItems: ICategories[] = mockData;

  public markAllCheckBoxes(event: Event) {
    this.storeService
      .toggleAll(event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeRef.detectChanges());
  }

  public categoryCheckedChange(id: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    this.storeService
      .onCategoryCheckedChange(id, isChecked)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeRef.detectChanges());
  }

  public stageCheckedChange(categoryId: number, stageId: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    this.storeService
      .onStageCheckedChange(categoryId, stageId, isChecked)
      .subscribe(() => this.changeRef.detectChanges());
  }

  public openAccordion() {
    this.isOpened.set(true);
  }

  public closeAccordion() {
    this.isOpened.set(false);
  }
}
