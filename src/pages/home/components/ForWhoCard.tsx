interface Iprops {
  title: string;
  desc: string;
  icon: React.ReactNode;
}
export default function ForWhoCard({ icon, desc, title }: Iprops) {
  return (
    <div className="bg-white dark:bg-popover p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-4">
        <div style={{background:'var(--color-primary-100)',color:'var(--color-primary-600)'}} className="p-3  rounded-lg ">
          {icon}
        </div>
        <h5 className="dark:text-white" >{title}</h5>
      </div>
      <p style={{color:'var(--color-neutral-600)'}} className="mt-4">
      {desc}
      </p>
    </div>
  );
}
