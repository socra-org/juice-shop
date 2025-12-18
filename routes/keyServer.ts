/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

const ENCRYPTION_KEYS_DIR = path.resolve('encryptionkeys')

export function serveKeyFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    if (!file.includes('/')) {
      const resolvedPath = path.resolve(ENCRYPTION_KEYS_DIR, file)
      if (resolvedPath.startsWith(ENCRYPTION_KEYS_DIR + path.sep)) {
        res.sendFile(resolvedPath)
      } else {
        res.status(403)
        next(new Error('Invalid file path'))
      }
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes!'))
    }
  }
}
