type Props = {
  action: () => void;
  label?: string;
};

export default function Dialog({ action, label }: Props) {
  return (
    <div className="dialog">
      {label}
      <button onClick={action}>Empezar de nuevo</button>
    </div>
  );
}
