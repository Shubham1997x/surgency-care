import { PageHeader } from "@/components/dashboard/ui";
import { CategoryForm } from "@/components/dashboard/forms/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <PageHeader title="Add Category" subtitle="Create a new treatment category." />
      <CategoryForm />
    </div>
  );
}
