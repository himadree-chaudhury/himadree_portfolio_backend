import { prisma } from "../../../configs/db";
import { CaseStudy } from "../../../db/prisma/generated/prisma";
import { CustomError } from "../../../utils/error";

type NewCaseStudy = Omit<CaseStudy, "id" | "createdAt" | "updatedAt">;

const createCaseStudy = async (
  payload: {
    title: string;
    content: string;
    excerpt?: string;
    links: { name: string; url: string }[];
    technologies: string[];
  },
  poster: string,
  galleries: Express.Multer.File[]
) => {
  const newCaseStudy: NewCaseStudy = {
    title: payload.title,
    slug:
      payload.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "") +
      "-" +
      Date.now(),
    content: payload.content,
    poster: poster,
    excerpt: payload.excerpt || payload.content.substring(0, 100) + "...",
    views: 0,
  };

  await prisma.$transaction(async (tx) => {
    const createdCaseStudy = await tx.caseStudy.create({ data: newCaseStudy });

    if (galleries.length > 0) {
      await Promise.all(
        galleries.map((file) =>
          tx.caseStudyGallery.create({
            data: {
              caseStudyId: createdCaseStudy.id,
              url: file.path,
            },
          })
        )
      );
    }

    await Promise.all(
      payload.links.map((link) =>
        tx.caseStudyLink.create({
          data: {
            name: link.name,
            url: link.url,
            caseStudyId: createdCaseStudy.id,
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

        await tx.caseStudyTechnology.create({
          data: {
            caseStudyId: createdCaseStudy.id,
            technologyId: createdTech.id,
          },
        });
      })
    );
  });
};

const getAllCaseStudies = async () => {
  const caseStudies = await prisma.caseStudy.findMany();
  return caseStudies;
};

const getCaseStudy = async (slug: string) => {
  const caseStudy = await prisma.caseStudy.update({
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

  if (!caseStudy) {
    throw CustomError.notFound({
      message: "Case study not found",
      errors: ["The requested case study does not exist."],
      hints: "Please check the case study slug and try again.",
    });
  }

  return caseStudy;
};

export const caseStudyService = {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudy,
};
