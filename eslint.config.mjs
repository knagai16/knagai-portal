import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".history/**", ".next/**", "next-env.d.ts", "out/**", "node_modules/**", "infra/**", "tmp/**"] },
  ...nextVitals,
  ...nextTypescript,
];

export default eslintConfig;
