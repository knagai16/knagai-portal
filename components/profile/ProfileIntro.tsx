import GitHubProfileImage from "./GithubProfileImage";

const ProfileIntro = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
      <GitHubProfileImage />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        knagai
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        都内で働くソフトウェアエンジニアです。
        バックエンドからフロントエンドまで幅広く開発経験があります。
      </p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        普段はGolang、React、TypeScript、AWSを活用し、Webサービスの開発を行っています。
      </p>
    </div>
  );
};

export default ProfileIntro;
