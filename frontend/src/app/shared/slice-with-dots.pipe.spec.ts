import { SliceWithDotsPipe } from './slice-with-dots.pipe';

describe('SliceWithDotsPipe', () => {
  let pipe: SliceWithDotsPipe;
  let testString: string;

  beforeAll(() => {
    pipe = new SliceWithDotsPipe();
  });

  beforeEach(() => {
    testString = 'This is a very long test string';
  });

  it('slices a string and adds the ellipsis at the end', () => {
    const result = pipe.transform(testString, 4);
    expect(result).toBe('This...');
  });

  it('returns unmodified string if it is less than the cut point', () => {
    const result = pipe.transform(testString, 90);
    expect(result).toBe(testString);
  });

  it('returns empty string for an empty string value', () => {
    const result = pipe.transform('', 1);
    expect(result).toBe('');
  });

  it('returns null for a 0 value of the end parameter', () => {
    const result = pipe.transform(testString, 0);
    expect(result).toBe(null);
  });

  it('returns null for a negative value of the end parameter', () => {
    const result = pipe.transform(testString, -1);
    expect(result).toBe(null);
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
