import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { slug } = data;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    const existingProject = await db
      .collection("projects")
      .find({ slug: slug })
      .toArray();

    if (!existingProject) {
      res.status(422).json({ message: "project does not exist!" });
      client.close();
      return;
    }

    const projects = await db.collection("projects").find({}).toArray();

    let getPerantProject = existingProject[0]._id.toString();

    const getSubproject = await db
      .collection("subproject")
      .find({ perantProject: getPerantProject })
      .toArray();


    let combinedArray = [];
    combinedArray.push(projects, getSubproject);

    res.status(200).json({
      data: JSON.parse(JSON.stringify(combinedArray)),
    });

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Getting project failed." });
    client.close();
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
