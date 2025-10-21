import type { Request, Response } from 'express'
import { Router } from 'express'
import type { AdManagerUsecase } from '../../../../core/usecases/adManager/usecase'

interface StoreRouterDeps {
  adManagerUsecase: AdManagerUsecase
}

export const make = (deps: StoreRouterDeps): Router => {
  const { adManagerUsecase } = deps

  // make store router
  const router: Router = Router()
  router.post('/store', async (req: Request, res: Response) => {
    // get body params
    const { title, type, area, amount, description, placeId } = req.body
    // pass params in usecase
    const result = adManagerUsecase.store({ title, type, area, amount, description, placeId })
    // return results or error accordingly
    res.json(result)
  })
  return router
}
