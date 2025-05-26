export interface UserViewModel {
  id: string;
  userName: string;
  email: string;
  onlineAt: string;
}
export interface EditUserViewModel {
  id: string;
  userName: string;
  phone: string;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  email: string;
  roles: Role[];
  currentRoles: Role[];
  genderId: string;
}
interface Role {
  id: string;
  roleName: string;
}