import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

// API base URL for server functions
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d04c01d8`;

// Helper function to make authenticated API calls
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Authentication helpers
export const auth = {
  async signUp(email: string, password: string, userData: any) {
    try {
      const response = await apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          ...userData
        })
      });
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async getSession() {
    return supabase.auth.getSession();
  },

  async getUser() {
    return supabase.auth.getUser();
  },

  async getProfile() {
    try {
      const response = await apiCall('/auth/profile');
      return { data: response.profile, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};

// Blockchain operations
export const blockchain = {
  async createTransaction(data: any) {
    return apiCall('/blockchain/transaction', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async getProductHistory(productId: string) {
    return apiCall(`/blockchain/history/${productId}`);
  }
};

// Collection operations
export const collection = {
  async startSession(data: any) {
    return apiCall('/collection/start', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async addItem(sessionId: string, item: any) {
    return apiCall('/collection/add-item', {
      method: 'POST',
      body: JSON.stringify({ sessionId, item })
    });
  }
};

// Processing operations
export const processing = {
  async createBatch(data: any) {
    return apiCall('/processing/batch', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async updateIoTData(batchId: string, sensorData: any) {
    return apiCall('/processing/iot-data', {
      method: 'POST',
      body: JSON.stringify({ batchId, sensorData })
    });
  }
};

// Laboratory operations
export const laboratory = {
  async createTestRequest(data: any) {
    return apiCall('/lab/test-request', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async submitResults(testId: string, results: any, certification: any) {
    return apiCall('/lab/test-results', {
      method: 'POST',
      body: JSON.stringify({ testId, results, certification })
    });
  }
};

// Consumer operations
export const consumer = {
  async verifyProduct(productId: string) {
    return apiCall(`/consumer/verify/${productId}`);
  }
};

// Analytics operations
export const analytics = {
  async getMetrics() {
    return apiCall('/analytics/metrics');
  },

  async getSupplyChainData() {
    return apiCall('/analytics/supply-chain');
  }
};

// Real-time subscriptions
export const subscriptions = {
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};