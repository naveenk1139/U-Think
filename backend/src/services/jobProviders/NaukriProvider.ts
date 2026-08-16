import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';

export class NaukriProvider extends JobProvider {
  public readonly name = 'Naukri';

  public getStatus(): string {
    return process.env.NAUKRI_API_KEY ? 'Configured' : 'Requires Access';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }
    return [];
  }
}
