import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, ArrowRight, Pause, Play, Search } from "lucide-react";

// Mock data generator
const generateMockAuction = (id: number) => {
  const campaigns = ["Summer Sale", "App Install", "Brand Awareness", "Retargeting"];
  const bidders = ["TechAds (tCPA)", "RetailMax (tROAS)", "DirectBid (Manual)", "SmartBid (Explore)"];
  const apps = ["News Daily", "Gaming Hub", "Social Connect", "Weather Pro"];
  
  const winnerIdx = Math.floor(Math.random() * bidders.length);
  const secondPrice = (Math.random() * 2 + 0.5).toFixed(2);
  const winningPrice = (parseFloat(secondPrice) + Math.random() * 0.5).toFixed(2);
  
  return {
    id: `auc_${Date.now()}_${id}`,
    timestamp: new Date().toISOString(),
    app: apps[Math.floor(Math.random() * apps.length)],
    winner: bidders[winnerIdx],
    campaign: campaigns[Math.floor(Math.random() * campaigns.length)],
    winningBid: winningPrice,
    clearingPrice: secondPrice,
    bidsCount: Math.floor(Math.random() * 3) + 2,
    latency: Math.floor(Math.random() * 80) + 20,
  };
};

export default function AuctionTape() {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate WebSocket connection
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const newAuction = generateMockAuction(Math.floor(Math.random() * 1000));
      setAuctions(prev => [newAuction, ...prev].slice(0, 50)); // Keep last 50
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              Auction Tape
            </h1>
            <p className="text-slate-500 mt-2">Real-time stream of bid requests and auction results via WebSocket</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant={isPlaying ? "default" : "secondary"} className={isPlaying ? "bg-green-500 hover:bg-green-600" : ""}>
              {isPlaying ? "● Live Stream" : "○ Paused"}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsPlaying(!isPlaying)}
              className="border-slate-200"
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? "Pause" : "Resume"}
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-lg overflow-hidden bg-white/80 backdrop-blur">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium text-slate-700">Recent Auctions</CardTitle>
              <div className="text-sm text-slate-400 font-mono">
                {auctions.length} events captured
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto" ref={scrollRef}>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>Auction ID</TableHead>
                    <TableHead>App / Publisher</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead className="text-right">Winning Bid</TableHead>
                    <TableHead className="text-right">Clearing Price</TableHead>
                    <TableHead className="text-right">Latency</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auctions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center text-slate-500">
                        Waiting for bid requests...
                      </TableCell>
                    </TableRow>
                  ) : (
                    auctions.map((auction, i) => (
                      <TableRow key={auction.id} className={`group transition-colors ${i === 0 ? "bg-blue-50/50 animate-in fade-in slide-in-from-top-2" : "hover:bg-slate-50"}`}>
                        <TableCell className="font-mono text-xs text-slate-500">
                          {new Date(auction.timestamp).toLocaleTimeString()}
                        </TableCell>
                        <TableCell className="font-mono text-xs font-medium text-blue-600">
                          {auction.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                              {auction.app[0]}
                            </div>
                            <span className="text-sm font-medium text-slate-700">{auction.app}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-white text-slate-700 border-slate-200 font-normal">
                            {auction.winner}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono text-slate-900">
                          ${auction.winningBid}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-green-600">
                          ${auction.clearingPrice}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            auction.latency < 50 ? "bg-green-100 text-green-700" : 
                            auction.latency < 100 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                          }`}>
                            {auction.latency}ms
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link href={`/explain/${auction.id}`}>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              Explain <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
