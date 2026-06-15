import { getImageSettings } from "@/lib/settings";
import { updateImageSettings } from "@/app/actions/admin";
import { PageHeader, Select, FormActions } from "@/components/dashboard/ui";

interface SettingsPageProps {
  searchParams: Promise<{ saved?: string }>;
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const { saved } = await searchParams;
  const settings = getImageSettings();

  const aspectOptions = [
    { value: "aspect-square", label: "Square (1:1)" },
    { value: "aspect-[3/4]", label: "Portrait (3:4)" },
    { value: "aspect-[4/3]", label: "Classic (4:3)" },
    { value: "aspect-video", label: "Landscape (16:9)" },
  ];

  const fitOptions = [
    { value: "object-cover", label: "Cover (Fill & Crop)" },
    { value: "object-contain", label: "Contain (Entire Image / Letterbox)" },
  ];

  return (
    <div>
      <PageHeader
        title="Image Settings"
        subtitle="Control how images and aspect resolutions are displayed on public pages."
      />

      {saved === "true" && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm font-semibold text-green-800 border border-green-200">
          ✓ Settings saved successfully and paths revalidated.
        </div>
      )}

      <form action={updateImageSettings} className="card space-y-8 p-6">
        {/* Doctors Page Settings */}
        <div>
          <h2 className="text-md font-bold text-slate-800 mb-4 border-b pb-2">Doctors Page Images</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Aspect Ratio"
              name="doctor_aspectRatio"
              defaultValue={settings.doctor.aspectRatio}
              options={aspectOptions}
            />
            <Select
              label="Image Fit"
              name="doctor_objectFit"
              defaultValue={settings.doctor.objectFit}
              options={fitOptions}
            />
          </div>
        </div>

        {/* Hospitals Page Settings */}
        <div>
          <h2 className="text-md font-bold text-slate-800 mb-4 border-b pb-2">Hospitals Page Images</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Aspect Ratio"
              name="hospital_aspectRatio"
              defaultValue={settings.hospital.aspectRatio}
              options={aspectOptions}
            />
            <Select
              label="Image Fit"
              name="hospital_objectFit"
              defaultValue={settings.hospital.objectFit}
              options={fitOptions}
            />
          </div>
        </div>

        {/* Treatments Page Settings */}
        <div>
          <h2 className="text-md font-bold text-slate-800 mb-4 border-b pb-2">Treatments Page Images</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Aspect Ratio"
              name="treatment_aspectRatio"
              defaultValue={settings.treatment.aspectRatio}
              options={aspectOptions}
            />
            <Select
              label="Image Fit"
              name="treatment_objectFit"
              defaultValue={settings.treatment.objectFit}
              options={fitOptions}
            />
          </div>
        </div>

        <FormActions cancelHref="/dashboard" />
      </form>
    </div>
  );
}
