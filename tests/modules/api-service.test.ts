import { getAdvice } from '../../src/modules/api-service';
import { beforeEach, describe, expect, expectTypeOf, test, vi } from 'vitest';
import { Slip } from '../../src/interfaces/Slip.interface';

describe('Fetch test', () => {
   test('must return a Spit type object or string', async () => {
      const response = await getAdvice();
      console.log(response);

      expectTypeOf(response).toEqualTypeOf<Slip | string>();
   });
});

describe('Fetch mock', () => {
   const mockFetch = vi.fn(getAdvice);

   beforeEach(() => {
      vi.restoreAllMocks();
   });

   test('debería realizar una solicitud HTTP GET exitosa', async () => {
      mockFetch.mockResolvedValue({
         id: 1,
         advice: 'Nuevo consejo',
      });

      const response = await getAdvice();
      mockFetch();

      expect(mockFetch).toHaveBeenCalled();
   });
});
