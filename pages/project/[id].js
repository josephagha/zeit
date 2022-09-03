import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import Header from "../../components/layout/Header";
import Breadcrumb from "../../components/sharing/breadcrumb";
import Footer from "../../components/layout/Footer";
import Loding from "../../components/sharing/loding";

import ProjectHeader from "../../components/projects/project/projectHeader";
import ProjectCardItems from "../../components/projects/project/card/projectCardItems";

async function getProject(slug) {
  const response = await fetch("/api/projects/project", {
    method: "POST",
    body: JSON.stringify({
      slug,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const slug = id;

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [pages, setPages] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    let projectRespons = getProject(slug);
    projectRespons.then((data) => {
      setProject(data.data[0]);
      setPages(data.data.slice(1));
      setLoading(false);
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      <Header />
      <Breadcrumb
        currentPageTitle={id}
        parentPage="project/"
        currentPageSlug={id}
      />
      {loading ? (
        <Loding />
      ) : (
        <>
          <ProjectHeader
            icon={project.icon}
            title={project.title}
            description={project.description}
          />
          <ProjectCardItems data={pages} key={project._id} />
        </>
      )}

      <Footer />
    </section>
  );
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

export default ProjectDetail;
