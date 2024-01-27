import { describe, expect, expectTypeOf, test } from 'vitest';

describe('Mi primer test con vitest', () => {
   test('Probar hola', () => {
      expect('hola').toBe('hola');

      expectTypeOf('hola').toEqualTypeOf<string>()
   });
});
