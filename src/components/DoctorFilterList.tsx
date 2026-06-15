"use client";

import { useState, useMemo, useEffect } from "react";
import { Doctor, Hospital } from "@prisma/client";
import { DoctorCard } from "./Cards";
import { IconFilter } from "./Icons";
import { CustomDropdown } from "./CustomDropdown";

type DoctorWithHospital = Doctor & { hospital: Hospital | null };

interface DoctorFilterListProps {
  initialDoctors: DoctorWithHospital[];
}

export function DoctorFilterList({ initialDoctors }: DoctorFilterListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(3);
  }, [searchQuery, selectedSpecialty, selectedLocation]);

  // Gather all unique specialties dynamically from the doctors list
  const specialtiesList = useMemo(() => {
    const specs = new Set<string>();
    initialDoctors.forEach((doc) => {
      if (doc.primarySpecialty) {
        specs.add(doc.primarySpecialty);
      }
      if (doc.specialties) {
        try {
          const parsed = JSON.parse(doc.specialties);
          if (Array.isArray(parsed)) {
            parsed.forEach((s) => {
              if (typeof s === "string" && s.trim()) {
                specs.add(s.trim());
              }
            });
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    });
    return Array.from(specs).sort();
  }, [initialDoctors]);

  // Gather all unique locations dynamically from the doctors list
  const locationsList = useMemo(() => {
    const locs = new Set<string>();
    initialDoctors.forEach((doc) => {
      if (doc.hospital?.location) {
        locs.add(doc.hospital.location.trim());
      }
    });
    return Array.from(locs).sort();
  }, [initialDoctors]);

  // Filter the doctors list based on selected filter values
  const filteredDoctors = useMemo(() => {
    return initialDoctors.filter((doc) => {
      // 1. Search Query Filter (name, primarySpecialty, or specialty tags)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesPrimary = doc.primarySpecialty.toLowerCase().includes(query);
        let matchesTags = false;
        if (doc.specialties) {
          try {
            const parsed = JSON.parse(doc.specialties);
            if (Array.isArray(parsed)) {
              matchesTags = parsed.some(
                (s) => typeof s === "string" && s.toLowerCase().includes(query)
              );
            }
          } catch (e) {
            // Ignore
          }
        }
        if (!matchesName && !matchesPrimary && !matchesTags) {
          return false;
        }
      }

      // 2. Specialty Filter
      if (selectedSpecialty !== "") {
        const matchesPrimary = doc.primarySpecialty === selectedSpecialty;
        let matchesTags = false;
        if (doc.specialties) {
          try {
            const parsed = JSON.parse(doc.specialties);
            if (Array.isArray(parsed)) {
              matchesTags = parsed.some((s) => s === selectedSpecialty);
            }
          } catch (e) {
            // Ignore
          }
        }
        if (!matchesPrimary && !matchesTags) {
          return false;
        }
      }

      // 3. Location Filter
      if (selectedLocation !== "") {
        if (doc.hospital?.location !== selectedLocation) {
          return false;
        }
      }

      return true;
    });
  }, [initialDoctors, searchQuery, selectedSpecialty, selectedLocation]);

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row items-stretch md:items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by doctor name or speciality (e.g. Gynecomastia, Hernia)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 placeholder:text-slate-400"
          />
        </div>

        {/* Specialty Select */}
        <CustomDropdown
          value={selectedSpecialty}
          onChange={setSelectedSpecialty}
          options={specialtiesList}
          placeholder="All Specialities"
          className="w-full md:w-56"
        />

        {/* Location Select */}
        <CustomDropdown
          value={selectedLocation}
          onChange={setSelectedLocation}
          options={locationsList}
          placeholder="All Locations"
          className="w-full md:w-56"
        />

        {/* Filter Button */}
        <button
          type="button"
          className="btn-blue flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-blue text-white hover:brightness-105 transition"
        >
          <IconFilter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Grid of Results */}
      {filteredDoctors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500 font-medium">No doctors match your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSpecialty("");
              setSelectedLocation("");
            }}
            className="mt-4 text-sm font-semibold text-brand-blue hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.slice(0, visibleCount).map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>

          {/* Load More Pagination */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <p className="text-xs text-slate-400 font-semibold text-center">
              Showing {Math.min(visibleCount, filteredDoctors.length)} of {filteredDoctors.length} verified surgeons across Delhi-NCR & Mumbai
            </p>
            {visibleCount < filteredDoctors.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="border border-brand-blue text-brand-blue bg-white hover:bg-slate-50 transition px-8 py-3 rounded-full font-semibold text-sm shadow-sm"
              >
                Load More Doctors
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
