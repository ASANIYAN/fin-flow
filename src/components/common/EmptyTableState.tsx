import { Icon } from "@iconify/react";

const EmptyTableState = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-[350px] bg-white rounded-x">
      <Icon
        width={70}
        height={70}
        color="#D3D3D3"
        icon="mdi:file-search-outline"
      />
      <h3 className="mt-6 text-center text-primary-text font-bold text-sm">
        No records found
      </h3>
      <p className="mt-2 text-primary-text text-sm text-center max-w-82">
        This table is currently empty.
      </p>
    </section>
  );
};

export default EmptyTableState;
