import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, BarChart3, Cpu, Gavel, Layers, ShieldCheck, Zap } from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section with Blue Gradient & Waves */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 pb-20 pt-24 lg:pt-32">
        {/* Abstract Wave Patterns */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 Q 25 40 50 50 T 100 50 V 100 H 0 Z" fill="white" className="animate-wave-slow" />
            <path d="M0 60 Q 25 50 50 60 T 100 60 V 100 H 0 Z" fill="white" className="animate-wave-medium" style={{ animationDelay: "-2s" }} />
            <path d="M0 70 Q 25 60 50 70 T 100 70 V 100 H 0 Z" fill="white" className="animate-wave-fast" style={{ animationDelay: "-4s" }} />
          </svg>
        </div>

        <div className="container relative z-10 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-700/30 px-3 py-1 text-sm font-medium text-blue-50 backdrop-blur-sm border border-blue-300/20">
              <span className="mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-blue-200 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-100"></span>
              </span>
              ADX-hl V3.0 Live
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-sm">
              Real-Time Bidding Engine
              <span className="block text-blue-100 text-3xl sm:text-4xl mt-2 font-bold opacity-90">Transparent. Intelligent. Fast.</span>
            </h1>
            <p className="mb-10 text-lg text-blue-50 sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of ad exchange technology with full auction transparency, 
              multi-strategy bidding agents, and real-time attribution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auctions">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-lg shadow-blue-900/20 font-semibold px-8 h-12 rounded-full transition-transform hover:scale-105">
                  <Activity className="mr-2 h-5 w-5" />
                  Watch Live Auction
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline" className="bg-blue-700/30 text-white border-white/30 hover:bg-blue-700/50 hover:text-white backdrop-blur-sm h-12 rounded-full px-8">
                  <Settings className="mr-2 h-5 w-5" />
                  Configure Bidders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Floating Cards */}
      <div className="container relative z-20 -mt-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Daily Auctions", value: "10M+", icon: Gavel, color: "text-blue-600" },
            { label: "Avg Latency", value: "<45ms", icon: Zap, color: "text-amber-500" },
            { label: "Active Bidders", value: "12", icon: Cpu, color: "text-emerald-500" },
            { label: "Strategies", value: "4", icon: Layers, color: "text-purple-500" },
          ].map((stat, i) => (
            <Card key={i} className="border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white/90 backdrop-blur">
              <CardContent className="flex items-center p-6">
                <div className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Core Capabilities</h2>
          <p className="mt-4 text-lg text-slate-600">Built for transparency and performance</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Explainable Auctions",
              desc: "Trace every step of the auction process from candidate filtering to clearing price calculation.",
              icon: ShieldCheck,
              bg: "bg-blue-50",
              iconColor: "text-blue-600"
            },
            {
              title: "Real-Time Streaming",
              desc: "WebSocket-powered auction tape delivers bid requests and results with zero latency.",
              icon: Activity,
              bg: "bg-indigo-50",
              iconColor: "text-indigo-600"
            },
            {
              title: "Smart Attribution",
              desc: "Multi-touch attribution models with confidence scoring and evidence chains.",
              icon: BarChart3,
              bg: "bg-cyan-50",
              iconColor: "text-cyan-600"
            }
          ].map((feature, i) => (
            <Card key={i} className="group overflow-hidden border-slate-100 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader className={`${feature.bg} pb-8 pt-8 transition-colors group-hover:bg-opacity-80`}>
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ${feature.iconColor}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-base leading-relaxed">
                  {feature.desc}
                </CardDescription>
                <div className="mt-6 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function Settings(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
