import axios from 'axios';

const API_URL = 'https://api.mail.tm';

export class TempMailHelper {
  private token: string = '';
  private address: string = '';
  private accountId: string = '';

  async createAccount() {
    // Get domain
    const domainsResponse = await axios.get(`${API_URL}/domains`);
    const domain = domainsResponse.data['hydra:member'][0].domain;

    // Create random user
    const randomUser = Math.random().toString(36).substring(7);
    this.address = `${randomUser}@${domain}`;
    const password = 'Password123!';

    const response = await axios.post(`${API_URL}/accounts`, {
      address: this.address,
      password: password,
    });

    this.accountId = response.data.id;

    // Login to get token
    const tokenResponse = await axios.post(`${API_URL}/token`, {
      address: this.address,
      password: password,
    });

    this.token = tokenResponse.data.token;
    return this.address;
  }

  async waitForEmail(subjectPart: string, timeoutMs: number = 60000): Promise<string | null> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeoutMs) {
      const response = await axios.get(`${API_URL}/messages`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      const messages = response.data['hydra:member'];
      for (const msg of messages) {
        if (msg.subject.includes(subjectPart)) {
          // Get message content
          const msgResponse = await axios.get(`${API_URL}/messages/${msg.id}`, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
          return msgResponse.data.html[0] || msgResponse.data.text;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
    return null;
  }

  getEmailAddress() {
    return this.address;
  }
}
