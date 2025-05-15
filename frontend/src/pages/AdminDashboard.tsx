
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, Vote, CheckCircle, Clock, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";

// Mock data for elections and stats
const activeElections = [
  {
    id: 1,
    title: "Board of Directors Election",
    description: "Vote for the new board members. Select up to 3 candidates.",
    deadline: "2025-06-10T23:59:59",
    participation: 42,
    totalVoters: 120,
  },
  {
    id: 2,
    title: "Annual Budget Approval",
    description: "Vote to approve the proposed annual budget for 2025.",
    deadline: "2025-05-25T23:59:59",
    participation: 68,
    totalVoters: 120,
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
    totalVoters: 115,
  },
  {
    id: 102,
    title: "Amendment to Community Bylaws",
    description: "Vote on the proposed amendments to the community bylaws.",
    completedDate: "2025-03-15T00:00:00",
    result: "Rejected",
    participation: 65,
    totalVoters: 115,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isLoading } = useAuth({ requireAdmin: true });
  
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
  
  const handleCreateElection = () => {
    navigate("/admin/create-election");
  };
  
  const handleManageElection = (electionId: number) => {
    navigate(`/admin/manage-election/${electionId}`);
  };
  
  const handleViewResults = (electionId: number) => {
    navigate(`/admin/results/${electionId}`);
  };

  if (isLoading || !isAuthenticated || !isAdmin) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      
      <div className="container mx-auto max-w-6xl p-4">
        <header className="mb-8 mt-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage elections and view results</p>
        </header>
        
        {/* Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Vote className="w-5 h-5 text-blue-700" />
                Active Elections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-900">{activeElections.length}</p>
              <p className="text-sm text-gray-500">Currently in progress</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-700" />
                Registered Voters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-900">120</p>
              <p className="text-sm text-gray-500">Total registered users</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                Completed Elections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-900">{pastElections.length}</p>
              <p className="text-sm text-gray-500">Historical elections</p>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-blue-800">Active Elections</h2>
            <Button 
              onClick={handleCreateElection}
              className="bg-blue-700 hover:bg-blue-800"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create New Election
            </Button>
          </div>
          
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
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Current participation</span>
                        <span className="text-sm font-medium">
                          {election.participation}/{election.totalVoters} ({Math.round((election.participation/election.totalVoters)*100)}%)
                        </span>
                      </div>
                      <Progress value={(election.participation/election.totalVoters)*100} className="h-2" />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => handleViewResults(election.id)}
                        variant="outline" 
                        size="sm"
                      >
                        View Results
                      </Button>
                      <Button 
                        onClick={() => handleManageElection(election.id)}
                        size="sm"
                      >
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-gray-100 shadow-md">
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">There are no active elections. Create a new election to get started.</p>
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
                        <span className="text-sm font-medium">Final participation</span>
                        <span className="text-sm font-medium">
                          {election.participation}/{election.totalVoters} ({Math.round((election.participation/election.totalVoters)*100)}%)
                        </span>
                      </div>
                      <Progress value={(election.participation/election.totalVoters)*100} className="h-2" />
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
                        View Full Results
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

export default AdminDashboard;
