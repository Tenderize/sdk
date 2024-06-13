import Image from "next/image";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <Image src="/logo.svg" alt="Logo" width={150} height={50} />,
  project: {
    link: "https://app.tenderize.me/",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/Tenderize/sdk/packages/docs",
  footer: {
    text: "© Tenderize Labs Ltd. 2024",
  },
};

export default config;
