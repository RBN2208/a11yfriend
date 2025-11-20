import Link from 'next/link'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-gray-700">
                A11y Friend
              </h1>
            </Link>
            <div className="flex gap-4">
              <Link href="/features">
                <Button variant="ghost" size="sm">Features</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" size="sm">Pricing</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="sm">About</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools to help you build accessible web experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔍 Automated Scanning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Automatically scan your web pages for accessibility issues using industry-standard 
                tools and guidelines.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>WCAG 2.1 compliance checking</li>
                <li>Section 508 validation</li>
                <li>Color contrast analysis</li>
                <li>Keyboard navigation testing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Detailed Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Get comprehensive reports with actionable insights and recommendations for fixing issues.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Issue severity levels</li>
                <li>Step-by-step fix guides</li>
                <li>Code examples</li>
                <li>Export reports as PDF</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📈 Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Monitor your accessibility improvements over time with detailed analytics and trends.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Historical data tracking</li>
                <li>Score improvements</li>
                <li>Issue resolution timelines</li>
                <li>Team performance metrics</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔄 Continuous Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Integrate accessibility testing into your CI/CD pipeline for automated quality assurance.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>GitHub Actions support</li>
                <li>GitLab CI integration</li>
                <li>API access</li>
                <li>Webhook notifications</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">👥 Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Work together with your team to identify and resolve accessibility issues efficiently.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Shared workspaces</li>
                <li>Role-based permissions</li>
                <li>Comments and annotations</li>
                <li>Task assignments</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📚 Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Access educational materials and best practices to improve your accessibility knowledge.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Interactive tutorials</li>
                <li>WCAG guidelines explained</li>
                <li>Code examples library</li>
                <li>Video walkthroughs</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/auth/register">
            <Button variant="primary" size="lg">
              Start Using These Features
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
