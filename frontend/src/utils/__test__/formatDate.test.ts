import formatDate from "../formatDate";

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const date = '2022-04-01T14:30:00Z';
    expect(formatDate(date)).toEqual('4/1/2022');
  });
});
