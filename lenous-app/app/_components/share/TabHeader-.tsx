export default function TabHeader({
  onClick,
  openTab,
  Tabs,
}: {
  onClick: (name: string) => void;
  openTab: number;
  Tabs: any;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <ul
        className="flex w-fit md:w-full  mb-0 list-none  p-2  bg-light-gray-150"
        role="tablist"
      >
        {Object.keys(Tabs).map((key) => (
          <li className="-mb-px mr-7 last:mr-0 first:mr-0  text-center">
            <a
              className={
                ' text-sm xl:text-base px-5 py-3 shadow-lg rounded-lg block leading-normal  whitespace-nowrap ' +
                (openTab === Tabs[key].name ? 'bg-white ' : '')
              }
              onClick={(e) => {
                e.preventDefault();
                onClick(Tabs[key].name);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              {Tabs[key].title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
