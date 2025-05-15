
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon, Clock, Plus, Trash2, Vote as VoteIcon } from "lucide-react";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// For popover import for date picker
const PopoverTriggerExtended = PopoverTrigger as React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;

const CreateElection = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "single", // single or multiple
    maxSelections: 1,
    date: new Date(),
    time: "23:59",
    options: [
      { id: 1, name: "", description: "" },
      { id: 2, name: "", description: "" }
    ]
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value,
      maxSelections: value === "single" ? 1 : 3
    }));
  };
  
  const handleMaxSelectionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) return;
    
    setFormData(prev => ({
      ...prev,
      maxSelections: value
    }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setFormData(prev => ({
      ...prev,
      date
    }));
  };
  
  const handleOptionChange = (index: number, field: string, value: string) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      options: updatedOptions
    }));
  };
  
  const handleAddOption = () => {
    const newOption = {
      id: formData.options.length + 1,
      name: "",
      description: ""
    };
    
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, newOption]
    }));
  };
  
  const handleRemoveOption = (index: number) => {
    if (formData.options.length <= 2) {
      toast({
        title: "Cannot remove option",
        description: "Elections must have at least two options.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      options: updatedOptions
    }));
  };
  
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for this election.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.description.trim()) {
      toast({
        title: "Missing description",
        description: "Please enter a description for this election.",
        variant: "destructive",
      });
      return false;
    }
    
    // Check if all options have names
    const emptyOptions = formData.options.filter(option => !option.name.trim());
    if (emptyOptions.length > 0) {
      toast({
        title: "Incomplete options",
        description: "Please provide names for all options.",
        variant: "destructive",
      });
      return false;
    }
    
    // Check if election date is in the future
    const deadline = new Date(formData.date);
    const [hours, minutes] = formData.time.split(":").map(Number);
    deadline.setHours(hours, minutes);
    
    if (deadline <= new Date()) {
      toast({
        title: "Invalid deadline",
        description: "The election deadline must be in the future.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call for creating an election
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Election created successfully",
        description: "Your new election has been published.",
      });
      
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Failed to create election",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="container mx-auto max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Create New Election</h1>
          <p className="text-gray-600">Set up a new ballot for voters</p>
        </header>
        
        <form onSubmit={handleSubmit}>
          <Card className="border-gray-100 shadow-md mb-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <VoteIcon className="h-5 w-5 text-blue-700" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Election Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="e.g., Board of Directors Election"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Provide details about this election"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Election Type</Label>
                <RadioGroup value={formData.type} onValueChange={handleTypeChange} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">Single Choice</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multiple" id="multiple" />
                    <Label htmlFor="multiple">Multiple Choice</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {formData.type === "multiple" && (
                <div className="space-y-2">
                  <Label htmlFor="maxSelections">Maximum Selections</Label>
                  <Input 
                    id="maxSelections" 
                    name="maxSelections" 
                    type="number"
                    min={1}
                    value={formData.maxSelections}
                    onChange={handleMaxSelectionsChange}
                    className="max-w-[100px]"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Deadline Date</Label>
                  <Popover>
                    <PopoverTriggerExtended className="w-full flex items-center justify-between border border-input bg-background px-3 py-2 text-left text-sm rounded-md">
                      {format(formData.date, "PPP")}
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                    </PopoverTriggerExtended>
                    <PopoverContent className="w-auto p-0 bg-white rounded-md shadow-md border border-gray-100">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Deadline Time</Label>
                  <div className="flex items-center border border-input bg-background rounded-md focus-within:ring-2 focus-within:ring-ring">
                    <Clock className="ml-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="time" 
                      name="time" 
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100 shadow-md mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Election Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.options.map((option, index) => (
                <div key={option.id} className="p-4 border border-gray-100 rounded-md bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-medium">Option {index + 1}</h4>
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`option-name-${option.id}`}>Name</Label>
                      <Input 
                        id={`option-name-${option.id}`}
                        placeholder="e.g., Jane Smith"
                        value={option.name}
                        onChange={(e) => handleOptionChange(index, "name", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`option-desc-${option.id}`}>Description (Optional)</Label>
                      <Input 
                        id={`option-desc-${option.id}`}
                        placeholder="e.g., Current treasurer, 5 years experience"
                        value={option.description}
                        onChange={(e) => handleOptionChange(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline" 
                className="w-full border-dashed"
                onClick={handleAddOption}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Option
              </Button>
            </CardContent>
          </Card>
          
          <div className="flex justify-between mt-8">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-700 hover:bg-blue-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Election..." : "Create Election"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateElection;
