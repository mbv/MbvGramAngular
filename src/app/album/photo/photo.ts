export class Photo {
  constructor(
    public id?: number,
    public album_id?: number,
    public url?: string,
    public description?: string,
    public tag_list?: string[],
    public created_at?: string,
    public updated_at?: string,
  ) {}
}
