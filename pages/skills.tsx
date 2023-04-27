import React from 'react';

// External Imports
import LinearProgress from '@mui/material/LinearProgress';
import Marquee from 'react-fast-marquee';

// Internal Imports
import { IEmphasizedSkill } from 'utils/IInfo';
import cn from 'utils/Styling';
import { skills } from '../utils/Info';
import sx from '../styles/pages/Skills.module.scss';

/** Card Props */
type ICardProps = IEmphasizedSkill;

/**
 * Emphasized skill card component, displaying technology logo,
 * name, and knowledge percentage in visual format
 * @param { ICardProps } props
 * @returns { JSX.Element } skill card
 */
function Card(props: ICardProps): JSX.Element {
  const { label, logo, percentage } = props;

  return (
    <div className={sx.card}>
      <div className={sx.row}>
        <img
          src={logo.path}
          alt={logo.label}
          className={sx.image}
        />
        <p
          id={sx.name}
          className={sx.body1}
        >
          {label}
        </p>
      </div>
      <div className={sx.row}>
        <LinearProgress
          id={sx.percentage}
          variant="determinate"
          value={percentage}
          color="info"
        />
      </div>
    </div>
  );
}

/** Skill Marquee Props */
interface ISkillMarqueeProps {
  list: string[];
}

/**
 * Scrolling marquee listing all "other" skills
 * @param { ISkillMarqueeProps } props
 * @returns { JSX.Element } marquee text
 */
function SkillMarquee(props: ISkillMarqueeProps): JSX.Element {
  const { list } = props;

  return (
    <div className={sx.marquee}>
      <Marquee className={sx.track}>
        {list.map((skill: string, i: number) => (
          <p
            key={`${skill}-${i}`}
            className={cn([sx.other, sx.body1])}
          >
            {skill}
          </p>
        ))}
      </Marquee>
    </div>
  );
}

/**
 * Skills page component, emphasizing my most used technical skills
 * and listing all technologies I have experience with
 * @returns {JSX.Element} skills page component
 */
export default function Skills(): JSX.Element {
  const { text, emphasized, other } = skills;

  return (
    <div className={sx.root}>
      <h2 className={sx.head2}>{text.title}</h2>
      <p className={sx.body1}>{text.body}</p>
      <div className={sx.emphasized}>
        {emphasized.map((skill) => (
          <Card {...skill} />
        ))}
      </div>
      <p className={sx.body1}>{text.other}</p>
      <SkillMarquee list={other} />
    </div>
  );
}
