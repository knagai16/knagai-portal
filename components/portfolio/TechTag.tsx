import Image from "next/image";

const techLogos: Record<string, string> = {
  "Spring Boot": "/logos/spring.svg", Kubernetes: "/logos/kubernetes.svg", Ruby: "/logos/ruby.png",
  React: "/logos/react.svg", TypeScript: "/logos/ts.svg", "AWS Lambda": "/logos/lambda.svg",
  "AWS S3": "/logos/s3.svg", "AWS EKS": "/logos/eks.svg", Golang: "/logos/golang.svg",
};

export default function TechTag({ tech }: { tech: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold">
      {techLogos[tech] && <Image src={techLogos[tech]} alt="" width={16} height={16} />}
      {tech}
    </span>
  );
}
