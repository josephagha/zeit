import { connectToDatabase } from "../../../lib/db";
import { ObjectID } from "mongodb";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return;
  }

  const data = req.body;
  const { id, title, description, accomplished, subprojects, pages, icon } =
    data;
  const createdSlug = title
    .replaceAll("/", "-")
    .replaceAll(".", "-")
    .replaceAll(" ", "-")
    .toLowerCase();

  const client = await connectToDatabase();

  const db = client.db();

  const result = await db.collection("projects").updateOne(
    { _id: ObjectID(id) },
    {
      $set: {
        slug: createdSlug,
        title: title,
        description: description,
        accomplished: accomplished,
        subprojects: subprojects,
        pages: pages,
        icon: icon,
      },
    }
  );

  res.status(201).json({ message: "Project is updated!" });
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
