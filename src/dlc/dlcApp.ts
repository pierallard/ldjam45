import { DLC } from "../game/DLCList";
import DLCs from "../game/DLCs";

const getId = (id: string) => document.querySelector('#' + id) as HTMLElement;
const dlcTemplate = getId('dlcItemTemplate');
const createDlcItemTemplate = () => {
  const dlcItem = document.createElement('div');
  dlcItem.innerHTML = dlcTemplate.innerHTML;
  dlcItem.className = 'dlcItem';
  return dlcItem;
}
const getClass = (clas: string, element: HTMLElement | HTMLDocument = document) => element.querySelector('.' + clas) as HTMLElement;

const createDLCItem = (dlc: DLC, onBuy: (dlc: DLC) => void) => {
  const dlcItem = createDlcItemTemplate();
  const title = getClass('dlcTitle', dlcItem);
  title.textContent = dlc.name;
  title.onclick = () => onBuy(dlc);

  const image = getClass('dlcImage', dlcItem) as HTMLImageElement;
  image.src = 'https://via.placeholder.com/250x150';

  const price = getClass('dlcPrice', dlcItem);
  price.innerText = `$ ${dlc.price} USD`;

  const description = getClass('dlcDescription', dlcItem);
  description.innerText = dlc.description.join('\n');

  const buy = getClass('dlcBuyButton', dlcItem);
  buy.onclick = () => {
    closeDLCMenu();
    onBuy(dlc);
  };

  return dlcItem;
}

const openDLCMenu = (dlcs, onBuy) => {
  getId('DLCMenu').style.display = 'block';

  const dlcsList = getId('dlcList');

  dlcs.forEach(dlc => dlcsList.appendChild(createDLCItem(dlc, onBuy)));
};

const closeDLCMenu = () => {
  getId('DLCMenu').style.display = 'none';
  getId('dlcList').innerHTML = '';
};


window['openDLCMenu'] = openDLCMenu;
window['closeDLCMenu'] = closeDLCMenu;
