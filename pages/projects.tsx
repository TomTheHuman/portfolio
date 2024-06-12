import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import axios from 'axios';
import sx from '../styles/Projects.module.scss';
import { Project, ProjectLoading } from '../components/Project/Project';
import { projectListState } from '../utils/State';
import { IProject } from '../types/mongodb';
import { Conditional, cn } from '../utils/Helpers';

export default function Projects(): JSX.Element {
  const [projects, setProjects] = useRecoilState(projectListState);

  const fetchProjects = async () => {
    axios.get('/api/projects')
      .then((res) => {
        const formattedProjects = res.data.projects.map((p: IProject) => (
          { ...p, projectCreated: new Date(p.projectCreated) }
        ));
        setTimeout(() => setProjects(formattedProjects), 1500);
      }).catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects(); //
  }, []);

  return (
    <div className={cn(sx.content, sx.root)}>
      <Conditional
        condition={projects.length > 0}
        fallback={
          <ProjectLoading />
        }
      >
        {projects.map((proj, i) => (
          <Project
            key={proj.name}
            name={proj.name}
            description={proj.description}
            index={i}
            thumbnail={proj.thumbnail}
            gallery={proj.gallery}
            projectCreated={proj.projectCreated}
            url={proj.url}
            urlLabel={proj.urlLabel}
          />
        ))}
      </Conditional>
    </div>
  );
}

/**
 * TODO clicking same nav item clears title text
 */
