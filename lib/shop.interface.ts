export interface IShopItems {
  name: string;
  imgUrl: string;
}

export interface IShop {
  _id?: string;
  name: string;
  description: string;
  category: string;
  address: string;
  phoneNumber?: string;
  ownerName: string;
  imageUrl?: string;
  website?: string;
  isOpen: boolean;
  isVerified: boolean;
  products?: IShopItems[];
  createdAt?: Date;
  updatedAt?: Date;
}
