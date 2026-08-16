import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';

export class WorkIndiaProvider extends JobProvider {
  public readonly name = 'WorkIndia';

  public getStatus(): string {
    return process.env.WORKINDIA_API_KEY ? 'Configured' : 'Not Configured';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }
    return [];
  }
}
