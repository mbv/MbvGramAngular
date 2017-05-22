export class User {
  constructor(
    public id?: number,
    public first_name?: string,
    public last_name?: string,
    public image?: string,
    public created_at?: string,
    public updated_at?: string,
    public can_follow?: boolean,
    public can_unfollow?: boolean,
    public can_show_content?: boolean,
  ) {}
}
