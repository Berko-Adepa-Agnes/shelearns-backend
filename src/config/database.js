import mongoose from 'mongoose';
import Career from '../models/career.js';
import Roadmap from '../models/roadmap.js';

const careerPaths = [
  'Frontend Engineer',
  'Backend Engineer',
  'Fullstack Developer',
  'Data Scientist',
  'DevOps Engineer',
  'UX Designer',
  'AI Engineer',
  'Technical Writer',
  'Product Manager',
  'Cyber Security',
  'Blockchain Developer',
  'Data Analyst',
  'Android Developer',
  'iOS Developer'
];

// Roadmaps data
const roadmaps = {
  'Frontend Engineer': {
    link: 'https://roadmap.sh/frontend',
    video: 'https://youtu.be/Tef1e9FiSR0?si=T5OI1xEdP0O0I-ZH',
    guide: 'https://guides.codewithmosh.com/frontend-developer-roadmap'
  },
  'Backend Engineer': {
    link: 'https://roadmap.sh/backend',
    video: 'https://youtu.be/OeEHJgzqS1k?si=HBeuUsHnqwvwQza1',
    guide: 'https://guides.codewithmosh.com/backend-developer-roadmap'
  },
  'Fullstack Developer': {
    link: 'https://roadmap.sh/full-stack',
    video: 'https://youtu.be/GxmfcnU3feo?si=qwHZk1vN2RMicG62',
    guide: 'https://guides.codewithmosh.com/web-developer-roadmap'
  },
  'Data Scientist': {
    link: 'https://roadmap.sh/ai-data-scientist',
    video: 'https://youtu.be/9R3X0JoCLyU?si=jWFROS0wn04XuUMi',
    guide: 'https://guides.codewithmosh.com/data-science-roadmap'
  },
  'DevOps Engineer': {
    link: 'https://roadmap.sh/devops',
    video: 'https://youtu.be/6GQRb4fGvtk?si=RwDYgoCFpZzyw8CJ',
    guide: 'https://guides.codewithmosh.com/devops-roadmap'
  },
  'UX Designer': {
    link: 'https://roadmap.sh/ux-design',
    video: 'https://youtu.be/HmKwiEmJIdM?si=ALh-JlXxf_sIkeSC'
  },
  'AI Engineer': {
    link: 'https://roadmap.sh/ai-engineer',
    video: 'https://youtu.be/7IgVGSaQPaw?si=CFb9kPNvmXu9VVdx',
    guide: 'https://guides.codewithmosh.com/machine-learning-engineer-roadmap'
  },
  'Technical Writer': {
    link: 'https://roadmap.sh/technical-writer',
    video: 'https://youtu.be/1w1QYR-n1js?si=q--a2oixTNsBXxmS'
  },
  'Product Manager': {
    link: 'https://roadmap.sh/product-manager',
    video: 'https://youtu.be/kD2vTLNHkhk?si=0tGv5l3Ps8IrIQAe'
  },
  'Cyber Security': {
    link: 'https://roadmap.sh/cyber-security',
    video: 'https://youtu.be/D4fYyu305jg?si=1m_sFRYXrjF7gKYv'
  },
  'Blockchain Developer': {
    link: 'https://roadmap.sh/blockchain',
    video: 'https://youtu.be/zglv3lCchSo?si=Ecrya2N2boweEJjk'
  },
  'Data Analyst': {
    link: 'https://roadmap.sh/data-analyst',
    video: 'https://youtu.be/YRJbhFLLPyE?si=E_gA8-iHSDrXNQj_',
    guide: 'https://guides.codewithmosh.com/data-analyst-roadmap'
  },
  'Android Developer': {
    link: 'https://roadmap.sh/android',
    video: 'https://youtu.be/yye7rSsiV6k?si=iT1sJ1ZTSqrE_3ej',
    guide: 'https://guides.codewithmosh.com/mobile-app-developer-roadmap'
  },
  'iOS Developer': {
    link: 'https://roadmap.sh/ios',
    video: 'https://youtu.be/yye7rSsiV6k?si=iT1sJ1ZTSqrE_3ej',
    guide: 'https://guides.codewithmosh.com/mobile-app-developer-roadmap'
  }
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    await populateDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Populate database with initial data
const populateDatabase = async () => {
  try {
    // Check if database is already populated
    const existingCareer = await Career.findOne({ name: careerPaths[0] });

    if (existingCareer) {
      console.log('Database already populated...');
      return;
    }

    console.log('Populating database needed for SheLearns to work...');

    // Create careers and roadmaps
    for (const careerName of careerPaths) {
      // Create career
      const career = new Career({ name: careerName });

      // Get roadmap data
      const roadmapData = roadmaps[careerName];

      // Create roadmap
      const roadmap = new Roadmap({
        career: career.id,
        link: roadmapData.link,
        video: roadmapData.video,
        guide: roadmapData.guide || null
      });

      // Save both career & roadmap
      await career.save();
      await roadmap.save();
    }

    console.log('Populated database successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

export { connectDB };
