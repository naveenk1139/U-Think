import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export class RemotiveProvider extends JobProvider {
  public readonly name = 'Open Web (Remotive)';

  public getStatus(): string {
    // Free public API, always configured out of the box!
    return 'Configured';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') return [];

    try {
      // Remotive API doesn't support complex filtering via query params effectively except for search term
      const limit = params.limit || 50;
      let url = `https://remotive.com/api/remote-jobs?limit=${limit}`;
      if (params.query) {
        url += `&search=${encodeURIComponent(params.query)}`;
      }

      const response = await axios.get(url);
      const rawJobs = response.data?.jobs || [];

      return rawJobs.map((job: any) => {
        const mappedJob: Partial<IJob> = {
          jobId: `remotive-${job.id || uuidv4()}`,
          source: 'Remotive',
          sourceJobId: job.id?.toString() || 'unknown',
          title: job.title || 'Unknown Title',
          company: job.company_name || 'Unknown Company',
          companyLogo: job.company_logo || undefined,
          location: job.candidate_required_location || 'Remote',
          workMode: 'Remote', // Remotive is all remote
          employmentType: job.job_type === 'full_time' ? 'Full Time' : 'Contract',
          experienceLevel: params.experience !== 'all' ? params.experience : '1-3 Yrs',
          description: this.stripHtml(job.description || ''),
          applicationUrl: job.url,
          sourceUrl: job.url,
          verified: true,
          postedAt: job.publication_date ? new Date(job.publication_date) : new Date(),
          skills: job.tags || this.extractSkills(job.description || '')
        };

        return mappedJob;
      });
    } catch (error) {
      console.error('Remotive API Error:', error);
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
