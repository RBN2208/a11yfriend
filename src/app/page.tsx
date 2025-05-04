import StaticHero from '@/components/static/StaticHero';
import { SignInAndUpForm } from '@/components/form-components/SignInAndUpForm';

export default async function Home() {

  return (
    <main className="flex flex-col">
      <StaticHero />
      <div className="h-[1000px]"></div>
    </main>
  );
}
