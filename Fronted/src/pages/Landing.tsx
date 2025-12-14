import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { SWEET_CATEGORIES } from '@/types/sweet';
import { ArrowRight, ShoppingBag, Shield, Sparkles, Package } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

const FeatureCard = ({ icon, title, description, bgColor, textColor }: FeatureCardProps) => (
  <div className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-hover hover:-translate-y-1">
    <div className={`mb-4 inline-flex rounded-xl p-3 ${bgColor} ${textColor}`}>
      {icon}
    </div>
    <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
      {title}
    </h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex animate-bounce-soft items-center gap-2 rounded-full bg-secondary/50 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Fresh & Delicious Treats
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                The Sweetest
                <span className="block text-gradient-candy">Shop in Town</span>
              </h1>

              <p className="max-w-lg text-lg text-muted-foreground">
                Discover our handcrafted collection of chocolates, candies, and treats.
                From classic favorites to unique creations, we have something for every sweet tooth.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/register">
                <Button size="lg" className="w-full gap-2 shadow-candy sm:w-auto">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="font-display text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Unique Sweets</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary">4.9★</p>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Right - Floating Emojis */}
          <div className="relative hidden lg:flex lg:items-center lg:justify-center">
            <div className="relative h-96 w-96">
              {SWEET_CATEGORIES.map((cat, index) => {
                const positions = [
                  { top: '0%', left: '50%', delay: '0s' },
                  { top: '20%', left: '85%', delay: '0.2s' },
                  { top: '60%', left: '90%', delay: '0.4s' },
                  { top: '80%', left: '50%', delay: '0.6s' },
                  { top: '60%', left: '10%', delay: '0.8s' },
                  { top: '20%', left: '15%', delay: '1s' },
                  { top: '40%', left: '45%', delay: '1.2s' },
                ];
                const pos = positions[index];
                return (
                  <div
                    key={cat.value}
                    className="absolute animate-float text-6xl"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      animationDelay: pos.delay,
                    }}
                  >
                    {cat.emoji}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/50 bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">
            Why Choose Sweet Shop?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<ShoppingBag className="h-8 w-8" />}
              title="Easy Shopping"
              description="Browse and purchase your favorite sweets with just a few clicks. Simple, fast, delicious."
              bgColor="bg-primary/10"
              textColor="text-primary"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Quality Assured"
              description="All our products are made with the finest ingredients and pass strict quality checks."
              bgColor="bg-accent/10"
              textColor="text-accent"
            />
            <FeatureCard
              icon={<Package className="h-8 w-8" />}
              title="Fresh Delivery"
              description="Get your treats delivered fresh to your doorstep. Fast shipping, careful packaging."
              bgColor="bg-candy-pink/10"
              textColor="text-candy-pink"
            />
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground">
            Explore Categories
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {SWEET_CATEGORIES.map((category) => (
              <div
                key={category.value}
                className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-6 py-4 shadow-soft transition-all hover:shadow-hover hover:-translate-y-1"
              >
                <span className="text-4xl transition-transform group-hover:scale-110">
                  {category.emoji}
                </span>
                <span className="font-display text-lg font-semibold text-foreground">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
            Ready for Something Sweet?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of happy customers and discover your new favorite treats.
          </p>
          <Link to="/register">
            <Button size="lg" className="gap-2 shadow-candy">
              Start Shopping Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍬</span>
            <span className="font-display font-bold text-foreground">Sweet Shop</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Sweet Shop. Made with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
