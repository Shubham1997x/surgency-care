"use client";

export function DeleteButton({
  action,
  id,
  label = "this item",
}: {
  action: (formData: FormData) => void;
  id: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete ${label}? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="text-sm font-medium text-red-600 hover:underline">Delete</button>
    </form>
  );
}
