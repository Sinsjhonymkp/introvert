import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, switchMap } from 'rxjs';
import { ICategories } from '../../interfaces/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly DB_NAME = 'StateDB';
  private readonly DB_VERSION = 1;
  private readonly DB_STORE_NAME = 'StateStore';
  constructor() {
    this.initialDataBase();
  }

  private initialDataBase(): void {
    const request = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(this.DB_STORE_NAME)) {
        db.createObjectStore(this.DB_STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onerror = () => {
      console.error('что то не так с IndexedDB');
    };

    request.onsuccess = () => {
      console.log('IndexedDB успешно инициализирована');
    };
  }

  private openDataBase(): Observable<IDBDatabase> {
    const promise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject('Ошибка при получении данных');
    });
    return from(promise);
  }

  public addDataIfNotExist(data: ICategories): Observable<void> {
    return this.openDataBase().pipe(
      switchMap((db) => {
        const transaction = db.transaction([this.DB_STORE_NAME], 'readonly');
        const store = transaction.objectStore(this.DB_STORE_NAME);
        const request = store.get(data.id);
        const promise = new Promise<boolean>((resolve, reject) => {
          request.onsuccess = () => resolve(!!request.result);
          request.onerror = () => reject(request.error);
        });
        return from(promise).pipe(
          switchMap((exsist) => {
            if (exsist) {
              return of(undefined);
            }
            const transaction = db.transaction(
              [this.DB_STORE_NAME],
              'readwrite'
            );
            const store = transaction.objectStore(this.DB_STORE_NAME);
            const request = store.add(data);
            const promise = new Promise<void>((resolve, reject) => {
              request.onsuccess = () => resolve();
              request.onerror = () => reject('Ошибка при добавлении данных');
            });
            return from(promise);
          })
        );
      })
    );
  }

  onCategoryCheckedChange(
    categoryId: number,
    isChecked: boolean
  ): Observable<void> {
    return this.openDataBase().pipe(
      switchMap((db) => {
        const transaction = db.transaction([this.DB_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.DB_STORE_NAME);

        return from(
          new Promise<void>((resolve, reject) => {
            const request = store.get(categoryId);

            request.onsuccess = () => {
              const category: ICategories = request.result;
              category.cheked = isChecked;
              const updateRequest = store.put(category);
              updateRequest.onsuccess = () => resolve();
              updateRequest.onerror = () =>
                reject('Ошибка обновления категории');
            };

            request.onerror = () => reject('Ошибка получения категории');
          })
        );
      })
    );
  }

  onStageCheckedChange(
    //refact
    categoryId: number,
    stageId: number,
    isChecked: boolean
  ): Observable<void> {
    return this.openDataBase().pipe(
      switchMap((db) => {
        const transaction = db.transaction([this.DB_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.DB_STORE_NAME);

        return from(
          new Promise<void>((resolve, reject) => {
            const request = store.get(categoryId);

            request.onsuccess = () => {
              const category: ICategories = request.result;
              const stage = category.stages.find((s) => s.id === stageId);
              if (stage) {
                stage.cheked = isChecked;
                const updateRequest = store.put(category);
                updateRequest.onsuccess = () => resolve();
                updateRequest.onerror = () =>
                  reject('Ошибка обновления стадии');
              } else {
                reject('Стадия не найдена');
              }
            };

            request.onerror = () => reject('Ошибка получения категории');
          })
        );
      })
    );
  }

  public getData(): Observable<ICategories[]> {
    return this.openDataBase().pipe(
      switchMap((db) => {
        const transaction = db.transaction([this.DB_STORE_NAME], 'readonly');
        const store = transaction.objectStore(this.DB_STORE_NAME);
        const request = store.getAll();
        const promise = new Promise<any>((resolve, reject) => {
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject('Ошибка при получении данных');
        });
        return from(promise);
      })
    );
  }

  toggleAll(event: Event): Observable<void> {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    return this.openDataBase().pipe(
      switchMap((db) => {
        const transaction = db.transaction([this.DB_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.DB_STORE_NAME);

        const promise = new Promise<void>((resolve, reject) => {
          const request = store.getAll();

          request.onsuccess = () => {
            const allCategories = request.result;
            allCategories.forEach((category: ICategories) => {
              category.cheked = isChecked;
              category.stages.forEach((stage) => (stage.cheked = isChecked));
              store.put(category); // Обновляем каждую категорию
            });

            resolve();
          };

          request.onerror = () => reject('Ошибка при получении всех категорий');
        });
        return from(promise);
      })
    );
  }
}
