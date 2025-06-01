import type { NextApiRequest, NextApiResponse } from "next";
import { put, head } from '@vercel/blob';
import {type BlobResponse} from "~/lib/responseTypes";
import multiparty from 'multiparty';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlobResponse>,
) {
  if (req.method === 'GET') {
    const { pathname } = req.query;
    if (!pathname) {
      return res.status(400).json({ error: 'pathname is required' });
    }
    try {
      const blob = await head(pathname);
      const ret = {pathname: blob.pathname, url: blob.url} as BlobResponse
      return res.status(200).json(ret);
    } catch (error) {
      return res.status(500).json({ error: 'Failed find file' });
    }
  } else if (req.method === 'PUT') {
    const form = new multiparty.Form();

    try {
      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      const file = files.file?.[0];
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileBuffer = await fs.readFile(file.path);
      const pathname = `${uuidv4()}/${file.originalFilename}`;
      const blob = await put(pathname, fileBuffer, { access: 'public' });

      // Clean up temporary file
      await fs.unlink(file.path);

      const ret = {pathname: blob.pathname, url: blob.url} as BlobResponse
      return res.status(200).json(ret);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to upload file' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
