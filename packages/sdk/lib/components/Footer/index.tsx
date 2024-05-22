import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
export const Footer = () => {
  return (
    <footer className="flex h-[130px] w-full items-center justify-center px-4 md:px-6 bg-midnight text-white gap-4">
      <div className="grid grid-cols-3 gap-1 sm:w-[50%] w-[100%]">
        <div className="flex flex-col  gap-1">
          <span className="font-bold text-xl">Legal</span>
          <a href="#" className="text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-sm">
            Terms and Conditions
          </a>
          <a href="#" className="text-sm">
            Cookie Policy
          </a>
        </div>
        <div className="flex flex-col  gap-1">
          <span className="font-bold text-xl">Quick Links</span>
          <a href="#" className="text-sm">
            Contact Us
          </a>
        </div>
        <div className="flex  flex-col  gap-1">
          <span className="font-bold text-xl">Follow us</span>
          <div className="flex gap-2">
            <a href="#">
              <TwitterLogoIcon className="w-6 h-6" />
            </a>
            <a href="#">
              <LinkedInLogoIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
