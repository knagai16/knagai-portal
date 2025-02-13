import ProjectCards from "@/components/portfolio/ProjectCards";
import Head from "next/head";
import React from "react";

const Portfolio = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 text-blue-900 dark:text-blue-400">
      <Head>
        <title>Portfolio</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-blue-900 dark:text-blue-400">
        Knagai&apos;s Portfolio
      </h1>

      <p className="mb-6">
        これまでに携わったプロジェクトを紹介します。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCards />
      </div>
    </div>
  );
};

export default Portfolio;
