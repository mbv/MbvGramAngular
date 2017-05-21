import {Tag} from "../../tag/tag";
import {Album} from "../album";
import {User} from "../../user/user";
export class Photo {
  constructor(public id?: number,
              public album_id?: number,
              public album?: Album,
              public photo?: { url?: string, thumb: { url?: string }, small_thumb: { url?: string } },
              public description?: string,
              public user?: User,
              public tag_list?: Tag[],
              public created_at?: string,
              public updated_at?: string,) {
  }
}
