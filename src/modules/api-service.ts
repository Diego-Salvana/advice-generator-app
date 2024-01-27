import { Slip } from '../interfaces/Slip.interface';

const apiUrl = import.meta.env.VITE_API_URL;

async function getAdvice(): Promise<Slip> {
   try {
      let slip!: Slip;
      await fetch(apiUrl)
         .then((res) => {
            if (!res.ok) throw { ok: false, message: 'An error occurred in the request' };
            return res.json();
         })
         .then((data) => {
            slip = data['slip'];
         });

      return slip;
   } catch (error: any) {
      console.error('Error:', error);
      throw error.message;
   }
}

export { getAdvice };
