import { getSession } from 'next-auth/react';

import UserDashboard from '../../components/dashboard/user-dashboard';

function ProfilePage() {
  return <UserDashboard />;
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

export default ProfilePage;
