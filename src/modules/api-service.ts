import { Slip } from '../interfaces/Slip.interface';

const apiUrl = import.meta.env.VITE_API_URL;

async function getAdvice(): Promise<Slip | string> {
   let slip!: Slip;
   const textError = 'An error occurred in the request';

   await fetch(apiUrl)
      .then((res) => {
         if (!res.ok) throw { ok: false, message: textError };
         return res.json();
      })
      .then((data) => {
         slip = data['slip'];
      })
      .catch((err) => console.error('Error:', err));

   return slip || textError;
}

const suma = () => {
   return 2;
};
export { getAdvice, suma };
