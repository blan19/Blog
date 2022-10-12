import styled, { keyframes } from "styled-components";
import Carousel from "./carousel";
import Pagination from "./pagination";
import Title from "./title";
import { useMemo, useState } from "react";
import type { ProjectMdxMeta } from "../../types/mdx";

interface ProjectProps extends ProjectMdxMeta {
  images: {
    src: string;
    base64: string;
  }[];
}

interface ProjectTitleProps {
  title: string;
}

interface Props {
  projects: ProjectProps[];
}

const ProjectTitle = ({ title }: ProjectTitleProps) => {
  const str = useMemo(() => title.split(""), [title]);
  return (
    <ProjectTitleBase>
      {str.map((s, idx) => (
        <ProjectTitleText key={s + idx} idx={idx + 1}>
          {s}
        </ProjectTitleText>
      ))}
    </ProjectTitleBase>
  );
};

const ProjectItem = ({ images, title }: ProjectProps) => {
  return (
    <ProjectItemBase>
      <ProjectTitle title={title} />
      <CarouselOutline>
        <Carousel images={images} />
      </CarouselOutline>
    </ProjectItemBase>
  );
};

const Projects = ({ projects }: Props) => {
  const [page, setPage] = useState<number>(0);
  return (
    <Base>
      <Title title="Projects" />
      <ProjectWrapper>
        <ProjectOutline page={page}>
          {projects.map((p) => (
            <ProjectItem key={p.id} {...p} />
          ))}
        </ProjectOutline>
      </ProjectWrapper>
      <Pagination length={projects.length} onClick={setPage} page={page} />
    </Base>
  );
};

export default Projects;

const wave = keyframes`
  0%,40%,100% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-20px)
  }
`;

const Base = styled.div`
  width: 100%;
  padding: 2.75rem 0;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const ProjectWrapper = styled.div`
  width: 22.375rem;
  position: relative;
  display: flex;
  overflow-x: hidden;
`;

const ProjectOutline = styled.div<{ page: number }>`
  width: 100%;
  display: flex;
  transition: margin 0.3s ease;
  margin-left: ${({ page }) => `-${page}00%`};
`;

const ProjectItemBase = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  background-color: ${({ theme }) => theme.colors.sub};
  border-radius: 0.625rem;
`;

const CarouselOutline = styled.div``;

const ProjectTitleBase = styled.div`
  margin-top: 1.5rem;
  position: relative;
  -webkit-box-reflect: below -0.4rem linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  font-size: ${({ theme }) => theme.fontSize.subtitle1_pc};
`;

const ProjectTitleText = styled.span<{ idx: number }>`
  position: relative;
  display: inline-block;
  color: ${({ theme }) => theme.colors.font};
  text-transform: uppercase;
  animation: ${wave} 3s infinite;
  animation-delay: ${({ idx }) => `calc(0.3s * ${idx})`};
`;
