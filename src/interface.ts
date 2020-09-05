import { MongoClient, Db } from "mongodb";

export interface IUrl {
  url: string
  key: string
}

export interface ICli {
  key: string,
  url: string,
  cli: MongoClient
}

export interface ICliMap {
  [key: string]: MongoClient
}

export interface IDbMap {
 [key: string]: Db
}

export interface IColOption {
  cliKey: string,
  db: string,
  col: string
}

export type IOptions = Array<IUrl>
