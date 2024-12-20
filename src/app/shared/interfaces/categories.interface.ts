export interface ICategories {
  id: number;
  name: string;
  cheked: boolean;
  isOpen: boolean;
  stages: stage[];
}

type stage = {
  id: number;
  name: 'Неразобранное' | 'Переговоры' | 'Принимают решение' | 'Успешно';
  cheked: boolean;
};
