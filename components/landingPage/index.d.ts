interface CommonProps {
  setSelectCard?: React.Dispatch<React.SetStateAction<string[]>>;
  selectCard?: string[];
  setSelectCardError?: React.Dispatch<React.SetStateAction<string>>;
  setServicePopUP?: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceCardData?: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ServiceCardProps extends CommonProps {
  slider: React.MutableRefObject<SliderCrouserl | null>;
  slidesToShowCustom: number;
  count?: number;
  showIcons?: boolean;
  selectedServices?: string;
  jobType?:string
}

type ServicePropsType = CommonProps & {
  icon: string;
  shortText: string;
  slug: string;
  showIcons?: boolean;
  selectedServices?: string;
  jobType?:string
};
