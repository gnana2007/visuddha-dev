import { auth, blockchain, collection, processing, laboratory, consumer, analytics } from './supabase/client';

// Demo user accounts for easy testing
export const DEMO_USERS = {
  farmer: {
    email: 'farmer@visuddha.com',
    password: 'demo123',
    name: 'Ravi Kumar',
    type: 'farmer',
    organization: 'Karnataka Farmers Collective',
    permissions: ['collection', 'gps_tracking', 'product_scan']
  },
  processor: {
    email: 'processor@visuddha.com',
    password: 'demo123',
    name: 'Priya Sharma',
    type: 'processor',
    organization: 'Himalayan Herbs Processing',
    permissions: ['processing', 'batch_management', 'iot_monitoring', 'product_scan']
  },
  lab: {
    email: 'lab@visuddha.com',
    password: 'demo123',
    name: 'Dr. Anjali Verma',
    type: 'lab',
    organization: 'Central Ayurvedic Research Lab',
    permissions: ['testing', 'certification', 'quality_analysis', 'product_scan']
  },
  consumer: {
    email: 'consumer@visuddha.com',
    password: 'demo123',
    name: 'Arjun Patel',
    type: 'consumer',
    organization: 'General Public',
    permissions: ['product_scan', 'traceability_view']
  },
  admin: {
    email: 'admin@visuddha.com',
    password: 'admin123',
    name: 'System Administrator',
    type: 'admin',
    organization: 'Visuddha Platform',
    permissions: ['full_access', 'user_management', 'system_config', 'operations']
  }
};

// Initialize demo data
export async function initializeDemoData() {
  try {
    console.log('Initializing demo data...');

    // Create demo users (if they don't exist)
    for (const [key, userData] of Object.entries(DEMO_USERS)) {
      try {
        await auth.signUp(userData.email, userData.password, {
          name: userData.name,
          userType: userData.type,
          organization: userData.organization,
          permissions: userData.permissions
        });
        console.log(`Created demo user: ${userData.name} (${userData.type})`);
      } catch (error) {
        // User might already exist, which is fine
        console.log(`Demo user ${userData.type} may already exist`);
      }
    }

    // Create sample blockchain transactions
    await createSampleTransactions();
    
    console.log('Demo data initialization completed');
    return { success: true };
  } catch (error) {
    console.error('Error initializing demo data:', error);
    return { success: false, error };
  }
}

async function createSampleTransactions() {
  try {
    // Sample collection transaction
    await blockchain.createTransaction({
      type: 'collection',
      productId: 'ashwagandha_001',
      data: {
        plantType: 'Ashwagandha',
        quantity: 50,
        quality: 95,
        location: 'Rajasthan, India',
        gps: { lat: 26.9124, lng: 75.7873 },
        harvestDate: new Date().toISOString(),
        farmer: 'Ravi Kumar'
      },
      location: 'Field A-1, Rajasthan',
      deviceId: 'mobile_001',
      sensors: {
        temperature: 28,
        humidity: 45,
        soilPh: 7.2
      }
    });

    // Sample processing transaction
    await blockchain.createTransaction({
      type: 'processing',
      productId: 'ashwagandha_powder_001',
      data: {
        sourceProduct: 'ashwagandha_001',
        processType: 'drying_grinding',
        inputQuantity: 50,
        outputQuantity: 15,
        qualityGrade: 'Premium',
        processDate: new Date().toISOString(),
        processor: 'Priya Sharma'
      },
      location: 'Processing Unit B, Himachal',
      deviceId: 'iot_processor_001',
      sensors: {
        temperature: 60,
        humidity: 20,
        duration: 480 // 8 hours
      }
    });

    // Sample testing transaction
    await blockchain.createTransaction({
      type: 'testing',
      productId: 'ashwagandha_powder_001',
      data: {
        testTypes: ['purity', 'alkaloid_content', 'heavy_metals', 'microbial'],
        results: {
          purity: 98.5,
          alkaloidContent: 2.3,
          heavyMetals: 'within_limits',
          microbial: 'safe'
        },
        certification: {
          status: 'passed',
          grade: 'A+',
          certifiedBy: 'Dr. Anjali Verma',
          validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        },
        testDate: new Date().toISOString()
      },
      location: 'Central Ayurvedic Research Lab',
      deviceId: 'lab_equipment_001'
    });

    console.log('Sample transactions created successfully');
  } catch (error) {
    console.log('Note: Sample transactions may already exist or user not authenticated');
  }
}

// User management
export class UserService {
  static async login(userType: string) {
    const userData = DEMO_USERS[userType as keyof typeof DEMO_USERS];
    if (!userData) {
      throw new Error('Invalid user type');
    }

    try {
      const { data, error } = await auth.signIn(userData.email, userData.password);
      if (error) throw error;

      // Get full user profile
      const { data: profile, error: profileError } = await auth.getProfile();
      if (profileError) {
        console.warn('Could not fetch user profile:', profileError);
        // Return basic user data
        return {
          ...userData,
          id: data.user?.id
        };
      }

      return profile;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async logout() {
    return auth.signOut();
  }

  static async getCurrentUser() {
    try {
      const { data: session } = await auth.getSession();
      if (!session.session) return null;

      const { data: profile } = await auth.getProfile();
      return profile;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
}

// Collection service
export class CollectionService {
  static async startCollection(location: any, plantType: string, estimatedQuantity: number) {
    try {
      const response = await collection.startSession({
        location,
        plantType,
        estimatedQuantity
      });
      return response.session;
    } catch (error) {
      console.error('Start collection error:', error);
      throw error;
    }
  }

  static async addCollectedItem(sessionId: string, item: any) {
    try {
      const response = await collection.addItem(sessionId, item);
      return response.item;
    } catch (error) {
      console.error('Add item error:', error);
      throw error;
    }
  }
}

// Processing service
export class ProcessingService {
  static async createBatch(sourceItems: any[], processType: string, targetProducts: any[]) {
    try {
      const response = await processing.createBatch({
        sourceItems,
        processType,
        targetProducts
      });
      return response.batch;
    } catch (error) {
      console.error('Create batch error:', error);
      throw error;
    }
  }

  static async updateIoTData(batchId: string, sensorData: any) {
    try {
      const response = await processing.updateIoTData(batchId, sensorData);
      return response.iotEntry;
    } catch (error) {
      console.error('Update IoT data error:', error);
      throw error;
    }
  }
}

// Laboratory service
export class LaboratoryService {
  static async createTestRequest(sampleId: string, testTypes: string[], priority: string = 'normal') {
    try {
      const response = await laboratory.createTestRequest({
        sampleId,
        testTypes,
        priority
      });
      return response.testRequest;
    } catch (error) {
      console.error('Create test request error:', error);
      throw error;
    }
  }

  static async submitTestResults(testId: string, results: any, certification: any) {
    try {
      const response = await laboratory.submitResults(testId, results, certification);
      return response.testRequest;
    } catch (error) {
      console.error('Submit test results error:', error);
      throw error;
    }
  }
}

// Consumer service
export class ConsumerService {
  static async verifyProduct(productId: string) {
    try {
      const response = await consumer.verifyProduct(productId);
      return response.verification;
    } catch (error) {
      console.error('Product verification error:', error);
      throw error;
    }
  }

  static async getProductHistory(productId: string) {
    try {
      const response = await blockchain.getProductHistory(productId);
      return response.history;
    } catch (error) {
      console.error('Get product history error:', error);
      throw error;
    }
  }
}

// Analytics service
export class AnalyticsService {
  static async getDashboardMetrics() {
    try {
      const response = await analytics.getMetrics();
      return response.metrics;
    } catch (error) {
      console.error('Get metrics error:', error);
      // Return mock data as fallback
      return {
        totalTransactions: 156,
        recentActivity: 23,
        qualityScore: 95,
        complianceStatus: 'compliant'
      };
    }
  }

  static async getSupplyChainData() {
    try {
      const response = await analytics.getSupplyChainData();
      return response.supplyChain;
    } catch (error) {
      console.error('Get supply chain data error:', error);
      // Return mock data as fallback
      return {
        nodes: [],
        edges: [],
        stats: {
          totalNodes: 0,
          totalEdges: 0,
          networkHealth: '0%'
        }
      };
    }
  }
}

// Blockchain service
export class BlockchainService {
  static async createTransaction(type: string, data: any, metadata: any = {}) {
    try {
      const response = await blockchain.createTransaction({
        type,
        data,
        ...metadata
      });
      return response.transaction;
    } catch (error) {
      console.error('Create blockchain transaction error:', error);
      throw error;
    }
  }

  static async getTransactionHistory(productId: string) {
    try {
      const response = await blockchain.getProductHistory(productId);
      return response.history;
    } catch (error) {
      console.error('Get transaction history error:', error);
      return [];
    }
  }
}

// Initialize demo data on app start
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    initializeDemoData().catch(console.error);
  }, 1000); // Delay to ensure app is loaded
}