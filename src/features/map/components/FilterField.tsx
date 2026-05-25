type FilterFieldProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function FilterField({ children, title, className }: FilterFieldProps) {
 return (
    <fieldset className={`flex flex-1 flex-col items-center border-2 border-black rounded-lg w-full 
                          p-3 ${className}`}
    >
      <legend className="font-semibold">{title}</legend>
      {children}
    </fieldset>
 );
}