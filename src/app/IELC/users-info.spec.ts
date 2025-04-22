// import { UsersInfo } from './users-info';


// describe('USersInfo', () => {
//   it('should create an instance', () => {
//     expect(new UsersInfo()).toBeTruthy();
//   });
// });

import { UsersInfo } from './users-info';

describe('UsersInfo', () => {
  it('should create a valid object', () => {
    const user: UsersInfo = {
      enrollmentID: 0,
      name: '',
      mail: '',
      mobile: 0,
      skillName: '',
      date: new Date(),
      time: '',
      venue: '',
      batchmembers: 0,
      enrollmentDate: new Date()
    };
    
    expect(user).toBeTruthy();
    
  });
});


