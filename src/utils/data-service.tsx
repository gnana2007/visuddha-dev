// Mock data service - Supabase removed

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
    organization: 'Viśuddha Platform',
    permissions: ['full_access', 'user_management', 'system_config', 'operations']
  }
};

// Mock data storage
let mockUsers: any[] = [];
let mockTransactions: any[] = [];
let mockProducts: any[] = [];
let mockSensors: any[] = [];
let mockAnalytics: any[] = [];

// Initialize demo data
export async function initializeDemoData() {
  try {
    console.log('Initializing demo data...');

    // Initialize mock users
    mockUsers = Object.values(DEMO_USERS);
    
    // Create sample transactions
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
    const collectionTx = {
      id: 'tx_collection_001',
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
      },
      timestamp: new Date().toISOString(),
      hash: 'mock_hash_collection_001'
    };

    // Sample processing transaction
    const processingTx = {
      id: 'tx_processing_001',
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
      },
      timestamp: new Date().toISOString(),
      hash: 'mock_hash_processing_001'
    };

    // Sample testing transaction
    const testingTx = {
      id: 'tx_testing_001',
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
      deviceId: 'lab_equipment_001',
      sensors: {
        temperature: 22,
        humidity: 45,
        pressure: 1013
      },
      timestamp: new Date().toISOString(),
      hash: 'mock_hash_testing_001'
    };

    mockTransactions = [collectionTx, processingTx, testingTx];
    
    // Create sample products
    mockProducts = [
      {
        id: 'ashwagandha_001',
        name: 'Ashwagandha Root',
        type: 'raw_herb',
        status: 'processed',
        origin: 'Rajasthan, India',
        harvestDate: new Date().toISOString(),
        farmer: 'Ravi Kumar',
        quality: 95
      },
      {
        id: 'ashwagandha_powder_001',
        name: 'Ashwagandha Powder',
        type: 'processed_product',
        status: 'certified',
        origin: 'Himachal Pradesh, India',
        processDate: new Date().toISOString(),
        processor: 'Priya Sharma',
        quality: 98.5
      }
    ];

    // Create sample sensor data
    mockSensors = [
      {
        id: 'sensor_001',
        type: 'temperature',
        value: 28,
        unit: '°C',
        location: 'Field A-1',
        timestamp: new Date().toISOString()
      },
      {
        id: 'sensor_002',
        type: 'humidity',
        value: 45,
        unit: '%',
        location: 'Field A-1',
        timestamp: new Date().toISOString()
      }
    ];

    // Create sample analytics
    mockAnalytics = [
      {
        id: 'analytics_001',
        type: 'quality_trend',
        data: {
          period: 'last_30_days',
          averageQuality: 94.2,
          trend: 'improving',
          samples: 150
        },
        timestamp: new Date().toISOString()
      }
    ];

    } catch (error) {
    console.error('Error creating sample transactions:', error);
  }
}

// Mock User Service
export const UserService = {
  async getCurrentUser() {
    // Return the first user as current user for demo
    return mockUsers[0] || null;
  },

  async login(userType: string) {
    const user = mockUsers.find(u => u.type === userType);
    if (user) {
      return user;
    }
    throw new Error('User not found');
  },

  async logout() {
    // Mock logout - just return success
    return { success: true };
  },

  async signUp(email: string, password: string, userData: any) {
    const newUser = {
      email,
      password,
      ...userData,
      id: `user_${Date.now()}`
    };
    mockUsers.push(newUser);
    return newUser;
  }
};

// Mock Blockchain Service
export const BlockchainService = {
  async createTransaction(transactionData: any) {
    const transaction = {
      id: `tx_${Date.now()}`,
      ...transactionData,
      timestamp: new Date().toISOString(),
      hash: `mock_hash_${Date.now()}`
    };
    mockTransactions.push(transaction);
    return transaction;
  },

  async getTransactions(productId?: string) {
    if (productId) {
      return mockTransactions.filter(tx => tx.productId === productId);
    }
    return mockTransactions;
  },

  async getTransactionById(id: string) {
    return mockTransactions.find(tx => tx.id === id);
  },

  async verifyTransaction(hash: string) {
    const transaction = mockTransactions.find(tx => tx.hash === hash);
    return { verified: !!transaction, transaction };
  }
};

// Mock Collection Service
export const CollectionService = {
  async createCollection(collectionData: any) {
    const collection = {
      id: `collection_${Date.now()}`,
      ...collectionData,
      timestamp: new Date().toISOString()
    };
    return collection;
  },

  async getCollections(userId?: string) {
    // Return mock collections
    return [
      {
        id: 'collection_001',
        plantType: 'Ashwagandha',
        quantity: 50,
        location: 'Rajasthan, India',
        quality: 95,
        timestamp: new Date().toISOString()
      }
    ];
  }
};

// Mock Processing Service
export const ProcessingService = {
  async createBatch(batchData: any) {
    const batch = {
      id: `batch_${Date.now()}`,
      ...batchData,
      timestamp: new Date().toISOString()
    };
    return batch;
  },

  async getBatches() {
    return [
      {
        id: 'batch_001',
        productType: 'Ashwagandha Powder',
        inputQuantity: 50,
        outputQuantity: 15,
        quality: 98.5,
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    ];
  }
};

// Mock Laboratory Service
export const LaboratoryService = {
  async createTest(testData: any) {
    const test = {
      id: `test_${Date.now()}`,
      ...testData,
      timestamp: new Date().toISOString()
    };
    return test;
  },

  async getTests() {
    return [
      {
        id: 'test_001',
        productId: 'ashwagandha_powder_001',
        testType: 'purity',
        result: 98.5,
        status: 'passed',
        timestamp: new Date().toISOString()
      }
    ];
  }
};

// Mock Consumer Service
export const ConsumerService = {
  async scanProduct(qrCode: string) {
    const product = mockProducts.find(p => p.id === qrCode);
    if (product) {
      const transactions = mockTransactions.filter(tx => tx.productId === product.id);
      return {
        product,
        transactions,
        traceability: {
          complete: true,
          steps: transactions.length,
          verified: true
        }
      };
    }
    throw new Error('Product not found');
  }
};

// Mock Analytics Service
export const AnalyticsService = {
  async getMetrics(userType?: string) {
    return {
      totalProducts: mockProducts.length,
      totalTransactions: mockTransactions.length,
      averageQuality: 96.8,
      complianceRate: 98.5,
      activeUsers: mockUsers.length
    };
  },

  async getQualityTrends() {
    return {
      period: 'last_30_days',
      trend: 'improving',
      data: [
        { date: '2024-01-01', quality: 94.2 },
        { date: '2024-01-02', quality: 95.1 },
        { date: '2024-01-03', quality: 96.8 }
      ]
    };
  }
};

// Mock IoT Service
export const IoTService = {
  async getSensorData(deviceId?: string) {
    if (deviceId) {
      return mockSensors.filter(s => s.deviceId === deviceId);
    }
    return mockSensors;
  },

  async updateSensorData(sensorData: any) {
    const sensor = {
      id: `sensor_${Date.now()}`,
      ...sensorData,
      timestamp: new Date().toISOString()
    };
    mockSensors.push(sensor);
    return sensor;
  }
};

// Initialize demo data on import
initializeDemoData();