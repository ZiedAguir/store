// Configuration pour chaque champ du formulaire
export const fieldsConfig = {
  fullname: { label: "name", type: "text", required: true, },
  email: { label: "Email", type: "email", required: true },
  phone: { label: "Phone", type: "phone", required: true },
  address: { label: "Address", type: "text", required: false },
  trafic: { label: "Trafic", type: "number", required: true },
  discipline: {
    label: "Discipline",
    type: "select",
    required: true,
    options: [
      { value: "e-commerce", label: "E-commerce" },
      { value: "education", label: "Education" },
      { value: "healthcare", label: "Healthcare" },
      { value: "finance", label: "Finance" },
      { value: "real-estate", label: "Real Estate" },
      { value: "other", label: "Other" },
    ],
  },
  rating: { label: "Rating", type: "number", required: true, min: 1, max: 5, step: 1 },
  status: {
    label: "Status",
    type: "select",
    required: true,
    options: [
      { value: "active", label: "Active" },
      { value: "maintenance", label: "In Maintenance" },
      { value: "inactive", label: "Inactive" },
    ],
  },
};

  