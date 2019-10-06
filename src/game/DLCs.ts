import {DLC} from "./DLCList";

const dlcs: DLC[] = [
  {
    name: 'Lock Picking Capabilities',
    description: `With this new DLC, your hero
      would be able to lock pick any classic door in the game!
      Buy now to add this incredible feature.`.split("\n"),
    image: 'lock_picking.png',
    price: 2.99,
    isAcheted: false,
    isSelected: false
  },
  {
    name: 'Business Man Skin Pack (Cosmetic)',
    description: `Unlock a new skin of Business man
      by buying this content! Your ennemies won't
      be able to recognize you! BUY NOW.`.split("\n"),
    image: 'business_man.png',
    price: 4.99,
    isAcheted: false,
    isSelected: false
  },
  {
    name: 'Hacker DLC Pack Premium',
    description: `You always dreamed to be a Hacker?
      With this new DLC, unlock new skills such as...
      Hacker stuff! Become a professional of IT stuff and.. HACKER!`.split("\n"),
    image: 'business_man.png',
    price: 3.99,
    isAcheted: false,
    isSelected: false
  }
];

export default dlcs;
