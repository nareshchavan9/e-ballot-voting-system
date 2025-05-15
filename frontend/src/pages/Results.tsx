
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { FileText, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, PieChart, Pie } from "recharts";

// Mock data for election results
const resultsData = {
  "101": {
    id: 101,
    title: "Community Center Renovation",
    description: "Vote on the proposed renovation plans for the community center.",
    completedDate: "2025-04-02T00:00:00",
    totalVoters: 115,
    participation: 78,
    options: [
      { name: "Approve renovation plan A", votes: 45, percentage: 57.7 },
      { name: "Approve renovation plan B", votes: 28, percentage: 35.9 },
      { name: "Reject both plans", votes: 5, percentage: 6.4 }
    ],
    result: "Plan A Approved",
    demographics: {
      ageGroups: [
        { name: "18-30", value: 15 },
        { name: "31-45", value: 32 },
        { name: "46-60", value: 21 },
        { name: "60+", value: 10 }
      ],
      gender: [
        { name: "Male", value: 41 },
        { name: "Female", value: 35 },
        { name: "Non-binary", value: 2 }
      ]
    }
  },
  "102": {
    id: 102,
    title: "Amendment to Community Bylaws",
    description: "Vote on the proposed amendments to the community bylaws.",
    completedDate: "2025-03-15T00:00:00",
    totalVoters: 115,
    participation: 65,
    options: [
      { name: "Approve the amendments", votes: 28, percentage: 43.1 },
      { name: "Reject the amendments", votes: 37, percentage: 56.9 }
    ],
    result: "Amendments Rejected",
    demographics: {
      ageGroups: [
        { name: "18-30", value: 8 },
        { name: "31-45", value: 25 },
        { name: "46-60", value: 20 },
        { name: "60+", value: 12 }
      ],
      gender: [
        { name: "Male", value: 35 },
        { name: "Female", value: 28 },
        { name: "Non-binary", value: 2 }
      ]
    }
  }
};

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Results = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      navigate("/login");
      return;
    }
    
    setIsAuthenticated(true);
    
    // Check if admin
    const userRole = localStorage.getItem("userRole");
    if (userRole === "admin") {
      setIsAdmin(true);
    }
    
    // Load results data
    if (id && resultsData[id as keyof typeof resultsData]) {
      setResults(resultsData[id as keyof typeof resultsData]);
    } else {
      navigate(isAdmin ? "/admin/dashboard" : "/dashboard");
      toast({
        title: "Results not found",
        description: "The requested election results could not be found.",
        variant: "destructive",
      });
    }
  }, [id, navigate]);
  
  const formatCompletedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  if (!isAuthenticated || !results) {
    return null; // Don't render anything while checking authentication or loading data
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{results.title} Results</h1>
              <p className="text-gray-600">{results.description}</p>
            </div>
            <Button 
              onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/dashboard")}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span>Election completed on {formatCompletedDate(results.completedDate)}</span>
          </div>
        </header>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-700" />
                Participation Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">
                {Math.round((results.participation / results.totalVoters) * 100)}%
              </div>
              <div className="text-sm text-gray-500 mb-3">
                {results.participation} out of {results.totalVoters} registered voters
              </div>
              <Progress value={(results.participation / results.totalVoters) * 100} className="h-2" />
            </CardContent>
          </Card>
          
          <Card className="border-gray-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                Final Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {results.result}
              </div>
              <div className="text-sm text-gray-500">
                Based on majority vote
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                Winning Option
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-900">
                {results.options[0].name}
              </div>
              <div className="text-sm text-gray-500">
                {results.options[0].votes} votes ({results.options[0].percentage}%)
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="border-gray-100 shadow-md">
            <CardHeader>
              <CardTitle>Voting Results</CardTitle>
              <CardDescription>Distribution of votes across options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={results.options}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} height={60} tickMargin={5} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="votes" name="Votes">
                      {results.options.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">Detailed Breakdown</h4>
                <div className="space-y-3">
                  {results.options.map((option: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{option.name}</span>
                        <span className="text-sm">
                          {option.votes} votes ({option.percentage}%)
                        </span>
                      </div>
                      <Progress 
                        value={option.percentage} 
                        className="h-2"
                        style={{ 
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          "--progress-background": COLORS[index % COLORS.length] 
                        } as React.CSSProperties} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-rows-2 gap-6">
            <Card className="border-gray-100 shadow-md">
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Breakdown of voters by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.demographics.ageGroups}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {results.demographics.ageGroups.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} voters`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100 shadow-md">
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Breakdown of voters by gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.demographics.gender}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {results.demographics.gender.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} voters`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
