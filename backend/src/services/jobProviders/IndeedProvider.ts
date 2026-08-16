import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';

export class IndeedProvider extends JobProvider {
  public readonly name = 'Indeed';

  public getStatus(): string {
    return process.env.INDEED_API_KEY ? 'Configured' : 'Requires Access';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }
    return [];
  }
}
