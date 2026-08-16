import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';

export class GoogleJobsProvider extends JobProvider {
  public readonly name = 'Google Jobs';

  public getStatus(): string {
    return process.env.GOOGLE_JOBS_API_KEY ? 'Configured' : 'Not Configured';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }
    return [];
  }
}
