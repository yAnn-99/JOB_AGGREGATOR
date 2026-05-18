export type JobProps = {
  job: {
    id: string;
    title?: string;
    descriptionPreview?: string;
    formattedPlaces?: string[];
    skillsList?: { name: string }[];
    smallCompany?: {
      companyName?: string;
    };
  };
};

export type Job = {
  id: string;
  title: string;
  descriptionPreview?: string;
  formattedPlaces?: string[];
  skillsList?: { name: string }[];
  smallCompany?: {
    companyName?: string;
  };
  details?: {
    remotePolicy?: {
      frequency?: string;
    };
  };
};