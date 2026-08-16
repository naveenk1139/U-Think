import { IJob } from '../../models/Job';

export interface JobSearchParams {
  query: string;
  location?: string;
  jobType?: string; // 'Full Time', 'Part Time', 'Internship', etc.
  experience?: string; // 'Fresher', '1-3 years', etc.
  minSalary?: number;
}

export abstract class JobProvider {
  public abstract readonly name: string;

  /**
   * Returns the current connection status of the provider.
   * e.g., 'Configured', 'Requires Access', 'Not Configured', 'Error'
   */
  public abstract getStatus(): string;

  /**
   * Search for jobs based on parameters.
   */
  public abstract searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]>;
}
