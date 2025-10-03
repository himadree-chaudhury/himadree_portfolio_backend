import { prisma } from "../../../configs/db";
import { Project } from "../../../db/prisma/generated/prisma";
import { CustomError } from "../../../utils/error";

type NewProject = Omit<Project, "id" | "createdAt" | "updatedAt">;

const createProject = async (
  payload: {
    title: string;
    description: string;
    excerpt?: string;
    links: { name: string; url: string }[];
    technologies: string[];
  },
  poster: string,
  galleries: Express.Multer.File[]
) => {
  const newProject: NewProject = {
    title: payload.title,
    slug:
      payload.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "") +
      "-" +
      Date.now(),
    description: payload.description,
    poster: poster,
    excerpt: payload.excerpt || payload.description.substring(0, 100) + "...",
    views: 0,
  };
  console.log(payload.links, payload.technologies);

  await prisma.$transaction(async (tx) => {
    const createdProject = await tx.project.create({ data: newProject });

    if (galleries.length > 0) {
      await Promise.all(
        galleries.map((file) =>
          tx.projectGallery.create({
            data: {
              projectId: createdProject.id,
              url: file.path,
            },
          })
        )
      );
    }

    await Promise.all(
      payload.links.map((link) =>
        tx.projectLink.create({
          data: {
            name: link.name,
            url: link.url,
            projectId: createdProject.id,
          },
        })
      )
    );

    await Promise.all(
      payload.technologies.map(async (tech) => {
        const createdTech = await tx.technology.upsert({
          where: { name: tech },
          update: {},
          create: { name: tech },
        });

        await tx.projectTechnology.create({
          data: {
            projectId: createdProject.id,
            technologyId: createdTech.id,
          },
        });
      })
    );
  });
};

const getAllProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};
const getProject = async (slug: string) => {
  const project = await prisma.project.update({
    where: { slug },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      links: {
        select: {
          name: true,
          url: true,
        },
      },
      technologies: {
        select: {
          technologyId: true,
          technology: {
            select: {
              name: true,
            },
          },
        },
      },

      galleries: {
        select: {
          url: true,
        },
      },
    },
  });

  if (!project) {
    throw CustomError.notFound({
      message: "Blog not found",
      errors: ["The requested blog does not exist."],
      hints: "Please check the blog slug and try again.",
    });
  }

  return project;
};

export const projectService = {
  createProject,
  getAllProjects,
  getProject,
};
