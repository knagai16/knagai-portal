import Hobies from "@/components/profile/Hobies";
import JobHistories from "@/components/profile/JobHistories";
import ProfileIntro from "@/components/profile/ProfileIntro";
import SocialLinks from "@/components/profile/SocialLinks";
import Head from "next/head";
import React from "react";

const Profile = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-blue-900 dark:text-blue-400 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>Profile</title>
        </Head>
        <h1 className="text-3xl font-bold mb-4 text-blue-900 dark:text-blue-400">
          Profile
        </h1>

        <ProfileIntro />
        <JobHistories />
        <Hobies />
        <SocialLinks />
      </div>
    </div>
  );
};

export default Profile;
