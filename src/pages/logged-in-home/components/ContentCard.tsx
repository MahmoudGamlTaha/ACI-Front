import Table from "./Table";

interface Iprops {
  title: string;
  btn: React.ReactNode;
  hr: React.ReactNode;
}

export default function ContentCard({ title,  btn, hr }: Iprops) {
  return (
    <div className="bg-white dark:bg-popover p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      <div className="flex items-center justify-between">
        <h5
          style={{ color: "var(--color-neutral-500)", marginBottom: 0 }}
        >
          {title}
        </h5>

        <div className="me-4">{btn}</div>
      </div>
      <div className="my-6">{hr}</div>

<Table />

    </div>
  );
}
