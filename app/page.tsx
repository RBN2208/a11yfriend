import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">A11y Friend</h1>
            <div className="flex gap-4">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to A11y Friend
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your accessibility testing and management companion. Build inclusive web experiences with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔍 Test Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Scan your websites for accessibility issues and get detailed reports with actionable insights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor your accessibility improvements over time with comprehensive analytics.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">✅ Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Learn and implement WCAG guidelines with our interactive tools and resources.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/auth/register">
            <Button variant="primary" size="lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © 2024 A11y Friend. Making the web accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
