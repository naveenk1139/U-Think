import { JobProvider, JobSearchParams } from './JobProvider';
import { IJob } from '../../models/Job';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export class JSearchProvider extends JobProvider {
  public readonly name = 'JSearch (RapidAPI)';

  public getStatus(): string {
    return process.env.RAPIDAPI_KEY ? 'Configured' : 'Not Configured';
  }

  public async searchJobs(params: JobSearchParams): Promise<Partial<IJob>[]> {
    if (this.getStatus() !== 'Configured') {
      return [];
    }

    try {
      let q = params.query || 'software engineer';
      if (params.location) q += ` in ${params.location}`;

      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: q,
          page: '1',
          num_pages: '1',
          employment_types: this.mapJobType(params.jobType),
          date_posted: 'month'
        },
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      const rawJobs = response.data?.data || [];

      return rawJobs.map((job: any) => {
        // Map the real publisher back to our UI's requested sources if possible
        let sourceName = job.employer_name || 'JSearch';
        if (job.job_publisher) {
          if (job.job_publisher.toLowerCase().includes('linkedin')) sourceName = 'LinkedIn';
          else if (job.job_publisher.toLowerCase().includes('indeed')) sourceName = 'Indeed';
          else if (job.job_publisher.toLowerCase().includes('naukri')) sourceName = 'Naukri';
          else if (job.job_publisher.toLowerCase().includes('glassdoor')) sourceName = 'Glassdoor';
          else sourceName = job.job_publisher;
        }

        const mappedJob: Partial<IJob> = {
          jobId: `jsearch-${job.job_id || uuidv4()}`,
          source: sourceName,
          sourceJobId: job.job_id || 'unknown',
          title: job.job_title || 'Unknown Title',
          company: job.employer_name || 'Unknown Company',
          companyLogo: job.employer_logo || undefined,
          location: `${job.job_city || ''}, ${job.job_state || ''}, ${job.job_country || ''}`.replace(/^, | ,|, $/g, '').trim() || 'Anywhere',
          workMode: job.job_is_remote ? 'Remote' : 'On-site',
          employmentType: job.job_employment_type || 'Full Time',
          experienceLevel: params.experience || 'Not specified',
          description: job.job_description || '',
          applicationUrl: job.job_apply_link || job.job_google_link,
          sourceUrl: job.job_google_link,
          verified: true,
          postedAt: job.job_posted_at_datetime_utc ? new Date(job.job_posted_at_datetime_utc) : new Date(),
          skills: this.extractSkills(job.job_description || '')
        };

        return mappedJob;
      });
    } catch (error) {
      console.error('JSearch API Error:', error);
      return [];
    }
  }

  private mapJobType(type?: string) {
    if (!type || type === 'all') return undefined;
    if (type === 'Full Time') return 'FULLTIME';
    if (type === 'Part Time') return 'PARTTIME';
    if (type === 'Contract') return 'CONTRACTOR';
    if (type === 'Internship') return 'INTERN';
    return undefined;
  }

  private extractSkills(description: string): string[] {
    const commonSkills = ['Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git', 'Machine Learning', 'TypeScript', 'Django', 'MongoDB', 'PostgreSQL', 'C++', 'C#', 'Go', 'Rust'];
    return commonSkills.filter(skill => description.toLowerCase().includes(skill.toLowerCase())).slice(0, 5);
  }
}
