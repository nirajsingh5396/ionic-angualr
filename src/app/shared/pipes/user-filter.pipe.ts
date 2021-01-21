import { Pipe, PipeTransform } from '@angular/core';
import { Users } from 'src/app/features/users/models/users.model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: Users[], searchText: string): Users[] {
    if (!users && users.length === 0) return [];
    if (!searchText) return users;
    searchText = searchText.toLowerCase();
    return users.filter((result) => {
      return result.username.toLowerCase().match(searchText) ||
        result.name.toLowerCase().match(searchText) ||
        result.email.toLowerCase().match(searchText);
    });
  }

}
