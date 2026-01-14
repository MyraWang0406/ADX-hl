import { useState } from "react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Bot, Code, Database, Play, Save, Settings, ShieldAlert } from "lucide-react";

export default function Admin() {
  const [bidders, setBidders] = useState([
    { id: 1, name: "TechAds", strategy: "tCPA", status: true, budget: 5000, target: 2.5 },
    { id: 2, name: "RetailMax", strategy: "tROAS", status: true, budget: 8000, target: 4.0 },
    { id: 3, name: "DirectBid", strategy: "Manual", status: true, budget: 2000, target: 1.5 },
    { id: 4, name: "SmartBid", strategy: "Explore", status: false, budget: 1000, target: 0.0 },
  ]);

  const toggleBidder = (id: number) => {
    setBidders(bidders.map(b => b.id === id ? { ...b, status: !b.status } : b));
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Settings className="h-8 w-8 text-blue-600" />
              System Administration
            </h1>
            <p className="text-slate-500 mt-2">Configure bidders, manage creatives, and monitor system health</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>

        <Tabs defaultValue="bidders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="bidders" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Bidders</TabsTrigger>
            <TabsTrigger value="creatives" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Creatives</TabsTrigger>
            <TabsTrigger value="rules" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Rules</TabsTrigger>
            <TabsTrigger value="system" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">System</TabsTrigger>
          </TabsList>

          <TabsContent value="bidders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bidders.map((bidder) => (
                <Card key={bidder.id} className={`border-0 shadow-md transition-all duration-200 ${bidder.status ? "bg-white" : "bg-slate-50 opacity-80"}`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${bidder.status ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-500"}`}>
                        <Bot className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-800">{bidder.name}</CardTitle>
                        <CardDescription className="font-mono text-xs">{bidder.strategy} Strategy</CardDescription>
                      </div>
                    </div>
                    <Switch checked={bidder.status} onCheckedChange={() => toggleBidder(bidder.id)} />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-slate-500">Daily Budget</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                          <Input type="number" defaultValue={bidder.budget} className="pl-6 bg-slate-50 border-slate-200" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-slate-500">Target {bidder.strategy === "tROAS" ? "ROAS" : "CPA"}</Label>
                        <Input type="number" defaultValue={bidder.target} className="bg-slate-50 border-slate-200" />
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Win Rate</span>
                        <span className="font-bold text-slate-700">{(Math.random() * 30 + 10).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.random() * 30 + 10}%` }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center min-h-[200px] hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl text-blue-500">+</span>
                  </div>
                  <h3 className="font-medium text-slate-600">Add New Bidder</h3>
                  <p className="text-sm text-slate-400">Configure a new bidding agent</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="creatives">
            <Card>
              <CardHeader>
                <CardTitle>Creative Library</CardTitle>
                <CardDescription>Manage ad creatives and assets</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-slate-400 bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-lg m-6">
                Creative management interface placeholder
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-red-50 border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <ShieldAlert className="h-5 w-5" />
                    Frequency Cap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Global Cap</Label>
                      <Input className="w-20 bg-white" defaultValue="10" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label>Per User/Day</Label>
                      <Input className="w-20 bg-white" defaultValue="3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-amber-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Database className="h-5 w-5" />
                    Budget Pacing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Smoothing</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Overspend Limit</Label>
                      <span className="font-mono font-bold text-amber-700">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Code className="h-5 w-5 text-slate-500" />
                      <div>
                        <div className="font-medium">Demo Script</div>
                        <div className="text-xs text-slate-500">Run a simulation of 100 auctions</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="mr-2 h-3 w-3" /> Run Simulation
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-slate-500" />
                      <div>
                        <div className="font-medium">Export Logs</div>
                        <div className="text-xs text-slate-500">Download auction logs as CSV</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
