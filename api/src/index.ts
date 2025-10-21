import type { Router } from 'express'
import type { CacheRepository } from './core/repositories/cache/reposotiry'
import type { DBRepository } from './core/repositories/db/repository'
import type { LoggerRepository } from './core/repositories/logger/repository'
import type { SearchServerRepository } from './core/repositories/searchServer/repository'
import type { SearchService } from './core/services/search/service'
import * as sService from './core/services/search/service'
import type { ShowAllService } from './core/services/showData/service'
import * as saService from './core/services/showData/service'
import type { StoreService } from './core/services/store/service'
import * as strService from './core/services/store/service'
import type { AdManagerUsecase } from './core/usecases/adManager/usecase'
import * as admUsecase from './core/usecases/adManager/usecase'
import * as dcsROuter from './infra/controllers/http/docs/router'
import * as sRouter from './infra/controllers/http/search/router'
import * as serverTools from './infra/controllers/http/server'
import * as saRouter from './infra/controllers/http/showData/router'
import * as stRouter from './infra/controllers/http/store/router'
import * as caRepo from './infra/repositories/cache/repository'
import * as dbRepo from './infra/repositories/db/repository'
import * as ssRepo from './infra/repositories/searchServer/repository'
import * as loggerMaker from './infra/utils/logger'
// init repos
const logger: LoggerRepository = loggerMaker.make()
const searchServerRepository: SearchServerRepository = ssRepo.make()
const cacheRepository: CacheRepository = caRepo.make({ logger })
const dbRepository: DBRepository = dbRepo.make({ logger })

// init services
const searchService: SearchService = sService.make({ logger, searchServerRepository, cacheRepository })
const storeService: StoreService = strService.make({ dbRepository })
const showDataService: ShowAllService = saService.make({ dbRepository })

// init usecases
const adManagerUsecase: AdManagerUsecase = admUsecase.make({ logger, searchService, storeService, showDataService })

// init routes
const searchRoute: Router = sRouter.make({ adManagerUsecase })
const storeRoute: Router = stRouter.make({ adManagerUsecase })
const showDataRoute: Router = saRouter.make({ adManagerUsecase })
const docsRoute: Router = dcsROuter.make()
// init server
const basePath = '/api/v1'
const server = serverTools.make()

server.use(basePath, searchRoute)
server.use(basePath, storeRoute)
server.use(basePath, showDataRoute)
server.use(basePath, docsRoute)

serverTools.start(server, 3000, logger)
