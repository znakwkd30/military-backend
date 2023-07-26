import dotenv from 'dotenv';

/**
 * JEST 테스트시 환경변수 주입
 */
if (process.env.JEST_WORKER_ID) {
  const stage = 'dv';
  const { parsed: environment } = dotenv.config({
    path: './env/local.env'
  });

  environment.STAGE = stage;
  process.env = {
    ...process.env,
    ...environment
  };

  console.log('- ENV_SETUP OK');
}
