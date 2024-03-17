import { FormStatsCards } from "./_components/form/FormStatsCards";
import { Suspense } from "react";
import { CardsFallback } from "./_components/fallbacks/CardsFallback";
import { Separator } from "@/shared/components/ui/separator";
import FormCards from "./_components/form/FormCards";
import FormCardsFallback from "./_components/fallbacks/FormCardsFallback";
import { GetFormStats } from "@/shared/actions/form";

export default async function Home() {

  const stats = await GetFormStats()

  return (
    <div className="container pt-4">
      <Suspense fallback={<CardsFallback />}>
        <FormStatsCards data={stats} loading={false} />
      </Suspense>
      <Separator className="w-full mt-10 mb-4" />
      <Suspense fallback={<FormCardsFallback />}>
        <FormCards />
      </Suspense>
    </div>
  );
}