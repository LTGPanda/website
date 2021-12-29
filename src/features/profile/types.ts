export interface Profile {
  isAuthenticated: boolean;
  twitchId: string;
  displayName: string;
  balance: number;
  initialBalance: number;
  lastTransactionId: number;
  roles: string[];
}
