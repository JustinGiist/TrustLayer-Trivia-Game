import { SvgIcon } from "@material-ui/core";
import {
  Folder,
  Home,
  ColorLens,
  Pets,
  BugReport,
  WbSunny,
  SportsEsports,
  ArrowDropDown,
  ContactPhone,
  AcUnit,
  Close,
  PlusOne,
} from "@material-ui/icons";
import {
  HomeOutline,
  AccountCircleOutline,
  WalletOutline,
  CalculatorVariantOutline,
  ToolboxOutline,
  Plus,
  CartOutline,
  BasketOffOutline,
  Delete,
  DotsVertical,
  Facebook,
  Linkedin,
  Email,
  Phone,
  Check,
  ChevronLeft,
} from "mdi-material-ui";
const GetIcon: any = {
  Home: Home,
  Themes: ColorLens,
  Projects: Folder,
  SportsEsports: SportsEsports,
  ArrowDropDown: ArrowDropDown,
  Contact: ContactPhone,
  AcUnit,
  HomeOutline,
  AccountCircleOutline,
  WalletOutline,
  CalculatorVariantOutline,
  ToolboxOutline,
  Close,
  Check,
  Plus,
  Cart: CartOutline,
  NoItems: BasketOffOutline,
  Delete,
  Context: DotsVertical,
  FB: Facebook,
  Email,
  Linkedin,
  Phone,
  ChevronLeft,
};
const Icon = ({
  icon,
  onclick,
  fontSize,
  color,
  viewBox,
  width,
  height,
}: {
  icon?: string;
  onclick?: (e: any) => void;
  fontSize?: number;
  color?: string;
  viewBox?: string;
  width?: string;
  height?: string;
}) => {
  const myIcon = GetIcon[icon as string];
  if (!myIcon) return <div></div>;
  return (
    <SvgIcon
      onClick={(e: any) => {
        return onclick ? onclick(e) : null;
      }}
      width={width ?? "100%"}
      height={height ?? "100%"}
      viewBox={viewBox ?? "0 0 24 24"}
      fontSize={fontSize ? "inherit" : "small"}
      style={{
        fontSize: fontSize ?? 24,
        color: color ?? "",
      }}
      component={myIcon}
    />
  );
};
export default Icon;
