import { dlcList } from './DLCConstants';

export interface DLC {
  name: string;
  description: string[];
  image: string;
  price: number;
  isAcheted: boolean;
  isSelected: boolean;
}
