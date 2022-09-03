import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { title, description, accomplished, icon, pages, subprojects } = data;

  const createdSlug = title
    .replaceAll("/", "-")
    .replaceAll(".", "-")
    .replaceAll(" ", "-")
    .toLowerCase();

    
  const client = await connectToDatabase();

  const db = client.db();

  const result = await db.collection("projects").insertOne({
    slug: createdSlug,
    title: title,
    description: description,
    accomplished: accomplished,
    icon: icon,
    pages: pages,
    subprojects:subprojects,
  });

  res.status(201).json({ message: "Created Project!" });
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
