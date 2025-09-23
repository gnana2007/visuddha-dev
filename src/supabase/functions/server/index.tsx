import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Middleware for auth validation on protected routes
const requireAuth = async (c: any, next: any) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return c.json({ error: 'Authorization token required' }, 401);
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  c.set('user', user);
  await next();
};

// Health check endpoint
app.get("/make-server-d04c01d8/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ===== AUTHENTICATION ENDPOINTS =====

// User signup
app.post("/make-server-d04c01d8/auth/signup", async (c) => {
  try {
    const { email, password, name, userType, organization, permissions } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        userType, 
        organization, 
        permissions: permissions || getDefaultPermissions(userType)
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      type: userType,
      organization,
      permissions: permissions || getDefaultPermissions(userType),
      createdAt: new Date().toISOString(),
      isActive: true
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup endpoint error:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get user profile
app.get("/make-server-d04c01d8/auth/profile", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const profile = await kv.get(`user:${user.id}`);
    
    if (!profile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({ profile });
  } catch (error) {
    console.log('Profile fetch error:', error);
    return c.json({ error: 'Error fetching user profile' }, 500);
  }
});

// ===== BLOCKCHAIN SIMULATION ENDPOINTS =====

// Create a new blockchain transaction (unified data structure)
app.post("/make-server-d04c01d8/blockchain/transaction", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const transactionData = await c.req.json();
    
    const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const blockId = `block_${Date.now()}`;
    
    const transaction = {
      id: transactionId,
      blockId,
      timestamp: new Date().toISOString(),
      userId: user.id,
      type: transactionData.type, // 'collection', 'processing', 'testing', 'transfer'
      data: transactionData.data,
      location: transactionData.location,
      hash: generateSimpleHash(transactionData),
      previousHash: await getLastBlockHash(),
      status: 'confirmed',
      metadata: {
        deviceId: transactionData.deviceId,
        sensors: transactionData.sensors,
        gps: transactionData.gps,
        images: transactionData.images || []
      }
    };

    // Store transaction
    await kv.set(`transaction:${transactionId}`, transaction);
    
    // Update blockchain state
    await updateBlockchainState(transaction);
    
    // Update relevant product/batch records
    if (transactionData.productId) {
      await updateProductHistory(transactionData.productId, transaction);
    }

    return c.json({ transaction });
  } catch (error) {
    console.log('Transaction creation error:', error);
    return c.json({ error: 'Error creating blockchain transaction' }, 500);
  }
});

// Get transaction history for a product/batch
app.get("/make-server-d04c01d8/blockchain/history/:productId", async (c) => {
  try {
    const productId = c.req.param('productId');
    const history = await kv.get(`product_history:${productId}`);
    
    if (!history) {
      return c.json({ history: [] });
    }

    return c.json({ history: history.transactions || [] });
  } catch (error) {
    console.log('History fetch error:', error);
    return c.json({ error: 'Error fetching transaction history' }, 500);
  }
});

// ===== COLLECTION ENDPOINTS =====

// Start collection session
app.post("/make-server-d04c01d8/collection/start", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const { location, plantType, estimatedQuantity } = await c.req.json();
    
    const sessionId = `collection_${Date.now()}_${user.id}`;
    
    const session = {
      id: sessionId,
      userId: user.id,
      startTime: new Date().toISOString(),
      location,
      plantType,
      estimatedQuantity,
      status: 'active',
      collectedItems: []
    };

    await kv.set(`collection_session:${sessionId}`, session);
    
    return c.json({ session });
  } catch (error) {
    console.log('Collection start error:', error);
    return c.json({ error: 'Error starting collection session' }, 500);
  }
});

// Add collected item
app.post("/make-server-d04c01d8/collection/add-item", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const { sessionId, item } = await c.req.json();
    
    const session = await kv.get(`collection_session:${sessionId}`);
    if (!session || session.userId !== user.id) {
      return c.json({ error: 'Collection session not found or unauthorized' }, 404);
    }

    const itemId = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const collectedItem = {
      id: itemId,
      ...item,
      timestamp: new Date().toISOString(),
      collectorId: user.id
    };

    session.collectedItems.push(collectedItem);
    await kv.set(`collection_session:${sessionId}`, session);

    // Create blockchain transaction
    await createBlockchainTransaction(user.id, 'collection', {
      sessionId,
      itemId,
      plantType: item.plantType,
      quantity: item.quantity,
      quality: item.quality,
      location: item.location,
      gps: item.gps
    });

    return c.json({ item: collectedItem });
  } catch (error) {
    console.log('Add item error:', error);
    return c.json({ error: 'Error adding collected item' }, 500);
  }
});

// ===== PROCESSING ENDPOINTS =====

// Create processing batch
app.post("/make-server-d04c01d8/processing/batch", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const { sourceItems, processType, targetProducts } = await c.req.json();
    
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const batch = {
      id: batchId,
      processorId: user.id,
      startTime: new Date().toISOString(),
      sourceItems,
      processType,
      targetProducts,
      status: 'in_progress',
      qualityMetrics: {},
      iotData: []
    };

    await kv.set(`processing_batch:${batchId}`, batch);
    
    // Create blockchain transaction
    await createBlockchainTransaction(user.id, 'processing', {
      batchId,
      sourceItems,
      processType,
      targetProducts
    });

    return c.json({ batch });
  } catch (error) {
    console.log('Batch creation error:', error);
    return c.json({ error: 'Error creating processing batch' }, 500);
  }
});

// Update batch with IoT data
app.post("/make-server-d04c01d8/processing/iot-data", requireAuth, async (c) => {
  try {
    const { batchId, sensorData } = await c.req.json();
    
    const batch = await kv.get(`processing_batch:${batchId}`);
    if (!batch) {
      return c.json({ error: 'Batch not found' }, 404);
    }

    const iotEntry = {
      timestamp: new Date().toISOString(),
      ...sensorData
    };

    batch.iotData.push(iotEntry);
    await kv.set(`processing_batch:${batchId}`, batch);

    return c.json({ success: true, iotEntry });
  } catch (error) {
    console.log('IoT data update error:', error);
    return c.json({ error: 'Error updating IoT data' }, 500);
  }
});

// ===== LABORATORY ENDPOINTS =====

// Create test request
app.post("/make-server-d04c01d8/lab/test-request", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const { sampleId, testTypes, priority } = await c.req.json();
    
    const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const testRequest = {
      id: testId,
      labId: user.id,
      sampleId,
      testTypes,
      priority: priority || 'normal',
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      results: []
    };

    await kv.set(`lab_test:${testId}`, testRequest);
    
    return c.json({ testRequest });
  } catch (error) {
    console.log('Test request error:', error);
    return c.json({ error: 'Error creating test request' }, 500);
  }
});

// Submit test results
app.post("/make-server-d04c01d8/lab/test-results", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const { testId, results, certification } = await c.req.json();
    
    const testRequest = await kv.get(`lab_test:${testId}`);
    if (!testRequest) {
      return c.json({ error: 'Test request not found' }, 404);
    }

    testRequest.results = results;
    testRequest.certification = certification;
    testRequest.status = 'completed';
    testRequest.completedAt = new Date().toISOString();
    testRequest.certifiedBy = user.id;

    await kv.set(`lab_test:${testId}`, testRequest);
    
    // Create blockchain transaction
    await createBlockchainTransaction(user.id, 'testing', {
      testId,
      sampleId: testRequest.sampleId,
      results,
      certification,
      testTypes: testRequest.testTypes
    });

    return c.json({ testRequest });
  } catch (error) {
    console.log('Test results error:', error);
    return c.json({ error: 'Error submitting test results' }, 500);
  }
});

// ===== CONSUMER ENDPOINTS =====

// Verify product by QR code
app.get("/make-server-d04c01d8/consumer/verify/:productId", async (c) => {
  try {
    const productId = c.req.param('productId');
    
    // Get complete product history
    const history = await kv.get(`product_history:${productId}`);
    const product = await kv.get(`product:${productId}`);
    
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    // Get all related transactions
    const transactions = history ? history.transactions : [];
    
    // Get quality certifications
    const certifications = await kv.getByPrefix(`certification:${productId}`);
    
    const verificationData = {
      product,
      transactions,
      certifications,
      verifiedAt: new Date().toISOString(),
      authentic: true,
      qualityScore: calculateQualityScore(transactions, certifications)
    };

    return c.json({ verification: verificationData });
  } catch (error) {
    console.log('Product verification error:', error);
    return c.json({ error: 'Error verifying product' }, 500);
  }
});

// ===== ANALYTICS ENDPOINTS =====

// Get dashboard metrics
app.get("/make-server-d04c01d8/analytics/metrics", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const userProfile = await kv.get(`user:${user.id}`);
    
    // Get role-specific metrics
    const metrics = await getRoleSpecificMetrics(userProfile.type, user.id);
    
    return c.json({ metrics });
  } catch (error) {
    console.log('Metrics fetch error:', error);
    return c.json({ error: 'Error fetching metrics' }, 500);
  }
});

// Get supply chain visualization data
app.get("/make-server-d04c01d8/analytics/supply-chain", requireAuth, async (c) => {
  try {
    // Get all active transactions and build supply chain map
    const transactions = await kv.getByPrefix('transaction:');
    const supplyChainData = buildSupplyChainVisualization(transactions);
    
    return c.json({ supplyChain: supplyChainData });
  } catch (error) {
    console.log('Supply chain data error:', error);
    return c.json({ error: 'Error fetching supply chain data' }, 500);
  }
});

// ===== HELPER FUNCTIONS =====

function getDefaultPermissions(userType: string): string[] {
  const permissionMap = {
    farmer: ['collection', 'gps_tracking', 'product_scan'],
    processor: ['processing', 'batch_management', 'iot_monitoring', 'product_scan'],
    lab: ['testing', 'certification', 'quality_analysis', 'product_scan'],
    consumer: ['product_scan', 'traceability_view'],
    admin: ['full_access', 'user_management', 'system_config', 'operations']
  };
  return permissionMap[userType] || ['product_scan'];
}

function generateSimpleHash(data: any): string {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

async function getLastBlockHash(): Promise<string> {
  const lastBlock = await kv.get('blockchain:last_hash');
  return lastBlock || '0';
}

async function updateBlockchainState(transaction: any) {
  await kv.set('blockchain:last_hash', transaction.hash);
  
  const chainStats = await kv.get('blockchain:stats') || {
    totalTransactions: 0,
    totalBlocks: 0,
    lastUpdate: new Date().toISOString()
  };
  
  chainStats.totalTransactions += 1;
  chainStats.totalBlocks += 1;
  chainStats.lastUpdate = new Date().toISOString();
  
  await kv.set('blockchain:stats', chainStats);
}

async function updateProductHistory(productId: string, transaction: any) {
  const history = await kv.get(`product_history:${productId}`) || {
    productId,
    transactions: []
  };
  
  history.transactions.push(transaction);
  await kv.set(`product_history:${productId}`, history);
}

async function createBlockchainTransaction(userId: string, type: string, data: any) {
  const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const transaction = {
    id: transactionId,
    timestamp: new Date().toISOString(),
    userId,
    type,
    data,
    hash: generateSimpleHash({ userId, type, data, timestamp: new Date().toISOString() }),
    previousHash: await getLastBlockHash(),
    status: 'confirmed'
  };

  await kv.set(`transaction:${transactionId}`, transaction);
  await updateBlockchainState(transaction);
  
  return transaction;
}

function calculateQualityScore(transactions: any[], certifications: any[]): number {
  let score = 100;
  
  // Reduce score for each quality issue found in transactions
  transactions.forEach(tx => {
    if (tx.data?.quality && tx.data.quality < 80) {
      score -= (80 - tx.data.quality) * 0.5;
    }
  });
  
  // Increase score for certifications
  certifications.forEach(cert => {
    if (cert.status === 'passed') {
      score += 5;
    }
  });
  
  return Math.max(0, Math.min(100, score));
}

async function getRoleSpecificMetrics(userType: string, userId: string) {
  const baseMetrics = {
    totalTransactions: 0,
    recentActivity: 0,
    qualityScore: 95,
    complianceStatus: 'compliant'
  };

  try {
    switch (userType) {
      case 'farmer':
        const collections = await kv.getByPrefix(`collection_session:${userId}`);
        return {
          ...baseMetrics,
          totalCollections: collections.length,
          activeCollections: collections.filter(c => c.status === 'active').length,
          avgQuality: 92,
          gpsAccuracy: '98%'
        };
        
      case 'processor':
        const batches = await kv.getByPrefix(`processing_batch:${userId}`);
        return {
          ...baseMetrics,
          totalBatches: batches.length,
          activeBatches: batches.filter(b => b.status === 'in_progress').length,
          processingEfficiency: '94%',
          iotSensors: 12
        };
        
      case 'lab':
        const tests = await kv.getByPrefix(`lab_test:${userId}`);
        return {
          ...baseMetrics,
          totalTests: tests.length,
          pendingTests: tests.filter(t => t.status === 'pending').length,
          certificationRate: '96%',
          avgTurnaround: '18h'
        };
        
      default:
        return baseMetrics;
    }
  } catch (error) {
    console.log('Error getting role metrics:', error);
    return baseMetrics;
  }
}

function buildSupplyChainVisualization(transactions: any[]) {
  const nodes = new Map();
  const edges = [];
  
  transactions.forEach(tx => {
    // Add nodes for each participant
    if (!nodes.has(tx.userId)) {
      nodes.set(tx.userId, {
        id: tx.userId,
        type: 'user',
        transactions: 1
      });
    } else {
      nodes.get(tx.userId).transactions += 1;
    }
    
    // Add edges for product flow
    if (tx.data?.productId && tx.previousHash !== '0') {
      edges.push({
        from: tx.previousHash,
        to: tx.hash,
        type: tx.type,
        timestamp: tx.timestamp
      });
    }
  });
  
  return {
    nodes: Array.from(nodes.values()),
    edges,
    stats: {
      totalNodes: nodes.size,
      totalEdges: edges.length,
      networkHealth: '98%'
    }
  };
}

Deno.serve(app.fetch);