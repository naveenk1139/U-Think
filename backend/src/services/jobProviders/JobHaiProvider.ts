import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';

export class JobHaiProvider extends JobProvider {
  public readonly name = 'Job Hai';

  public getStatus(): string {
    return process.env.JOBHAI_API_KEY ? 'Configured' : 'Not Configured';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }
    return [];
  }
}
