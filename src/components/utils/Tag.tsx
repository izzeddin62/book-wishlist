interface TagProps {
  onClick: (value: string) => void;
  value: string;
  selected: boolean;
}

export default function Tag({ onClick, value, selected }: TagProps) {
  return <button type="button" className={` text-xs font-medium me-2 px-2.5 py-0.5 rounded ${selected ? "bg-blue-900 text-blue-300": "bg-blue-100 text-blue-800"}`} onClick={() => onClick(value)}>{value}</button>;
}
