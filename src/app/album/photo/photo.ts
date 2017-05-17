import {Tag} from "../../tag/tag";
export class Photo {
  constructor(public id?: number,
              public album_id?: number,
              public photo?: { url?: string, thumb: { url?: string }, small_thumb: { url?: string } },
              public description?: string,
              public tag_list?: Tag[],
              public created_at?: string,
              public updated_at?: string,) {
  }
}
