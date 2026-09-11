interface FilterType {
  distance: string;
  pin_code: string;
  address?:any;
  categories:string[]
}
type orderTimeType =
  | "Sort by New order"
  | "Sort by Older order"
  | "Sort by newest or older";
type OrderTimeProps = {
  orderTime?: any;
  setOrderTime?: React.Dispatch<React.SetStateAction<any>>;
};
type NewListedOrderPropsType = OrderTimeProps & {
  selectCard?: string[];
  filter?: FilterType;
  setSelectCard?: React.Dispatch<React.SetStateAction<string[]>>;
  setFilter?: React.Dispatch<React.SetStateAction<FilterType>>;
  selectedServices?: string;
  setSelectedServices?: React.Dispatch<React.SetStateAction<string>>;
};
interface FilterPropsType extends OrderTimeProps {
  setFilter?: React.Dispatch<React.SetStateAction<FilterType>>;
  filter?: FilterType;
  selectCard?: string[];
  selectedServices?: string;
  setSelectedServices?: React.Dispatch<React.SetStateAction<string>>;
}
