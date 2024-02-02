import { Slip } from './interfaces/Slip.interface';
import { getAdvice } from './modules/api-service';

const adviceText = document.querySelector('.advice__text') as HTMLElement;
const adviceNumber = document.querySelector('.title__number') as HTMLElement;
const button = document.querySelector('.btn-generator');
const clickEvent = new Event('click');

button?.addEventListener('click', async () => {
   button.setAttribute('disabled', 'true');
   adviceNumber.innerHTML = '...';
   adviceNumber.classList.add('animator');
   adviceText.style.opacity = '0';

   const responseAdvice: { error?: string; slip?: Slip } = {};
   await getAdvice()
      .then((slip) => (responseAdvice.slip = slip))
      .catch((err: Error) => (responseAdvice.error = err.message));

   console.log('respuesta:', responseAdvice);

   if (responseAdvice.error) {
      const { error } = responseAdvice;
      adviceText.classList.add('error');
      adviceText.innerText = `-- Sorry, ${error.toLowerCase()} --`;
   } else {
      const { slip } = responseAdvice;
      adviceNumber.innerText = `${slip?.id}`;
      adviceText.classList.remove('error');
      adviceText.innerText = `"${slip?.advice}"`;
   }

   button.removeAttribute('disabled');
   adviceNumber.classList.remove('animator');
   adviceText.style.opacity = '1';
});

button?.dispatchEvent(clickEvent);
