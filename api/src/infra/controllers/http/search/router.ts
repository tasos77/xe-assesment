import type { Request, Response } from 'express'
import { Router } from 'express'
import type { AdManagerUsecase } from '../../../../core/usecases/adManager/usecase'
import { validateRequest } from '../middleware'
import { SearchRequestSchema } from './types/requests'

interface SearchRouterDeps {
  adManagerUsecase: AdManagerUsecase
}

export const make = (deps: SearchRouterDeps): Router => {
  const { adManagerUsecase } = deps

  // make search router
  const router: Router = Router()
  router.get('/search', validateRequest('query', SearchRequestSchema), async (req: Request, res: Response) => {
    // get query param
    const { input } = req.query

    // pass param in usecase
    const result = await adManagerUsecase.search(input as string)
    // return results or error accordingly
    res.json(result)
  })
  return router
}
