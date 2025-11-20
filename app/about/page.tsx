import Link from 'next/link'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

export default function AboutPage() {
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About A11y Friend</h1>
          
          <Card className="mb-8">
            <CardContent className="py-6">
              <p className="text-lg text-gray-700 mb-4">
                A11y Friend is dedicated to making the web more accessible for everyone. 
                We believe that digital experiences should be inclusive and usable by all people, 
                regardless of their abilities or disabilities.
              </p>
              <p className="text-lg text-gray-700">
                Our mission is to provide developers and organizations with the tools and knowledge 
                they need to create accessible web applications that comply with WCAG guidelines 
                and best practices.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🌟 Inclusivity First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We prioritize creating tools that help build inclusive digital experiences for all users.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📚 Education & Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We believe in educating developers about accessibility and providing them with the 
                  knowledge to make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🤝 Community-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We actively engage with the accessibility community to continuously improve our tools 
                  and stay current with best practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
