export default function Loading() {
  return (
    <div className="animate-pulse p-5 flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <div className="size-14 rounded-full bg-neutral-700" />
      </div>
      <div className="h-10 w-80 bg-neutral-700 rounded-md" />
    </div>
  );
}
