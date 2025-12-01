/**
 * base user interface, simplified. Refers to auth.users table.
 * {id} is primary key.
 * {user_id} is foreign key.
 */
export interface UserInterface {
    id: string;
    user_id: string;
}
