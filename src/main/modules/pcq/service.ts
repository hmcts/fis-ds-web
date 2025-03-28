/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

import { PCQProvider } from './index';

export class PcqService {
  async getPcqHealthStatus(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url);
      if (response?.data.status === 'UP') {
        return true;
      }
      return false;
    } catch (err) {
      PCQProvider.log('error', err);
      return false;
    }
  }
}

export const PCQService = new PcqService();
