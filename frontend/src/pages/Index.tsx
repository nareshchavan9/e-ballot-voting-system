
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock, ShieldCheck, Vote } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto pt-20 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Secure Digital Voting for Organizations
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Our e-ballot system provides a transparent, secure and efficient way to conduct elections and make collective decisions.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-blue-700 hover:bg-blue-800 px-6 py-5 text-base">
                <Link to="/login">Login to Vote</Link>
              </Button>
              <Button asChild variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-5 text-base">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center bg-blue-100 h-64 rounded-lg mb-4">
                <Vote className="h-24 w-24 text-blue-700" />
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="h-3 w-24 bg-blue-100 rounded-full"></div>
                <div className="h-3 w-12 bg-blue-100 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 -z-10 bg-blue-700 rounded-xl w-full h-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-24 px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Why Choose Our E-Ballot System?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-gray-100 shadow-md">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-blue-700 mb-2" />
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Intuitive interfaces make voting and creating ballots simple for all users.</p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-md">
            <CardHeader>
              <Lock className="h-12 w-12 text-blue-700 mb-2" />
              <CardTitle>Secure Voting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">State-of-the-art security ensures the integrity of every vote cast.</p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-md">
            <CardHeader>
              <ShieldCheck className="h-12 w-12 text-blue-700 mb-2" />
              <CardTitle>Transparent Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Real-time results and comprehensive analytics for complete transparency.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-blue-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full p-6 shadow-md mb-4">
                <span className="text-2xl font-bold text-blue-700">1</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Create an Account</h3>
              <p className="text-gray-600">Register with your organization credentials to access the platform.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full p-6 shadow-md mb-4">
                <span className="text-2xl font-bold text-blue-700">2</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Cast Your Vote</h3>
              <p className="text-gray-600">Securely vote on active ballots with just a few clicks.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full p-6 shadow-md mb-4">
                <span className="text-2xl font-bold text-blue-700">3</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">View Results</h3>
              <p className="text-gray-600">Access transparent, real-time results when voting concludes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">E-Ballot System</h2>
              <p className="text-blue-200">Secure, transparent voting for your organization</p>
            </div>
            <div className="flex gap-8">
              <Link to="/about" className="text-white hover:text-blue-200">About</Link>
              <Link to="/contact" className="text-white hover:text-blue-200">Contact</Link>
              <Link to="/privacy" className="text-white hover:text-blue-200">Privacy Policy</Link>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
            <p>&copy; {new Date().getFullYear()} E-Ballot Voting System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
