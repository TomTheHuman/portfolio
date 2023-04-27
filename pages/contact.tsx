import React, { useState, useEffect, useRef } from 'react';

// Internal Imports
import Image from 'next/image';
import { useRouter } from 'next/router';
import { contact } from '../utils/Info';
import sx from '../styles/pages/Contact.module.scss';
import { IContactLink } from '../utils/IInfo';
import { Shape } from '../components/Shape';

interface ILinkCardProps {
  link: IContactLink;
}

function LinkCard(props: ILinkCardProps): JSX.Element {
  const { link } = props;
  const [hover, setHover] = useState<boolean>(false);
  const [textWidth, setTextWidth] = useState<number>(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [textRef]);

  const navigate = (href: string): void => {
    window.open(href);
  };

  return (
    <div
      className={sx.linkCard}
      onClick={() => navigate(link.href)}
      onKeyDown={() => navigate(link.href)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchCancel={() => setHover(false)}
    >
      <div id={sx.logo}>
        <Image
          src={link.logo.path}
          alt={link.logo.label}
          width="24px"
          height="24px"
          layout="responsive"
        />
      </div>
      <div
        id={sx.textContainer}
        style={{
          width: hover ? textWidth : '0',
        }}
      >
        <p
          id={sx.text}
          ref={textRef}
          className={sx.body1}
        >
          {link.label}
        </p>
      </div>
    </div>
  );
}

/**
 * Contact page component, provides resources and links to view my work,
 * connect with me on social platforms or get in touch
 * @returns {JSX.Element} contact page component
 */
export default function Contact(): JSX.Element {
  const { text, links, graphic } = contact;
  const { shapes } = graphic;

  return (
    <div className={sx.root}>
      <div className={sx.body}>
        <h2 className={sx.head2}>{text.title}</h2>
        <div className={sx.links}>
          {links.map((link) => (
            <LinkCard key={link.key} link={link} />
          ))}
        </div>
      </div>
      <div className={sx.graphic}>
        <div className={sx.column}>
          <Shape
            id={sx.leftTop}
            shape={shapes.left.top}
            orientation="vertical"
          />
          <Shape
            id={sx.leftBottom}
            shape={shapes.left.bottom}
            orientation="vertical"
          />
        </div>
        <div className={sx.image}>
          <Image
            width="100%"
            height="100%"
            src={graphic.image?.path}
            layout="responsive"
          />
        </div>
        <div className={sx.column}>
          <Shape
            id={sx.rightTop}
            shape={shapes.right.top}
            orientation="vertical"
          />
          <Shape
            id={sx.rightMiddle}
            shape={shapes.right.middle}
            orientation="vertical"
          />
          <Shape
            id={sx.rightBottom}
            shape={shapes.right.bottom}
            orientation="vertical"
          />
        </div>
      </div>
    </div>
  );
}
