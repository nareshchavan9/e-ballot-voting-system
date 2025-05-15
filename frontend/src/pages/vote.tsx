
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Vote as VoteIcon, Clock, ShieldCheck } from "lucide-react";

// Mock data for different elections
const electionData = {
  "1": {
    id: 1,
    title: "Board of Directors Election",
    description: "Vote for the new board members. Select up to 3 candidates.",
    type: "multiple",
    maxSelections: 3,
    deadline: "2025-06-10T23:59:59",
    options: [
      { id: 1, name: "Jane Smith", description: "Current treasurer, 5 years experience" },
      { id: 2, name: "Michael Johnson", description: "Technology consultant, new candidate" },
      { id: 3, name: "Sarah Williams", description: "Current president, seeking re-election" },
      { id: 4, name: "Robert Davis", description: "Community organizer, new candidate" },
      { id: 5, name: "Amanda Miller", description: "Local business owner, new candidate" },
    ]
  },
  "2": {
    id: 2,
    title: "Annual Budget Approval",
    description: "Vote to approve the proposed annual budget for 2025.",
    type: "single",
    deadline: "2025-05-25T23:59:59",
    options: [
      { id: 1, name: "Approve", description: "Approve the budget as proposed" },
      { id: 2, name: "Reject", description: "Reject the budget proposal" },
    ]
  }
};

const Vote = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [election, setElection] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [singleOption, setSingleOption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      navigate("/login");
      return;
    }
    
    setIsAuthenticated(true);
    
    // Load election data
    if (id && electionData[id as keyof typeof electionData]) {
      setElection(electionData[id as keyof typeof electionData]);
    } else {
      navigate("/dashboard");
      toast({
        title: "Election not found",
        description: "The requested election could not be found.",
        variant: "destructive",
      });
    }
  }, [id, navigate]);
  
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
  
  const handleCheckboxChange = (optionId: number) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        // Check if max selections reached
        if (election.type === "multiple" && election.maxSelections && prev.length >= election.maxSelections) {
          toast({
            title: "Maximum selections reached",
            description: `You can only select up to ${election.maxSelections} options.`,
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, optionId];
      }
    });
  };
  
  const handleSubmitVote = async () => {
    if (election.type === "multiple" && selectedOptions.length === 0) {
      toast({
        title: "No selection made",
        description: "Please select at least one option to vote.",
        variant: "destructive",
      });
      return;
    }
    
    if (election.type === "single" && !singleOption) {
      toast({
        title: "No selection made",
        description: "Please select an option to vote.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call for vote submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Vote successful
      toast({
        title: "Vote submitted successfully",
        description: "Thank you for participating in this election.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Vote submission failed",
        description: "An error occurred while submitting your vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || !election) {
    return null; // Don't render anything while checking authentication or loading data
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="border-gray-100 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <VoteIcon className="h-5 w-5 text-blue-700" />
              <CardTitle className="text-2xl text-blue-900">{election.title}</CardTitle>
            </div>
            <CardDescription className="text-base">{election.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="py-6">
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Clock className="w-4 h-4 mr-1" />
              <span>Deadline: {formatDeadline(election.deadline)}</span>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                {election.type === "multiple" 
                  ? `Select up to ${election.maxSelections} options` 
                  : "Select one option"}
              </h3>
              
              {election.type === "multiple" ? (
                <div className="space-y-4">
                  {election.options.map((option: any) => (
                    <div key={option.id} className="flex items-start space-x-3">
                      <Checkbox 
                        id={`option-${option.id}`} 
                        checked={selectedOptions.includes(option.id)}
                        onCheckedChange={() => handleCheckboxChange(option.id)}
                        className="mt-1"
                      />
                      <div>
                        <Label
                          htmlFor={`option-${option.id}`}
                          className="text-base font-medium"
                        >
                          {option.name}
                        </Label>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup value={singleOption} onValueChange={setSingleOption} className="space-y-4">
                  {election.options.map((option: any) => (
                    <div key={option.id} className="flex items-start space-x-3">
                      <RadioGroupItem 
                        value={option.id.toString()} 
                        id={`option-${option.id}`} 
                        className="mt-1"
                      />
                      <div>
                        <Label
                          htmlFor={`option-${option.id}`}
                          className="text-base font-medium"
                        >
                          {option.name}
                        </Label>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-gray-100 flex justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <ShieldCheck className="w-4 h-4 mr-1 text-blue-700" />
              <span>Your vote is secure and anonymous</span>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button 
                className="bg-blue-700 hover:bg-blue-800"
                onClick={handleSubmitVote}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Vote"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Vote;
