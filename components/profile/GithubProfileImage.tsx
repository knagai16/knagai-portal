import Image from "next/image";

const githubUsername = "knagai16";

const GitHubProfileImage = () => {
  return (
    <Image
      src={`https://github.com/${githubUsername}.png`}
      alt="GitHub Profile"
      width={128}
      height={128}
      className="w-32 h-32 rounded-full border-2 border-gray-300 mx-auto mb-4"
    />
  );
};

export default GitHubProfileImage;
