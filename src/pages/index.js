"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Moon,
  Sun,
  Globe,
  Activity,
  Clock,
  Server,
  Wifi,
  WifiOff,
} from "lucide-react";
import { database } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentRequests, setRecentRequests] = useState([]);
  const [clientIp, setClientIp] = useState("");
  const [endpoints, setEndpoints] = useState([]);
  const [serverStatus, setServerStatus] = useState("checking...");
  const [activeTab, setActiveTab] = useState("api-tester");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setClientIp(data.ip))
      .catch(() => setClientIp("Unknown"));

    fetch("/api/status/endpoints")
      .then((res) => res.json())
      .then((data) => {
        setEndpoints(data.endpoints || []);
      })
      .catch(() => toast.error("Failed to load endpoints"));

    const checkStatus = () => {
      fetch("/api/status/health")
        .then((res) =>
          res.ok ? setServerStatus("online") : setServerStatus("offline")
        )
        .catch(() => setServerStatus("offline"));
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);

    const recentRef = ref(database, "recentRequests");
    const unsub = onValue(recentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val())
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);
        setRecentRequests(data);
      } else {
        setRecentRequests([]);
      }
    });

    return () => {
      clearInterval(interval);
      unsub();
    };
  }, []);

  const handleApiCall = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setIsLoading(true);
    const startTime = Date.now();

    try {
      let parsedHeaders = {};
      try {
        parsedHeaders = JSON.parse(headers);
      } catch {
        toast.error("Invalid JSON in headers");
        setIsLoading(false);
        return;
      }

      const fetchOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaders,
        },
      };

      if (method !== "GET" && body) {
        fetchOptions.body = body;
      }

      const res = await fetch(url, fetchOptions);
      const endTime = Date.now();
      const duration = endTime - startTime;

      let responseData;
      const contentType = res.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        responseData = await res.json();
      } else if (contentType?.includes("image/")) {
        responseData = `[Image data - ${contentType}]`;
      } else if (contentType?.includes("video/")) {
        responseData = `[Video data - ${contentType}]`;
      } else if (contentType?.includes("audio/")) {
        responseData = `[Audio data - ${contentType}]`;
      } else {
        responseData = await res.text();
      }

      setResponse(
        JSON.stringify(
          {
            status: res.status,
            statusText: res.statusText,
            headers: Object.fromEntries(res.headers.entries()),
            data: responseData,
          },
          null,
          2
        )
      );

      const newRequest = {
        id: Date.now().toString(),
        method,
        url,
        status: res.status,
        timestamp: new Date().toISOString(),
        duration,
        responseSize: JSON.stringify(responseData).length,
      };

      toast.success(`Request completed with status ${res.status}`);
    } catch (error) {
      setResponse(
        JSON.stringify(
          { error: error instanceof Error ? error.message : "Unknown error" },
          null,
          2
        )
      );
      toast.error("Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return "bg-green-500";
    if (status >= 300 && status < 400) return "bg-yellow-500";
    if (status >= 400 && status < 500) return "bg-orange-500";
    return "bg-red-500";
  };

  const getMethodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-blue-500";
      case "POST":
        return "bg-green-500";
      case "PUT":
        return "bg-yellow-500";
      case "DELETE":
        return "bg-red-500";
      case "PATCH":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const categories = Array.from(new Set(endpoints.map((e) => e.category)));

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              REST API Dashboard
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Test and monitor your API endpoints
            </p>
          </div>

          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-card rounded-lg border">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                {serverStatus === "online" ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm font-medium">
                  Server {serverStatus}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">
                  {clientIp || "Loading..."}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Endpoints
              </CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{endpoints.length}</div>
              <p className="text-xs text-muted-foreground">
                {endpoints.filter((e) => e.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Requests
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentRequests.length}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentRequests.length > 0
                  ? Math.round(
                      (recentRequests.filter(
                        (r) => r.status >= 200 && r.status < 300
                      ).length /
                        recentRequests.length) *
                        100
                    )
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                Based on recent requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Response Time
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentRequests.length > 0
                  ? Math.round(
                      recentRequests.reduce(
                        (acc, r) => acc + (r.responseTime || 0),
                        0
                      ) / recentRequests.length
                    )
                  : 0}
                ms
              </div>
              <p className="text-xs text-muted-foreground">
                Across all requests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger
              value="api-tester"
              className="text-sm font-medium py-2"
            >
              API Tester
            </TabsTrigger>
            <TabsTrigger value="endpoints" className="text-sm font-medium py-2">
              Endpoints
            </TabsTrigger>
          </TabsList>

          {/* API Tester */}
          <TabsContent value="api-tester" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>API Tester</CardTitle>
                    <CardDescription>
                      Test your API endpoints with different methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                          <SelectItem value="HEAD">HEAD</SelectItem>
                          <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Enter API URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleApiCall} disabled={isLoading}>
                        {isLoading ? "Testing..." : "Send"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Headers (JSON)
                        </label>
                        <Textarea
                          placeholder='{"Content-Type": "application/json"}'
                          value={headers}
                          onChange={(e) => setHeaders(e.target.value)}
                          className="min-h-32 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Request Body
                        </label>
                        <Textarea
                          placeholder="JSON request body"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          className="min-h-32 font-mono text-xs"
                          disabled={method === "GET"}
                        />
                      </div>
                    </div>

                    {response && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Response
                        </label>
                        <ScrollArea className="h-64 w-full border rounded-md p-4">
                          <pre className="text-xs font-mono whitespace-pre-wrap">
                            {response}
                          </pre>
                        </ScrollArea>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Requests */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      {recentRequests.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No requests yet
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {recentRequests.map((r) => (
                            <div
                              key={r.id}
                              className="flex items-center space-x-2 p-2 rounded border"
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${getStatusColor(
                                  r.status
                                )}`}
                              />
                              <Badge
                                variant="outline"
                                className={`text-xs ${getMethodColor(
                                  r.method
                                )} text-white`}
                              >
                                {r.method}
                              </Badge>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">
                                  {r.url}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {r.responseTime}ms •{" "}
                                  {new Date(r.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                              <Badge variant="outline">{r.status}</Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Endpoints */}
          <TabsContent value="endpoints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  Browse and test available API endpoints by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={
                        selectedCategory === "All" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory("All")}
                    >
                      All ({endpoints.length})
                    </Button>
                    {categories.map((c) => {
                      const count = endpoints.filter(
                        (e) => e.category === c
                      ).length;
                      return (
                        <Button
                          key={c}
                          variant={
                            selectedCategory === c ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedCategory(c)}
                        >
                          {c} ({count})
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {endpoints
                    .filter(
                      (e) =>
                        selectedCategory === "All" ||
                        e.category === selectedCategory
                    )
                    .map((endpoint) => (
                      <Card
                        key={endpoint.id}
                        className="relative h-full flex flex-col"
                      >
                        <CardHeader className="pb-2 flex-shrink-0">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className={`text-xs ${getMethodColor(
                                endpoint.method
                              )} text-white`}
                            >
                              {endpoint.method}
                            </Badge>
                            <div
                              className={`w-2 h-2 rounded-full ${
                                endpoint.status === "active"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                          </div>
                          <CardTitle className="text-sm break-words">
                            {endpoint.path}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {endpoint.category}
                            </Badge>
                            <CardDescription className="text-xs flex-1">
                              {endpoint.description}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-shrink-0">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setMethod(endpoint.method);
                              setUrl(`http://localhost:3000${endpoint.path}`);
                              setActiveTab("api-tester");
                              toast.success(
                                `Endpoint ${endpoint.method} ${endpoint.path} loaded in API Tester`
                              );
                            }}
                            disabled={endpoint.status === "inactive"}
                          >
                            Try Endpoint
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
