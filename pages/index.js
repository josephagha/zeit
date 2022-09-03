import { getSession } from 'next-auth/react';
import { Fragment } from 'react';

import StartingPage from '../components/startingPage/startingPage';

function Home() {
  return(
    <Fragment>
     <StartingPage/>
    </Fragment>
  )
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

export default Home;
