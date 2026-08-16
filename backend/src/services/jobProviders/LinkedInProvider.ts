import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';

export class LinkedInProvider extends JobProvider {
  public readonly name = 'LinkedIn';

  public getStatus(): string {
    return process.env.LINKEDIN_API_KEY ? 'Configured' : 'Requires Access';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }

    // If we had a real API key, we would use axios to fetch from LinkedIn API
    return [];
  }
}
