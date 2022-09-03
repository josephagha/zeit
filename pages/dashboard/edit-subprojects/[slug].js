import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import Header from "../../../components/layout/Header";
import Breadcrumb from "../../../components/sharing/breadcrumb";
import Footer from "../../../components/layout/Footer";
import Loding from "../../../components/sharing/loding";

import EditSubproject from "../../../components/projects/project/newSubproject/editSubproject";

async function getProject(slug) {
  const response = await fetch("/api/projects/projects", {
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

function GetSubproject() {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);
  const [pages, setPages] = useState(null);
  const [error, setError] = useState();



  useEffect(() => {
    let projectRespons = getProject(slug);
    projectRespons.then((data) => {
      setProjects(data.data[0]);
      setPages(data.data[1]);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      <Header />
      <Breadcrumb
        currentPageTitle="dashboard"
        parentPage="dashboard/"
        currentPageSlug=""
      />

      <div className="">
        {loading ? (
          <Loding />
        ) : (
          pages.map((page, index) => <EditSubproject data={page} projects={projects} key={index} />)
        )}
      </div>

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

export default GetSubproject;
