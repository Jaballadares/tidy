import { tidy, leftJoin } from './index';

describe('leftJoin', () => {
  it('leftJoin works', () => {
    const data = [
      { a: 1, b: 10, c: 100 },
      { a: 2, b: 20, c: 200 },
    ];

    const data2 = [{ a: 1, x: 'x1', y: 'y1' }];
    const results = tidy(
      data,
      leftJoin<typeof data[0], typeof data2[0]>(data2, { by: 'a' })
    );
    expect(results).toEqual([
      { a: 1, b: 10, c: 100, x: 'x1', y: 'y1' },
      { a: 2, b: 20, c: 200 },
    ]);

    const results4 = tidy(data, leftJoin(data2, { by: ['a'] }));
    expect(results4).toEqual([
      { a: 1, b: 10, c: 100, x: 'x1', y: 'y1' },
      { a: 2, b: 20, c: 200 },
    ]);

    const results2 = tidy(
      data,
      leftJoin<typeof data[0], typeof data2[0]>(data2, { by: 'a' })
    );
    expect(results2).toEqual([
      { a: 1, b: 10, c: 100, x: 'x1', y: 'y1' },
      { a: 2, b: 20, c: 200 },
    ]);

    const results3 = tidy(data, leftJoin(data2, { by: { a: 'a' } }));
    expect(results3).toEqual([
      { a: 1, b: 10, c: 100, x: 'x1', y: 'y1' },
      { a: 2, b: 20, c: 200 },
    ]);
  });

  it('leftJoin works with multiple by keys', () => {
    const data = [
      { a: 1, J: 'j', b: 10, c: 100 },
      { a: 1, J: 'k', b: 60, c: 600 },
      { a: 1, J: 'J', b: 30, c: 300 },
      { a: 2, J: 'j', b: 20, c: 200 },
      { a: 3, J: 'x', b: 50, c: 500 },
    ];

    const data2 = [
      { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
      { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
      { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
    ];
    const results = tidy(
      data,
      leftJoin<typeof data[0], typeof data2[0]>(data2, { by: ['a', 'J'] })
    );
    expect(results).toEqual([
      { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
      { a: 1, J: 'k', b: 60, c: 600 },
      { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
      { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
      { a: 3, J: 'x', b: 50, c: 500 },
    ]);

    expect(tidy(data, leftJoin(data2, { by: { a: 'a', altJ: 'J' } }))).toEqual([
      { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
      { a: 1, J: 'k', b: 60, c: 600 },
      { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
      { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
      { a: 3, J: 'x', b: 50, c: 500 },
    ]);
  });

  it('leftJoin works with auto-detected keys', () => {
    const data = [
      { a: 1, J: 'j', b: 10, c: 100 },
      { a: 1, J: 'k', b: 60, c: 600 },
      { a: 1, J: 'J', b: 30, c: 300 },
      { a: 2, J: 'j', b: 20, c: 200 },
      { a: 3, J: 'x', b: 50, c: 500 },
    ];

    const data2 = [
      { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
      { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
      { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
    ];
    const results = tidy(
      data,
      leftJoin<typeof data[0], typeof data2[0]>(data2)
    );
    expect(results).toEqual([
      { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
      { a: 1, J: 'k', b: 60, c: 600 },
      { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
      { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
      { a: 3, J: 'x', b: 50, c: 500 },
    ]);
  });

  it('leftJoin works with multiple matching rows', () => {
    const data = [{ a: 1, b: 10, c: 100 }];

    const data2 = [
      { a: 1, x: 'x1', y: 'y1' },
      { a: 1, x: 'x11', y: 'y11' },
      { a: 2, x: 'x2', y: 'y2' },
    ];
    const results = tidy(
      data,
      leftJoin<typeof data[0], typeof data2[0]>(data2, { by: 'a' })
    );
    expect(results).toEqual([
      { a: 1, b: 10, c: 100, x: 'x1', y: 'y1' },
      { a: 1, b: 10, c: 100, x: 'x11', y: 'y11' },
    ]);
  });
});
