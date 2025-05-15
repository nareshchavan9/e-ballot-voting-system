
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Clock, Vote } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";

// Mock data for active and past elections
const activeElections = [
  {
    id: 1,
    title: "Board of Directors Election",
    description: "Vote for the new board members. Select up to 3 candidates.",
    deadline: "2025-06-10T23:59:59",
    hasVoted: false,
  },
  {
    id: 2,
    title: "Annual Budget Approval",
    description: "Vote to approve the proposed annual budget for 2025.",
    deadline: "2025-05-25T23:59:59",
    hasVoted: true,
  },
];

const pastElections = [
  {
    id: 101,
    title: "Community Center Renovation",
    description: "Vote on the proposed renovation plans for the community center.",
    completedDate: "2025-04-02T00:00:00",
    result: "Approved",
    participation: 78,
  },
  {
    id: 102,
    title: "Amendment to Community Bylaws",
    description: "Vote on the proposed amendments to the community bylaws.",
    completedDate: "2025-03-15T00:00:00",
    result: "Rejected",
    participation: 65,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  
  const formatDeadline = (dateString: string) => {
    const deadline = new Date(dateString);
    return deadline.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  
  const formatCompletedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    });
  };
  
  const handleVote = (electionId: number) => {
    navigate(`/vote/${electionId}`);
  };
  
  const handleViewResults = (electionId: number) => {
    navigate(`/results/${electionId}`);
  };

  if (isLoading || !isAuthenticated) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      
      <div className="container mx-auto max-w-6xl p-4">
        <header className="mb-8 mt-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Voter Dashboard</h1>
          <p className="text-gray-600">View and participate in elections</p>
        </header>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Active Elections</h2>
          
          {activeElections.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {activeElections.map((election) => (
                <Card key={election.id} className="border-gray-100 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle>{election.title}</CardTitle>
                    <CardDescription>{election.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Deadline: {formatDeadline(election.deadline)}</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {election.hasVoted ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-5 h-5 mr-1" />
                          <span>You have voted</span>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleVote(election.id)}
                          className="bg-blue-700 hover:bg-blue-800"
                        >
                          Cast Your Vote
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-gray-100 shadow-md">
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">There are no active elections at this time.</p>
              </CardContent>
            </Card>
          )}
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Past Elections</h2>
          
          {pastElections.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {pastElections.map((election) => (
                <Card key={election.id} className="border-gray-100 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle>{election.title}</CardTitle>
                    <CardDescription>{election.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 mb-2">
                      Completed on: {formatCompletedDate(election.completedDate)}
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Participation rate</span>
                        <span className="text-sm font-medium">{election.participation}%</span>
                      </div>
                      <Progress value={election.participation} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={`text-sm font-medium ${
                        election.result === "Approved" ? "text-green-600" : "text-red-600"
                      }`}>
                        Result: {election.result}
                      </div>
                      <Button 
                        onClick={() => handleViewResults(election.id)}
                        variant="outline" 
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-gray-100 shadow-md">
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">No past elections available.</p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
