import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Lock, Unlock, Database, LinkIcon, CheckCircle, XCircle, Key, Shield, Network, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IdentityVerificationDemo = () => {
  const [traditionalInput, setTraditionalInput] = useState('');
  const [traditionalVerified, setTraditionalVerified] = useState(false);
  const [blockchainInput, setBlockchainInput] = useState('');
  const [blockchainVerified, setBlockchainVerified] = useState(false);
  const [hash, setHash] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [signature, setSignature] = useState('');
  const [networkNodes, setNetworkNodes] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState('verification');

  const centralDatabase = {
    'john.doe': {
      id: 'john.doe',
      name: 'John Doe',
      status: 'verified',
      lastVerified: '2024-01-15'
    },
    'jane.smith': {
      id: 'jane.smith',
      name: 'Jane Smith',
      status: 'verified',
      lastVerified: '2024-02-20'
    },
    'bob.wilson': {
      id: 'bob.wilson',
      name: 'Bob Wilson',
      status: 'verified',
      lastVerified: '2024-03-10'
    }
  };

  const generateKeyPair = () => {
    const simPublicKey = 'pk_' + Math.random().toString(36).substr(2, 10);
    const simPrivateKey = 'sk_' + Math.random().toString(36).substr(2, 10);
    setPublicKey(simPublicKey);
    setPrivateKey(simPrivateKey);
  };

  const signData = () => {
    if (blockchainInput && privateKey) {
      const simSignature = 'sig_' + btoa(blockchainInput + privateKey).slice(0, 20);
      setSignature(simSignature);
    }
  };

  const verifyTraditional = () => {
    const user = centralDatabase[traditionalInput.toLowerCase()];
    setTraditionalVerified(!!user);
  };

  useEffect(() => {
    const nodes = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      status: Math.random() > 0.3 ? 'verified' : 'pending',
      timestamp: Date.now() - Math.random() * 1000000
    }));
    setNetworkNodes(nodes);
  }, []);

  const performanceData = [
    { name: 'Query Time', traditional: 120, blockchain: 80 },
    { name: 'Verification Time', traditional: 200, blockchain: 150 },
    { name: 'Security Score', traditional: 75, blockchain: 95 },
    { name: 'Decentralization', traditional: 20, blockchain: 100 },
    { name: 'Cost Efficiency', traditional: 60, blockchain: 85 }
  ];

  const Features = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {['verification', 'cryptography', 'analysis'].map(feature => (
        <Button
          key={feature}
          variant={selectedFeature === feature ? "default" : "outline"}
          onClick={() => setSelectedFeature(feature)}
          className="capitalize"
        >
          {feature}
        </Button>
      ))}
    </div>
  );

  const CryptographyTools = () => (
    <Card className="mb-4">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-4">
          <Button onClick={generateKeyPair} className="w-full">
            Generate Key Pair
          </Button>
          {publicKey && (
            <Alert>
              <AlertTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>Key Pair Generated</span>
              </AlertTitle>
              <AlertDescription className="space-y-2">
                <p>Public Key: {publicKey}</p>
                <p className="text-sm text-gray-500">Private Key: {privateKey}</p>
              </AlertDescription>
            </Alert>
          )}
          {publicKey && (
            <Button onClick={signData} className="w-full">
              Sign Data
            </Button>
          )}
          {signature && (
            <Alert>
              <AlertTitle>Digital Signature</AlertTitle>
              <AlertDescription>{signature}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const NetworkVisualization = () => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {networkNodes.map(node => (
              <div
                key={node.id}
                className={`p-4 rounded-full ${
                  node.status === 'verified' ? 'bg-green-100' : 'bg-yellow-100'
                }`}
              >
                <Network className={`h-8 w-8 ${
                  node.status === 'verified' ? 'text-green-600' : 'text-yellow-600'
                }`} />
              </div>
            ))}
          </div>
          <div className="text-sm text-center text-gray-500">
            Network Consensus Status: {networkNodes.filter(n => n.status === 'verified').length} / {networkNodes.length} Nodes
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PerformanceAnalysis = () => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="traditional" stroke="#8884d8" name="Traditional" />
              <Line type="monotone" dataKey="blockchain" stroke="#82ca9d" name="Blockchain" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-4xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Advanced Identity Verification Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Features />
          
          {selectedFeature === 'verification' && (
            <Tabs defaultValue="traditional">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="traditional">Traditional Verification</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="traditional" className="space-y-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Database className="h-5 w-5" />
                      <span>Central Database Verification</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        Test with these IDs: john.doe, jane.smith, bob.wilson
                      </p>
                      <Input 
                        placeholder="Enter identity (e.g., john.doe)"
                        value={traditionalInput}
                        onChange={(e) => setTraditionalInput(e.target.value)}
                      />
                      <Button onClick={verifyTraditional} className="w-full">
                        Verify Identity
                      </Button>
                    </div>

                    {traditionalInput && (
                      <Alert variant={traditionalVerified ? "default" : "destructive"}>
                        <AlertTitle className="flex items-center space-x-2">
                          {traditionalVerified ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                          <span>{traditionalVerified ? "Verified" : "Not Verified"}</span>
                        </AlertTitle>
                        <AlertDescription>
                          {traditionalVerified 
                            ? `Identity found in central database: ${centralDatabase[traditionalInput.toLowerCase()].name}`
                            : "Identity not found in central database. Please check the ID and try again."}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blockchain" className="space-y-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="h-5 w-5" />
                      <span>Blockchain Verification</span>
                    </div>
                    
                    <Input 
                      placeholder="Enter identity data"
                      value={blockchainInput}
                      onChange={(e) => setBlockchainInput(e.target.value)}
                    />
                    <Button 
                      onClick={() => {
                        setHash(btoa(blockchainInput).slice(0, 32));
                        setBlockchainVerified(true);
                      }} 
                      className="w-full"
                    >
                      Verify on Blockchain
                    </Button>

                    {blockchainInput && blockchainVerified && (
                      <Alert>
                        <AlertTitle className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5" />
                          <span>Blockchain Verification Complete</span>
                        </AlertTitle>
                        <AlertDescription className="space-y-2">
                          <p>Hash: {hash}</p>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                              <Lock className="h-4 w-4" />
                              <span>Immutable</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Shield className="h-4 w-4" />
                              <span>Decentralized</span>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {selectedFeature === 'cryptography' && (
            <>
              <CryptographyTools />
              <NetworkVisualization />
            </>
          )}

          {selectedFeature === 'analysis' && (
            <>
              <PerformanceAnalysis />
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Key Differences</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Security: Blockchain provides enhanced security through cryptographic proofs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Network className="h-4 w-4" />
                        <span>Decentralization: No single point of failure</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Immutability: Records cannot be altered once verified</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Transparency: All verifications are publicly auditable</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IdentityVerificationDemo;
