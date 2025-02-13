import Image from 'next/image';

const techLogos: Record<string, string> = {
    Java: "java",
    "Spring Boot": "/logos/spring.svg",
    Kubernetes: "/logos/kubernetes.svg",
    Ruby: "/logos/ruby.png",
    React: "/logos/react.svg",
    TypeScript: "/logos/ts.svg",
    "AWS Lambda": "/logos/lambda.svg",
    "AWS S3": "/logos/s3.svg",
    "AWS EKS": "/logos/eks.svg",
};

const TechTag: React.FC<{ tech: string, key: number }> = ({ tech, key }) => (
    <span key={key} className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md text-gray-800 dark:text-gray-100 text-sm px-2 py-1 rounded">
        {tech !== "Java" && (<Image src={techLogos[tech]} alt={tech} width={24} height={24} />)}
        <span>{tech}</span>
    </span>
);

export default TechTag;
