import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { RedisClient } from 'redis'
import { OPTIONS } from './constants'
import {
  IOptions,
  IUrl,
  IDbMap,
  ICli,
  ICliMap,
  IColOption
} from './interface'
import _ from 'lodash'
import redis from 'redis';
import { promisify } from 'util';

@Injectable()
export class NestjsRdbLibService implements OnModuleInit {

  private dbMap: IDbMap = {}
  private cliMap: ICliMap = {}

  constructor (
    @Inject(OPTIONS) private options: IOptions
  ) {
    this.getClis()
  }

  onModuleInit () {
    return this.options
  }

  async test () {
    return 'hello, nestjs rdb lib !'
  }

  async getClis (): Promise<ICliMap> {
    const clis: Array<Promise<ICli>> = this.options.map(async ({ url, key }: IUrl): Promise<ICli> => {
      return  { key, url, cli: await this.getCli(url) }
    })
    const res: Array<ICli> = await Promise.all(clis)
    const cliMap: ICliMap  = {}
    res.map(({ key, cli }) => {
      cliMap[key] = cli
    })
    this.cliMap = cliMap
    return cliMap
  }

  /**
   * @description 通过 key 获取 mongo client
   * @param {string} key 这个可以 是与 options 中的 key 对应
   * @returns {Promise<RedisClient|undefined>} 返回对于的 RedisClient
   */
  async getCliByKey (key: string): Promise<any | undefined> {
    let cli = this.cliMap[key]
    if (!cli) {
      const currentItem: IUrl = _.find(this.options, ({ key: k }: IUrl) => k === key)
      if (currentItem) {
        cli = await this.getCli(currentItem.url)
        this.cliMap[key] = cli
      } else {
        console.error(`${key} is invaild key`)
      }
    }
    return cli
  }

  /**
   * @description 通过 url 的方式获取 RedisClient
   * @param  {string} url mongodb://<user>:<password>@<ip>:<port>
   * @returns {Promise<RedisClient>} 获取对应的 RedisClient
   */
  private async getCli (url): Promise<RedisClient> {
    return redis.createClient(url)
  }

  /**
   * @description 对应的 redis 客户端，调用对应的 api 进行 promise 化，并传入参数进行调用
   * @param param0
   */
  async toPromiseRes({key, api, opt}: { key: string, api: string, opt?: string[] }): Promise<any> {
    const client: RedisClient = this.cliMap[key]
    const apiInstance =promisify(client[api]).bind(client)
    opt = opt || []
    return await apiInstance(...opt)
  }

  /**
   * @description 根据 options 对应的 key 和 db name 获取对应的 db
   * @param {string} cliKey  options 对应的 key
   * @param {string} db db name
   * @returns {Promise<Db|undefined>}
   */
  async getDb (cliKey: string, db: string) {/** noop */}

  /**
   * @description 获取某个 collection
   * @param {IColOption} data
   * @returns {Promise<Collection|undefined>}
   */
  async getCol (data: IColOption) {/** noop */}
}
