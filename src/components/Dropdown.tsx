import arrow from "../assets/arrow.svg";
type WithChildren<T = {}> = T & { children?: React.ReactNode };

interface DropdownProps {
  className: string;
}

export default function Dropdown({
  className,
  ...props
}: WithChildren<DropdownProps>) {
  return (
    <div className={`${className} dropdown`}>
      {props.children}
    </div>
  );
}
