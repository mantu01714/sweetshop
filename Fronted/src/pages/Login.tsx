import { Header } from '@/components/layout/Header';
import { LoginForm } from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container mx-auto flex items-center justify-center px-4 py-16">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
