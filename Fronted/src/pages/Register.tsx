import { Header } from '@/components/layout/Header';
import { RegisterForm } from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container mx-auto flex items-center justify-center px-4 py-16">
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
