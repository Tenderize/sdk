import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
export const Footer = () => {
  return (
    <footer className="flex h-10 w-full items-center justify-end px-4 md:px-6 bg-card text-primary gap-4">
      <a href="#">
        <TwitterLogoIcon className="w-6 h-6" />
      </a>
      <a href="#">
        <GitHubLogoIcon className="w-6 h-6" />
      </a>
      <a href="#">
        <InstagramLogoIcon className="w-6 h-6" />
      </a>
    </footer>
  );
};
