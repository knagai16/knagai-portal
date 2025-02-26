import { FaPenFancy, FaGithub, FaLinkedin } from "react-icons/fa";

const SocialLinks = () => (
  <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      SNS
    </h2>
    <div className="flex items-center space-x-4 mt-2">
      <a
        href="https://www.linkedin.com/in/knagai16/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
      >
        <FaLinkedin size={24} aria-label="LinkedIn" />
      </a>
      <a
        href="https://github.com/knagai16"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
      >
        <FaGithub size={24} aria-label="GitHub" />
      </a>
      <a
        href="https://note.com/knagai16"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
      >
        <FaPenFancy size={24} aria-label="Note" />
      </a>
    </div>
  </div>
);

export default SocialLinks;
