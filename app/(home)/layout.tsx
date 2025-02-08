import Header from "@/components/header";
import Menu from "@/components/menu";
import { getCategories } from "@/queries";
import { createClient } from "@/supabase/server";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header className="fixed top-0 right-0 left-0 z-10">
        <Menu categories={await getCategories(createClient())} />
      </Header>
      {children}
    </>
  );
}
