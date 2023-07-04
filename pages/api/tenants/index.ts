/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from './../auth/[...nextauth]';
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

type TenantData = {
  id: string,
  name: string,
  slug: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<TenantData>
) => {
  const session = await getSession({ req })

  if (session) {
    const tenants = await prisma.tenant.findMany({
      where: {
        users: {
          some: {
            userId: session.user.id
          }
        }
      }
    })
    res.send(tenants)
  } else {
    res.send([])
  }
}