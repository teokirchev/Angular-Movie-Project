import { Injectable } from '@angular/core';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    new User(1, 'johnsmith@abv.bg', '12345'),
    new User(2, 'marryjane@abv.bg', '12345'),
    new User(3, 'marktven@abv.bg', '12345'),
    new User(4, 'joansmile@abv.bg', '12345'),
  ]
}
