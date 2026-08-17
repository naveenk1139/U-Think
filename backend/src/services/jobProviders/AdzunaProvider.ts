import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export class AdzunaProvider extends JobProvider {
  public readonly name = 'Adzuna';

  public getStatus(): string {
    return process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY ? 'Configured' : 'Not Configured';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }

    try {
      const page = params.page || 1;
      const limit = params.limit || 20;

      // 'in' stands for India market. 
      const url = `http://api.adzuna.com/v1/api/jobs/in/search/${page}`;
      
      const queryParams: any = {
        app_id: process.env.ADZUNA_APP_ID,
        app_key: process.env.ADZUNA_APP_KEY,
        results_per_page: limit,
        what: params.query || '',
        where: params.location || 'India',
        'content-type': 'application/json'
      };

      if (params.jobType && params.jobType !== 'all') {
        if (params.jobType === 'Full Time') queryParams.full_time = 1;
        if (params.jobType === 'Part Time') queryParams.part_time = 1;
        if (params.jobType === 'Contract') queryParams.contract = 1;
      }

      const response = await axios.get(url, { params: queryParams });
      const rawJobs = response.data?.results || [];

      return rawJobs.map((job: any) => {
        const mappedJob: Partial<IJob> = {
          jobId: `adzuna-${job.id || uuidv4()}`,
          source: 'Adzuna',
          sourceJobId: job.id?.toString() || 'unknown',
          title: job.title || 'Unknown Title',
          company: job.company?.display_name || 'Unknown Company',
          location: job.location?.display_name || 'Anywhere',
          workMode: job.location?.display_name?.toLowerCase().includes('remote') ? 'Remote' : 'On-site',
          employmentType: job.contract_time === 'full_time' ? 'Full Time' : (job.contract_time === 'part_time' ? 'Part Time' : 'Contract'),
          experienceLevel: params.experience && params.experience !== 'all' ? params.experience : 'Not specified',
          description: this.stripHtml(job.description || ''),
          applicationUrl: job.redirect_url,
          sourceUrl: job.redirect_url || 'https://www.adzuna.in',
          verified: true,
          salaryMin: job.salary_min ? Math.round(job.salary_min / 100000) : undefined, // Convert to LPA if it's INR
          salaryMax: job.salary_max ? Math.round(job.salary_max / 100000) : undefined, // Convert to LPA
          postedAt: job.created ? new Date(job.created) : new Date(),
          skills: this.extractSkills(job.description || '')
        };

        return mappedJob;
      });
    } catch (error) {
      console.error('Adzuna API Error:', error);
      return [];
    }
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, '').trim();
  }

  private extractSkills(description: string): string[] {
    const commonSkills = ['Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git', 'Machine Learning', 'TypeScript', 'Django', 'MongoDB', 'PostgreSQL', 'C++', 'C#', 'Go', 'Rust'];
    return commonSkills.filter(skill => description.toLowerCase().includes(skill.toLowerCase())).slice(0, 5);
  }
}
