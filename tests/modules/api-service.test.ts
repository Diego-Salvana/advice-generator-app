import { getAdvice } from '../../src/modules/api-service';
import { describe, expect, expectTypeOf, test, afterAll, afterEach, beforeAll } from 'vitest';
import { Slip } from '../../src/interfaces/Slip.interface';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

const mockResponse = {
   slip: {
      id: 1,
      advice: 'first post advice',
   },
};

const restHandlers = http.get('https://api.adviceslip.com/advice', () => {
   return HttpResponse.json(mockResponse);
});

const server = setupServer(restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Fetch test', () => {
   test('must return a Spit type object', async () => {
      const response = await getAdvice();
      console.log('Response:', response);

      expectTypeOf(response).toEqualTypeOf<Slip>();
      expect(response).toEqual(mockResponse.slip);
   });

   test('should handle the error', async () => {
      const errorHandler = http.get('https://api.adviceslip.com/advice', () => {
         return HttpResponse.error();
      });

      server.use(errorHandler);

      await expect(() => getAdvice()).rejects.toThrowError('An error occurred in the request');
   });
});
