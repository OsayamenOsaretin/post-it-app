import getReadStatus from '../../utility/getReadStatus';

describe('getReadStatus', () => {
  const message = {
    read: {
      testUser: true
    }
  };
  const message1 = {};

  it('should return false in the case of no reads', () => {
    const result = getReadStatus(message1);
    expect(result).not.toBeTruthy();
  });

  it('should return false in the case of reads but no reads by user', () => {
    const result = getReadStatus(message, 'notTestUser');
    expect(result).not.toBeTruthy();
  });

  it('should return true in the case of reads and read by user', () => {
    const result = getReadStatus(message, 'testUser');
    expect(result).toBeTruthy();
  });
});
