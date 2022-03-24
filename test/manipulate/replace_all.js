import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('replaceAll', function() {
  it('should return the replace result with a string pattern', function() {
    expect(v.replaceAll('duck', 'duck', 'swan')).toBe('swan');
    expect(v.replaceAll('duck duck', 'duck', 'swan')).toBe('swan swan');
    expect(v.replaceAll('duck', 'duck', '')).toBe('');
    expect(v.replaceAll('dduucckk', 'd', 'dd')).toBe('dddduucckk');
    expect(v.replaceAll('duck', 'd', '')).toBe('uck');
    expect(
      v.replaceAll('duck duck duc', 'duck', function() {
        return 'swan';
      })
    ).toBe('swan swan duc');
    expect(
      v.replaceAll('duck', 'u', function() {
        return 'a';
      })
    ).toBe('dack');
    expect(v.replaceAll('[a-b] [a-c][a-b]', '[a-b]', '[ab]')).toBe('[ab] [a-c][ab]');
    expect(v.replaceAll('*.*.', '*.', '*')).toBe('**');
    expect(v.replaceAll('\u0061 \u0061 b \u0061', '\u0061', '\u0062')).toBe('b b b b');
    expect(v.replaceAll('', '', '')).toBe('');
    expect(v.replaceAll('hello', '', '1')).toBe('1h1e1l1l1o1');
    expect(v.replaceAll('duck', '', '')).toBe('duck');
    expect(v.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
    expect(v.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).toBe('duck');
  });

  it('should return the replace result with a RegExp pattern', function() {
    expect(v.replaceAll('duck duck', /duck/g, 'swan')).toBe('swan swan');
    expect(v.replaceAll('duck DUCK', /duck/g, 'swan')).toBe('swan DUCK');
    expect(v.replaceAll('duck DUCK', /DUCK/gi, 'swan')).toBe('swan swan');
    expect(v.replaceAll('duck', /duck/g, '')).toBe('');
    expect(v.replaceAll('duck', /d/g, '')).toBe('uck');
    expect(
      v.replaceAll('duck duck', /u/g, function() {
        return 'a';
      })
    ).toBe('dack dack');
    expect(
      v.replaceAll('hello world', /(hello)\s(world)/g, function(match, hello, world) {
        return world + ', ' + hello;
      })
    ).toBe('world, hello');
  });

  it('should return the replace result from a string representation of an object', function() {
    expect(v.replaceAll(['duck'], 'duck', 'swan')).toBe('swan');
    expect(
      v.replaceAll(
        {
          toString: function() {
            return 'mandarin duck';
          },
        },
        /mandarin\s/g,
        ''
      )
    ).toBe('duck');
  });

  it('should return the replace result from a number', function() {
    expect(v.replaceAll(1500, '0', '1')).toBe('1511');
    expect(v.replaceAll(6475, /\d/g, '*')).toBe('****');
    expect(v.replaceAll(6475, /\d/g, '*')).toBe('****');
  });

  it('should return the original string on failed match', function() {
    expect(v.replaceAll('duck', 'dack', 'swan')).toBe('duck');
    expect(v.replaceAll('duck', /dack/g, '')).toBe('duck');
  });

  it('should return the an empty string for an undefined or null', function() {
    expect(v.replaceAll(undefined, /./g, '1')).toBe('');
    expect(v.replaceAll(null, /./g, '1')).toBe('');
  });

  it('should throw a type error when the search pattern is non-global', function() {
    expect(() => {
      v.replaceAll('hello', /hello/, 'hi');
    }).toThrow('search argument is a non-global regular expression');
    expect(() => {
      v.replaceAll('hello', /hello/i, 'hi');
    }).toThrow('search argument is a non-global regular expression');
    expect(() => {
      v.replaceAll('hello', /hello/g, 'hi');
    }).not.toThrow('search argument is a non-global regular expression');
  });
});
