export interface ERData {
  id: string;
  is2h: boolean;
  name: string;
  sets: Sets;
  tags: any[];
  isPvE: boolean;
  items: Items;
  stats: IStats;
  views: Views;
  author: Author;
  spells: Spells;
  version: string;
  buildUrl: string;
  computed: IComputed;
  inventory: IInventory;
  talismans: Talismans;
  conditions: Conditions;
  manualTags: any[];
  protectors: Protectors;
  description: string;
  weaponUpgrade: number;
  characterClass: string;
}

export interface Sorting {
  method: string;
  direction: string;
}

export type Sorted<T> = {
  sorting: Sorting;
} & T

export interface Protectors {
  arms: Protector;
  body: Protector;
  head: Protector;
  legs: Protector;
}

export interface Protector extends Sorted<{
  slots: GenericSlot[]
}> {}

export interface Conditions {
  forEffects: any[];
  crystalTears: boolean;
}

export interface Talismans extends Sorted<{
  slots: GenericSlot[];
}> {}


export interface Slot4 extends GenericSlot{
  equipSet?: number[];
  equipIndex?: number;
}

export interface IInventory extends Sorted<{
  slots: InventorySlot[];
}> {}

export interface InventorySlot extends GenericSlot {
  upgrade?: number;
  infusion: string;
  weaponArt?: string;
  equipSet?: number[];
  equipIndex?: number;
}

export interface IComputed {
  maxFP: number;
  poise: IPoise;
  defenses: IDefenses;
  absorption: IDefenses;
  maxHealth: number;
  maxStamina: number;
  resistances: IResistances;
  maxEquipLoad: number;
}

export interface IResistances {
  focus: number;
  immunity: number;
  vitality: number;
  robustness: number;
}

export interface IDefenses {
  fire: number;
  holy: number;
  magic: number;
  slash: number;
  pierce: number;
  strike: number;
  physical: number;
  lightning: number;
}

export interface IPoise {
  original: number;
}

export interface Spells {
  slots: GenericSlot[];
}

export interface GenericSlot {
  name: string;
  order: number;
}

export interface Author {
  id: string;
  name: string;
}

export interface Views {
  overview: string;
  'item-view/right': string;
}

export interface IStats {
  rl: number;
  arc: number;
  dex: number;
  fth: number;
  int: number;
  mnd: number;
  str: number;
  vig: number;
  vit: number;
}

export interface Items {
  ammo: Ammo;
  tools: Tools;
  flasks: Flasks;
  crystalTears: string[];
}

export interface Flasks {
  level: number;
  total: number;
  crimson: number;
  cerulean: number;
}

export interface Tools extends Sorted<{
  slots: ToolSlot[];
}> {}


export interface ToolSlot extends GenericSlot{
  equipIndex: number;
}

export interface Ammo {
  slots: any[];
}

export interface Sets {
  weapons: SetItem[];
  talismans: SetItem[];
  protectors: SetItem[];
}

export interface SetItem {
  name: string;
  active: boolean;
}

interface User {
  id: string;
  name: string;
}

export interface ERApiData {
  id: string;
  data: ERData;
  user: User;
  gameId: number;
  version: string;
  isPublic: boolean;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string | null;
  hasCosmetics: boolean;
}