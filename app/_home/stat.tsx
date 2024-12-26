interface StatProps {
    number: string;
    label: string;
  }
  
  export function Stat({ number, label }: StatProps) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">{number}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    );
  }