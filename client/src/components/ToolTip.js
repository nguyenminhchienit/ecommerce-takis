export default function Tooltip({ message, children }) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-main p-2 text-xs text-white group-hover:scale-100 w-[78px]">
        {message}
      </span>
    </div>
  );
}
