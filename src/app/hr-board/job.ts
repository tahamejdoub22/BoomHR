export interface Job {
    _id?:string;
    jobTitle?: string;
    jobDomain?: string;
    address?: string;
    hiringLead?: string;
    skillsRequired?:string;

    postedDate?: Date;
    department?: string;
    jobStatus?: string;
    applicants?: number;
    vacancies?: number;
    verified?: boolean;
    jobApplications?: string[];
    candidates?: string[];

}