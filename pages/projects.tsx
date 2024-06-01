import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import axios from 'axios';
import sx from '../styles/Projects.module.scss';
import Project from '../components/Project/Project';
import { projectListState } from '../utils/State';
import { IProject } from '../types/mongodb';
import { Conditional, cn } from '../utils/Helpers';

export default function Projects(): JSX.Element {
  const [projects, setProjects] = useRecoilState(projectListState);

  const fetchProjects = async () => {
    axios.get('/api/projects')
      .then((res) => {
        setProjects(res.data.projects as IProject[]);
      }).catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects(); //
  }, []);

  return (
    <div className={cn(sx.content, sx.root)}>
      <Conditional
        condition={projects.length > 0}
      >
        {projects.map((proj) => (
          <Project
            name={proj.name}
            description={proj.description}
            thumbnails={proj.thumbnails}
            year={proj.year}
            url={proj.url}
            urlLabel={proj.urlLabel}
          />
        ))}
      </Conditional>
    </div>
  );
}
