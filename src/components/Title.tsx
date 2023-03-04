type Props={
  name?: string;
}

export default function Title({ name }: Props): JSX.Element {
  return (
    <>
      <h1>Hello from React Component</h1>
      <h3 className="font-bold">Hello {name ?? "world"}</h3>
    </>
  );
}
