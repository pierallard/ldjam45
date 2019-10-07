import DLCs, { DLC } from "../game/DLCs";

const getId = (id: string) => document.querySelector('#' + id) as HTMLElement;
const dlcTemplate = getId('dlcItemTemplate');
const createDlcItemTemplate = (i: number) => {
  const dlcItemContainer = document.createElement('div');
  dlcItemContainer.className = 'dlcItemContainer';

  const dlcItemBackground = document.createElement('div');
  dlcItemBackground.className = 'dlcItemBackground';

  const dlcItem = document.createElement('div');
  dlcItem.innerHTML = dlcTemplate.innerHTML;
  dlcItem.className = 'dlcItem';
  setTimeout(() => {
    dlcItem.className = 'dlcItem dlcItemEntering';
  }, 50 * (i+1));

  dlcItemContainer.appendChild(dlcItemBackground);
  dlcItemContainer.appendChild(dlcItem);

  return dlcItemContainer;
}
const getClass = (clas: string, element: HTMLElement | HTMLDocument = document) => element.querySelector('.' + clas) as HTMLElement;

const createDLCItem = (dlc: DLC, index: number, onBuy: (dlc: DLC) => void) => {
  const dlcItem = createDlcItemTemplate(index);
  const title = getClass('dlcTitle', dlcItem);
  title.textContent = dlc.name;
  title.onclick = () => onBuy(dlc);

  const image = getClass('dlcImage', dlcItem) as HTMLImageElement;

  if (dlc.image == null) {
    image.src = 'https://via.placeholder.com/250x150';
  } else {
    image.src = dlc.image;
  }

  if (dlc.isAcheted) {
    const price = getClass('dlcPrice', dlcItem);
    price.innerText = `Installed`;
    const buy = getClass('dlcBuyButton', dlcItem);
    buy.remove();
  } else {
    const price = getClass('dlcPrice', dlcItem);
    price.innerText = `$ ${dlc.price} USD`;

    const buy = getClass('dlcBuyButton', dlcItem);
    buy.onclick = () => {
      closeDLCMenu();
      onBuy(dlc);
    };
  }

  const description = getClass('dlcDescription', dlcItem);
  description.innerText = dlc.description.join('\n');

  return dlcItem;
}

const openDLCMenu = (dlcs, onBuy, currentWallet: number) => {
  getId('DLCMenu').style.display = 'block';

  const dlcsList = getId('dlcList');
  const currentWalletDom = getId('dlcCurrentWallet');

  dlcs.forEach((dlc, i) => dlcsList.appendChild(createDLCItem(dlc, i, onBuy)));
  currentWalletDom.innerText = 'Your wallet: ' + currentWallet.toPrecision(3) + ' $';
};

const closeDLCMenu = () => {
  getId('DLCMenu').style.display = 'none';
  getId('dlcList').innerHTML = '';
};

const close = getId('dlcClose');
close.onclick = () => {
  closeDLCMenu();
};

window['openDLCMenu'] = openDLCMenu;
window['closeDLCMenu'] = closeDLCMenu;
