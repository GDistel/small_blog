import { SliceWithDotsPipe } from './slice-with-dots.pipe';

describe('SliceWithDotsPipe', () => {
  let pipe: SliceWithDotsPipe;
  let testString: string;

  beforeAll(() => {
    pipe = new SliceWithDotsPipe();
  });

  beforeEach(() => {
    testString = 'This is my very long test string';
  });

  it('slices a string and adds the ellipsis at the end', () => {
    const result = pipe.transform(testString, 4);
    expect(result).toBe('This...');
  });

  it('returns unmodified string if it is less than the cut point', () => {
    const result = pipe.transform(testString, 90);
    expect(result).toBe(testString);
  });

  it('returns null if the value is null', () => {
    const result = pipe.transform(null, 90);
    expect(result).toBe(null);
  });

  it('returns null if the value is undefined', () => {
    const result = pipe.transform(undefined, 90);
    expect(result).toBe(null);
  });

});
