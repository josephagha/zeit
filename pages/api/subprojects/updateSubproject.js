import { connectToDatabase } from "../../../lib/db";
import { ObjectID } from "mongodb";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return;
  }

  const data = req.body;
  const {
    id,
    title,
    description,
    perantProject,
    projectStatus,
    requestedBy,
    workOnIt,
    projectLink,
    touchPoint,
    workSteps,
    note,
  } = data;

  const createdSlug = title
    .replaceAll("/", "-")
    .replaceAll(".", "-")
    .replaceAll(" ", "-")
    .toLowerCase();

  const client = await connectToDatabase();

  const db = client.db();

  const result = await db.collection("subproject").updateOne(
    { _id: ObjectID(id) },
    {
      $set: {
        title: title,
        description: description,
        perantProject: perantProject,
        projectStatus: projectStatus,
        requestedBy: requestedBy,
        workOnIt: workOnIt,
        projectLink: projectLink,
        touchPoint: touchPoint,
        workSteps: workSteps,
        note: note,
      },
    }
  );

  res.status(201).json({ message: "Subproject is updated!" });
  client.close();
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
