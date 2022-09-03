import { getSession } from 'next-auth/react';

import Header from "../../components/layout/Header";
import Breadcrumb from "../../components/sharing/breadcrumb";
import Footer from "../../components/layout/Footer";
import ChangePasswordForm from '../../components/dashboard/changePasswordForm';

function NewPasswordPage() {
  return (
    <section className="container">
      <Header />
      <Breadcrumb currentPageTitle="dashboard" currentPageSlug="dashboard" />
      <ChangePasswordForm />
      <Footer />
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default NewPasswordPage;
