import { v4 as uuidv4 } from 'uuid';
import Job, { IJob } from '../models/Job';
import { 
  JobProvider, 
  JobSearchParams,
  LinkedInProvider,
  NaukriProvider,
  IndeedProvider,
  GoogleJobsProvider,
  ApnaProvider,
  WorkIndiaProvider,
  JobHaiProvider,
  AdminImportedProvider,
  JSearchProvider,
  RemotiveProvider,
  AdzunaProvider
} from './jobProviders';

class JobService {
  private providers: JobProvider[];

  constructor() {
    this.providers = [
      new AdzunaProvider(), // Primary provider for Indian jobs
      new RemotiveProvider(), // Free fallback
      new JSearchProvider(), // Needs API Key
      new AdminImportedProvider(),
      new LinkedInProvider(),
      new NaukriProvider(),
      new IndeedProvider(),
      new GoogleJobsProvider(),
      new ApnaProvider(),
      new WorkIndiaProvider(),
      new JobHaiProvider()
    ];
  }

  public async searchJobs(params: JobSearchParams): Promise<IJob[]> {
    const allJobs: Partial<IJob>[] = [];
    
    // Fetch from all providers in parallel
    const providerPromises = this.providers.map(async (provider) => {
      try {
        const jobs = await provider.searchJobs(params);
        
        // If provider returned jobs, add them
        if (jobs && jobs.length > 0) {
          allJobs.push(...jobs);
        }
      } catch (error) {
        console.error(`Error fetching jobs from ${provider.name}:`, error);
        // Do not break the whole search if one provider fails
      }
    });

    await Promise.allSettled(providerPromises);

    // Deduplicate jobs
    const deduplicated = this.deduplicateJobs(allJobs);

    // Save fetched jobs to DB (excluding fallbacks for permanent storage, or just upsert them temporarily)
    const savedJobs = await this.cacheJobs(deduplicated);

    return savedJobs;
  }

  private deduplicateJobs(jobs: Partial<IJob>[]): Partial<IJob>[] {
    const unique = new Map<string, Partial<IJob>>();

    jobs.forEach(job => {
      // Create a unique key based on normalized title, company, and location
      const key = `${job.title?.toLowerCase()}|${job.company?.toLowerCase()}|${job.location?.toLowerCase()}`;
      
      if (unique.has(key)) {
        // If it exists, maybe append the source?
        const existing = unique.get(key)!;
        if (!existing.source?.includes(job.source!)) {
           existing.source = `${existing.source} | ${job.source}`;
        }
      } else {
        unique.set(key, job);
      }
    });

    return Array.from(unique.values());
  }

  private async cacheJobs(jobs: Partial<IJob>[]): Promise<IJob[]> {
    const result: IJob[] = [];
    
    for (const jobData of jobs) {
      if (!jobData.jobId) continue;
      
      // Upsert job into DB
      try {
        const updatedJob = await Job.findOneAndUpdate(
          { jobId: jobData.jobId },
          { ...jobData, lastUpdated: new Date() },
          { new: true, upsert: true }
        );
        result.push(updatedJob);
      } catch (err: any) {
        console.error('Mongoose cache error for job:', jobData.jobId, err.message);
      }
    }
    
    return result;
  }
  
  public async getJobDetails(jobId: string): Promise<IJob | null> {
    return await Job.findOne({ jobId });
  }

  public getProviderStatuses() {
    return this.providers.map(p => ({
      name: p.name,
      status: p.getStatus()
    }));
  }
}

export const jobService = new JobService();
