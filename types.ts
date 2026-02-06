export interface Student {
  name: string;
  email: string;
}

export interface Team {
  id: string;
  school: string;
  teamName: string;
  members: Student[];
  registeredAt: string;
}

export enum SchoolName {
  KENSINGTON = "Kensington School",
  KINGS = "King's College",
  ASM = "American School of Madrid",
  ICS = "International College Spain",
  ISM = "International School of Madrid",
  OTHER = "Other"
}

export const SCHOOL_LIST = [
  SchoolName.KENSINGTON,
  SchoolName.KINGS,
  SchoolName.ASM,
  SchoolName.ICS,
  SchoolName.ISM,
];