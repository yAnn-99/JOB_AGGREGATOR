export interface Job {
  id: string;
  title: string;
  description: string;
  descriptionPreview: string;

  contractTypes: string[];

  formattedPlaces: string[];

  skillsList: {
    name: string;
    value: number;
  }[];

  details: {
    requiredExperience: number;

    acceptRemote: string;

    salary: {
      min: number;
      max: number;
      currency: string;
    };
  };

  smallCompany: {
    companyName: string;
    fallbackGalleryUrl: string;
  };
}