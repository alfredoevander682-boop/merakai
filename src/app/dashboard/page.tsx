import { DashboardContent } from "@/components/seller/DashboardContent";

export const metadata = {
  title: "Dashboard",
  description: "Gerencie os seus produtos e estatísticas no MERKAI",
};

export default function DashboardPage() {
  return (
    <div className="merkai-container py-8">
      <DashboardContent />
    </div>
  );
}
