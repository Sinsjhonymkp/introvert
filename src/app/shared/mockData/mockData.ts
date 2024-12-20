import { ICategories } from '../interfaces/categories.interface';

export const mockData: ICategories[] = [
  {
    id: 1,
    name: 'Продажи',
    cheked: false,
    isOpen: false,
    stages: [
      { id: 1, name: 'Неразобранное', cheked: false },
      { id: 2, name: 'Переговоры', cheked: false },
      { id: 3, name: 'Принимают решение', cheked: false },
      { id: 4, name: 'Успешно', cheked: false },
    ],
  },
  {
    id: 2,
    name: 'Сотрудники',
    cheked: false,
    isOpen: false,
    stages: [
      { id: 1, name: 'Неразобранное', cheked: false },
      { id: 2, name: 'Переговоры', cheked: false },
      { id: 3, name: 'Принимают решение', cheked: false },
      { id: 4, name: 'Успешно', cheked: false },
    ],
  },
  {
    id: 3,
    name: 'Партнеры',
    cheked: false,
    isOpen: false,
    stages: [
      { id: 1, name: 'Неразобранное', cheked: false },
      { id: 2, name: 'Переговоры', cheked: false },
      { id: 3, name: 'Принимают решение', cheked: false },
      { id: 4, name: 'Успешно', cheked: false },
    ],
  },
  {
    id: 4,
    name: 'Ивент',
    cheked: false,
    isOpen: false,
    stages: [
      { id: 1, name: 'Неразобранное', cheked: false },
      { id: 2, name: 'Переговоры', cheked: false },
      { id: 3, name: 'Принимают решение', cheked: false },
      { id: 4, name: 'Успешно', cheked: false },
    ],
  },
  {
    id: 5,
    name: 'Входящие обращения',
    cheked: false,
    isOpen: false,
    stages: [
      { id: 1, name: 'Неразобранное', cheked: false },
      { id: 2, name: 'Переговоры', cheked: false },
      { id: 3, name: 'Принимают решение', cheked: false },
      { id: 4, name: 'Успешно', cheked: false },
    ],
  },
];
