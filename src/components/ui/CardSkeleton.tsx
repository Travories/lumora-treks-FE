/** Loading placeholder matching a package/destination card (h-[397px]). */
export default function CardSkeleton() {
  return (
    <div className="flex h-[397px] animate-pulse flex-col justify-end overflow-hidden rounded-2xl bg-border/60 p-6">
      <div className="w-full rounded-lg bg-surface p-6">
        <div className="h-4 w-2/3 rounded bg-border" />
        <div className="mt-3 h-3 w-full rounded bg-border" />
        <div className="mt-2 h-3 w-4/5 rounded bg-border" />
        <div className="mt-4 flex gap-2">
          <div className="h-7 w-28 rounded bg-border" />
          <div className="h-7 w-16 rounded bg-border" />
          <div className="h-7 w-14 rounded bg-border" />
        </div>
      </div>
    </div>
  );
}
