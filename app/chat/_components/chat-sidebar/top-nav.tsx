import Link from "next/link";

export function TopNav() {
  return (
    <>
      <div className=" p-3 flex items-center justify-between border-b border-border h-16">
        <div>
          <Link href={"/"}>
            <span className="text-xl font-bold text-primary">ChatApp</span>
          </Link>
        </div>
      </div>
    </>
  );
}
