export interface DLC {
  name: string;
  description: string[];
  image: string;
  price: number;
  isAcheted: boolean;
  isSelected: boolean;
}

const dlcs: DLC[] = [
  {
    name: 'Lock Picking Capabilities',
    description: `With this new DLC, your hero
      would be able to lock pick any classic door in the game!
      Buy now to add this incredible feature.`.split("\n"),
    image: 'dlc-lockpicking.jpeg',
    price: 2.99,
    isAcheted: false,
    isSelected: false,
  },
  {
    name: 'Business Man Skin Pack (Cosmetic)',
    description: `Unlock a new skin of Business man
      by buying this content! Your ennemies won't
      be able to recognize you! BUY NOW.`.split("\n"),
    image: 'dlc-business.jpg',
    price: 4.99,
    isAcheted: false,
    isSelected: false,
  },
  {
    name: 'Hacker DLC Pack Premium',
    description: `You always dreamed to be a Hacker?
      With this new DLC, unlock new skills such as...
      Hacker stuff! Become a professional of IT stuff and.. HACKER!`.split("\n"),
    image: 'business_man.png',
    price: 3.99,
    isAcheted: false,
    isSelected: false,
  },
  {
    name: 'Multi-player Mode',
    description: `Want to compete against your friends?
      With this new DLC, unlock the multi-player mode.
      Play with your friends or compete to get the highest score!`.split("\n"),
    image: 'dlc-multiplayer.jpeg',
    price: 3.99,
    isAcheted: false,
    isSelected: false,
  }
];

export const achete = (name: string) => {
  dlcs.find(dlc => dlc.name === name).isAcheted = true;
};

export const isAcheted = (name: string) => {
  return dlcs.find(dlc => dlc.name === name).isAcheted;
};

export default dlcs;
