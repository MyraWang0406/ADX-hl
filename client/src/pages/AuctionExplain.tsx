import { useState } from "react";
import { useRoute } from "wouter";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, CheckCircle2, ChevronDown, ChevronRight, DollarSign, Filter, Gavel, Trophy, Zap } from "lucide-react";

export default function AuctionExplain() {
  const [match, params] = useRoute("/explain/:id");
  const auctionId = params?.id || "auc_demo_123";
  
  // Mock data for explanation
  const steps = [
    {
      id: "step1",
      title: "Step 1: Candidate Filtering",
      icon: Filter,
      color: "text-blue-600",
      bg: "bg-blue-50",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Applied Filters:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                Quality Score ≥ 50
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                Bid Floor ≥ $0.01
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                Bidder Status must be 'active'
              </li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="text-sm font-medium text-green-800 mb-2">✓ Eligible Bidders (4)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-green-700">
              <div>• TechAds (tCPA)</div>
              <div>• RetailMax (tROAS)</div>
              <div>• DirectBid (Manual)</div>
              <div>• SmartBid (Explore)</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "step2",
      title: "Step 2: Bid Construction",
      icon: Zap,
      color: "text-amber-600",
      bg: "bg-amber-50",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Final bid for each bidder is calculated from base bid plus adjustment factors:</p>
          
          <Card className="border-amber-200 bg-amber-50/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-800">Bidder 2 (tROAS) - Final Bid: $2.18 ⭐</span>
              </div>
              <Separator className="my-2 bg-amber-200" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-slate-600">Base Price:</div>
                <div className="text-right font-mono">$1.80</div>
                
                <div className="text-slate-600">Adjustments:</div>
                <div className="text-right text-xs space-y-1">
                  <div className="text-green-600">Device (Mobile): ×1.1</div>
                  <div className="text-green-600">Time (Evening): ×1.1</div>
                  <div className="text-slate-500">Geo (US): ×1.0</div>
                </div>
                
                <div className="font-bold text-blue-700">Final Bid:</div>
                <div className="text-right font-bold font-mono text-blue-700">$2.18</div>
              </div>
              <div className="mt-3 text-xs text-slate-400 bg-white/50 p-2 rounded">
                Predicted Value: $3.20 | CTR: 3.0% | CVR: 1.8%
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "step3",
      title: "Step 3: Bidding Round & Ranking",
      icon: Trophy,
      color: "text-purple-600",
      bg: "bg-purple-50",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Bids ranked from highest to lowest:</p>
          {[
            { rank: 1, bidder: "Bidder 2", campaign: "Campaign 2", bid: "$2.18", status: "Winner", color: "bg-yellow-100 border-yellow-300" },
            { rank: 2, bidder: "Bidder 3", campaign: "Campaign 3", bid: "$1.82", status: "Runner-up", color: "bg-slate-50 border-slate-200" },
            { rank: 3, bidder: "Bidder 1", campaign: "Campaign 1", bid: "$1.45", status: "Lost", color: "bg-slate-50 border-slate-200" },
          ].map((item) => (
            <div key={item.rank} className={`flex items-center justify-between p-3 rounded-lg border ${item.color}`}>
              <div className="flex items-center gap-3">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${item.rank === 1 ? "bg-yellow-500 text-white" : "bg-slate-200 text-slate-600"}`}>
                  {item.rank}
                </div>
                <div>
                  <div className="font-medium text-sm text-slate-900">{item.bidder}</div>
                  <div className="text-xs text-slate-500">{item.campaign}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold font-mono text-slate-900">{item.bid}</div>
                {item.status === "Winner" && <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">Winner</span>}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: "step4",
      title: "Step 4: Clearing Price Calculation",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <h4 className="text-sm font-bold text-blue-800 mb-1">Auction Type: Second Price</h4>
            <p className="text-xs text-blue-600">Winner pays the second-highest bid price. This encourages truthful bidding.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-sm text-slate-600">Winning Bid:</span>
              <span className="font-mono font-medium text-slate-400 line-through">$2.18</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-sm text-slate-600">Second Highest Bid:</span>
              <span className="font-mono font-medium text-slate-900">$1.82</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm">
              <span className="font-bold text-yellow-800">Clearing Price (2nd Price):</span>
              <span className="font-mono text-xl font-bold text-yellow-700">$1.82</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "step5",
      title: "Step 5: Settlement & Accounting",
      icon: Gavel,
      color: "text-slate-600",
      bg: "bg-slate-100",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-50 p-3 rounded border border-red-100 text-center">
              <div className="text-xs text-red-500 mb-1">Advertiser Pays</div>
              <div className="font-bold text-red-700">$1.82</div>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-100 text-center">
              <div className="text-xs text-green-500 mb-1">Publisher Earns</div>
              <div className="font-bold text-green-700">$1.547</div>
              <div className="text-[10px] text-green-400">(85%)</div>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-100 text-center">
              <div className="text-xs text-blue-500 mb-1">Platform Fee</div>
              <div className="font-bold text-blue-700">$0.273</div>
              <div className="text-[10px] text-blue-400">(15%)</div>
            </div>
          </div>
          
          <div className="text-xs font-mono text-slate-400 pt-2 border-t border-slate-100">
            <div>Winner: Bidder 2</div>
            <div>Campaign: Campaign 2</div>
            <div>Impression ID: 12345</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <Layout>
      <div className="container py-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <span className="uppercase tracking-wider font-bold">Auction Explain</span>
            <span>/</span>
            <span className="font-mono">{auctionId}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Bid Calculation Trace</h1>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Total Bids: 4
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Latency: 45ms
            </Badge>
          </div>
        </div>

        <div className="space-y-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 -z-10"></div>

          {steps.map((step, index) => (
            <Collapsible key={step.id} defaultOpen={true} className="group">
              <Card className="border-0 shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
                <CollapsibleTrigger className="w-full text-left">
                  <CardHeader className={`${step.bg} py-4 flex flex-row items-center justify-between cursor-pointer`}>
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center ${step.color}`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base font-bold text-slate-800">{step.title}</CardTitle>
                    </div>
                    <ChevronDown className="h-5 w-5 text-slate-400 transition-transform group-data-[state=open]:rotate-180" />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-6 bg-white">
                    {step.content}
                  </CardContent>
                </CollapsibleContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowDown className="h-5 w-5 text-slate-300" />
                </div>
              )}
            </Collapsible>
          ))}
        </div>
      </div>
    </Layout>
  );
}
