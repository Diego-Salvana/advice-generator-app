import { Slip } from '../../src/interfaces/Slip.interface';
import { getAdvice } from '../../src/modules/api-service';
import { describe, expectTypeOf, test } from 'vitest';

describe('Test de fetch', () => {
   test('debe retornar un objeto tipo Spit', async () => {
      const response = await getAdvice();
      console.log(response);

      expectTypeOf(response).toEqualTypeOf<Slip | string>();
   });
});
