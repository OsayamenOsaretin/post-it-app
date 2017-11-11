/** 
  *@jest-environment node
  */
import supertest from 'supertest';
import app from '../server';

/* global jest */


const request = supertest(app);
jest.unmock('superagent');
jest.mock('../utilities/notificationHelper', () => jest.fn());


describe('Notifications', () => {
  let emails, numbers;

  beforeEach(() => {
    emails = ['firstemail@email.com', 'secondemail@email.componentDidMount'];
    numbers = ['2348128186810'];
  });

  it('should send success message when notification route is hit', (done) => {
    request
      .post('/notifications')
      .send({
        emails,
        numbers,
        priorityLevel: 'normal'
      })
      .end((err, res) => {
        expect(res.body.message).toBe('notification sent!');
        done();
      });
  });
});
