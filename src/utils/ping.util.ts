import axios from 'axios';
import cron from 'node-cron';
import * as dotenv from 'dotenv';

dotenv.config();

const renderHost = process.env.RENDER_HOST;

const pingRender = async (host: string): Promise<boolean> => {
  try {
    await axios.post(host);

    return true;
  } catch (error) {
    console.error('[pingRender] Erro ao pingar a API:', error);

    return false;
  }
};

const retryPing = async (nome: string, fn: () => Promise<boolean>, delay = 1000, maxAttempts = 10): Promise<void> => {
  let attempts = 0;

  const attempt = async () => {
    attempts++;
    const success = await fn();

    if (success) {
      console.log(`[${nome}] Sucesso após ${attempts} tentativa(s).`);
      return;
    }

    if (attempts < maxAttempts) {
      console.warn(`[${nome}] Tentativa ${attempts} falhou. Retentando em ${delay}ms...`);
      setTimeout(attempt, delay);
    } else {
      console.error(`[${nome}] Falha após ${attempts} tentativas. Não tentará mais.`);
    }
  };

  attempt();
};

const executePing = async (): Promise<void> => {
  if (!renderHost) return;

  const status = await pingRender(renderHost);
  console.log(`[CRON] pingRender: ${status ? 'OK' : 'FALHOU'}`);

  if (!status) {
    retryPing('pingRender', () => pingRender(renderHost));
  }
};

export const ping = async (): Promise<void> => {
  await executePing();

  cron.schedule('*/5 * * * *', executePing);
};

export default ping;
