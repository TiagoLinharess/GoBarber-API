export default interface IUpdatedUser {
  id: string;
  name: string;
  password?: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
