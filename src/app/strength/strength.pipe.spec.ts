import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    // Arrage
    const pipe = new StrengthPipe();

    // Assert
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    // Arrage
    const pipe = new StrengthPipe();

    // Assert
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });
});
