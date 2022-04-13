declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCOUNT_HEADER: string; // this is the line you want
      DEPOSIT_CONDITIONS: string;
      WITHDRAW_CONDITIONS: string;
      PORT?: string;
      PWD: string;
    }
  }
}