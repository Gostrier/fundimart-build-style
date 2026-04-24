import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Truck, Package, CheckCircle2, Navigation, Search, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/kenya/kenya-provinces.json";

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0); // 0-3 stages

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }
    setIsTracking(true);
    // Simulate real-time progress
    setOrderStatus(1);
    setTimeout(() => setOrderStatus(2), 2000);
  };

  const stages = [
    { title: "Confirmed", icon: CheckCircle2, color: "text-green-500" },
    { title: "Processing", icon: Package, color: "text-blue-500" },
    { title: "On the Way", icon: Truck, color: "text-orange-500" },
    { title: "Delivered", icon: Navigation, color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Navigation className="w-10 h-10 text-primary animate-pulse" />
              Live Order Tracking
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your construction materials from our warehouse to your site.
            </p>
          </div>

          <Card className="mb-8 border-none shadow-xl bg-primary/5">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    placeholder="Enter Tracking ID (e.g., FM-2025-XXXX)" 
                    className="pl-12 h-14 bg-background text-lg"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <Button size="lg" className="h-14 px-10 gap-2 text-lg" onClick={handleTrack}>
                  Track Order <Navigation className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {isTracking && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Status Timeline */}
                <Card className="lg:col-span-1 border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Status Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {stages.map((stage, index) => (
                      <div key={index} className="flex gap-4 relative">
                        {index < stages.length - 1 && (
                          <div className={`absolute left-6 top-10 w-0.5 h-10 ${index < orderStatus ? 'bg-primary' : 'bg-muted'}`} />
                        )}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          index <= orderStatus ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground'
                        }`}>
                          <stage.icon className="w-6 h-6" />
                        </div>
                        <div className="pt-2">
                          <p className={`font-bold ${index <= orderStatus ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {stage.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {index <= orderStatus ? "Completed at 10:30 AM" : "Pending..."}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-dashed">
                        <p className="text-sm font-medium mb-2">Delivery Details</p>
                        <div className="space-y-2 text-xs text-muted-foreground">
                            <p>Driver: John M. (+254 7XX XXX XXX)</p>
                            <p>Vehicle: Isuzu FRR (KDC XXXX)</p>
                            <p>Est. Arrival: 2:30 PM Today</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Map */}
                <Card className="lg:col-span-2 border-none shadow-lg overflow-hidden h-[600px] flex flex-col">
                  <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        Live Map View
                      </div>
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Nairobi - Thika Highway</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-0 bg-[#E5E7EB] relative">
                    <ComposableMap
                      projection="geoMercator"
                      projectionConfig={{
                        scale: 12000,
                        center: [36.8219, -1.2921] // Centered near Nairobi
                      }}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                          geographies.map((geo) => (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill="#FFFFFF"
                              stroke="#D1D5DB"
                              strokeWidth={0.5}
                            />
                          ))
                        }
                      </Geographies>
                      
                      {/* Delivery Route */}
                      <Line
                        from={[36.8219, -1.2921]} // Start (Warehouse)
                        to={[36.9219, -1.1921]}   // Destination (Site)
                        stroke="#0ea5e9"
                        strokeWidth={4}
                        strokeDasharray="8, 8"
                      />

                      {/* Warehouse Marker */}
                      <Marker coordinates={[36.8219, -1.2921]}>
                        <circle r={8} fill="#10b981" />
                        <text textAnchor="middle" y={-15} style={{ fontSize: "10px", fontWeight: "bold" }}>Warehouse</text>
                      </Marker>

                      {/* Site Marker */}
                      <Marker coordinates={[36.9219, -1.1921]}>
                        <circle r={8} fill="#ef4444" />
                        <text textAnchor="middle" y={-15} style={{ fontSize: "10px", fontWeight: "bold" }}>Site</text>
                      </Marker>

                      {/* Truck Marker */}
                      <motion.g
                        initial={{ x: 0, y: 0 }}
                        animate={{ 
                            x: orderStatus === 2 ? 100 : 0, 
                            y: orderStatus === 2 ? -100 : 0 
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                      >
                        <Marker coordinates={[36.8719, -1.2421]}>
                            <g transform="translate(-12, -12)">
                                <div className="bg-primary p-2 rounded-full shadow-lg">
                                    <Truck className="w-6 h-6 text-white" />
                                </div>
                            </g>
                        </Marker>
                      </motion.g>
                    </ComposableMap>

                    {/* Overlay info */}
                    <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                        <div className="flex-1 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Current Location</p>
                                <p className="font-bold">Near Ruiru Interchange</p>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50 text-center px-8">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Speed</p>
                            <p className="font-bold">45 km/h</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
