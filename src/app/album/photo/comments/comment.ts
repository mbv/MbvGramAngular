import {Photo} from "../photo";
export class Comment {
  constructor(public id?: number,
              public user?: {
                id?: number,
                name?: string,
              },
              public user_id?: number,
              public photo?: Photo,
              public photo_id?: number,
              public text?: string,
              public created_at?: string,
              public updated_at?: string,) {
  }
}
