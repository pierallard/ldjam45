export interface DLC {
  name: string;
  code: string;
  description: string[];
  image: string;
  price: number;
  isAcheted: boolean;
  isSelected: boolean;
  splitName: string;
}

export const DLC_BUSINESSPACK = 'Business Man Skin Pack (Cosmetic)';
export const DLC_TRANSHUMANISM = 'Transhumanism, become an augmented human!';
export const DLC_FLASHLIGHT = 'NEW! Flashlight Item - Light Pack Platinium';
export const DLC_ANIMALS = 'Linguistic Pack: Animals (Limited Edition)';
export const DLC_MULTIPLAYER = 'Multi-player Mode (Special offer: 50% discount)';
export const DLC_FAST = 'Speed run: so fast, so furious!';
export const DLC_LIFEBAR = 'HUD Enhanced Edition - Lifebar';
export const DLC_MUSIC = 'Music OST - Orchestral Edition Binaural';
export const DLC_SOUND = 'Audio Sound FX PACK (SFX Edition)';

const dlcs: DLC[] = [
  {
    name: 'Lock Picking Capabilities',
    code: 'lockpick',
    description: `With this new DLC, your hero would be able to lock pick any classic door in the game!
      Buy now to add this incredible feature.`.split("\n"),
    image: 'dlc-lockpicking.jpeg',
    price: 15.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Lock Picking Capabilities',
  },
  {
    name: "Urban Vehicles - and more!",
    code: 'vehicles',
    description: `Cars, Bikes, Bus... Get them all! This Pack adds up to 50+ new Vehicles that will
      be available in the city. And if you prefer to walk, we also added Skateboards, Yeay!`.split("\n"),
    image: 'dlc-vehicles.png',
    price: 7.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Urban Vehicles PACK',
  },
  {
    name: DLC_FLASHLIGHT,
    code: 'flashlight',
    description: `Unlock up to one brand new item...
      The flashlight! Useful for everything, especially to bring some light somewhere.
      This new content will be available in-game once bought!`.split("\n"),
    image: 'dlc-flashlight.jpg',
    price: 19.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Flashlight Item - Light Pack Platinium'
  },
  {
    name: DLC_ANIMALS,
    code: 'animals',
    description: `You'll never be able to speak to animals...
      Except with this new pack! By installing this linguistic pack your character will be able to speak to animals. Cows, cats, birds... make some new friends!`.split("\n"),
    image: 'dlc-animals.jpg',
    price: 25.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Linguistic Pack: Animals',
  },
  {
    name: "Linguistic Pack: Russian (Limited Edition)",
    code: 'lang_russian',
    description: `Yet another Linguistic Pack!
      You character will be able to speak to Russian people.. unlock new situation, get native instantly and deal with the mafia in-game!`.split("\n"),
    image: 'dlc-russian.png',
    price: 9.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Linguistic Pack: Russian',
  },
  {
    name: DLC_BUSINESSPACK,
    code: 'businessman',
    description: `Unlock a new skin of Business man by buying this content! 
    Your ennemies won't be able to recognize you! BUY NOW.`.split("\n"),
    image: 'dlc-business.jpg',
    price: 29.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Business Man Skin Pack',
  },
  {
    name: 'Hacker DLC Pack Premium',
    code: 'hacker',
    description: `You always dreamed to be a Hacker?
      With this new DLC, unlock new skills such as... Hacker stuff! 
      Become a professional of IT stuff and.. HACKER!`.split("\n"),
    image: 'dlc-hacker.jpg',
    price: 39.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Hacker DLC Pack Premium'
  },
  {
    name: DLC_MULTIPLAYER,
    code: 'multiplayer',
    description: `Want to compete against your friends?
      With this new DLC, unlock the multi-player mode.
      Play with your friends or compete to get the highest score!`.split("\n"),
    image: 'dlc-multiplayer.jpeg',
    price: 2.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Multi-player Mode',
  },
  {
    name: "HUD Enhanced Edition - Lifebar",
    code: 'lifebar',
    description: `Our developers worked very hard on improving the HUD of our game...
      Welcome to the Lifebar displayer HUD Element, never die again!`.split("\n"),
    image: 'dlc-lifebar.png',
    price: 12.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'HUD Enhanced Edition - Lifebar',
  },
  {
    name: DLC_SOUND,
    code: 'sound',
    description: `We reworked (actually added) all the sounds in the game, with a team of Sound Designers.
      Get this pack to immerse yourself with real recorded sounds and SFX with more than 48Go of new content!`.split("\n"),
    image: 'dlc-sound.png',
    price: 5.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Audio Sound FX PACK',
  },
  {
    name: DLC_TRANSHUMANISM,
    code: 'vessie',
    description: `Want to better know your physical functions to perform in any condition?
      With this new DLC, monitor your body and get access to new capabilities.`.split("\n"),
    image: 'dlc-vessie.jpg',
    price: 19.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Transhumanism',
  },
  {
    name: DLC_FAST,
    code: 'fast',
    description: `Want to beat speed run record?
      With this new DLC, move faster, surround your enemies, be fast, be furious.`.split("\n"),
    image: 'dlc-speed.jpg',
    price: 4.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Speed run',
  },
  {
    name: DLC_MUSIC,
    code: 'music',
    description: `Unlock hours of music in this music OST pack.
      Composed by Michael Musik, this Orchestral Edition Binaural soundtrack will fulfill your game and bring a new unseen atmosphere to it!`.split("\n"),
    image: 'dlc-music.png',
    price: 8.99,
    isAcheted: false,
    isSelected: false,
    splitName: 'Music OST',
  }
];

export const achete = (name: string) => {
  dlcs.find(dlc => dlc.name === name).isAcheted = true;
};

export const isAcheted = (name: string) => {
  return dlcs.find(dlc => dlc.name === name || dlc.code === name).isAcheted;
};

export default dlcs;
