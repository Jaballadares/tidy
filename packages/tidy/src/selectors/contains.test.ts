import { contains } from '../index';

describe('selectors', () => {
  describe('contains', () => {
    it('it works', () => {
      const data = [
        { foo: 1, bar: 20, foobar: 300, FoObAR: 90 },
        { foo: 2, bar: 21, foobar: 301, FoObAR: 91 },
        { foo: 3, bar: 22, foobar: 302, FoObAR: 92 },
        { foo: 4, bar: 23, foobar: 303, FoObAR: 93 },
      ];

      expect(contains('oba')(data)).toEqual(['foobar', 'FoObAR']);
      expect(contains('oba', false)(data)).toEqual(['foobar']);
    });
  });
});
