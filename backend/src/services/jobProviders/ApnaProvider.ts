import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';

export class ApnaProvider extends JobProvider {
  public readonly name = 'Apna';

  public getStatus(): string {
    return process.env.APNA_API_KEY ? 'Configured' : 'Not Configured';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }
    return [];
  }
}
