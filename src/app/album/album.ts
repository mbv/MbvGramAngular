import {Tag} from "../tag/tag";
import {Photo} from "./photo/photo";
export class Album {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public tag_list?: Tag[],
    public sample_photos?: Photo[],
    public created_at?: string,
    public updated_at?: string,
    public can_update?: boolean,
    public can_delete?: boolean,
    public can_add_photo?: boolean,
  ) {}
}
