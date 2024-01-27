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
   
   const response: Slip | string = await getAdvice();
   console.log('respuesta:', response);

   if (typeof response !== 'string') {
      adviceNumber.innerText = `${response.id}`;
      adviceText.classList.remove('error');
      adviceText.innerText = `"${response.advice}"`;
   } else {
      adviceText.classList.add('error');
      adviceText.innerText = `-- Sorry, ${response.toLowerCase()} --`;
   }

   button.removeAttribute('disabled');
   adviceNumber.classList.remove('animator');
   adviceText.style.opacity = '1';
});

button?.dispatchEvent(clickEvent);
