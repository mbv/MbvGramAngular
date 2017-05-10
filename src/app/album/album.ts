import {Tag} from "../tag/tag";
export class Album {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public tag_list?: string[],
    public created_at?: string,
    public updated_at?: string,
  ) {}
}
