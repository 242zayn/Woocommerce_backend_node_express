import { UserType } from "../user/userTypes";

export interface BOOKTYPE {
  _id: string;
  title: string;
  description: string;
  author: UserType;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}

// import {v2 as cloudinary} from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dxh8knqc5',
//   api_key: '659831499245129',
//   api_secret: 'QcvYujmgagCcJZ5GecSgBGADsl0'
// });
