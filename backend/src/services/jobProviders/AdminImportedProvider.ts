import { JobProvider, JobSearchParams } from './JobProvider';
import Job, { IJob } from '../../models/Job';

export class AdminImportedProvider extends JobProvider {
  public readonly name = 'Admin';

  public getStatus(): string {
    return 'Configured';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    const query: any = { source: 'Admin' };

    if (params.query) {
      query.$text = { $search: params.query };
    }
    
    if (params.location) {
      query.location = { $regex: params.location, $options: 'i' };
    }

    if (params.jobType) {
      query.employmentType = params.jobType;
    }

    if (params.experience) {
      query.experienceLevel = params.experience;
    }

    if (params.minSalary) {
      query.salaryMin = { $gte: params.minSalary };
    }

    const jobs = await Job.find(query).limit(50).exec();
    return jobs;
  }
}
