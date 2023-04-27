import {
  IAbout, IColors, IContact, ILanding, ISite, ISkills, IWork,
} from './IInfo';

export const shapeThickness = '24px';

export const colors: IColors = {
  yellow: '#FFCC48',
  red: '#E63946',
  white: '#FFF',
  navy: '#273140',
};

export const site: ISite = {
  config: {
    title: 'Thomas Shaw',
    description: 'Custom NextJS Template',
  },
  navigation: {
    primary: [
      {
        key: 'about',
        label: 'About',
        href: '/about',
      },
      {
        key: 'skills',
        label: 'Skills',
        href: '/skills',
      },
      {
        key: 'work',
        label: 'Work',
        href: '/work',
      },
    ],
    emphasized: {
      key: 'contact',
      label: 'Get in Touch',
      href: '/contact',
    },
  },
};

export const landing: ILanding = {
  text: {
    title: "Hi there! I'm",
    name: 'Thomas Shaw',
    subtitle: "I'm a Full Stack Developer based in San Francisco, CA",
  },
  graphic: {
    shapes: {
      top: {
        style: 'circle',
        color: colors.yellow,
        size: '120px',
      },
      bottom: {
        style: 'circle',
        color: colors.red,
        size: '90px',
      },
    },
    image: {
      shape: 'circle',
      path: '/photos/plant-tom.png',
      label: 'Picture of Thomas',
    },
  },
};

export const about: IAbout = {
  text: {
    title: 'A little about me.',
    body: `For over 3 years I’ve been developing high performance web applications with 
    beautiful user interfaces, delivering valuable features and seamless user experiences. 
    React, TypeScript, Python and Django are my bread and butter, but I’m always excited to 
    learn new languages, libraries and frameworks.<br>
    I wasn’t always a software engineer. My career started in IT, working from a technical 
    support associate to technical lead for one of California’s largest beverage distributors. 
    During that time, I gained hands on experience with technical project management.<br>
    One characteristic that has remained constant throughout my career is finding ways to 
    make people’s lives easier and more efficient by leveraging my technical knowledge.
    `,
  },
  shapes: {
    first: {
      style: 'rectangle-round',
      color: colors.white,
      size: shapeThickness,
    },
    second: {
      style: 'circle',
      color: colors.white,
      size: shapeThickness,
    },
    third: {
      style: 'circle',
      color: colors.yellow,
      size: shapeThickness,
    },
    fourth: {
      style: 'rectangle-round',
      color: colors.red,
      size: shapeThickness,
    },
  },
};

export const skills: ISkills = {
  text: {
    title: "I've learned some things.",
    body: `I’ve always had a passion for UI/UX design. I first started my academic career 
    pursuing an art degree, but later changed course for computer science. I take pride in 
    pairing my creative eye with my technical know-how. Along the way I've developed a set
    of skills that have allowed me to build applications through every part of the stack.`,
    other: 'Here are some other technologies I have experience with.',
  },
  emphasized: [
    {
      key: 'react',
      label: 'ReactJS',
      logo: {
        path: '/icons/react.png',
        label: 'ReactJS logo',
      },
      percentage: 95,
    },
    {
      key: 'python',
      label: 'Python',
      logo: {
        path: '/icons/python.png',
        label: 'Python logo',
      },
      percentage: 90,
    },
    {
      key: 'postrgres',
      label: 'PostgreSQL',
      logo: {
        path: '/icons/postgresql.png',
        label: 'PostgreSQL logo',
      },
      percentage: 88,
    },
    {
      key: 'django',
      label: 'Django',
      logo: {
        path: '/icons/django.png',
        label: 'Django logo',
      },
      percentage: 80,
    },
    {
      key: 'typescript',
      label: 'TypeScript',
      logo: {
        path: '/icons/typescript.png',
        label: 'TypeScript logo',
      },
      percentage: 72,
    },
  ],
  other: [
    'NodeJS',
    'ExpressJS',
    'Redux',
    'Recoil',
    'React Testing Library',
    'Flask',
    'FastAPI',
    'APScheduler',
    'SQLAlchemy',
    'Alembic',
    'Create React App',
    'NextJS',
    'HTML5',
    'CSS',
    'Sass',
    'MySQL',
    'SQL Server',
    'MongoDB',
    'GraphQL',
    'Cesium',
    'Resium',
    'Selenium',
    'PyTest',
    'Jest',
    'Node Package Manager',
    'TypeDoc',
    'JSDoc',
    'TSDoc',
    'Kubernetes',
    'Docker',
    'React Native',
    'Expo',
    'MUI v4',
    'MUI v5',
    'Figma',
    'Illustrator',
    'Jira',
    'Confluence',
    'Slack',
    'Git',
    'GitHub',
    'Phabricator',
    'SocketIO',
    'Django REST Framework',
    'React Router',
    'Axios',
    'TimescaleDB',
  ],
};

export const work: IWork = {
  text: {
    title: 'Check out my work.',
  },
  shapes: {
    top: {
      left: {
        style: 'rectangle-round',
        color: colors.white,
        size: shapeThickness,
      },
      right: {
        style: 'rectangle-round',
        color: colors.yellow,
        size: shapeThickness,
      },
    },
    bottom: {
      left: {
        style: 'rectangle-round',
        color: colors.red,
        size: shapeThickness,
      },
      middle: {
        style: 'rectangle-round',
        color: colors.yellow,
        size: shapeThickness,
      },
      right: {
        style: 'circle',
        color: colors.white,
        size: shapeThickness,
      },
    },
  },
  projects: [
    {
      key: 'themis-v2',
      title: 'Themis v2',
      description: `Themis v2 was a full refactor of our ground-software web application; a
      tool used by our mission operations team to command and monitor our fleet of satellites and
      simulation testbeds. I had the unique opportunity to lead this project, including working with
      stakeholders and other full stack developers to establish our user interface design system, 
      as well as architect the application from the ground up for better performance and maintainability.<br>
      Part of this project was creating the new commanding sessions user interface, allowing for multi-satellite
      commanding.`,
      image: {
        key: 'command-v2',
        path: '/projects/commanding-v2-ui.gif',
        label: 'Themis v2 Commanding UI',
      },
      technologies: [
        'ReactJS',
        'TypeScript',
        'Recoil',
        'React Router',
        'Python',
        'Django',
        'SocketIO',
        'PostgreSQL',
        'TimescaleDB',
        'Sass',
      ],
    },
    {
      key: 'brown-bear-epoxy',
      title: 'Brown Bear Epoxy',
      description: `Brown Bear Epoxy is an up-and-coming epoxy countertop contractor based in
      San Francisco. I had the pleasure of working with this company to create a business store-front intended
      to attact customers and advertise their offered services.`,
      link: 'https://kjc-epoxy.vercel.app',
      image: {
        key: 'brown-bear',
        path: '/projects/brown-bear.png',
        label: 'Brown Bear Epoxy home page',
      },
      technologies: [
        'ReactJS',
        'NextJS',
        'TypeScript',
        'Sass',
      ],
    },
    {
      key: 'cesium-big-board',
      title: 'Cesium Big Board',
      description: `What do you do when you get asked to create a dashboard that looks
      "freaking awesome"? You do exactly that.<br>
      I developed this internal marketing tool using CesiumJS and Resium to visualize current 
      and future satellite projects (to scale), including Earth-surface network beam patterns. 
      Using 3D models of our products, and data provided by our network calculations team, I was
      able to create a beautifully animated interface demonstrating our satellite fleet.<br>
      This was my first time working with 3D graphics in JavaScript. It's a project I won't soon
      forget.`,
      image: {
        key: 'big-board',
        path: '/projects/big-board.gif',
        label: 'Themis Big Board with Cesium Globe',
      },
      technologies: [
        'ReactJS',
        'TypeScript',
        'CesiumJS',
        'Resium',
        'MapTiler',
        'Framer Motion',
        'Sass',
      ],
    },
  ],
};

export const contact: IContact = {
  text: {
    title: "Let's connect!",
  },
  graphic: {
    shapes: {
      left: {
        top: {
          style: 'rectangle-round',
          color: colors.yellow,
          size: shapeThickness,
        },
        bottom: {
          style: 'rectangle-round',
          color: colors.white,
          size: shapeThickness,
        },
      },
      right: {
        top: {
          style: 'rectangle-round',
          color: colors.red,
          size: shapeThickness,
        },
        middle: {
          style: 'rectangle-round',
          color: colors.yellow,
          size: shapeThickness,
        },
        bottom: {
          style: 'circle',
          color: colors.white,
          size: shapeThickness,
        },
      },
    },
    image: {
      shape: 'rectangle',
      path: '/photos/pro-tom.png',
      label: 'Picture of Thomas',
    },
  },
  links: [
    {
      key: 'github',
      label: 'GitHub',
      href: 'https://www.github.com/TomTheHuman',
      logo: {
        path: '/icons/github.png',
        label: 'GitHub logo',
      },
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ThomasLShaw',
      logo: {
        path: '/icons/linkedin.png',
        label: 'LinkedIn logo',
      },
    },
    {
      key: 'email',
      label: 'Email Me',
      value: 'thomas@tomthehuman.com',
      href: 'mailto:thomas@tomthehuman.com',
      logo: {
        path: '/icons/email.png',
        label: 'Email icon',
      },
    }, {
      key: 'phone',
      label: 'Call Me',
      value: '(707) 843-1047',
      href: 'tel:+17078431047',
      logo: {
        path: '/icons/phone.png',
        label: 'Phone icon',
      },
    },
  ],
};
