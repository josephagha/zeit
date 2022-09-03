import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const {
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

  const client = await connectToDatabase();

  const db = client.db();

  const existingPerantProject = await db
    .collection("projects")
    .find({ _id: perantProject });

  if (!existingPerantProject) {
    res.status(422).json({ message: "Project is not exists!" });
    client.close();
    return;
  }

  const result = await db.collection("subproject").insertOne({
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
  });

  const resultPerantProject = await db.collection("projects").findOneAndUpdate(
    { _id: result["ops"][0]["_id"] },
    {
      $set: {
        pages: result["ops"][0]["_id"],
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  );

  res.status(201).json({ message: "Created Subproject!" });
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
