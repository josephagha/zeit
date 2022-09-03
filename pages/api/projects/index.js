import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "GET") {
    try {

      const client = await connectToDatabase();
      const db = client.db();

      const projects = await db
        .collection("projects")
        .find({})
        .toArray();

      res.status(200).json({
        data: JSON.parse(JSON.stringify(projects))
      });

      client.close();
    } catch (error) {
      res.status(500).json({ message: "Getting project failed." });
      client.close();
    }
  }
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default handler;
