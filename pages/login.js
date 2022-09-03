import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';

import Loding from "../components/sharing/loding";
import Footer from "../components/layout/Footer";
import LoginForm from "../components/auth/loginForm";

function Login() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) return <Loding/>;

  return (
    <Fragment>
      <LoginForm />
      <Footer />
    </Fragment>
  );
}

export default Login;


