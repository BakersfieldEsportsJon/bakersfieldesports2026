/**
 * STEM program data verified from the Bakersfield eSports Center site audit.
 *
 * BEC partners with Valley Strong Credit Union to offer STEM education
 * initiatives that leverage gaming and esports as an engagement vehicle
 * for youth in the Bakersfield community.
 */

export interface STEMProgram {
  id: string;
  name: string;
  description: string;
  ageRange?: string;
  partner?: string;
  features: string[];
}

export interface STEMInfo {
  title: string;
  overview: string;
  partner: string;
  programs: STEMProgram[];
  callToAction: {
    text: string;
    description: string;
  };
}

export const stemInfo: STEMInfo = {
  title: 'STEM Education Programs',
  overview:
    'The Bakersfield eSports Center is committed to inspiring the next generation through STEM (Science, Technology, Engineering, and Mathematics) education. In partnership with Valley Strong Credit Union, we use gaming and esports as an engaging entry point to teach critical technology and problem-solving skills.',
  partner: 'Valley Strong Credit Union',
  programs: [
    {
      id: 'game-design',
      name: 'Game Design & Development',
      description:
        'Students learn the fundamentals of game design, including level design, game mechanics, and basic programming concepts using industry-standard tools.',
      features: [
        'Introduction to game design principles',
        'Basic programming and logic concepts',
        'Hands-on project creation',
        'Team collaboration and project management',
      ],
    },
    {
      id: 'pc-building',
      name: 'PC Building & Hardware',
      description:
        'A hands-on workshop where participants learn how to build and maintain gaming PCs, covering hardware components, assembly, and troubleshooting.',
      features: [
        'Computer hardware identification',
        'Step-by-step PC assembly',
        'Troubleshooting and diagnostics',
        'Understanding specifications and performance',
      ],
    },
    {
      id: 'streaming-content',
      name: 'Streaming & Content Creation',
      description:
        'Learn the technology behind live streaming and content creation, including video production, audio setup, and broadcasting software.',
      features: [
        'Streaming software setup and configuration',
        'Audio and video production basics',
        'Branding and channel management',
        'Community engagement strategies',
      ],
    },
    {
      id: 'esports-analytics',
      name: 'Esports Analytics & Strategy',
      description:
        'Explore how data analysis and statistics are used in competitive gaming, introducing students to data-driven decision making through esports.',
      features: [
        'Introduction to data analysis',
        'Game statistics and performance metrics',
        'Strategic thinking and problem solving',
        'Real-world STEM career connections',
      ],
    },
  ],
  callToAction: {
    text: 'Partner With Us',
    description:
      'Interested in bringing STEM education to your school, organization, or community group? Contact us to learn more about hosting a STEM workshop or establishing an ongoing program at the Bakersfield eSports Center.',
  },
};
