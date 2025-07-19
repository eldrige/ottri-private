import { StaticImageData } from "next/image";
export type Service = {
  title: string;
  subtitle: string;
  services: string[];
  priceFrom: number;
  duration: string;
  coverSrc: StaticImageData;
  mostPopular?: boolean;
  Icon: ({
    className,
  }: {
    className?: string | undefined;
  }) => React.JSX.Element;
};
