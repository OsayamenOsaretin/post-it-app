import getSenderInitials from '../../utility/getSenderInitials';

describe('getSenderInitialsUtility', () => {
  it('should return an empty string if no sender name is passed', () => {
    const result = getSenderInitials();
    expect(result).toBe('');
  });

  it('should return the first letter of the name for single names', () => {
    const result = getSenderInitials('yamen');
    expect(result).toBe('y');
  });

  it('should return the initials in the case of both first and last name',
    () => {
      const result = getSenderInitials('yamen osaretin');
      expect(result).toBe('yo');
    });
});
