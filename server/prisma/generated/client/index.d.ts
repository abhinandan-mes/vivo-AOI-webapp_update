
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AoiFunctionCheckpoint
 * 
 */
export type AoiFunctionCheckpoint = $Result.DefaultSelection<Prisma.$AoiFunctionCheckpointPayload>
/**
 * Model AoiTechnicianChecklist
 * 
 */
export type AoiTechnicianChecklist = $Result.DefaultSelection<Prisma.$AoiTechnicianChecklistPayload>
/**
 * Model AppUser
 * 
 */
export type AppUser = $Result.DefaultSelection<Prisma.$AppUserPayload>
/**
 * Model AppSession
 * 
 */
export type AppSession = $Result.DefaultSelection<Prisma.$AppSessionPayload>
/**
 * Model AppActivityLog
 * 
 */
export type AppActivityLog = $Result.DefaultSelection<Prisma.$AppActivityLogPayload>
/**
 * Model LineStatus
 * 
 */
export type LineStatus = $Result.DefaultSelection<Prisma.$LineStatusPayload>
/**
 * Model AoiChangeoverChecksheet
 * 
 */
export type AoiChangeoverChecksheet = $Result.DefaultSelection<Prisma.$AoiChangeoverChecksheetPayload>
/**
 * Model LaserChangeoverChecksheet
 * 
 */
export type LaserChangeoverChecksheet = $Result.DefaultSelection<Prisma.$LaserChangeoverChecksheetPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AoiFunctionCheckpoints
 * const aoiFunctionCheckpoints = await prisma.aoiFunctionCheckpoint.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AoiFunctionCheckpoints
   * const aoiFunctionCheckpoints = await prisma.aoiFunctionCheckpoint.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.aoiFunctionCheckpoint`: Exposes CRUD operations for the **AoiFunctionCheckpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AoiFunctionCheckpoints
    * const aoiFunctionCheckpoints = await prisma.aoiFunctionCheckpoint.findMany()
    * ```
    */
  get aoiFunctionCheckpoint(): Prisma.AoiFunctionCheckpointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aoiTechnicianChecklist`: Exposes CRUD operations for the **AoiTechnicianChecklist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AoiTechnicianChecklists
    * const aoiTechnicianChecklists = await prisma.aoiTechnicianChecklist.findMany()
    * ```
    */
  get aoiTechnicianChecklist(): Prisma.AoiTechnicianChecklistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appUser`: Exposes CRUD operations for the **AppUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppUsers
    * const appUsers = await prisma.appUser.findMany()
    * ```
    */
  get appUser(): Prisma.AppUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appSession`: Exposes CRUD operations for the **AppSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppSessions
    * const appSessions = await prisma.appSession.findMany()
    * ```
    */
  get appSession(): Prisma.AppSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appActivityLog`: Exposes CRUD operations for the **AppActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppActivityLogs
    * const appActivityLogs = await prisma.appActivityLog.findMany()
    * ```
    */
  get appActivityLog(): Prisma.AppActivityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lineStatus`: Exposes CRUD operations for the **LineStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LineStatuses
    * const lineStatuses = await prisma.lineStatus.findMany()
    * ```
    */
  get lineStatus(): Prisma.LineStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aoiChangeoverChecksheet`: Exposes CRUD operations for the **AoiChangeoverChecksheet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AoiChangeoverChecksheets
    * const aoiChangeoverChecksheets = await prisma.aoiChangeoverChecksheet.findMany()
    * ```
    */
  get aoiChangeoverChecksheet(): Prisma.AoiChangeoverChecksheetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.laserChangeoverChecksheet`: Exposes CRUD operations for the **LaserChangeoverChecksheet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LaserChangeoverChecksheets
    * const laserChangeoverChecksheets = await prisma.laserChangeoverChecksheet.findMany()
    * ```
    */
  get laserChangeoverChecksheet(): Prisma.LaserChangeoverChecksheetDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AoiFunctionCheckpoint: 'AoiFunctionCheckpoint',
    AoiTechnicianChecklist: 'AoiTechnicianChecklist',
    AppUser: 'AppUser',
    AppSession: 'AppSession',
    AppActivityLog: 'AppActivityLog',
    LineStatus: 'LineStatus',
    AoiChangeoverChecksheet: 'AoiChangeoverChecksheet',
    LaserChangeoverChecksheet: 'LaserChangeoverChecksheet'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "aoiFunctionCheckpoint" | "aoiTechnicianChecklist" | "appUser" | "appSession" | "appActivityLog" | "lineStatus" | "aoiChangeoverChecksheet" | "laserChangeoverChecksheet"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AoiFunctionCheckpoint: {
        payload: Prisma.$AoiFunctionCheckpointPayload<ExtArgs>
        fields: Prisma.AoiFunctionCheckpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AoiFunctionCheckpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AoiFunctionCheckpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>
          }
          findFirst: {
            args: Prisma.AoiFunctionCheckpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AoiFunctionCheckpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>
          }
          findMany: {
            args: Prisma.AoiFunctionCheckpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>[]
          }
          create: {
            args: Prisma.AoiFunctionCheckpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>
          }
          createMany: {
            args: Prisma.AoiFunctionCheckpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AoiFunctionCheckpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>[]
          }
          delete: {
            args: Prisma.AoiFunctionCheckpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>
          }
          update: {
            args: Prisma.AoiFunctionCheckpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>
          }
          deleteMany: {
            args: Prisma.AoiFunctionCheckpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AoiFunctionCheckpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AoiFunctionCheckpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>[]
          }
          upsert: {
            args: Prisma.AoiFunctionCheckpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiFunctionCheckpointPayload>
          }
          aggregate: {
            args: Prisma.AoiFunctionCheckpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAoiFunctionCheckpoint>
          }
          groupBy: {
            args: Prisma.AoiFunctionCheckpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<AoiFunctionCheckpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.AoiFunctionCheckpointCountArgs<ExtArgs>
            result: $Utils.Optional<AoiFunctionCheckpointCountAggregateOutputType> | number
          }
        }
      }
      AoiTechnicianChecklist: {
        payload: Prisma.$AoiTechnicianChecklistPayload<ExtArgs>
        fields: Prisma.AoiTechnicianChecklistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AoiTechnicianChecklistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AoiTechnicianChecklistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>
          }
          findFirst: {
            args: Prisma.AoiTechnicianChecklistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AoiTechnicianChecklistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>
          }
          findMany: {
            args: Prisma.AoiTechnicianChecklistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>[]
          }
          create: {
            args: Prisma.AoiTechnicianChecklistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>
          }
          createMany: {
            args: Prisma.AoiTechnicianChecklistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AoiTechnicianChecklistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>[]
          }
          delete: {
            args: Prisma.AoiTechnicianChecklistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>
          }
          update: {
            args: Prisma.AoiTechnicianChecklistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>
          }
          deleteMany: {
            args: Prisma.AoiTechnicianChecklistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AoiTechnicianChecklistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AoiTechnicianChecklistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>[]
          }
          upsert: {
            args: Prisma.AoiTechnicianChecklistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiTechnicianChecklistPayload>
          }
          aggregate: {
            args: Prisma.AoiTechnicianChecklistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAoiTechnicianChecklist>
          }
          groupBy: {
            args: Prisma.AoiTechnicianChecklistGroupByArgs<ExtArgs>
            result: $Utils.Optional<AoiTechnicianChecklistGroupByOutputType>[]
          }
          count: {
            args: Prisma.AoiTechnicianChecklistCountArgs<ExtArgs>
            result: $Utils.Optional<AoiTechnicianChecklistCountAggregateOutputType> | number
          }
        }
      }
      AppUser: {
        payload: Prisma.$AppUserPayload<ExtArgs>
        fields: Prisma.AppUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          findFirst: {
            args: Prisma.AppUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          findMany: {
            args: Prisma.AppUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>[]
          }
          create: {
            args: Prisma.AppUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          createMany: {
            args: Prisma.AppUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>[]
          }
          delete: {
            args: Prisma.AppUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          update: {
            args: Prisma.AppUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          deleteMany: {
            args: Prisma.AppUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>[]
          }
          upsert: {
            args: Prisma.AppUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          aggregate: {
            args: Prisma.AppUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppUser>
          }
          groupBy: {
            args: Prisma.AppUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppUserCountArgs<ExtArgs>
            result: $Utils.Optional<AppUserCountAggregateOutputType> | number
          }
        }
      }
      AppSession: {
        payload: Prisma.$AppSessionPayload<ExtArgs>
        fields: Prisma.AppSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          findFirst: {
            args: Prisma.AppSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          findMany: {
            args: Prisma.AppSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>[]
          }
          create: {
            args: Prisma.AppSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          createMany: {
            args: Prisma.AppSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>[]
          }
          delete: {
            args: Prisma.AppSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          update: {
            args: Prisma.AppSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          deleteMany: {
            args: Prisma.AppSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>[]
          }
          upsert: {
            args: Prisma.AppSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          aggregate: {
            args: Prisma.AppSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppSession>
          }
          groupBy: {
            args: Prisma.AppSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AppSessionCountAggregateOutputType> | number
          }
        }
      }
      AppActivityLog: {
        payload: Prisma.$AppActivityLogPayload<ExtArgs>
        fields: Prisma.AppActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>
          }
          findFirst: {
            args: Prisma.AppActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>
          }
          findMany: {
            args: Prisma.AppActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>[]
          }
          create: {
            args: Prisma.AppActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>
          }
          createMany: {
            args: Prisma.AppActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>[]
          }
          delete: {
            args: Prisma.AppActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>
          }
          update: {
            args: Prisma.AppActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.AppActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.AppActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppActivityLogPayload>
          }
          aggregate: {
            args: Prisma.AppActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppActivityLog>
          }
          groupBy: {
            args: Prisma.AppActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<AppActivityLogCountAggregateOutputType> | number
          }
        }
      }
      LineStatus: {
        payload: Prisma.$LineStatusPayload<ExtArgs>
        fields: Prisma.LineStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LineStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LineStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>
          }
          findFirst: {
            args: Prisma.LineStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LineStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>
          }
          findMany: {
            args: Prisma.LineStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>[]
          }
          create: {
            args: Prisma.LineStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>
          }
          createMany: {
            args: Prisma.LineStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LineStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>[]
          }
          delete: {
            args: Prisma.LineStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>
          }
          update: {
            args: Prisma.LineStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>
          }
          deleteMany: {
            args: Prisma.LineStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LineStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LineStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>[]
          }
          upsert: {
            args: Prisma.LineStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineStatusPayload>
          }
          aggregate: {
            args: Prisma.LineStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLineStatus>
          }
          groupBy: {
            args: Prisma.LineStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<LineStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.LineStatusCountArgs<ExtArgs>
            result: $Utils.Optional<LineStatusCountAggregateOutputType> | number
          }
        }
      }
      AoiChangeoverChecksheet: {
        payload: Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>
        fields: Prisma.AoiChangeoverChecksheetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AoiChangeoverChecksheetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AoiChangeoverChecksheetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>
          }
          findFirst: {
            args: Prisma.AoiChangeoverChecksheetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AoiChangeoverChecksheetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>
          }
          findMany: {
            args: Prisma.AoiChangeoverChecksheetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>[]
          }
          create: {
            args: Prisma.AoiChangeoverChecksheetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>
          }
          createMany: {
            args: Prisma.AoiChangeoverChecksheetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AoiChangeoverChecksheetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>[]
          }
          delete: {
            args: Prisma.AoiChangeoverChecksheetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>
          }
          update: {
            args: Prisma.AoiChangeoverChecksheetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>
          }
          deleteMany: {
            args: Prisma.AoiChangeoverChecksheetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AoiChangeoverChecksheetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AoiChangeoverChecksheetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>[]
          }
          upsert: {
            args: Prisma.AoiChangeoverChecksheetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AoiChangeoverChecksheetPayload>
          }
          aggregate: {
            args: Prisma.AoiChangeoverChecksheetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAoiChangeoverChecksheet>
          }
          groupBy: {
            args: Prisma.AoiChangeoverChecksheetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AoiChangeoverChecksheetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AoiChangeoverChecksheetCountArgs<ExtArgs>
            result: $Utils.Optional<AoiChangeoverChecksheetCountAggregateOutputType> | number
          }
        }
      }
      LaserChangeoverChecksheet: {
        payload: Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>
        fields: Prisma.LaserChangeoverChecksheetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LaserChangeoverChecksheetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LaserChangeoverChecksheetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>
          }
          findFirst: {
            args: Prisma.LaserChangeoverChecksheetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LaserChangeoverChecksheetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>
          }
          findMany: {
            args: Prisma.LaserChangeoverChecksheetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>[]
          }
          create: {
            args: Prisma.LaserChangeoverChecksheetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>
          }
          createMany: {
            args: Prisma.LaserChangeoverChecksheetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LaserChangeoverChecksheetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>[]
          }
          delete: {
            args: Prisma.LaserChangeoverChecksheetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>
          }
          update: {
            args: Prisma.LaserChangeoverChecksheetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>
          }
          deleteMany: {
            args: Prisma.LaserChangeoverChecksheetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LaserChangeoverChecksheetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LaserChangeoverChecksheetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>[]
          }
          upsert: {
            args: Prisma.LaserChangeoverChecksheetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaserChangeoverChecksheetPayload>
          }
          aggregate: {
            args: Prisma.LaserChangeoverChecksheetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLaserChangeoverChecksheet>
          }
          groupBy: {
            args: Prisma.LaserChangeoverChecksheetGroupByArgs<ExtArgs>
            result: $Utils.Optional<LaserChangeoverChecksheetGroupByOutputType>[]
          }
          count: {
            args: Prisma.LaserChangeoverChecksheetCountArgs<ExtArgs>
            result: $Utils.Optional<LaserChangeoverChecksheetCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    aoiFunctionCheckpoint?: AoiFunctionCheckpointOmit
    aoiTechnicianChecklist?: AoiTechnicianChecklistOmit
    appUser?: AppUserOmit
    appSession?: AppSessionOmit
    appActivityLog?: AppActivityLogOmit
    lineStatus?: LineStatusOmit
    aoiChangeoverChecksheet?: AoiChangeoverChecksheetOmit
    laserChangeoverChecksheet?: LaserChangeoverChecksheetOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AppUserCountOutputType
   */

  export type AppUserCountOutputType = {
    sessions: number
  }

  export type AppUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | AppUserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * AppUserCountOutputType without action
   */
  export type AppUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUserCountOutputType
     */
    select?: AppUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppUserCountOutputType without action
   */
  export type AppUserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppSessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AoiFunctionCheckpoint
   */

  export type AggregateAoiFunctionCheckpoint = {
    _count: AoiFunctionCheckpointCountAggregateOutputType | null
    _avg: AoiFunctionCheckpointAvgAggregateOutputType | null
    _sum: AoiFunctionCheckpointSumAggregateOutputType | null
    _min: AoiFunctionCheckpointMinAggregateOutputType | null
    _max: AoiFunctionCheckpointMaxAggregateOutputType | null
  }

  export type AoiFunctionCheckpointAvgAggregateOutputType = {
    id: number | null
  }

  export type AoiFunctionCheckpointSumAggregateOutputType = {
    id: number | null
  }

  export type AoiFunctionCheckpointMinAggregateOutputType = {
    id: number | null
    line: string | null
    group_name: string | null
    date: Date | null
    shift: string | null
    responsible_person: string | null
    time: string | null
    submitted_by: string | null
    status: string | null
    laser_barcode_before_bot: boolean | null
    laser_barcode_before_top: boolean | null
    laser_barcode_after_bot: boolean | null
    laser_barcode_after_top: boolean | null
    laser_pcb_text_before: boolean | null
    laser_pcb_text_after: boolean | null
    spi_barcode_before_bot: boolean | null
    spi_barcode_before_top: boolean | null
    spi_barcode_after_bot: boolean | null
    spi_barcode_after_top: boolean | null
    spi_mes_before_bot: boolean | null
    spi_mes_before_top: boolean | null
    spi_mes_after_bot: boolean | null
    spi_mes_after_top: boolean | null
    pre_aoi_barcode_before_bot: boolean | null
    pre_aoi_barcode_before_top: boolean | null
    pre_aoi_barcode_after_bot: boolean | null
    pre_aoi_barcode_after_top: boolean | null
    post_aoi_barcode_before_bot: boolean | null
    post_aoi_barcode_before_top: boolean | null
    post_aoi_barcode_after_bot: boolean | null
    post_aoi_barcode_after_top: boolean | null
    password_function_pre_aoi_before: boolean | null
    password_function_pre_aoi_after: boolean | null
    spi_fov_before: boolean | null
    spi_fov_after: boolean | null
    pre_aoi_fov_before: boolean | null
    pre_aoi_fov_after: boolean | null
    post_aoi_fov_before: boolean | null
    post_aoi_fov_after: boolean | null
    pre_aoi_spc_before: boolean | null
    pre_aoi_spc_after: boolean | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AoiFunctionCheckpointMaxAggregateOutputType = {
    id: number | null
    line: string | null
    group_name: string | null
    date: Date | null
    shift: string | null
    responsible_person: string | null
    time: string | null
    submitted_by: string | null
    status: string | null
    laser_barcode_before_bot: boolean | null
    laser_barcode_before_top: boolean | null
    laser_barcode_after_bot: boolean | null
    laser_barcode_after_top: boolean | null
    laser_pcb_text_before: boolean | null
    laser_pcb_text_after: boolean | null
    spi_barcode_before_bot: boolean | null
    spi_barcode_before_top: boolean | null
    spi_barcode_after_bot: boolean | null
    spi_barcode_after_top: boolean | null
    spi_mes_before_bot: boolean | null
    spi_mes_before_top: boolean | null
    spi_mes_after_bot: boolean | null
    spi_mes_after_top: boolean | null
    pre_aoi_barcode_before_bot: boolean | null
    pre_aoi_barcode_before_top: boolean | null
    pre_aoi_barcode_after_bot: boolean | null
    pre_aoi_barcode_after_top: boolean | null
    post_aoi_barcode_before_bot: boolean | null
    post_aoi_barcode_before_top: boolean | null
    post_aoi_barcode_after_bot: boolean | null
    post_aoi_barcode_after_top: boolean | null
    password_function_pre_aoi_before: boolean | null
    password_function_pre_aoi_after: boolean | null
    spi_fov_before: boolean | null
    spi_fov_after: boolean | null
    pre_aoi_fov_before: boolean | null
    pre_aoi_fov_after: boolean | null
    post_aoi_fov_before: boolean | null
    post_aoi_fov_after: boolean | null
    pre_aoi_spc_before: boolean | null
    pre_aoi_spc_after: boolean | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AoiFunctionCheckpointCountAggregateOutputType = {
    id: number
    line: number
    group_name: number
    date: number
    shift: number
    responsible_person: number
    time: number
    submitted_by: number
    status: number
    laser_barcode_before_bot: number
    laser_barcode_before_top: number
    laser_barcode_after_bot: number
    laser_barcode_after_top: number
    laser_pcb_text_before: number
    laser_pcb_text_after: number
    spi_barcode_before_bot: number
    spi_barcode_before_top: number
    spi_barcode_after_bot: number
    spi_barcode_after_top: number
    spi_mes_before_bot: number
    spi_mes_before_top: number
    spi_mes_after_bot: number
    spi_mes_after_top: number
    pre_aoi_barcode_before_bot: number
    pre_aoi_barcode_before_top: number
    pre_aoi_barcode_after_bot: number
    pre_aoi_barcode_after_top: number
    post_aoi_barcode_before_bot: number
    post_aoi_barcode_before_top: number
    post_aoi_barcode_after_bot: number
    post_aoi_barcode_after_top: number
    password_function_pre_aoi_before: number
    password_function_pre_aoi_after: number
    spi_fov_before: number
    spi_fov_after: number
    pre_aoi_fov_before: number
    pre_aoi_fov_after: number
    post_aoi_fov_before: number
    post_aoi_fov_after: number
    pre_aoi_spc_before: number
    pre_aoi_spc_after: number
    approval_status: number
    designated_engineer_id: number
    remarks: number
    engineer_remarks: number
    engineer_modified_fields: number
    original_technician_data: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AoiFunctionCheckpointAvgAggregateInputType = {
    id?: true
  }

  export type AoiFunctionCheckpointSumAggregateInputType = {
    id?: true
  }

  export type AoiFunctionCheckpointMinAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    responsible_person?: true
    time?: true
    submitted_by?: true
    status?: true
    laser_barcode_before_bot?: true
    laser_barcode_before_top?: true
    laser_barcode_after_bot?: true
    laser_barcode_after_top?: true
    laser_pcb_text_before?: true
    laser_pcb_text_after?: true
    spi_barcode_before_bot?: true
    spi_barcode_before_top?: true
    spi_barcode_after_bot?: true
    spi_barcode_after_top?: true
    spi_mes_before_bot?: true
    spi_mes_before_top?: true
    spi_mes_after_bot?: true
    spi_mes_after_top?: true
    pre_aoi_barcode_before_bot?: true
    pre_aoi_barcode_before_top?: true
    pre_aoi_barcode_after_bot?: true
    pre_aoi_barcode_after_top?: true
    post_aoi_barcode_before_bot?: true
    post_aoi_barcode_before_top?: true
    post_aoi_barcode_after_bot?: true
    post_aoi_barcode_after_top?: true
    password_function_pre_aoi_before?: true
    password_function_pre_aoi_after?: true
    spi_fov_before?: true
    spi_fov_after?: true
    pre_aoi_fov_before?: true
    pre_aoi_fov_after?: true
    post_aoi_fov_before?: true
    post_aoi_fov_after?: true
    pre_aoi_spc_before?: true
    pre_aoi_spc_after?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
  }

  export type AoiFunctionCheckpointMaxAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    responsible_person?: true
    time?: true
    submitted_by?: true
    status?: true
    laser_barcode_before_bot?: true
    laser_barcode_before_top?: true
    laser_barcode_after_bot?: true
    laser_barcode_after_top?: true
    laser_pcb_text_before?: true
    laser_pcb_text_after?: true
    spi_barcode_before_bot?: true
    spi_barcode_before_top?: true
    spi_barcode_after_bot?: true
    spi_barcode_after_top?: true
    spi_mes_before_bot?: true
    spi_mes_before_top?: true
    spi_mes_after_bot?: true
    spi_mes_after_top?: true
    pre_aoi_barcode_before_bot?: true
    pre_aoi_barcode_before_top?: true
    pre_aoi_barcode_after_bot?: true
    pre_aoi_barcode_after_top?: true
    post_aoi_barcode_before_bot?: true
    post_aoi_barcode_before_top?: true
    post_aoi_barcode_after_bot?: true
    post_aoi_barcode_after_top?: true
    password_function_pre_aoi_before?: true
    password_function_pre_aoi_after?: true
    spi_fov_before?: true
    spi_fov_after?: true
    pre_aoi_fov_before?: true
    pre_aoi_fov_after?: true
    post_aoi_fov_before?: true
    post_aoi_fov_after?: true
    pre_aoi_spc_before?: true
    pre_aoi_spc_after?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
  }

  export type AoiFunctionCheckpointCountAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    responsible_person?: true
    time?: true
    submitted_by?: true
    status?: true
    laser_barcode_before_bot?: true
    laser_barcode_before_top?: true
    laser_barcode_after_bot?: true
    laser_barcode_after_top?: true
    laser_pcb_text_before?: true
    laser_pcb_text_after?: true
    spi_barcode_before_bot?: true
    spi_barcode_before_top?: true
    spi_barcode_after_bot?: true
    spi_barcode_after_top?: true
    spi_mes_before_bot?: true
    spi_mes_before_top?: true
    spi_mes_after_bot?: true
    spi_mes_after_top?: true
    pre_aoi_barcode_before_bot?: true
    pre_aoi_barcode_before_top?: true
    pre_aoi_barcode_after_bot?: true
    pre_aoi_barcode_after_top?: true
    post_aoi_barcode_before_bot?: true
    post_aoi_barcode_before_top?: true
    post_aoi_barcode_after_bot?: true
    post_aoi_barcode_after_top?: true
    password_function_pre_aoi_before?: true
    password_function_pre_aoi_after?: true
    spi_fov_before?: true
    spi_fov_after?: true
    pre_aoi_fov_before?: true
    pre_aoi_fov_after?: true
    post_aoi_fov_before?: true
    post_aoi_fov_after?: true
    pre_aoi_spc_before?: true
    pre_aoi_spc_after?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AoiFunctionCheckpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AoiFunctionCheckpoint to aggregate.
     */
    where?: AoiFunctionCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiFunctionCheckpoints to fetch.
     */
    orderBy?: AoiFunctionCheckpointOrderByWithRelationInput | AoiFunctionCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AoiFunctionCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiFunctionCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiFunctionCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AoiFunctionCheckpoints
    **/
    _count?: true | AoiFunctionCheckpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AoiFunctionCheckpointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AoiFunctionCheckpointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AoiFunctionCheckpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AoiFunctionCheckpointMaxAggregateInputType
  }

  export type GetAoiFunctionCheckpointAggregateType<T extends AoiFunctionCheckpointAggregateArgs> = {
        [P in keyof T & keyof AggregateAoiFunctionCheckpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAoiFunctionCheckpoint[P]>
      : GetScalarType<T[P], AggregateAoiFunctionCheckpoint[P]>
  }




  export type AoiFunctionCheckpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AoiFunctionCheckpointWhereInput
    orderBy?: AoiFunctionCheckpointOrderByWithAggregationInput | AoiFunctionCheckpointOrderByWithAggregationInput[]
    by: AoiFunctionCheckpointScalarFieldEnum[] | AoiFunctionCheckpointScalarFieldEnum
    having?: AoiFunctionCheckpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AoiFunctionCheckpointCountAggregateInputType | true
    _avg?: AoiFunctionCheckpointAvgAggregateInputType
    _sum?: AoiFunctionCheckpointSumAggregateInputType
    _min?: AoiFunctionCheckpointMinAggregateInputType
    _max?: AoiFunctionCheckpointMaxAggregateInputType
  }

  export type AoiFunctionCheckpointGroupByOutputType = {
    id: number
    line: string | null
    group_name: string | null
    date: Date
    shift: string
    responsible_person: string | null
    time: string | null
    submitted_by: string | null
    status: string | null
    laser_barcode_before_bot: boolean | null
    laser_barcode_before_top: boolean | null
    laser_barcode_after_bot: boolean | null
    laser_barcode_after_top: boolean | null
    laser_pcb_text_before: boolean | null
    laser_pcb_text_after: boolean | null
    spi_barcode_before_bot: boolean | null
    spi_barcode_before_top: boolean | null
    spi_barcode_after_bot: boolean | null
    spi_barcode_after_top: boolean | null
    spi_mes_before_bot: boolean | null
    spi_mes_before_top: boolean | null
    spi_mes_after_bot: boolean | null
    spi_mes_after_top: boolean | null
    pre_aoi_barcode_before_bot: boolean | null
    pre_aoi_barcode_before_top: boolean | null
    pre_aoi_barcode_after_bot: boolean | null
    pre_aoi_barcode_after_top: boolean | null
    post_aoi_barcode_before_bot: boolean | null
    post_aoi_barcode_before_top: boolean | null
    post_aoi_barcode_after_bot: boolean | null
    post_aoi_barcode_after_top: boolean | null
    password_function_pre_aoi_before: boolean | null
    password_function_pre_aoi_after: boolean | null
    spi_fov_before: boolean | null
    spi_fov_after: boolean | null
    pre_aoi_fov_before: boolean | null
    pre_aoi_fov_after: boolean | null
    post_aoi_fov_before: boolean | null
    post_aoi_fov_after: boolean | null
    pre_aoi_spc_before: boolean | null
    pre_aoi_spc_after: boolean | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date
    updated_at: Date
    _count: AoiFunctionCheckpointCountAggregateOutputType | null
    _avg: AoiFunctionCheckpointAvgAggregateOutputType | null
    _sum: AoiFunctionCheckpointSumAggregateOutputType | null
    _min: AoiFunctionCheckpointMinAggregateOutputType | null
    _max: AoiFunctionCheckpointMaxAggregateOutputType | null
  }

  type GetAoiFunctionCheckpointGroupByPayload<T extends AoiFunctionCheckpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AoiFunctionCheckpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AoiFunctionCheckpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AoiFunctionCheckpointGroupByOutputType[P]>
            : GetScalarType<T[P], AoiFunctionCheckpointGroupByOutputType[P]>
        }
      >
    >


  export type AoiFunctionCheckpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    responsible_person?: boolean
    time?: boolean
    submitted_by?: boolean
    status?: boolean
    laser_barcode_before_bot?: boolean
    laser_barcode_before_top?: boolean
    laser_barcode_after_bot?: boolean
    laser_barcode_after_top?: boolean
    laser_pcb_text_before?: boolean
    laser_pcb_text_after?: boolean
    spi_barcode_before_bot?: boolean
    spi_barcode_before_top?: boolean
    spi_barcode_after_bot?: boolean
    spi_barcode_after_top?: boolean
    spi_mes_before_bot?: boolean
    spi_mes_before_top?: boolean
    spi_mes_after_bot?: boolean
    spi_mes_after_top?: boolean
    pre_aoi_barcode_before_bot?: boolean
    pre_aoi_barcode_before_top?: boolean
    pre_aoi_barcode_after_bot?: boolean
    pre_aoi_barcode_after_top?: boolean
    post_aoi_barcode_before_bot?: boolean
    post_aoi_barcode_before_top?: boolean
    post_aoi_barcode_after_bot?: boolean
    post_aoi_barcode_after_top?: boolean
    password_function_pre_aoi_before?: boolean
    password_function_pre_aoi_after?: boolean
    spi_fov_before?: boolean
    spi_fov_after?: boolean
    pre_aoi_fov_before?: boolean
    pre_aoi_fov_after?: boolean
    post_aoi_fov_before?: boolean
    post_aoi_fov_after?: boolean
    pre_aoi_spc_before?: boolean
    pre_aoi_spc_after?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiFunctionCheckpoint"]>

  export type AoiFunctionCheckpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    responsible_person?: boolean
    time?: boolean
    submitted_by?: boolean
    status?: boolean
    laser_barcode_before_bot?: boolean
    laser_barcode_before_top?: boolean
    laser_barcode_after_bot?: boolean
    laser_barcode_after_top?: boolean
    laser_pcb_text_before?: boolean
    laser_pcb_text_after?: boolean
    spi_barcode_before_bot?: boolean
    spi_barcode_before_top?: boolean
    spi_barcode_after_bot?: boolean
    spi_barcode_after_top?: boolean
    spi_mes_before_bot?: boolean
    spi_mes_before_top?: boolean
    spi_mes_after_bot?: boolean
    spi_mes_after_top?: boolean
    pre_aoi_barcode_before_bot?: boolean
    pre_aoi_barcode_before_top?: boolean
    pre_aoi_barcode_after_bot?: boolean
    pre_aoi_barcode_after_top?: boolean
    post_aoi_barcode_before_bot?: boolean
    post_aoi_barcode_before_top?: boolean
    post_aoi_barcode_after_bot?: boolean
    post_aoi_barcode_after_top?: boolean
    password_function_pre_aoi_before?: boolean
    password_function_pre_aoi_after?: boolean
    spi_fov_before?: boolean
    spi_fov_after?: boolean
    pre_aoi_fov_before?: boolean
    pre_aoi_fov_after?: boolean
    post_aoi_fov_before?: boolean
    post_aoi_fov_after?: boolean
    pre_aoi_spc_before?: boolean
    pre_aoi_spc_after?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiFunctionCheckpoint"]>

  export type AoiFunctionCheckpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    responsible_person?: boolean
    time?: boolean
    submitted_by?: boolean
    status?: boolean
    laser_barcode_before_bot?: boolean
    laser_barcode_before_top?: boolean
    laser_barcode_after_bot?: boolean
    laser_barcode_after_top?: boolean
    laser_pcb_text_before?: boolean
    laser_pcb_text_after?: boolean
    spi_barcode_before_bot?: boolean
    spi_barcode_before_top?: boolean
    spi_barcode_after_bot?: boolean
    spi_barcode_after_top?: boolean
    spi_mes_before_bot?: boolean
    spi_mes_before_top?: boolean
    spi_mes_after_bot?: boolean
    spi_mes_after_top?: boolean
    pre_aoi_barcode_before_bot?: boolean
    pre_aoi_barcode_before_top?: boolean
    pre_aoi_barcode_after_bot?: boolean
    pre_aoi_barcode_after_top?: boolean
    post_aoi_barcode_before_bot?: boolean
    post_aoi_barcode_before_top?: boolean
    post_aoi_barcode_after_bot?: boolean
    post_aoi_barcode_after_top?: boolean
    password_function_pre_aoi_before?: boolean
    password_function_pre_aoi_after?: boolean
    spi_fov_before?: boolean
    spi_fov_after?: boolean
    pre_aoi_fov_before?: boolean
    pre_aoi_fov_after?: boolean
    post_aoi_fov_before?: boolean
    post_aoi_fov_after?: boolean
    pre_aoi_spc_before?: boolean
    pre_aoi_spc_after?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiFunctionCheckpoint"]>

  export type AoiFunctionCheckpointSelectScalar = {
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    responsible_person?: boolean
    time?: boolean
    submitted_by?: boolean
    status?: boolean
    laser_barcode_before_bot?: boolean
    laser_barcode_before_top?: boolean
    laser_barcode_after_bot?: boolean
    laser_barcode_after_top?: boolean
    laser_pcb_text_before?: boolean
    laser_pcb_text_after?: boolean
    spi_barcode_before_bot?: boolean
    spi_barcode_before_top?: boolean
    spi_barcode_after_bot?: boolean
    spi_barcode_after_top?: boolean
    spi_mes_before_bot?: boolean
    spi_mes_before_top?: boolean
    spi_mes_after_bot?: boolean
    spi_mes_after_top?: boolean
    pre_aoi_barcode_before_bot?: boolean
    pre_aoi_barcode_before_top?: boolean
    pre_aoi_barcode_after_bot?: boolean
    pre_aoi_barcode_after_top?: boolean
    post_aoi_barcode_before_bot?: boolean
    post_aoi_barcode_before_top?: boolean
    post_aoi_barcode_after_bot?: boolean
    post_aoi_barcode_after_top?: boolean
    password_function_pre_aoi_before?: boolean
    password_function_pre_aoi_after?: boolean
    spi_fov_before?: boolean
    spi_fov_after?: boolean
    pre_aoi_fov_before?: boolean
    pre_aoi_fov_after?: boolean
    post_aoi_fov_before?: boolean
    post_aoi_fov_after?: boolean
    pre_aoi_spc_before?: boolean
    pre_aoi_spc_after?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AoiFunctionCheckpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "line" | "group_name" | "date" | "shift" | "responsible_person" | "time" | "submitted_by" | "status" | "laser_barcode_before_bot" | "laser_barcode_before_top" | "laser_barcode_after_bot" | "laser_barcode_after_top" | "laser_pcb_text_before" | "laser_pcb_text_after" | "spi_barcode_before_bot" | "spi_barcode_before_top" | "spi_barcode_after_bot" | "spi_barcode_after_top" | "spi_mes_before_bot" | "spi_mes_before_top" | "spi_mes_after_bot" | "spi_mes_after_top" | "pre_aoi_barcode_before_bot" | "pre_aoi_barcode_before_top" | "pre_aoi_barcode_after_bot" | "pre_aoi_barcode_after_top" | "post_aoi_barcode_before_bot" | "post_aoi_barcode_before_top" | "post_aoi_barcode_after_bot" | "post_aoi_barcode_after_top" | "password_function_pre_aoi_before" | "password_function_pre_aoi_after" | "spi_fov_before" | "spi_fov_after" | "pre_aoi_fov_before" | "pre_aoi_fov_after" | "post_aoi_fov_before" | "post_aoi_fov_after" | "pre_aoi_spc_before" | "pre_aoi_spc_after" | "approval_status" | "designated_engineer_id" | "remarks" | "engineer_remarks" | "engineer_modified_fields" | "original_technician_data" | "created_at" | "updated_at", ExtArgs["result"]["aoiFunctionCheckpoint"]>

  export type $AoiFunctionCheckpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AoiFunctionCheckpoint"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      line: string | null
      group_name: string | null
      date: Date
      shift: string
      responsible_person: string | null
      time: string | null
      submitted_by: string | null
      status: string | null
      laser_barcode_before_bot: boolean | null
      laser_barcode_before_top: boolean | null
      laser_barcode_after_bot: boolean | null
      laser_barcode_after_top: boolean | null
      laser_pcb_text_before: boolean | null
      laser_pcb_text_after: boolean | null
      spi_barcode_before_bot: boolean | null
      spi_barcode_before_top: boolean | null
      spi_barcode_after_bot: boolean | null
      spi_barcode_after_top: boolean | null
      spi_mes_before_bot: boolean | null
      spi_mes_before_top: boolean | null
      spi_mes_after_bot: boolean | null
      spi_mes_after_top: boolean | null
      pre_aoi_barcode_before_bot: boolean | null
      pre_aoi_barcode_before_top: boolean | null
      pre_aoi_barcode_after_bot: boolean | null
      pre_aoi_barcode_after_top: boolean | null
      post_aoi_barcode_before_bot: boolean | null
      post_aoi_barcode_before_top: boolean | null
      post_aoi_barcode_after_bot: boolean | null
      post_aoi_barcode_after_top: boolean | null
      password_function_pre_aoi_before: boolean | null
      password_function_pre_aoi_after: boolean | null
      spi_fov_before: boolean | null
      spi_fov_after: boolean | null
      pre_aoi_fov_before: boolean | null
      pre_aoi_fov_after: boolean | null
      post_aoi_fov_before: boolean | null
      post_aoi_fov_after: boolean | null
      pre_aoi_spc_before: boolean | null
      pre_aoi_spc_after: boolean | null
      approval_status: string | null
      designated_engineer_id: string | null
      remarks: string | null
      engineer_remarks: string | null
      engineer_modified_fields: string | null
      original_technician_data: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["aoiFunctionCheckpoint"]>
    composites: {}
  }

  type AoiFunctionCheckpointGetPayload<S extends boolean | null | undefined | AoiFunctionCheckpointDefaultArgs> = $Result.GetResult<Prisma.$AoiFunctionCheckpointPayload, S>

  type AoiFunctionCheckpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AoiFunctionCheckpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AoiFunctionCheckpointCountAggregateInputType | true
    }

  export interface AoiFunctionCheckpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AoiFunctionCheckpoint'], meta: { name: 'AoiFunctionCheckpoint' } }
    /**
     * Find zero or one AoiFunctionCheckpoint that matches the filter.
     * @param {AoiFunctionCheckpointFindUniqueArgs} args - Arguments to find a AoiFunctionCheckpoint
     * @example
     * // Get one AoiFunctionCheckpoint
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AoiFunctionCheckpointFindUniqueArgs>(args: SelectSubset<T, AoiFunctionCheckpointFindUniqueArgs<ExtArgs>>): Prisma__AoiFunctionCheckpointClient<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AoiFunctionCheckpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AoiFunctionCheckpointFindUniqueOrThrowArgs} args - Arguments to find a AoiFunctionCheckpoint
     * @example
     * // Get one AoiFunctionCheckpoint
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AoiFunctionCheckpointFindUniqueOrThrowArgs>(args: SelectSubset<T, AoiFunctionCheckpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AoiFunctionCheckpointClient<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AoiFunctionCheckpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiFunctionCheckpointFindFirstArgs} args - Arguments to find a AoiFunctionCheckpoint
     * @example
     * // Get one AoiFunctionCheckpoint
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AoiFunctionCheckpointFindFirstArgs>(args?: SelectSubset<T, AoiFunctionCheckpointFindFirstArgs<ExtArgs>>): Prisma__AoiFunctionCheckpointClient<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AoiFunctionCheckpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiFunctionCheckpointFindFirstOrThrowArgs} args - Arguments to find a AoiFunctionCheckpoint
     * @example
     * // Get one AoiFunctionCheckpoint
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AoiFunctionCheckpointFindFirstOrThrowArgs>(args?: SelectSubset<T, AoiFunctionCheckpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__AoiFunctionCheckpointClient<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AoiFunctionCheckpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiFunctionCheckpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AoiFunctionCheckpoints
     * const aoiFunctionCheckpoints = await prisma.aoiFunctionCheckpoint.findMany()
     * 
     * // Get first 10 AoiFunctionCheckpoints
     * const aoiFunctionCheckpoints = await prisma.aoiFunctionCheckpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aoiFunctionCheckpointWithIdOnly = await prisma.aoiFunctionCheckpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AoiFunctionCheckpointFindManyArgs>(args?: SelectSubset<T, AoiFunctionCheckpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AoiFunctionCheckpoint.
     * @param {AoiFunctionCheckpointCreateArgs} args - Arguments to create a AoiFunctionCheckpoint.
     * @example
     * // Create one AoiFunctionCheckpoint
     * const AoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.create({
     *   data: {
     *     // ... data to create a AoiFunctionCheckpoint
     *   }
     * })
     * 
     */
    create<T extends AoiFunctionCheckpointCreateArgs>(args: SelectSubset<T, AoiFunctionCheckpointCreateArgs<ExtArgs>>): Prisma__AoiFunctionCheckpointClient<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AoiFunctionCheckpoints.
     * @param {AoiFunctionCheckpointCreateManyArgs} args - Arguments to create many AoiFunctionCheckpoints.
     * @example
     * // Create many AoiFunctionCheckpoints
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AoiFunctionCheckpointCreateManyArgs>(args?: SelectSubset<T, AoiFunctionCheckpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AoiFunctionCheckpoints and returns the data saved in the database.
     * @param {AoiFunctionCheckpointCreateManyAndReturnArgs} args - Arguments to create many AoiFunctionCheckpoints.
     * @example
     * // Create many AoiFunctionCheckpoints
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AoiFunctionCheckpoints and only return the `id`
     * const aoiFunctionCheckpointWithIdOnly = await prisma.aoiFunctionCheckpoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AoiFunctionCheckpointCreateManyAndReturnArgs>(args?: SelectSubset<T, AoiFunctionCheckpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AoiFunctionCheckpoint.
     * @param {AoiFunctionCheckpointDeleteArgs} args - Arguments to delete one AoiFunctionCheckpoint.
     * @example
     * // Delete one AoiFunctionCheckpoint
     * const AoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.delete({
     *   where: {
     *     // ... filter to delete one AoiFunctionCheckpoint
     *   }
     * })
     * 
     */
    delete<T extends AoiFunctionCheckpointDeleteArgs>(args: SelectSubset<T, AoiFunctionCheckpointDeleteArgs<ExtArgs>>): Prisma__AoiFunctionCheckpointClient<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AoiFunctionCheckpoint.
     * @param {AoiFunctionCheckpointUpdateArgs} args - Arguments to update one AoiFunctionCheckpoint.
     * @example
     * // Update one AoiFunctionCheckpoint
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AoiFunctionCheckpointUpdateArgs>(args: SelectSubset<T, AoiFunctionCheckpointUpdateArgs<ExtArgs>>): Prisma__AoiFunctionCheckpointClient<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AoiFunctionCheckpoints.
     * @param {AoiFunctionCheckpointDeleteManyArgs} args - Arguments to filter AoiFunctionCheckpoints to delete.
     * @example
     * // Delete a few AoiFunctionCheckpoints
     * const { count } = await prisma.aoiFunctionCheckpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AoiFunctionCheckpointDeleteManyArgs>(args?: SelectSubset<T, AoiFunctionCheckpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AoiFunctionCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiFunctionCheckpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AoiFunctionCheckpoints
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AoiFunctionCheckpointUpdateManyArgs>(args: SelectSubset<T, AoiFunctionCheckpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AoiFunctionCheckpoints and returns the data updated in the database.
     * @param {AoiFunctionCheckpointUpdateManyAndReturnArgs} args - Arguments to update many AoiFunctionCheckpoints.
     * @example
     * // Update many AoiFunctionCheckpoints
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AoiFunctionCheckpoints and only return the `id`
     * const aoiFunctionCheckpointWithIdOnly = await prisma.aoiFunctionCheckpoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AoiFunctionCheckpointUpdateManyAndReturnArgs>(args: SelectSubset<T, AoiFunctionCheckpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AoiFunctionCheckpoint.
     * @param {AoiFunctionCheckpointUpsertArgs} args - Arguments to update or create a AoiFunctionCheckpoint.
     * @example
     * // Update or create a AoiFunctionCheckpoint
     * const aoiFunctionCheckpoint = await prisma.aoiFunctionCheckpoint.upsert({
     *   create: {
     *     // ... data to create a AoiFunctionCheckpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AoiFunctionCheckpoint we want to update
     *   }
     * })
     */
    upsert<T extends AoiFunctionCheckpointUpsertArgs>(args: SelectSubset<T, AoiFunctionCheckpointUpsertArgs<ExtArgs>>): Prisma__AoiFunctionCheckpointClient<$Result.GetResult<Prisma.$AoiFunctionCheckpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AoiFunctionCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiFunctionCheckpointCountArgs} args - Arguments to filter AoiFunctionCheckpoints to count.
     * @example
     * // Count the number of AoiFunctionCheckpoints
     * const count = await prisma.aoiFunctionCheckpoint.count({
     *   where: {
     *     // ... the filter for the AoiFunctionCheckpoints we want to count
     *   }
     * })
    **/
    count<T extends AoiFunctionCheckpointCountArgs>(
      args?: Subset<T, AoiFunctionCheckpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AoiFunctionCheckpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AoiFunctionCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiFunctionCheckpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AoiFunctionCheckpointAggregateArgs>(args: Subset<T, AoiFunctionCheckpointAggregateArgs>): Prisma.PrismaPromise<GetAoiFunctionCheckpointAggregateType<T>>

    /**
     * Group by AoiFunctionCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiFunctionCheckpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AoiFunctionCheckpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AoiFunctionCheckpointGroupByArgs['orderBy'] }
        : { orderBy?: AoiFunctionCheckpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AoiFunctionCheckpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAoiFunctionCheckpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AoiFunctionCheckpoint model
   */
  readonly fields: AoiFunctionCheckpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AoiFunctionCheckpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AoiFunctionCheckpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AoiFunctionCheckpoint model
   */
  interface AoiFunctionCheckpointFieldRefs {
    readonly id: FieldRef<"AoiFunctionCheckpoint", 'Int'>
    readonly line: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly group_name: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly date: FieldRef<"AoiFunctionCheckpoint", 'DateTime'>
    readonly shift: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly responsible_person: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly time: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly submitted_by: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly status: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly laser_barcode_before_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly laser_barcode_before_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly laser_barcode_after_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly laser_barcode_after_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly laser_pcb_text_before: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly laser_pcb_text_after: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_barcode_before_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_barcode_before_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_barcode_after_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_barcode_after_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_mes_before_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_mes_before_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_mes_after_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_mes_after_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly pre_aoi_barcode_before_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly pre_aoi_barcode_before_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly pre_aoi_barcode_after_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly pre_aoi_barcode_after_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly post_aoi_barcode_before_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly post_aoi_barcode_before_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly post_aoi_barcode_after_bot: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly post_aoi_barcode_after_top: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly password_function_pre_aoi_before: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly password_function_pre_aoi_after: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_fov_before: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly spi_fov_after: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly pre_aoi_fov_before: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly pre_aoi_fov_after: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly post_aoi_fov_before: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly post_aoi_fov_after: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly pre_aoi_spc_before: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly pre_aoi_spc_after: FieldRef<"AoiFunctionCheckpoint", 'Boolean'>
    readonly approval_status: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly designated_engineer_id: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly remarks: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly engineer_remarks: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly engineer_modified_fields: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly original_technician_data: FieldRef<"AoiFunctionCheckpoint", 'String'>
    readonly created_at: FieldRef<"AoiFunctionCheckpoint", 'DateTime'>
    readonly updated_at: FieldRef<"AoiFunctionCheckpoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AoiFunctionCheckpoint findUnique
   */
  export type AoiFunctionCheckpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * Filter, which AoiFunctionCheckpoint to fetch.
     */
    where: AoiFunctionCheckpointWhereUniqueInput
  }

  /**
   * AoiFunctionCheckpoint findUniqueOrThrow
   */
  export type AoiFunctionCheckpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * Filter, which AoiFunctionCheckpoint to fetch.
     */
    where: AoiFunctionCheckpointWhereUniqueInput
  }

  /**
   * AoiFunctionCheckpoint findFirst
   */
  export type AoiFunctionCheckpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * Filter, which AoiFunctionCheckpoint to fetch.
     */
    where?: AoiFunctionCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiFunctionCheckpoints to fetch.
     */
    orderBy?: AoiFunctionCheckpointOrderByWithRelationInput | AoiFunctionCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AoiFunctionCheckpoints.
     */
    cursor?: AoiFunctionCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiFunctionCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiFunctionCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AoiFunctionCheckpoints.
     */
    distinct?: AoiFunctionCheckpointScalarFieldEnum | AoiFunctionCheckpointScalarFieldEnum[]
  }

  /**
   * AoiFunctionCheckpoint findFirstOrThrow
   */
  export type AoiFunctionCheckpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * Filter, which AoiFunctionCheckpoint to fetch.
     */
    where?: AoiFunctionCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiFunctionCheckpoints to fetch.
     */
    orderBy?: AoiFunctionCheckpointOrderByWithRelationInput | AoiFunctionCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AoiFunctionCheckpoints.
     */
    cursor?: AoiFunctionCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiFunctionCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiFunctionCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AoiFunctionCheckpoints.
     */
    distinct?: AoiFunctionCheckpointScalarFieldEnum | AoiFunctionCheckpointScalarFieldEnum[]
  }

  /**
   * AoiFunctionCheckpoint findMany
   */
  export type AoiFunctionCheckpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * Filter, which AoiFunctionCheckpoints to fetch.
     */
    where?: AoiFunctionCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiFunctionCheckpoints to fetch.
     */
    orderBy?: AoiFunctionCheckpointOrderByWithRelationInput | AoiFunctionCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AoiFunctionCheckpoints.
     */
    cursor?: AoiFunctionCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiFunctionCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiFunctionCheckpoints.
     */
    skip?: number
    distinct?: AoiFunctionCheckpointScalarFieldEnum | AoiFunctionCheckpointScalarFieldEnum[]
  }

  /**
   * AoiFunctionCheckpoint create
   */
  export type AoiFunctionCheckpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * The data needed to create a AoiFunctionCheckpoint.
     */
    data: XOR<AoiFunctionCheckpointCreateInput, AoiFunctionCheckpointUncheckedCreateInput>
  }

  /**
   * AoiFunctionCheckpoint createMany
   */
  export type AoiFunctionCheckpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AoiFunctionCheckpoints.
     */
    data: AoiFunctionCheckpointCreateManyInput | AoiFunctionCheckpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AoiFunctionCheckpoint createManyAndReturn
   */
  export type AoiFunctionCheckpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * The data used to create many AoiFunctionCheckpoints.
     */
    data: AoiFunctionCheckpointCreateManyInput | AoiFunctionCheckpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AoiFunctionCheckpoint update
   */
  export type AoiFunctionCheckpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * The data needed to update a AoiFunctionCheckpoint.
     */
    data: XOR<AoiFunctionCheckpointUpdateInput, AoiFunctionCheckpointUncheckedUpdateInput>
    /**
     * Choose, which AoiFunctionCheckpoint to update.
     */
    where: AoiFunctionCheckpointWhereUniqueInput
  }

  /**
   * AoiFunctionCheckpoint updateMany
   */
  export type AoiFunctionCheckpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AoiFunctionCheckpoints.
     */
    data: XOR<AoiFunctionCheckpointUpdateManyMutationInput, AoiFunctionCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which AoiFunctionCheckpoints to update
     */
    where?: AoiFunctionCheckpointWhereInput
    /**
     * Limit how many AoiFunctionCheckpoints to update.
     */
    limit?: number
  }

  /**
   * AoiFunctionCheckpoint updateManyAndReturn
   */
  export type AoiFunctionCheckpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * The data used to update AoiFunctionCheckpoints.
     */
    data: XOR<AoiFunctionCheckpointUpdateManyMutationInput, AoiFunctionCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which AoiFunctionCheckpoints to update
     */
    where?: AoiFunctionCheckpointWhereInput
    /**
     * Limit how many AoiFunctionCheckpoints to update.
     */
    limit?: number
  }

  /**
   * AoiFunctionCheckpoint upsert
   */
  export type AoiFunctionCheckpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * The filter to search for the AoiFunctionCheckpoint to update in case it exists.
     */
    where: AoiFunctionCheckpointWhereUniqueInput
    /**
     * In case the AoiFunctionCheckpoint found by the `where` argument doesn't exist, create a new AoiFunctionCheckpoint with this data.
     */
    create: XOR<AoiFunctionCheckpointCreateInput, AoiFunctionCheckpointUncheckedCreateInput>
    /**
     * In case the AoiFunctionCheckpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AoiFunctionCheckpointUpdateInput, AoiFunctionCheckpointUncheckedUpdateInput>
  }

  /**
   * AoiFunctionCheckpoint delete
   */
  export type AoiFunctionCheckpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
    /**
     * Filter which AoiFunctionCheckpoint to delete.
     */
    where: AoiFunctionCheckpointWhereUniqueInput
  }

  /**
   * AoiFunctionCheckpoint deleteMany
   */
  export type AoiFunctionCheckpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AoiFunctionCheckpoints to delete
     */
    where?: AoiFunctionCheckpointWhereInput
    /**
     * Limit how many AoiFunctionCheckpoints to delete.
     */
    limit?: number
  }

  /**
   * AoiFunctionCheckpoint without action
   */
  export type AoiFunctionCheckpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiFunctionCheckpoint
     */
    select?: AoiFunctionCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiFunctionCheckpoint
     */
    omit?: AoiFunctionCheckpointOmit<ExtArgs> | null
  }


  /**
   * Model AoiTechnicianChecklist
   */

  export type AggregateAoiTechnicianChecklist = {
    _count: AoiTechnicianChecklistCountAggregateOutputType | null
    _avg: AoiTechnicianChecklistAvgAggregateOutputType | null
    _sum: AoiTechnicianChecklistSumAggregateOutputType | null
    _min: AoiTechnicianChecklistMinAggregateOutputType | null
    _max: AoiTechnicianChecklistMaxAggregateOutputType | null
  }

  export type AoiTechnicianChecklistAvgAggregateOutputType = {
    id: number | null
  }

  export type AoiTechnicianChecklistSumAggregateOutputType = {
    id: number | null
  }

  export type AoiTechnicianChecklistMinAggregateOutputType = {
    id: number | null
    line: string | null
    group_name: string | null
    date: Date | null
    shift: string | null
    pre_aoi_program_full_name: string | null
    stencil_serial_no_b_side: string | null
    stencil_serial_no_a_side: string | null
    barcode_read_a_layer: string | null
    barcode_read_a_spi: string | null
    barcode_read_a_pre_aoi: string | null
    barcode_read_b_layer: string | null
    barcode_read_b_spi: string | null
    barcode_read_b_pre_aoi: string | null
    workorder_info_pre_aoi: string | null
    workorder_info_post_aoi: string | null
    aoi_scan_tools_workorder_traceability: string | null
    confirmation: string | null
    submitted_by: string | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AoiTechnicianChecklistMaxAggregateOutputType = {
    id: number | null
    line: string | null
    group_name: string | null
    date: Date | null
    shift: string | null
    pre_aoi_program_full_name: string | null
    stencil_serial_no_b_side: string | null
    stencil_serial_no_a_side: string | null
    barcode_read_a_layer: string | null
    barcode_read_a_spi: string | null
    barcode_read_a_pre_aoi: string | null
    barcode_read_b_layer: string | null
    barcode_read_b_spi: string | null
    barcode_read_b_pre_aoi: string | null
    workorder_info_pre_aoi: string | null
    workorder_info_post_aoi: string | null
    aoi_scan_tools_workorder_traceability: string | null
    confirmation: string | null
    submitted_by: string | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AoiTechnicianChecklistCountAggregateOutputType = {
    id: number
    line: number
    group_name: number
    date: number
    shift: number
    pre_aoi_program_full_name: number
    stencil_serial_no_b_side: number
    stencil_serial_no_a_side: number
    barcode_read_a_layer: number
    barcode_read_a_spi: number
    barcode_read_a_pre_aoi: number
    barcode_read_b_layer: number
    barcode_read_b_spi: number
    barcode_read_b_pre_aoi: number
    workorder_info_pre_aoi: number
    workorder_info_post_aoi: number
    aoi_scan_tools_workorder_traceability: number
    confirmation: number
    submitted_by: number
    status: number
    approval_status: number
    designated_engineer_id: number
    remarks: number
    engineer_remarks: number
    engineer_modified_fields: number
    original_technician_data: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AoiTechnicianChecklistAvgAggregateInputType = {
    id?: true
  }

  export type AoiTechnicianChecklistSumAggregateInputType = {
    id?: true
  }

  export type AoiTechnicianChecklistMinAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    pre_aoi_program_full_name?: true
    stencil_serial_no_b_side?: true
    stencil_serial_no_a_side?: true
    barcode_read_a_layer?: true
    barcode_read_a_spi?: true
    barcode_read_a_pre_aoi?: true
    barcode_read_b_layer?: true
    barcode_read_b_spi?: true
    barcode_read_b_pre_aoi?: true
    workorder_info_pre_aoi?: true
    workorder_info_post_aoi?: true
    aoi_scan_tools_workorder_traceability?: true
    confirmation?: true
    submitted_by?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
  }

  export type AoiTechnicianChecklistMaxAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    pre_aoi_program_full_name?: true
    stencil_serial_no_b_side?: true
    stencil_serial_no_a_side?: true
    barcode_read_a_layer?: true
    barcode_read_a_spi?: true
    barcode_read_a_pre_aoi?: true
    barcode_read_b_layer?: true
    barcode_read_b_spi?: true
    barcode_read_b_pre_aoi?: true
    workorder_info_pre_aoi?: true
    workorder_info_post_aoi?: true
    aoi_scan_tools_workorder_traceability?: true
    confirmation?: true
    submitted_by?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
  }

  export type AoiTechnicianChecklistCountAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    pre_aoi_program_full_name?: true
    stencil_serial_no_b_side?: true
    stencil_serial_no_a_side?: true
    barcode_read_a_layer?: true
    barcode_read_a_spi?: true
    barcode_read_a_pre_aoi?: true
    barcode_read_b_layer?: true
    barcode_read_b_spi?: true
    barcode_read_b_pre_aoi?: true
    workorder_info_pre_aoi?: true
    workorder_info_post_aoi?: true
    aoi_scan_tools_workorder_traceability?: true
    confirmation?: true
    submitted_by?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AoiTechnicianChecklistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AoiTechnicianChecklist to aggregate.
     */
    where?: AoiTechnicianChecklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiTechnicianChecklists to fetch.
     */
    orderBy?: AoiTechnicianChecklistOrderByWithRelationInput | AoiTechnicianChecklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AoiTechnicianChecklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiTechnicianChecklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiTechnicianChecklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AoiTechnicianChecklists
    **/
    _count?: true | AoiTechnicianChecklistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AoiTechnicianChecklistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AoiTechnicianChecklistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AoiTechnicianChecklistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AoiTechnicianChecklistMaxAggregateInputType
  }

  export type GetAoiTechnicianChecklistAggregateType<T extends AoiTechnicianChecklistAggregateArgs> = {
        [P in keyof T & keyof AggregateAoiTechnicianChecklist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAoiTechnicianChecklist[P]>
      : GetScalarType<T[P], AggregateAoiTechnicianChecklist[P]>
  }




  export type AoiTechnicianChecklistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AoiTechnicianChecklistWhereInput
    orderBy?: AoiTechnicianChecklistOrderByWithAggregationInput | AoiTechnicianChecklistOrderByWithAggregationInput[]
    by: AoiTechnicianChecklistScalarFieldEnum[] | AoiTechnicianChecklistScalarFieldEnum
    having?: AoiTechnicianChecklistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AoiTechnicianChecklistCountAggregateInputType | true
    _avg?: AoiTechnicianChecklistAvgAggregateInputType
    _sum?: AoiTechnicianChecklistSumAggregateInputType
    _min?: AoiTechnicianChecklistMinAggregateInputType
    _max?: AoiTechnicianChecklistMaxAggregateInputType
  }

  export type AoiTechnicianChecklistGroupByOutputType = {
    id: number
    line: string | null
    group_name: string | null
    date: Date
    shift: string
    pre_aoi_program_full_name: string | null
    stencil_serial_no_b_side: string | null
    stencil_serial_no_a_side: string | null
    barcode_read_a_layer: string | null
    barcode_read_a_spi: string | null
    barcode_read_a_pre_aoi: string | null
    barcode_read_b_layer: string | null
    barcode_read_b_spi: string | null
    barcode_read_b_pre_aoi: string | null
    workorder_info_pre_aoi: string | null
    workorder_info_post_aoi: string | null
    aoi_scan_tools_workorder_traceability: string | null
    confirmation: string | null
    submitted_by: string | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date
    updated_at: Date
    _count: AoiTechnicianChecklistCountAggregateOutputType | null
    _avg: AoiTechnicianChecklistAvgAggregateOutputType | null
    _sum: AoiTechnicianChecklistSumAggregateOutputType | null
    _min: AoiTechnicianChecklistMinAggregateOutputType | null
    _max: AoiTechnicianChecklistMaxAggregateOutputType | null
  }

  type GetAoiTechnicianChecklistGroupByPayload<T extends AoiTechnicianChecklistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AoiTechnicianChecklistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AoiTechnicianChecklistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AoiTechnicianChecklistGroupByOutputType[P]>
            : GetScalarType<T[P], AoiTechnicianChecklistGroupByOutputType[P]>
        }
      >
    >


  export type AoiTechnicianChecklistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    pre_aoi_program_full_name?: boolean
    stencil_serial_no_b_side?: boolean
    stencil_serial_no_a_side?: boolean
    barcode_read_a_layer?: boolean
    barcode_read_a_spi?: boolean
    barcode_read_a_pre_aoi?: boolean
    barcode_read_b_layer?: boolean
    barcode_read_b_spi?: boolean
    barcode_read_b_pre_aoi?: boolean
    workorder_info_pre_aoi?: boolean
    workorder_info_post_aoi?: boolean
    aoi_scan_tools_workorder_traceability?: boolean
    confirmation?: boolean
    submitted_by?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiTechnicianChecklist"]>

  export type AoiTechnicianChecklistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    pre_aoi_program_full_name?: boolean
    stencil_serial_no_b_side?: boolean
    stencil_serial_no_a_side?: boolean
    barcode_read_a_layer?: boolean
    barcode_read_a_spi?: boolean
    barcode_read_a_pre_aoi?: boolean
    barcode_read_b_layer?: boolean
    barcode_read_b_spi?: boolean
    barcode_read_b_pre_aoi?: boolean
    workorder_info_pre_aoi?: boolean
    workorder_info_post_aoi?: boolean
    aoi_scan_tools_workorder_traceability?: boolean
    confirmation?: boolean
    submitted_by?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiTechnicianChecklist"]>

  export type AoiTechnicianChecklistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    pre_aoi_program_full_name?: boolean
    stencil_serial_no_b_side?: boolean
    stencil_serial_no_a_side?: boolean
    barcode_read_a_layer?: boolean
    barcode_read_a_spi?: boolean
    barcode_read_a_pre_aoi?: boolean
    barcode_read_b_layer?: boolean
    barcode_read_b_spi?: boolean
    barcode_read_b_pre_aoi?: boolean
    workorder_info_pre_aoi?: boolean
    workorder_info_post_aoi?: boolean
    aoi_scan_tools_workorder_traceability?: boolean
    confirmation?: boolean
    submitted_by?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiTechnicianChecklist"]>

  export type AoiTechnicianChecklistSelectScalar = {
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    pre_aoi_program_full_name?: boolean
    stencil_serial_no_b_side?: boolean
    stencil_serial_no_a_side?: boolean
    barcode_read_a_layer?: boolean
    barcode_read_a_spi?: boolean
    barcode_read_a_pre_aoi?: boolean
    barcode_read_b_layer?: boolean
    barcode_read_b_spi?: boolean
    barcode_read_b_pre_aoi?: boolean
    workorder_info_pre_aoi?: boolean
    workorder_info_post_aoi?: boolean
    aoi_scan_tools_workorder_traceability?: boolean
    confirmation?: boolean
    submitted_by?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AoiTechnicianChecklistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "line" | "group_name" | "date" | "shift" | "pre_aoi_program_full_name" | "stencil_serial_no_b_side" | "stencil_serial_no_a_side" | "barcode_read_a_layer" | "barcode_read_a_spi" | "barcode_read_a_pre_aoi" | "barcode_read_b_layer" | "barcode_read_b_spi" | "barcode_read_b_pre_aoi" | "workorder_info_pre_aoi" | "workorder_info_post_aoi" | "aoi_scan_tools_workorder_traceability" | "confirmation" | "submitted_by" | "status" | "approval_status" | "designated_engineer_id" | "remarks" | "engineer_remarks" | "engineer_modified_fields" | "original_technician_data" | "created_at" | "updated_at", ExtArgs["result"]["aoiTechnicianChecklist"]>

  export type $AoiTechnicianChecklistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AoiTechnicianChecklist"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      line: string | null
      group_name: string | null
      date: Date
      shift: string
      pre_aoi_program_full_name: string | null
      stencil_serial_no_b_side: string | null
      stencil_serial_no_a_side: string | null
      barcode_read_a_layer: string | null
      barcode_read_a_spi: string | null
      barcode_read_a_pre_aoi: string | null
      barcode_read_b_layer: string | null
      barcode_read_b_spi: string | null
      barcode_read_b_pre_aoi: string | null
      workorder_info_pre_aoi: string | null
      workorder_info_post_aoi: string | null
      aoi_scan_tools_workorder_traceability: string | null
      confirmation: string | null
      submitted_by: string | null
      status: string | null
      approval_status: string | null
      designated_engineer_id: string | null
      remarks: string | null
      engineer_remarks: string | null
      engineer_modified_fields: string | null
      original_technician_data: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["aoiTechnicianChecklist"]>
    composites: {}
  }

  type AoiTechnicianChecklistGetPayload<S extends boolean | null | undefined | AoiTechnicianChecklistDefaultArgs> = $Result.GetResult<Prisma.$AoiTechnicianChecklistPayload, S>

  type AoiTechnicianChecklistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AoiTechnicianChecklistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AoiTechnicianChecklistCountAggregateInputType | true
    }

  export interface AoiTechnicianChecklistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AoiTechnicianChecklist'], meta: { name: 'AoiTechnicianChecklist' } }
    /**
     * Find zero or one AoiTechnicianChecklist that matches the filter.
     * @param {AoiTechnicianChecklistFindUniqueArgs} args - Arguments to find a AoiTechnicianChecklist
     * @example
     * // Get one AoiTechnicianChecklist
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AoiTechnicianChecklistFindUniqueArgs>(args: SelectSubset<T, AoiTechnicianChecklistFindUniqueArgs<ExtArgs>>): Prisma__AoiTechnicianChecklistClient<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AoiTechnicianChecklist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AoiTechnicianChecklistFindUniqueOrThrowArgs} args - Arguments to find a AoiTechnicianChecklist
     * @example
     * // Get one AoiTechnicianChecklist
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AoiTechnicianChecklistFindUniqueOrThrowArgs>(args: SelectSubset<T, AoiTechnicianChecklistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AoiTechnicianChecklistClient<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AoiTechnicianChecklist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiTechnicianChecklistFindFirstArgs} args - Arguments to find a AoiTechnicianChecklist
     * @example
     * // Get one AoiTechnicianChecklist
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AoiTechnicianChecklistFindFirstArgs>(args?: SelectSubset<T, AoiTechnicianChecklistFindFirstArgs<ExtArgs>>): Prisma__AoiTechnicianChecklistClient<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AoiTechnicianChecklist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiTechnicianChecklistFindFirstOrThrowArgs} args - Arguments to find a AoiTechnicianChecklist
     * @example
     * // Get one AoiTechnicianChecklist
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AoiTechnicianChecklistFindFirstOrThrowArgs>(args?: SelectSubset<T, AoiTechnicianChecklistFindFirstOrThrowArgs<ExtArgs>>): Prisma__AoiTechnicianChecklistClient<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AoiTechnicianChecklists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiTechnicianChecklistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AoiTechnicianChecklists
     * const aoiTechnicianChecklists = await prisma.aoiTechnicianChecklist.findMany()
     * 
     * // Get first 10 AoiTechnicianChecklists
     * const aoiTechnicianChecklists = await prisma.aoiTechnicianChecklist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aoiTechnicianChecklistWithIdOnly = await prisma.aoiTechnicianChecklist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AoiTechnicianChecklistFindManyArgs>(args?: SelectSubset<T, AoiTechnicianChecklistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AoiTechnicianChecklist.
     * @param {AoiTechnicianChecklistCreateArgs} args - Arguments to create a AoiTechnicianChecklist.
     * @example
     * // Create one AoiTechnicianChecklist
     * const AoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.create({
     *   data: {
     *     // ... data to create a AoiTechnicianChecklist
     *   }
     * })
     * 
     */
    create<T extends AoiTechnicianChecklistCreateArgs>(args: SelectSubset<T, AoiTechnicianChecklistCreateArgs<ExtArgs>>): Prisma__AoiTechnicianChecklistClient<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AoiTechnicianChecklists.
     * @param {AoiTechnicianChecklistCreateManyArgs} args - Arguments to create many AoiTechnicianChecklists.
     * @example
     * // Create many AoiTechnicianChecklists
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AoiTechnicianChecklistCreateManyArgs>(args?: SelectSubset<T, AoiTechnicianChecklistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AoiTechnicianChecklists and returns the data saved in the database.
     * @param {AoiTechnicianChecklistCreateManyAndReturnArgs} args - Arguments to create many AoiTechnicianChecklists.
     * @example
     * // Create many AoiTechnicianChecklists
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AoiTechnicianChecklists and only return the `id`
     * const aoiTechnicianChecklistWithIdOnly = await prisma.aoiTechnicianChecklist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AoiTechnicianChecklistCreateManyAndReturnArgs>(args?: SelectSubset<T, AoiTechnicianChecklistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AoiTechnicianChecklist.
     * @param {AoiTechnicianChecklistDeleteArgs} args - Arguments to delete one AoiTechnicianChecklist.
     * @example
     * // Delete one AoiTechnicianChecklist
     * const AoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.delete({
     *   where: {
     *     // ... filter to delete one AoiTechnicianChecklist
     *   }
     * })
     * 
     */
    delete<T extends AoiTechnicianChecklistDeleteArgs>(args: SelectSubset<T, AoiTechnicianChecklistDeleteArgs<ExtArgs>>): Prisma__AoiTechnicianChecklistClient<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AoiTechnicianChecklist.
     * @param {AoiTechnicianChecklistUpdateArgs} args - Arguments to update one AoiTechnicianChecklist.
     * @example
     * // Update one AoiTechnicianChecklist
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AoiTechnicianChecklistUpdateArgs>(args: SelectSubset<T, AoiTechnicianChecklistUpdateArgs<ExtArgs>>): Prisma__AoiTechnicianChecklistClient<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AoiTechnicianChecklists.
     * @param {AoiTechnicianChecklistDeleteManyArgs} args - Arguments to filter AoiTechnicianChecklists to delete.
     * @example
     * // Delete a few AoiTechnicianChecklists
     * const { count } = await prisma.aoiTechnicianChecklist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AoiTechnicianChecklistDeleteManyArgs>(args?: SelectSubset<T, AoiTechnicianChecklistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AoiTechnicianChecklists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiTechnicianChecklistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AoiTechnicianChecklists
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AoiTechnicianChecklistUpdateManyArgs>(args: SelectSubset<T, AoiTechnicianChecklistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AoiTechnicianChecklists and returns the data updated in the database.
     * @param {AoiTechnicianChecklistUpdateManyAndReturnArgs} args - Arguments to update many AoiTechnicianChecklists.
     * @example
     * // Update many AoiTechnicianChecklists
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AoiTechnicianChecklists and only return the `id`
     * const aoiTechnicianChecklistWithIdOnly = await prisma.aoiTechnicianChecklist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AoiTechnicianChecklistUpdateManyAndReturnArgs>(args: SelectSubset<T, AoiTechnicianChecklistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AoiTechnicianChecklist.
     * @param {AoiTechnicianChecklistUpsertArgs} args - Arguments to update or create a AoiTechnicianChecklist.
     * @example
     * // Update or create a AoiTechnicianChecklist
     * const aoiTechnicianChecklist = await prisma.aoiTechnicianChecklist.upsert({
     *   create: {
     *     // ... data to create a AoiTechnicianChecklist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AoiTechnicianChecklist we want to update
     *   }
     * })
     */
    upsert<T extends AoiTechnicianChecklistUpsertArgs>(args: SelectSubset<T, AoiTechnicianChecklistUpsertArgs<ExtArgs>>): Prisma__AoiTechnicianChecklistClient<$Result.GetResult<Prisma.$AoiTechnicianChecklistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AoiTechnicianChecklists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiTechnicianChecklistCountArgs} args - Arguments to filter AoiTechnicianChecklists to count.
     * @example
     * // Count the number of AoiTechnicianChecklists
     * const count = await prisma.aoiTechnicianChecklist.count({
     *   where: {
     *     // ... the filter for the AoiTechnicianChecklists we want to count
     *   }
     * })
    **/
    count<T extends AoiTechnicianChecklistCountArgs>(
      args?: Subset<T, AoiTechnicianChecklistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AoiTechnicianChecklistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AoiTechnicianChecklist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiTechnicianChecklistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AoiTechnicianChecklistAggregateArgs>(args: Subset<T, AoiTechnicianChecklistAggregateArgs>): Prisma.PrismaPromise<GetAoiTechnicianChecklistAggregateType<T>>

    /**
     * Group by AoiTechnicianChecklist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiTechnicianChecklistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AoiTechnicianChecklistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AoiTechnicianChecklistGroupByArgs['orderBy'] }
        : { orderBy?: AoiTechnicianChecklistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AoiTechnicianChecklistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAoiTechnicianChecklistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AoiTechnicianChecklist model
   */
  readonly fields: AoiTechnicianChecklistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AoiTechnicianChecklist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AoiTechnicianChecklistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AoiTechnicianChecklist model
   */
  interface AoiTechnicianChecklistFieldRefs {
    readonly id: FieldRef<"AoiTechnicianChecklist", 'Int'>
    readonly line: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly group_name: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly date: FieldRef<"AoiTechnicianChecklist", 'DateTime'>
    readonly shift: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly pre_aoi_program_full_name: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly stencil_serial_no_b_side: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly stencil_serial_no_a_side: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly barcode_read_a_layer: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly barcode_read_a_spi: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly barcode_read_a_pre_aoi: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly barcode_read_b_layer: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly barcode_read_b_spi: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly barcode_read_b_pre_aoi: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly workorder_info_pre_aoi: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly workorder_info_post_aoi: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly aoi_scan_tools_workorder_traceability: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly confirmation: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly submitted_by: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly status: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly approval_status: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly designated_engineer_id: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly remarks: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly engineer_remarks: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly engineer_modified_fields: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly original_technician_data: FieldRef<"AoiTechnicianChecklist", 'String'>
    readonly created_at: FieldRef<"AoiTechnicianChecklist", 'DateTime'>
    readonly updated_at: FieldRef<"AoiTechnicianChecklist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AoiTechnicianChecklist findUnique
   */
  export type AoiTechnicianChecklistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * Filter, which AoiTechnicianChecklist to fetch.
     */
    where: AoiTechnicianChecklistWhereUniqueInput
  }

  /**
   * AoiTechnicianChecklist findUniqueOrThrow
   */
  export type AoiTechnicianChecklistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * Filter, which AoiTechnicianChecklist to fetch.
     */
    where: AoiTechnicianChecklistWhereUniqueInput
  }

  /**
   * AoiTechnicianChecklist findFirst
   */
  export type AoiTechnicianChecklistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * Filter, which AoiTechnicianChecklist to fetch.
     */
    where?: AoiTechnicianChecklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiTechnicianChecklists to fetch.
     */
    orderBy?: AoiTechnicianChecklistOrderByWithRelationInput | AoiTechnicianChecklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AoiTechnicianChecklists.
     */
    cursor?: AoiTechnicianChecklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiTechnicianChecklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiTechnicianChecklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AoiTechnicianChecklists.
     */
    distinct?: AoiTechnicianChecklistScalarFieldEnum | AoiTechnicianChecklistScalarFieldEnum[]
  }

  /**
   * AoiTechnicianChecklist findFirstOrThrow
   */
  export type AoiTechnicianChecklistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * Filter, which AoiTechnicianChecklist to fetch.
     */
    where?: AoiTechnicianChecklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiTechnicianChecklists to fetch.
     */
    orderBy?: AoiTechnicianChecklistOrderByWithRelationInput | AoiTechnicianChecklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AoiTechnicianChecklists.
     */
    cursor?: AoiTechnicianChecklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiTechnicianChecklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiTechnicianChecklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AoiTechnicianChecklists.
     */
    distinct?: AoiTechnicianChecklistScalarFieldEnum | AoiTechnicianChecklistScalarFieldEnum[]
  }

  /**
   * AoiTechnicianChecklist findMany
   */
  export type AoiTechnicianChecklistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * Filter, which AoiTechnicianChecklists to fetch.
     */
    where?: AoiTechnicianChecklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiTechnicianChecklists to fetch.
     */
    orderBy?: AoiTechnicianChecklistOrderByWithRelationInput | AoiTechnicianChecklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AoiTechnicianChecklists.
     */
    cursor?: AoiTechnicianChecklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiTechnicianChecklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiTechnicianChecklists.
     */
    skip?: number
    distinct?: AoiTechnicianChecklistScalarFieldEnum | AoiTechnicianChecklistScalarFieldEnum[]
  }

  /**
   * AoiTechnicianChecklist create
   */
  export type AoiTechnicianChecklistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * The data needed to create a AoiTechnicianChecklist.
     */
    data: XOR<AoiTechnicianChecklistCreateInput, AoiTechnicianChecklistUncheckedCreateInput>
  }

  /**
   * AoiTechnicianChecklist createMany
   */
  export type AoiTechnicianChecklistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AoiTechnicianChecklists.
     */
    data: AoiTechnicianChecklistCreateManyInput | AoiTechnicianChecklistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AoiTechnicianChecklist createManyAndReturn
   */
  export type AoiTechnicianChecklistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * The data used to create many AoiTechnicianChecklists.
     */
    data: AoiTechnicianChecklistCreateManyInput | AoiTechnicianChecklistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AoiTechnicianChecklist update
   */
  export type AoiTechnicianChecklistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * The data needed to update a AoiTechnicianChecklist.
     */
    data: XOR<AoiTechnicianChecklistUpdateInput, AoiTechnicianChecklistUncheckedUpdateInput>
    /**
     * Choose, which AoiTechnicianChecklist to update.
     */
    where: AoiTechnicianChecklistWhereUniqueInput
  }

  /**
   * AoiTechnicianChecklist updateMany
   */
  export type AoiTechnicianChecklistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AoiTechnicianChecklists.
     */
    data: XOR<AoiTechnicianChecklistUpdateManyMutationInput, AoiTechnicianChecklistUncheckedUpdateManyInput>
    /**
     * Filter which AoiTechnicianChecklists to update
     */
    where?: AoiTechnicianChecklistWhereInput
    /**
     * Limit how many AoiTechnicianChecklists to update.
     */
    limit?: number
  }

  /**
   * AoiTechnicianChecklist updateManyAndReturn
   */
  export type AoiTechnicianChecklistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * The data used to update AoiTechnicianChecklists.
     */
    data: XOR<AoiTechnicianChecklistUpdateManyMutationInput, AoiTechnicianChecklistUncheckedUpdateManyInput>
    /**
     * Filter which AoiTechnicianChecklists to update
     */
    where?: AoiTechnicianChecklistWhereInput
    /**
     * Limit how many AoiTechnicianChecklists to update.
     */
    limit?: number
  }

  /**
   * AoiTechnicianChecklist upsert
   */
  export type AoiTechnicianChecklistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * The filter to search for the AoiTechnicianChecklist to update in case it exists.
     */
    where: AoiTechnicianChecklistWhereUniqueInput
    /**
     * In case the AoiTechnicianChecklist found by the `where` argument doesn't exist, create a new AoiTechnicianChecklist with this data.
     */
    create: XOR<AoiTechnicianChecklistCreateInput, AoiTechnicianChecklistUncheckedCreateInput>
    /**
     * In case the AoiTechnicianChecklist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AoiTechnicianChecklistUpdateInput, AoiTechnicianChecklistUncheckedUpdateInput>
  }

  /**
   * AoiTechnicianChecklist delete
   */
  export type AoiTechnicianChecklistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
    /**
     * Filter which AoiTechnicianChecklist to delete.
     */
    where: AoiTechnicianChecklistWhereUniqueInput
  }

  /**
   * AoiTechnicianChecklist deleteMany
   */
  export type AoiTechnicianChecklistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AoiTechnicianChecklists to delete
     */
    where?: AoiTechnicianChecklistWhereInput
    /**
     * Limit how many AoiTechnicianChecklists to delete.
     */
    limit?: number
  }

  /**
   * AoiTechnicianChecklist without action
   */
  export type AoiTechnicianChecklistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiTechnicianChecklist
     */
    select?: AoiTechnicianChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiTechnicianChecklist
     */
    omit?: AoiTechnicianChecklistOmit<ExtArgs> | null
  }


  /**
   * Model AppUser
   */

  export type AggregateAppUser = {
    _count: AppUserCountAggregateOutputType | null
    _avg: AppUserAvgAggregateOutputType | null
    _sum: AppUserSumAggregateOutputType | null
    _min: AppUserMinAggregateOutputType | null
    _max: AppUserMaxAggregateOutputType | null
  }

  export type AppUserAvgAggregateOutputType = {
    id: number | null
  }

  export type AppUserSumAggregateOutputType = {
    id: number | null
  }

  export type AppUserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password_hash: string | null
    full_name: string | null
    role: string | null
    email: string | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppUserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password_hash: string | null
    full_name: string | null
    role: string | null
    email: string | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppUserCountAggregateOutputType = {
    id: number
    username: number
    password_hash: number
    full_name: number
    role: number
    email: number
    phone: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AppUserAvgAggregateInputType = {
    id?: true
  }

  export type AppUserSumAggregateInputType = {
    id?: true
  }

  export type AppUserMinAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    full_name?: true
    role?: true
    email?: true
    phone?: true
    created_at?: true
    updated_at?: true
  }

  export type AppUserMaxAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    full_name?: true
    role?: true
    email?: true
    phone?: true
    created_at?: true
    updated_at?: true
  }

  export type AppUserCountAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    full_name?: true
    role?: true
    email?: true
    phone?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AppUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppUser to aggregate.
     */
    where?: AppUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsers to fetch.
     */
    orderBy?: AppUserOrderByWithRelationInput | AppUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppUsers
    **/
    _count?: true | AppUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppUserMaxAggregateInputType
  }

  export type GetAppUserAggregateType<T extends AppUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAppUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppUser[P]>
      : GetScalarType<T[P], AggregateAppUser[P]>
  }




  export type AppUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppUserWhereInput
    orderBy?: AppUserOrderByWithAggregationInput | AppUserOrderByWithAggregationInput[]
    by: AppUserScalarFieldEnum[] | AppUserScalarFieldEnum
    having?: AppUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppUserCountAggregateInputType | true
    _avg?: AppUserAvgAggregateInputType
    _sum?: AppUserSumAggregateInputType
    _min?: AppUserMinAggregateInputType
    _max?: AppUserMaxAggregateInputType
  }

  export type AppUserGroupByOutputType = {
    id: number
    username: string
    password_hash: string
    full_name: string
    role: string
    email: string | null
    phone: string | null
    created_at: Date
    updated_at: Date
    _count: AppUserCountAggregateOutputType | null
    _avg: AppUserAvgAggregateOutputType | null
    _sum: AppUserSumAggregateOutputType | null
    _min: AppUserMinAggregateOutputType | null
    _max: AppUserMaxAggregateOutputType | null
  }

  type GetAppUserGroupByPayload<T extends AppUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppUserGroupByOutputType[P]>
            : GetScalarType<T[P], AppUserGroupByOutputType[P]>
        }
      >
    >


  export type AppUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password_hash?: boolean
    full_name?: boolean
    role?: boolean
    email?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    sessions?: boolean | AppUser$sessionsArgs<ExtArgs>
    _count?: boolean | AppUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appUser"]>

  export type AppUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password_hash?: boolean
    full_name?: boolean
    role?: boolean
    email?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["appUser"]>

  export type AppUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password_hash?: boolean
    full_name?: boolean
    role?: boolean
    email?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["appUser"]>

  export type AppUserSelectScalar = {
    id?: boolean
    username?: boolean
    password_hash?: boolean
    full_name?: boolean
    role?: boolean
    email?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AppUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password_hash" | "full_name" | "role" | "email" | "phone" | "created_at" | "updated_at", ExtArgs["result"]["appUser"]>
  export type AppUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | AppUser$sessionsArgs<ExtArgs>
    _count?: boolean | AppUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AppUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AppUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppUser"
    objects: {
      sessions: Prisma.$AppSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password_hash: string
      full_name: string
      role: string
      email: string | null
      phone: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["appUser"]>
    composites: {}
  }

  type AppUserGetPayload<S extends boolean | null | undefined | AppUserDefaultArgs> = $Result.GetResult<Prisma.$AppUserPayload, S>

  type AppUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppUserCountAggregateInputType | true
    }

  export interface AppUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppUser'], meta: { name: 'AppUser' } }
    /**
     * Find zero or one AppUser that matches the filter.
     * @param {AppUserFindUniqueArgs} args - Arguments to find a AppUser
     * @example
     * // Get one AppUser
     * const appUser = await prisma.appUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppUserFindUniqueArgs>(args: SelectSubset<T, AppUserFindUniqueArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppUserFindUniqueOrThrowArgs} args - Arguments to find a AppUser
     * @example
     * // Get one AppUser
     * const appUser = await prisma.appUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AppUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserFindFirstArgs} args - Arguments to find a AppUser
     * @example
     * // Get one AppUser
     * const appUser = await prisma.appUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppUserFindFirstArgs>(args?: SelectSubset<T, AppUserFindFirstArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserFindFirstOrThrowArgs} args - Arguments to find a AppUser
     * @example
     * // Get one AppUser
     * const appUser = await prisma.appUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AppUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppUsers
     * const appUsers = await prisma.appUser.findMany()
     * 
     * // Get first 10 AppUsers
     * const appUsers = await prisma.appUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appUserWithIdOnly = await prisma.appUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppUserFindManyArgs>(args?: SelectSubset<T, AppUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppUser.
     * @param {AppUserCreateArgs} args - Arguments to create a AppUser.
     * @example
     * // Create one AppUser
     * const AppUser = await prisma.appUser.create({
     *   data: {
     *     // ... data to create a AppUser
     *   }
     * })
     * 
     */
    create<T extends AppUserCreateArgs>(args: SelectSubset<T, AppUserCreateArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppUsers.
     * @param {AppUserCreateManyArgs} args - Arguments to create many AppUsers.
     * @example
     * // Create many AppUsers
     * const appUser = await prisma.appUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppUserCreateManyArgs>(args?: SelectSubset<T, AppUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppUsers and returns the data saved in the database.
     * @param {AppUserCreateManyAndReturnArgs} args - Arguments to create many AppUsers.
     * @example
     * // Create many AppUsers
     * const appUser = await prisma.appUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppUsers and only return the `id`
     * const appUserWithIdOnly = await prisma.appUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AppUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppUser.
     * @param {AppUserDeleteArgs} args - Arguments to delete one AppUser.
     * @example
     * // Delete one AppUser
     * const AppUser = await prisma.appUser.delete({
     *   where: {
     *     // ... filter to delete one AppUser
     *   }
     * })
     * 
     */
    delete<T extends AppUserDeleteArgs>(args: SelectSubset<T, AppUserDeleteArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppUser.
     * @param {AppUserUpdateArgs} args - Arguments to update one AppUser.
     * @example
     * // Update one AppUser
     * const appUser = await prisma.appUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppUserUpdateArgs>(args: SelectSubset<T, AppUserUpdateArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppUsers.
     * @param {AppUserDeleteManyArgs} args - Arguments to filter AppUsers to delete.
     * @example
     * // Delete a few AppUsers
     * const { count } = await prisma.appUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppUserDeleteManyArgs>(args?: SelectSubset<T, AppUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppUsers
     * const appUser = await prisma.appUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppUserUpdateManyArgs>(args: SelectSubset<T, AppUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppUsers and returns the data updated in the database.
     * @param {AppUserUpdateManyAndReturnArgs} args - Arguments to update many AppUsers.
     * @example
     * // Update many AppUsers
     * const appUser = await prisma.appUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppUsers and only return the `id`
     * const appUserWithIdOnly = await prisma.appUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppUserUpdateManyAndReturnArgs>(args: SelectSubset<T, AppUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppUser.
     * @param {AppUserUpsertArgs} args - Arguments to update or create a AppUser.
     * @example
     * // Update or create a AppUser
     * const appUser = await prisma.appUser.upsert({
     *   create: {
     *     // ... data to create a AppUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppUser we want to update
     *   }
     * })
     */
    upsert<T extends AppUserUpsertArgs>(args: SelectSubset<T, AppUserUpsertArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserCountArgs} args - Arguments to filter AppUsers to count.
     * @example
     * // Count the number of AppUsers
     * const count = await prisma.appUser.count({
     *   where: {
     *     // ... the filter for the AppUsers we want to count
     *   }
     * })
    **/
    count<T extends AppUserCountArgs>(
      args?: Subset<T, AppUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppUserAggregateArgs>(args: Subset<T, AppUserAggregateArgs>): Prisma.PrismaPromise<GetAppUserAggregateType<T>>

    /**
     * Group by AppUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppUserGroupByArgs['orderBy'] }
        : { orderBy?: AppUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppUser model
   */
  readonly fields: AppUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends AppUser$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, AppUser$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppUser model
   */
  interface AppUserFieldRefs {
    readonly id: FieldRef<"AppUser", 'Int'>
    readonly username: FieldRef<"AppUser", 'String'>
    readonly password_hash: FieldRef<"AppUser", 'String'>
    readonly full_name: FieldRef<"AppUser", 'String'>
    readonly role: FieldRef<"AppUser", 'String'>
    readonly email: FieldRef<"AppUser", 'String'>
    readonly phone: FieldRef<"AppUser", 'String'>
    readonly created_at: FieldRef<"AppUser", 'DateTime'>
    readonly updated_at: FieldRef<"AppUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppUser findUnique
   */
  export type AppUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUser to fetch.
     */
    where: AppUserWhereUniqueInput
  }

  /**
   * AppUser findUniqueOrThrow
   */
  export type AppUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUser to fetch.
     */
    where: AppUserWhereUniqueInput
  }

  /**
   * AppUser findFirst
   */
  export type AppUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUser to fetch.
     */
    where?: AppUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsers to fetch.
     */
    orderBy?: AppUserOrderByWithRelationInput | AppUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppUsers.
     */
    cursor?: AppUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppUsers.
     */
    distinct?: AppUserScalarFieldEnum | AppUserScalarFieldEnum[]
  }

  /**
   * AppUser findFirstOrThrow
   */
  export type AppUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUser to fetch.
     */
    where?: AppUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsers to fetch.
     */
    orderBy?: AppUserOrderByWithRelationInput | AppUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppUsers.
     */
    cursor?: AppUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppUsers.
     */
    distinct?: AppUserScalarFieldEnum | AppUserScalarFieldEnum[]
  }

  /**
   * AppUser findMany
   */
  export type AppUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUsers to fetch.
     */
    where?: AppUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsers to fetch.
     */
    orderBy?: AppUserOrderByWithRelationInput | AppUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppUsers.
     */
    cursor?: AppUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsers.
     */
    skip?: number
    distinct?: AppUserScalarFieldEnum | AppUserScalarFieldEnum[]
  }

  /**
   * AppUser create
   */
  export type AppUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AppUser.
     */
    data: XOR<AppUserCreateInput, AppUserUncheckedCreateInput>
  }

  /**
   * AppUser createMany
   */
  export type AppUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppUsers.
     */
    data: AppUserCreateManyInput | AppUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppUser createManyAndReturn
   */
  export type AppUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * The data used to create many AppUsers.
     */
    data: AppUserCreateManyInput | AppUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppUser update
   */
  export type AppUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AppUser.
     */
    data: XOR<AppUserUpdateInput, AppUserUncheckedUpdateInput>
    /**
     * Choose, which AppUser to update.
     */
    where: AppUserWhereUniqueInput
  }

  /**
   * AppUser updateMany
   */
  export type AppUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppUsers.
     */
    data: XOR<AppUserUpdateManyMutationInput, AppUserUncheckedUpdateManyInput>
    /**
     * Filter which AppUsers to update
     */
    where?: AppUserWhereInput
    /**
     * Limit how many AppUsers to update.
     */
    limit?: number
  }

  /**
   * AppUser updateManyAndReturn
   */
  export type AppUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * The data used to update AppUsers.
     */
    data: XOR<AppUserUpdateManyMutationInput, AppUserUncheckedUpdateManyInput>
    /**
     * Filter which AppUsers to update
     */
    where?: AppUserWhereInput
    /**
     * Limit how many AppUsers to update.
     */
    limit?: number
  }

  /**
   * AppUser upsert
   */
  export type AppUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AppUser to update in case it exists.
     */
    where: AppUserWhereUniqueInput
    /**
     * In case the AppUser found by the `where` argument doesn't exist, create a new AppUser with this data.
     */
    create: XOR<AppUserCreateInput, AppUserUncheckedCreateInput>
    /**
     * In case the AppUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppUserUpdateInput, AppUserUncheckedUpdateInput>
  }

  /**
   * AppUser delete
   */
  export type AppUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter which AppUser to delete.
     */
    where: AppUserWhereUniqueInput
  }

  /**
   * AppUser deleteMany
   */
  export type AppUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppUsers to delete
     */
    where?: AppUserWhereInput
    /**
     * Limit how many AppUsers to delete.
     */
    limit?: number
  }

  /**
   * AppUser.sessions
   */
  export type AppUser$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    where?: AppSessionWhereInput
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    cursor?: AppSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppSessionScalarFieldEnum | AppSessionScalarFieldEnum[]
  }

  /**
   * AppUser without action
   */
  export type AppUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
  }


  /**
   * Model AppSession
   */

  export type AggregateAppSession = {
    _count: AppSessionCountAggregateOutputType | null
    _avg: AppSessionAvgAggregateOutputType | null
    _sum: AppSessionSumAggregateOutputType | null
    _min: AppSessionMinAggregateOutputType | null
    _max: AppSessionMaxAggregateOutputType | null
  }

  export type AppSessionAvgAggregateOutputType = {
    user_id: number | null
  }

  export type AppSessionSumAggregateOutputType = {
    user_id: number | null
  }

  export type AppSessionMinAggregateOutputType = {
    session_id: string | null
    user_id: number | null
    public_ip: string | null
    login_time: Date | null
    logout_time: Date | null
    status: string | null
  }

  export type AppSessionMaxAggregateOutputType = {
    session_id: string | null
    user_id: number | null
    public_ip: string | null
    login_time: Date | null
    logout_time: Date | null
    status: string | null
  }

  export type AppSessionCountAggregateOutputType = {
    session_id: number
    user_id: number
    public_ip: number
    login_time: number
    logout_time: number
    status: number
    _all: number
  }


  export type AppSessionAvgAggregateInputType = {
    user_id?: true
  }

  export type AppSessionSumAggregateInputType = {
    user_id?: true
  }

  export type AppSessionMinAggregateInputType = {
    session_id?: true
    user_id?: true
    public_ip?: true
    login_time?: true
    logout_time?: true
    status?: true
  }

  export type AppSessionMaxAggregateInputType = {
    session_id?: true
    user_id?: true
    public_ip?: true
    login_time?: true
    logout_time?: true
    status?: true
  }

  export type AppSessionCountAggregateInputType = {
    session_id?: true
    user_id?: true
    public_ip?: true
    login_time?: true
    logout_time?: true
    status?: true
    _all?: true
  }

  export type AppSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSession to aggregate.
     */
    where?: AppSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSessions to fetch.
     */
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppSessions
    **/
    _count?: true | AppSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppSessionMaxAggregateInputType
  }

  export type GetAppSessionAggregateType<T extends AppSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAppSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppSession[P]>
      : GetScalarType<T[P], AggregateAppSession[P]>
  }




  export type AppSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppSessionWhereInput
    orderBy?: AppSessionOrderByWithAggregationInput | AppSessionOrderByWithAggregationInput[]
    by: AppSessionScalarFieldEnum[] | AppSessionScalarFieldEnum
    having?: AppSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppSessionCountAggregateInputType | true
    _avg?: AppSessionAvgAggregateInputType
    _sum?: AppSessionSumAggregateInputType
    _min?: AppSessionMinAggregateInputType
    _max?: AppSessionMaxAggregateInputType
  }

  export type AppSessionGroupByOutputType = {
    session_id: string
    user_id: number
    public_ip: string | null
    login_time: Date
    logout_time: Date | null
    status: string
    _count: AppSessionCountAggregateOutputType | null
    _avg: AppSessionAvgAggregateOutputType | null
    _sum: AppSessionSumAggregateOutputType | null
    _min: AppSessionMinAggregateOutputType | null
    _max: AppSessionMaxAggregateOutputType | null
  }

  type GetAppSessionGroupByPayload<T extends AppSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AppSessionGroupByOutputType[P]>
        }
      >
    >


  export type AppSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    user_id?: boolean
    public_ip?: boolean
    login_time?: boolean
    logout_time?: boolean
    status?: boolean
    user?: boolean | AppUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appSession"]>

  export type AppSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    user_id?: boolean
    public_ip?: boolean
    login_time?: boolean
    logout_time?: boolean
    status?: boolean
    user?: boolean | AppUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appSession"]>

  export type AppSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    user_id?: boolean
    public_ip?: boolean
    login_time?: boolean
    logout_time?: boolean
    status?: boolean
    user?: boolean | AppUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appSession"]>

  export type AppSessionSelectScalar = {
    session_id?: boolean
    user_id?: boolean
    public_ip?: boolean
    login_time?: boolean
    logout_time?: boolean
    status?: boolean
  }

  export type AppSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"session_id" | "user_id" | "public_ip" | "login_time" | "logout_time" | "status", ExtArgs["result"]["appSession"]>
  export type AppSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AppUserDefaultArgs<ExtArgs>
  }
  export type AppSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AppUserDefaultArgs<ExtArgs>
  }
  export type AppSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AppUserDefaultArgs<ExtArgs>
  }

  export type $AppSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppSession"
    objects: {
      user: Prisma.$AppUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      session_id: string
      user_id: number
      public_ip: string | null
      login_time: Date
      logout_time: Date | null
      status: string
    }, ExtArgs["result"]["appSession"]>
    composites: {}
  }

  type AppSessionGetPayload<S extends boolean | null | undefined | AppSessionDefaultArgs> = $Result.GetResult<Prisma.$AppSessionPayload, S>

  type AppSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppSessionCountAggregateInputType | true
    }

  export interface AppSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppSession'], meta: { name: 'AppSession' } }
    /**
     * Find zero or one AppSession that matches the filter.
     * @param {AppSessionFindUniqueArgs} args - Arguments to find a AppSession
     * @example
     * // Get one AppSession
     * const appSession = await prisma.appSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppSessionFindUniqueArgs>(args: SelectSubset<T, AppSessionFindUniqueArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppSessionFindUniqueOrThrowArgs} args - Arguments to find a AppSession
     * @example
     * // Get one AppSession
     * const appSession = await prisma.appSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AppSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionFindFirstArgs} args - Arguments to find a AppSession
     * @example
     * // Get one AppSession
     * const appSession = await prisma.appSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppSessionFindFirstArgs>(args?: SelectSubset<T, AppSessionFindFirstArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionFindFirstOrThrowArgs} args - Arguments to find a AppSession
     * @example
     * // Get one AppSession
     * const appSession = await prisma.appSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AppSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppSessions
     * const appSessions = await prisma.appSession.findMany()
     * 
     * // Get first 10 AppSessions
     * const appSessions = await prisma.appSession.findMany({ take: 10 })
     * 
     * // Only select the `session_id`
     * const appSessionWithSession_idOnly = await prisma.appSession.findMany({ select: { session_id: true } })
     * 
     */
    findMany<T extends AppSessionFindManyArgs>(args?: SelectSubset<T, AppSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppSession.
     * @param {AppSessionCreateArgs} args - Arguments to create a AppSession.
     * @example
     * // Create one AppSession
     * const AppSession = await prisma.appSession.create({
     *   data: {
     *     // ... data to create a AppSession
     *   }
     * })
     * 
     */
    create<T extends AppSessionCreateArgs>(args: SelectSubset<T, AppSessionCreateArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppSessions.
     * @param {AppSessionCreateManyArgs} args - Arguments to create many AppSessions.
     * @example
     * // Create many AppSessions
     * const appSession = await prisma.appSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppSessionCreateManyArgs>(args?: SelectSubset<T, AppSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppSessions and returns the data saved in the database.
     * @param {AppSessionCreateManyAndReturnArgs} args - Arguments to create many AppSessions.
     * @example
     * // Create many AppSessions
     * const appSession = await prisma.appSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppSessions and only return the `session_id`
     * const appSessionWithSession_idOnly = await prisma.appSession.createManyAndReturn({
     *   select: { session_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AppSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppSession.
     * @param {AppSessionDeleteArgs} args - Arguments to delete one AppSession.
     * @example
     * // Delete one AppSession
     * const AppSession = await prisma.appSession.delete({
     *   where: {
     *     // ... filter to delete one AppSession
     *   }
     * })
     * 
     */
    delete<T extends AppSessionDeleteArgs>(args: SelectSubset<T, AppSessionDeleteArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppSession.
     * @param {AppSessionUpdateArgs} args - Arguments to update one AppSession.
     * @example
     * // Update one AppSession
     * const appSession = await prisma.appSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppSessionUpdateArgs>(args: SelectSubset<T, AppSessionUpdateArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppSessions.
     * @param {AppSessionDeleteManyArgs} args - Arguments to filter AppSessions to delete.
     * @example
     * // Delete a few AppSessions
     * const { count } = await prisma.appSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppSessionDeleteManyArgs>(args?: SelectSubset<T, AppSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppSessions
     * const appSession = await prisma.appSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppSessionUpdateManyArgs>(args: SelectSubset<T, AppSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppSessions and returns the data updated in the database.
     * @param {AppSessionUpdateManyAndReturnArgs} args - Arguments to update many AppSessions.
     * @example
     * // Update many AppSessions
     * const appSession = await prisma.appSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppSessions and only return the `session_id`
     * const appSessionWithSession_idOnly = await prisma.appSession.updateManyAndReturn({
     *   select: { session_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, AppSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppSession.
     * @param {AppSessionUpsertArgs} args - Arguments to update or create a AppSession.
     * @example
     * // Update or create a AppSession
     * const appSession = await prisma.appSession.upsert({
     *   create: {
     *     // ... data to create a AppSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppSession we want to update
     *   }
     * })
     */
    upsert<T extends AppSessionUpsertArgs>(args: SelectSubset<T, AppSessionUpsertArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionCountArgs} args - Arguments to filter AppSessions to count.
     * @example
     * // Count the number of AppSessions
     * const count = await prisma.appSession.count({
     *   where: {
     *     // ... the filter for the AppSessions we want to count
     *   }
     * })
    **/
    count<T extends AppSessionCountArgs>(
      args?: Subset<T, AppSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppSessionAggregateArgs>(args: Subset<T, AppSessionAggregateArgs>): Prisma.PrismaPromise<GetAppSessionAggregateType<T>>

    /**
     * Group by AppSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppSessionGroupByArgs['orderBy'] }
        : { orderBy?: AppSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppSession model
   */
  readonly fields: AppSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AppUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppUserDefaultArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppSession model
   */
  interface AppSessionFieldRefs {
    readonly session_id: FieldRef<"AppSession", 'String'>
    readonly user_id: FieldRef<"AppSession", 'Int'>
    readonly public_ip: FieldRef<"AppSession", 'String'>
    readonly login_time: FieldRef<"AppSession", 'DateTime'>
    readonly logout_time: FieldRef<"AppSession", 'DateTime'>
    readonly status: FieldRef<"AppSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AppSession findUnique
   */
  export type AppSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSession to fetch.
     */
    where: AppSessionWhereUniqueInput
  }

  /**
   * AppSession findUniqueOrThrow
   */
  export type AppSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSession to fetch.
     */
    where: AppSessionWhereUniqueInput
  }

  /**
   * AppSession findFirst
   */
  export type AppSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSession to fetch.
     */
    where?: AppSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSessions to fetch.
     */
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSessions.
     */
    cursor?: AppSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSessions.
     */
    distinct?: AppSessionScalarFieldEnum | AppSessionScalarFieldEnum[]
  }

  /**
   * AppSession findFirstOrThrow
   */
  export type AppSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSession to fetch.
     */
    where?: AppSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSessions to fetch.
     */
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSessions.
     */
    cursor?: AppSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSessions.
     */
    distinct?: AppSessionScalarFieldEnum | AppSessionScalarFieldEnum[]
  }

  /**
   * AppSession findMany
   */
  export type AppSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSessions to fetch.
     */
    where?: AppSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSessions to fetch.
     */
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppSessions.
     */
    cursor?: AppSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSessions.
     */
    skip?: number
    distinct?: AppSessionScalarFieldEnum | AppSessionScalarFieldEnum[]
  }

  /**
   * AppSession create
   */
  export type AppSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AppSession.
     */
    data: XOR<AppSessionCreateInput, AppSessionUncheckedCreateInput>
  }

  /**
   * AppSession createMany
   */
  export type AppSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppSessions.
     */
    data: AppSessionCreateManyInput | AppSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppSession createManyAndReturn
   */
  export type AppSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * The data used to create many AppSessions.
     */
    data: AppSessionCreateManyInput | AppSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppSession update
   */
  export type AppSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AppSession.
     */
    data: XOR<AppSessionUpdateInput, AppSessionUncheckedUpdateInput>
    /**
     * Choose, which AppSession to update.
     */
    where: AppSessionWhereUniqueInput
  }

  /**
   * AppSession updateMany
   */
  export type AppSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppSessions.
     */
    data: XOR<AppSessionUpdateManyMutationInput, AppSessionUncheckedUpdateManyInput>
    /**
     * Filter which AppSessions to update
     */
    where?: AppSessionWhereInput
    /**
     * Limit how many AppSessions to update.
     */
    limit?: number
  }

  /**
   * AppSession updateManyAndReturn
   */
  export type AppSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * The data used to update AppSessions.
     */
    data: XOR<AppSessionUpdateManyMutationInput, AppSessionUncheckedUpdateManyInput>
    /**
     * Filter which AppSessions to update
     */
    where?: AppSessionWhereInput
    /**
     * Limit how many AppSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppSession upsert
   */
  export type AppSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AppSession to update in case it exists.
     */
    where: AppSessionWhereUniqueInput
    /**
     * In case the AppSession found by the `where` argument doesn't exist, create a new AppSession with this data.
     */
    create: XOR<AppSessionCreateInput, AppSessionUncheckedCreateInput>
    /**
     * In case the AppSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppSessionUpdateInput, AppSessionUncheckedUpdateInput>
  }

  /**
   * AppSession delete
   */
  export type AppSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter which AppSession to delete.
     */
    where: AppSessionWhereUniqueInput
  }

  /**
   * AppSession deleteMany
   */
  export type AppSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSessions to delete
     */
    where?: AppSessionWhereInput
    /**
     * Limit how many AppSessions to delete.
     */
    limit?: number
  }

  /**
   * AppSession without action
   */
  export type AppSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
  }


  /**
   * Model AppActivityLog
   */

  export type AggregateAppActivityLog = {
    _count: AppActivityLogCountAggregateOutputType | null
    _avg: AppActivityLogAvgAggregateOutputType | null
    _sum: AppActivityLogSumAggregateOutputType | null
    _min: AppActivityLogMinAggregateOutputType | null
    _max: AppActivityLogMaxAggregateOutputType | null
  }

  export type AppActivityLogAvgAggregateOutputType = {
    id: number | null
  }

  export type AppActivityLogSumAggregateOutputType = {
    id: number | null
  }

  export type AppActivityLogMinAggregateOutputType = {
    id: number | null
    activity_type: string | null
    username: string | null
    public_ip: string | null
    details: string | null
    created_at: Date | null
  }

  export type AppActivityLogMaxAggregateOutputType = {
    id: number | null
    activity_type: string | null
    username: string | null
    public_ip: string | null
    details: string | null
    created_at: Date | null
  }

  export type AppActivityLogCountAggregateOutputType = {
    id: number
    activity_type: number
    username: number
    public_ip: number
    details: number
    created_at: number
    _all: number
  }


  export type AppActivityLogAvgAggregateInputType = {
    id?: true
  }

  export type AppActivityLogSumAggregateInputType = {
    id?: true
  }

  export type AppActivityLogMinAggregateInputType = {
    id?: true
    activity_type?: true
    username?: true
    public_ip?: true
    details?: true
    created_at?: true
  }

  export type AppActivityLogMaxAggregateInputType = {
    id?: true
    activity_type?: true
    username?: true
    public_ip?: true
    details?: true
    created_at?: true
  }

  export type AppActivityLogCountAggregateInputType = {
    id?: true
    activity_type?: true
    username?: true
    public_ip?: true
    details?: true
    created_at?: true
    _all?: true
  }

  export type AppActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppActivityLog to aggregate.
     */
    where?: AppActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppActivityLogs to fetch.
     */
    orderBy?: AppActivityLogOrderByWithRelationInput | AppActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppActivityLogs
    **/
    _count?: true | AppActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppActivityLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppActivityLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppActivityLogMaxAggregateInputType
  }

  export type GetAppActivityLogAggregateType<T extends AppActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAppActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppActivityLog[P]>
      : GetScalarType<T[P], AggregateAppActivityLog[P]>
  }




  export type AppActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppActivityLogWhereInput
    orderBy?: AppActivityLogOrderByWithAggregationInput | AppActivityLogOrderByWithAggregationInput[]
    by: AppActivityLogScalarFieldEnum[] | AppActivityLogScalarFieldEnum
    having?: AppActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppActivityLogCountAggregateInputType | true
    _avg?: AppActivityLogAvgAggregateInputType
    _sum?: AppActivityLogSumAggregateInputType
    _min?: AppActivityLogMinAggregateInputType
    _max?: AppActivityLogMaxAggregateInputType
  }

  export type AppActivityLogGroupByOutputType = {
    id: number
    activity_type: string
    username: string
    public_ip: string | null
    details: string | null
    created_at: Date
    _count: AppActivityLogCountAggregateOutputType | null
    _avg: AppActivityLogAvgAggregateOutputType | null
    _sum: AppActivityLogSumAggregateOutputType | null
    _min: AppActivityLogMinAggregateOutputType | null
    _max: AppActivityLogMaxAggregateOutputType | null
  }

  type GetAppActivityLogGroupByPayload<T extends AppActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], AppActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type AppActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    activity_type?: boolean
    username?: boolean
    public_ip?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["appActivityLog"]>

  export type AppActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    activity_type?: boolean
    username?: boolean
    public_ip?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["appActivityLog"]>

  export type AppActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    activity_type?: boolean
    username?: boolean
    public_ip?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["appActivityLog"]>

  export type AppActivityLogSelectScalar = {
    id?: boolean
    activity_type?: boolean
    username?: boolean
    public_ip?: boolean
    details?: boolean
    created_at?: boolean
  }

  export type AppActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "activity_type" | "username" | "public_ip" | "details" | "created_at", ExtArgs["result"]["appActivityLog"]>

  export type $AppActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppActivityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      activity_type: string
      username: string
      public_ip: string | null
      details: string | null
      created_at: Date
    }, ExtArgs["result"]["appActivityLog"]>
    composites: {}
  }

  type AppActivityLogGetPayload<S extends boolean | null | undefined | AppActivityLogDefaultArgs> = $Result.GetResult<Prisma.$AppActivityLogPayload, S>

  type AppActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppActivityLogCountAggregateInputType | true
    }

  export interface AppActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppActivityLog'], meta: { name: 'AppActivityLog' } }
    /**
     * Find zero or one AppActivityLog that matches the filter.
     * @param {AppActivityLogFindUniqueArgs} args - Arguments to find a AppActivityLog
     * @example
     * // Get one AppActivityLog
     * const appActivityLog = await prisma.appActivityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppActivityLogFindUniqueArgs>(args: SelectSubset<T, AppActivityLogFindUniqueArgs<ExtArgs>>): Prisma__AppActivityLogClient<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppActivityLogFindUniqueOrThrowArgs} args - Arguments to find a AppActivityLog
     * @example
     * // Get one AppActivityLog
     * const appActivityLog = await prisma.appActivityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AppActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppActivityLogClient<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppActivityLogFindFirstArgs} args - Arguments to find a AppActivityLog
     * @example
     * // Get one AppActivityLog
     * const appActivityLog = await prisma.appActivityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppActivityLogFindFirstArgs>(args?: SelectSubset<T, AppActivityLogFindFirstArgs<ExtArgs>>): Prisma__AppActivityLogClient<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppActivityLogFindFirstOrThrowArgs} args - Arguments to find a AppActivityLog
     * @example
     * // Get one AppActivityLog
     * const appActivityLog = await prisma.appActivityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AppActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppActivityLogClient<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppActivityLogs
     * const appActivityLogs = await prisma.appActivityLog.findMany()
     * 
     * // Get first 10 AppActivityLogs
     * const appActivityLogs = await prisma.appActivityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appActivityLogWithIdOnly = await prisma.appActivityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppActivityLogFindManyArgs>(args?: SelectSubset<T, AppActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppActivityLog.
     * @param {AppActivityLogCreateArgs} args - Arguments to create a AppActivityLog.
     * @example
     * // Create one AppActivityLog
     * const AppActivityLog = await prisma.appActivityLog.create({
     *   data: {
     *     // ... data to create a AppActivityLog
     *   }
     * })
     * 
     */
    create<T extends AppActivityLogCreateArgs>(args: SelectSubset<T, AppActivityLogCreateArgs<ExtArgs>>): Prisma__AppActivityLogClient<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppActivityLogs.
     * @param {AppActivityLogCreateManyArgs} args - Arguments to create many AppActivityLogs.
     * @example
     * // Create many AppActivityLogs
     * const appActivityLog = await prisma.appActivityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppActivityLogCreateManyArgs>(args?: SelectSubset<T, AppActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppActivityLogs and returns the data saved in the database.
     * @param {AppActivityLogCreateManyAndReturnArgs} args - Arguments to create many AppActivityLogs.
     * @example
     * // Create many AppActivityLogs
     * const appActivityLog = await prisma.appActivityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppActivityLogs and only return the `id`
     * const appActivityLogWithIdOnly = await prisma.appActivityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AppActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppActivityLog.
     * @param {AppActivityLogDeleteArgs} args - Arguments to delete one AppActivityLog.
     * @example
     * // Delete one AppActivityLog
     * const AppActivityLog = await prisma.appActivityLog.delete({
     *   where: {
     *     // ... filter to delete one AppActivityLog
     *   }
     * })
     * 
     */
    delete<T extends AppActivityLogDeleteArgs>(args: SelectSubset<T, AppActivityLogDeleteArgs<ExtArgs>>): Prisma__AppActivityLogClient<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppActivityLog.
     * @param {AppActivityLogUpdateArgs} args - Arguments to update one AppActivityLog.
     * @example
     * // Update one AppActivityLog
     * const appActivityLog = await prisma.appActivityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppActivityLogUpdateArgs>(args: SelectSubset<T, AppActivityLogUpdateArgs<ExtArgs>>): Prisma__AppActivityLogClient<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppActivityLogs.
     * @param {AppActivityLogDeleteManyArgs} args - Arguments to filter AppActivityLogs to delete.
     * @example
     * // Delete a few AppActivityLogs
     * const { count } = await prisma.appActivityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppActivityLogDeleteManyArgs>(args?: SelectSubset<T, AppActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppActivityLogs
     * const appActivityLog = await prisma.appActivityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppActivityLogUpdateManyArgs>(args: SelectSubset<T, AppActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppActivityLogs and returns the data updated in the database.
     * @param {AppActivityLogUpdateManyAndReturnArgs} args - Arguments to update many AppActivityLogs.
     * @example
     * // Update many AppActivityLogs
     * const appActivityLog = await prisma.appActivityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppActivityLogs and only return the `id`
     * const appActivityLogWithIdOnly = await prisma.appActivityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AppActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppActivityLog.
     * @param {AppActivityLogUpsertArgs} args - Arguments to update or create a AppActivityLog.
     * @example
     * // Update or create a AppActivityLog
     * const appActivityLog = await prisma.appActivityLog.upsert({
     *   create: {
     *     // ... data to create a AppActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends AppActivityLogUpsertArgs>(args: SelectSubset<T, AppActivityLogUpsertArgs<ExtArgs>>): Prisma__AppActivityLogClient<$Result.GetResult<Prisma.$AppActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppActivityLogCountArgs} args - Arguments to filter AppActivityLogs to count.
     * @example
     * // Count the number of AppActivityLogs
     * const count = await prisma.appActivityLog.count({
     *   where: {
     *     // ... the filter for the AppActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends AppActivityLogCountArgs>(
      args?: Subset<T, AppActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppActivityLogAggregateArgs>(args: Subset<T, AppActivityLogAggregateArgs>): Prisma.PrismaPromise<GetAppActivityLogAggregateType<T>>

    /**
     * Group by AppActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: AppActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppActivityLog model
   */
  readonly fields: AppActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppActivityLog model
   */
  interface AppActivityLogFieldRefs {
    readonly id: FieldRef<"AppActivityLog", 'Int'>
    readonly activity_type: FieldRef<"AppActivityLog", 'String'>
    readonly username: FieldRef<"AppActivityLog", 'String'>
    readonly public_ip: FieldRef<"AppActivityLog", 'String'>
    readonly details: FieldRef<"AppActivityLog", 'String'>
    readonly created_at: FieldRef<"AppActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppActivityLog findUnique
   */
  export type AppActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AppActivityLog to fetch.
     */
    where: AppActivityLogWhereUniqueInput
  }

  /**
   * AppActivityLog findUniqueOrThrow
   */
  export type AppActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AppActivityLog to fetch.
     */
    where: AppActivityLogWhereUniqueInput
  }

  /**
   * AppActivityLog findFirst
   */
  export type AppActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AppActivityLog to fetch.
     */
    where?: AppActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppActivityLogs to fetch.
     */
    orderBy?: AppActivityLogOrderByWithRelationInput | AppActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppActivityLogs.
     */
    cursor?: AppActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppActivityLogs.
     */
    distinct?: AppActivityLogScalarFieldEnum | AppActivityLogScalarFieldEnum[]
  }

  /**
   * AppActivityLog findFirstOrThrow
   */
  export type AppActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AppActivityLog to fetch.
     */
    where?: AppActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppActivityLogs to fetch.
     */
    orderBy?: AppActivityLogOrderByWithRelationInput | AppActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppActivityLogs.
     */
    cursor?: AppActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppActivityLogs.
     */
    distinct?: AppActivityLogScalarFieldEnum | AppActivityLogScalarFieldEnum[]
  }

  /**
   * AppActivityLog findMany
   */
  export type AppActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AppActivityLogs to fetch.
     */
    where?: AppActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppActivityLogs to fetch.
     */
    orderBy?: AppActivityLogOrderByWithRelationInput | AppActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppActivityLogs.
     */
    cursor?: AppActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppActivityLogs.
     */
    skip?: number
    distinct?: AppActivityLogScalarFieldEnum | AppActivityLogScalarFieldEnum[]
  }

  /**
   * AppActivityLog create
   */
  export type AppActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AppActivityLog.
     */
    data: XOR<AppActivityLogCreateInput, AppActivityLogUncheckedCreateInput>
  }

  /**
   * AppActivityLog createMany
   */
  export type AppActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppActivityLogs.
     */
    data: AppActivityLogCreateManyInput | AppActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppActivityLog createManyAndReturn
   */
  export type AppActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many AppActivityLogs.
     */
    data: AppActivityLogCreateManyInput | AppActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppActivityLog update
   */
  export type AppActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AppActivityLog.
     */
    data: XOR<AppActivityLogUpdateInput, AppActivityLogUncheckedUpdateInput>
    /**
     * Choose, which AppActivityLog to update.
     */
    where: AppActivityLogWhereUniqueInput
  }

  /**
   * AppActivityLog updateMany
   */
  export type AppActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppActivityLogs.
     */
    data: XOR<AppActivityLogUpdateManyMutationInput, AppActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which AppActivityLogs to update
     */
    where?: AppActivityLogWhereInput
    /**
     * Limit how many AppActivityLogs to update.
     */
    limit?: number
  }

  /**
   * AppActivityLog updateManyAndReturn
   */
  export type AppActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update AppActivityLogs.
     */
    data: XOR<AppActivityLogUpdateManyMutationInput, AppActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which AppActivityLogs to update
     */
    where?: AppActivityLogWhereInput
    /**
     * Limit how many AppActivityLogs to update.
     */
    limit?: number
  }

  /**
   * AppActivityLog upsert
   */
  export type AppActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AppActivityLog to update in case it exists.
     */
    where: AppActivityLogWhereUniqueInput
    /**
     * In case the AppActivityLog found by the `where` argument doesn't exist, create a new AppActivityLog with this data.
     */
    create: XOR<AppActivityLogCreateInput, AppActivityLogUncheckedCreateInput>
    /**
     * In case the AppActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppActivityLogUpdateInput, AppActivityLogUncheckedUpdateInput>
  }

  /**
   * AppActivityLog delete
   */
  export type AppActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
    /**
     * Filter which AppActivityLog to delete.
     */
    where: AppActivityLogWhereUniqueInput
  }

  /**
   * AppActivityLog deleteMany
   */
  export type AppActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppActivityLogs to delete
     */
    where?: AppActivityLogWhereInput
    /**
     * Limit how many AppActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * AppActivityLog without action
   */
  export type AppActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppActivityLog
     */
    select?: AppActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppActivityLog
     */
    omit?: AppActivityLogOmit<ExtArgs> | null
  }


  /**
   * Model LineStatus
   */

  export type AggregateLineStatus = {
    _count: LineStatusCountAggregateOutputType | null
    _avg: LineStatusAvgAggregateOutputType | null
    _sum: LineStatusSumAggregateOutputType | null
    _min: LineStatusMinAggregateOutputType | null
    _max: LineStatusMaxAggregateOutputType | null
  }

  export type LineStatusAvgAggregateOutputType = {
    id: number | null
  }

  export type LineStatusSumAggregateOutputType = {
    id: number | null
  }

  export type LineStatusMinAggregateOutputType = {
    id: number | null
    line: string | null
    is_installed: boolean | null
    updated_by: string | null
    updated_at: Date | null
  }

  export type LineStatusMaxAggregateOutputType = {
    id: number | null
    line: string | null
    is_installed: boolean | null
    updated_by: string | null
    updated_at: Date | null
  }

  export type LineStatusCountAggregateOutputType = {
    id: number
    line: number
    is_installed: number
    updated_by: number
    updated_at: number
    _all: number
  }


  export type LineStatusAvgAggregateInputType = {
    id?: true
  }

  export type LineStatusSumAggregateInputType = {
    id?: true
  }

  export type LineStatusMinAggregateInputType = {
    id?: true
    line?: true
    is_installed?: true
    updated_by?: true
    updated_at?: true
  }

  export type LineStatusMaxAggregateInputType = {
    id?: true
    line?: true
    is_installed?: true
    updated_by?: true
    updated_at?: true
  }

  export type LineStatusCountAggregateInputType = {
    id?: true
    line?: true
    is_installed?: true
    updated_by?: true
    updated_at?: true
    _all?: true
  }

  export type LineStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LineStatus to aggregate.
     */
    where?: LineStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineStatuses to fetch.
     */
    orderBy?: LineStatusOrderByWithRelationInput | LineStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LineStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LineStatuses
    **/
    _count?: true | LineStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LineStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LineStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LineStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LineStatusMaxAggregateInputType
  }

  export type GetLineStatusAggregateType<T extends LineStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateLineStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLineStatus[P]>
      : GetScalarType<T[P], AggregateLineStatus[P]>
  }




  export type LineStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LineStatusWhereInput
    orderBy?: LineStatusOrderByWithAggregationInput | LineStatusOrderByWithAggregationInput[]
    by: LineStatusScalarFieldEnum[] | LineStatusScalarFieldEnum
    having?: LineStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LineStatusCountAggregateInputType | true
    _avg?: LineStatusAvgAggregateInputType
    _sum?: LineStatusSumAggregateInputType
    _min?: LineStatusMinAggregateInputType
    _max?: LineStatusMaxAggregateInputType
  }

  export type LineStatusGroupByOutputType = {
    id: number
    line: string
    is_installed: boolean
    updated_by: string | null
    updated_at: Date
    _count: LineStatusCountAggregateOutputType | null
    _avg: LineStatusAvgAggregateOutputType | null
    _sum: LineStatusSumAggregateOutputType | null
    _min: LineStatusMinAggregateOutputType | null
    _max: LineStatusMaxAggregateOutputType | null
  }

  type GetLineStatusGroupByPayload<T extends LineStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LineStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LineStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LineStatusGroupByOutputType[P]>
            : GetScalarType<T[P], LineStatusGroupByOutputType[P]>
        }
      >
    >


  export type LineStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    is_installed?: boolean
    updated_by?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["lineStatus"]>

  export type LineStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    is_installed?: boolean
    updated_by?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["lineStatus"]>

  export type LineStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    is_installed?: boolean
    updated_by?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["lineStatus"]>

  export type LineStatusSelectScalar = {
    id?: boolean
    line?: boolean
    is_installed?: boolean
    updated_by?: boolean
    updated_at?: boolean
  }

  export type LineStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "line" | "is_installed" | "updated_by" | "updated_at", ExtArgs["result"]["lineStatus"]>

  export type $LineStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LineStatus"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      line: string
      is_installed: boolean
      updated_by: string | null
      updated_at: Date
    }, ExtArgs["result"]["lineStatus"]>
    composites: {}
  }

  type LineStatusGetPayload<S extends boolean | null | undefined | LineStatusDefaultArgs> = $Result.GetResult<Prisma.$LineStatusPayload, S>

  type LineStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LineStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LineStatusCountAggregateInputType | true
    }

  export interface LineStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LineStatus'], meta: { name: 'LineStatus' } }
    /**
     * Find zero or one LineStatus that matches the filter.
     * @param {LineStatusFindUniqueArgs} args - Arguments to find a LineStatus
     * @example
     * // Get one LineStatus
     * const lineStatus = await prisma.lineStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LineStatusFindUniqueArgs>(args: SelectSubset<T, LineStatusFindUniqueArgs<ExtArgs>>): Prisma__LineStatusClient<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LineStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LineStatusFindUniqueOrThrowArgs} args - Arguments to find a LineStatus
     * @example
     * // Get one LineStatus
     * const lineStatus = await prisma.lineStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LineStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, LineStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LineStatusClient<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LineStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineStatusFindFirstArgs} args - Arguments to find a LineStatus
     * @example
     * // Get one LineStatus
     * const lineStatus = await prisma.lineStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LineStatusFindFirstArgs>(args?: SelectSubset<T, LineStatusFindFirstArgs<ExtArgs>>): Prisma__LineStatusClient<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LineStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineStatusFindFirstOrThrowArgs} args - Arguments to find a LineStatus
     * @example
     * // Get one LineStatus
     * const lineStatus = await prisma.lineStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LineStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, LineStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__LineStatusClient<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LineStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LineStatuses
     * const lineStatuses = await prisma.lineStatus.findMany()
     * 
     * // Get first 10 LineStatuses
     * const lineStatuses = await prisma.lineStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lineStatusWithIdOnly = await prisma.lineStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LineStatusFindManyArgs>(args?: SelectSubset<T, LineStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LineStatus.
     * @param {LineStatusCreateArgs} args - Arguments to create a LineStatus.
     * @example
     * // Create one LineStatus
     * const LineStatus = await prisma.lineStatus.create({
     *   data: {
     *     // ... data to create a LineStatus
     *   }
     * })
     * 
     */
    create<T extends LineStatusCreateArgs>(args: SelectSubset<T, LineStatusCreateArgs<ExtArgs>>): Prisma__LineStatusClient<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LineStatuses.
     * @param {LineStatusCreateManyArgs} args - Arguments to create many LineStatuses.
     * @example
     * // Create many LineStatuses
     * const lineStatus = await prisma.lineStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LineStatusCreateManyArgs>(args?: SelectSubset<T, LineStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LineStatuses and returns the data saved in the database.
     * @param {LineStatusCreateManyAndReturnArgs} args - Arguments to create many LineStatuses.
     * @example
     * // Create many LineStatuses
     * const lineStatus = await prisma.lineStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LineStatuses and only return the `id`
     * const lineStatusWithIdOnly = await prisma.lineStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LineStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, LineStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LineStatus.
     * @param {LineStatusDeleteArgs} args - Arguments to delete one LineStatus.
     * @example
     * // Delete one LineStatus
     * const LineStatus = await prisma.lineStatus.delete({
     *   where: {
     *     // ... filter to delete one LineStatus
     *   }
     * })
     * 
     */
    delete<T extends LineStatusDeleteArgs>(args: SelectSubset<T, LineStatusDeleteArgs<ExtArgs>>): Prisma__LineStatusClient<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LineStatus.
     * @param {LineStatusUpdateArgs} args - Arguments to update one LineStatus.
     * @example
     * // Update one LineStatus
     * const lineStatus = await prisma.lineStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LineStatusUpdateArgs>(args: SelectSubset<T, LineStatusUpdateArgs<ExtArgs>>): Prisma__LineStatusClient<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LineStatuses.
     * @param {LineStatusDeleteManyArgs} args - Arguments to filter LineStatuses to delete.
     * @example
     * // Delete a few LineStatuses
     * const { count } = await prisma.lineStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LineStatusDeleteManyArgs>(args?: SelectSubset<T, LineStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LineStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LineStatuses
     * const lineStatus = await prisma.lineStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LineStatusUpdateManyArgs>(args: SelectSubset<T, LineStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LineStatuses and returns the data updated in the database.
     * @param {LineStatusUpdateManyAndReturnArgs} args - Arguments to update many LineStatuses.
     * @example
     * // Update many LineStatuses
     * const lineStatus = await prisma.lineStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LineStatuses and only return the `id`
     * const lineStatusWithIdOnly = await prisma.lineStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LineStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, LineStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LineStatus.
     * @param {LineStatusUpsertArgs} args - Arguments to update or create a LineStatus.
     * @example
     * // Update or create a LineStatus
     * const lineStatus = await prisma.lineStatus.upsert({
     *   create: {
     *     // ... data to create a LineStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LineStatus we want to update
     *   }
     * })
     */
    upsert<T extends LineStatusUpsertArgs>(args: SelectSubset<T, LineStatusUpsertArgs<ExtArgs>>): Prisma__LineStatusClient<$Result.GetResult<Prisma.$LineStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LineStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineStatusCountArgs} args - Arguments to filter LineStatuses to count.
     * @example
     * // Count the number of LineStatuses
     * const count = await prisma.lineStatus.count({
     *   where: {
     *     // ... the filter for the LineStatuses we want to count
     *   }
     * })
    **/
    count<T extends LineStatusCountArgs>(
      args?: Subset<T, LineStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LineStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LineStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LineStatusAggregateArgs>(args: Subset<T, LineStatusAggregateArgs>): Prisma.PrismaPromise<GetLineStatusAggregateType<T>>

    /**
     * Group by LineStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LineStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LineStatusGroupByArgs['orderBy'] }
        : { orderBy?: LineStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LineStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLineStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LineStatus model
   */
  readonly fields: LineStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LineStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LineStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LineStatus model
   */
  interface LineStatusFieldRefs {
    readonly id: FieldRef<"LineStatus", 'Int'>
    readonly line: FieldRef<"LineStatus", 'String'>
    readonly is_installed: FieldRef<"LineStatus", 'Boolean'>
    readonly updated_by: FieldRef<"LineStatus", 'String'>
    readonly updated_at: FieldRef<"LineStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LineStatus findUnique
   */
  export type LineStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * Filter, which LineStatus to fetch.
     */
    where: LineStatusWhereUniqueInput
  }

  /**
   * LineStatus findUniqueOrThrow
   */
  export type LineStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * Filter, which LineStatus to fetch.
     */
    where: LineStatusWhereUniqueInput
  }

  /**
   * LineStatus findFirst
   */
  export type LineStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * Filter, which LineStatus to fetch.
     */
    where?: LineStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineStatuses to fetch.
     */
    orderBy?: LineStatusOrderByWithRelationInput | LineStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LineStatuses.
     */
    cursor?: LineStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LineStatuses.
     */
    distinct?: LineStatusScalarFieldEnum | LineStatusScalarFieldEnum[]
  }

  /**
   * LineStatus findFirstOrThrow
   */
  export type LineStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * Filter, which LineStatus to fetch.
     */
    where?: LineStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineStatuses to fetch.
     */
    orderBy?: LineStatusOrderByWithRelationInput | LineStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LineStatuses.
     */
    cursor?: LineStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LineStatuses.
     */
    distinct?: LineStatusScalarFieldEnum | LineStatusScalarFieldEnum[]
  }

  /**
   * LineStatus findMany
   */
  export type LineStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * Filter, which LineStatuses to fetch.
     */
    where?: LineStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineStatuses to fetch.
     */
    orderBy?: LineStatusOrderByWithRelationInput | LineStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LineStatuses.
     */
    cursor?: LineStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineStatuses.
     */
    skip?: number
    distinct?: LineStatusScalarFieldEnum | LineStatusScalarFieldEnum[]
  }

  /**
   * LineStatus create
   */
  export type LineStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * The data needed to create a LineStatus.
     */
    data: XOR<LineStatusCreateInput, LineStatusUncheckedCreateInput>
  }

  /**
   * LineStatus createMany
   */
  export type LineStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LineStatuses.
     */
    data: LineStatusCreateManyInput | LineStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LineStatus createManyAndReturn
   */
  export type LineStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * The data used to create many LineStatuses.
     */
    data: LineStatusCreateManyInput | LineStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LineStatus update
   */
  export type LineStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * The data needed to update a LineStatus.
     */
    data: XOR<LineStatusUpdateInput, LineStatusUncheckedUpdateInput>
    /**
     * Choose, which LineStatus to update.
     */
    where: LineStatusWhereUniqueInput
  }

  /**
   * LineStatus updateMany
   */
  export type LineStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LineStatuses.
     */
    data: XOR<LineStatusUpdateManyMutationInput, LineStatusUncheckedUpdateManyInput>
    /**
     * Filter which LineStatuses to update
     */
    where?: LineStatusWhereInput
    /**
     * Limit how many LineStatuses to update.
     */
    limit?: number
  }

  /**
   * LineStatus updateManyAndReturn
   */
  export type LineStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * The data used to update LineStatuses.
     */
    data: XOR<LineStatusUpdateManyMutationInput, LineStatusUncheckedUpdateManyInput>
    /**
     * Filter which LineStatuses to update
     */
    where?: LineStatusWhereInput
    /**
     * Limit how many LineStatuses to update.
     */
    limit?: number
  }

  /**
   * LineStatus upsert
   */
  export type LineStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * The filter to search for the LineStatus to update in case it exists.
     */
    where: LineStatusWhereUniqueInput
    /**
     * In case the LineStatus found by the `where` argument doesn't exist, create a new LineStatus with this data.
     */
    create: XOR<LineStatusCreateInput, LineStatusUncheckedCreateInput>
    /**
     * In case the LineStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LineStatusUpdateInput, LineStatusUncheckedUpdateInput>
  }

  /**
   * LineStatus delete
   */
  export type LineStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
    /**
     * Filter which LineStatus to delete.
     */
    where: LineStatusWhereUniqueInput
  }

  /**
   * LineStatus deleteMany
   */
  export type LineStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LineStatuses to delete
     */
    where?: LineStatusWhereInput
    /**
     * Limit how many LineStatuses to delete.
     */
    limit?: number
  }

  /**
   * LineStatus without action
   */
  export type LineStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineStatus
     */
    select?: LineStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineStatus
     */
    omit?: LineStatusOmit<ExtArgs> | null
  }


  /**
   * Model AoiChangeoverChecksheet
   */

  export type AggregateAoiChangeoverChecksheet = {
    _count: AoiChangeoverChecksheetCountAggregateOutputType | null
    _avg: AoiChangeoverChecksheetAvgAggregateOutputType | null
    _sum: AoiChangeoverChecksheetSumAggregateOutputType | null
    _min: AoiChangeoverChecksheetMinAggregateOutputType | null
    _max: AoiChangeoverChecksheetMaxAggregateOutputType | null
  }

  export type AoiChangeoverChecksheetAvgAggregateOutputType = {
    id: number | null
  }

  export type AoiChangeoverChecksheetSumAggregateOutputType = {
    id: number | null
  }

  export type AoiChangeoverChecksheetMinAggregateOutputType = {
    id: number | null
    line: string | null
    group_name: string | null
    date: Date | null
    shift: string | null
    model_name: string | null
    model_code: string | null
    changeover_type: string | null
    spi_steel_stencil_suffix_match: string | null
    spi_program_subpanel_serial_match: string | null
    spi_recheck_pcab_polarity: string | null
    spi_confirm_parameter_settings: string | null
    spi_read_barcode_on: string | null
    pre_aoi_eco_checklists: string | null
    pre_aoi_program_model_modify: string | null
    pre_aoi_vi_program_new_materia: string | null
    pre_aoi_limit_defective_alarm: string | null
    pre_aoi_test_program_bare_pcba: string | null
    pre_aoi_bot_program_serial_number: string | null
    pre_aoi_read_barcode_on: string | null
    pre_aoi_confirm_materials_mounted: string | null
    pre_aoi_delete_all_zones: string | null
    post_aoi_equipment_model: string | null
    post_aoi_eco_checklists: string | null
    post_aoi_program_model_modify: string | null
    post_aoi_recheck_chips_standard_models: string | null
    post_aoi_scan_board_picture: string | null
    post_aoi_limit_defective_alarm: string | null
    post_aoi_confirm_polarity_shield: string | null
    post_aoi_bot_program_serial_number: string | null
    post_aoi_registered_standard_models_times: string | null
    others_adjust_widths: string | null
    others_add_test_standard_pcb_barcode: string | null
    submitted_by: string | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AoiChangeoverChecksheetMaxAggregateOutputType = {
    id: number | null
    line: string | null
    group_name: string | null
    date: Date | null
    shift: string | null
    model_name: string | null
    model_code: string | null
    changeover_type: string | null
    spi_steel_stencil_suffix_match: string | null
    spi_program_subpanel_serial_match: string | null
    spi_recheck_pcab_polarity: string | null
    spi_confirm_parameter_settings: string | null
    spi_read_barcode_on: string | null
    pre_aoi_eco_checklists: string | null
    pre_aoi_program_model_modify: string | null
    pre_aoi_vi_program_new_materia: string | null
    pre_aoi_limit_defective_alarm: string | null
    pre_aoi_test_program_bare_pcba: string | null
    pre_aoi_bot_program_serial_number: string | null
    pre_aoi_read_barcode_on: string | null
    pre_aoi_confirm_materials_mounted: string | null
    pre_aoi_delete_all_zones: string | null
    post_aoi_equipment_model: string | null
    post_aoi_eco_checklists: string | null
    post_aoi_program_model_modify: string | null
    post_aoi_recheck_chips_standard_models: string | null
    post_aoi_scan_board_picture: string | null
    post_aoi_limit_defective_alarm: string | null
    post_aoi_confirm_polarity_shield: string | null
    post_aoi_bot_program_serial_number: string | null
    post_aoi_registered_standard_models_times: string | null
    others_adjust_widths: string | null
    others_add_test_standard_pcb_barcode: string | null
    submitted_by: string | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AoiChangeoverChecksheetCountAggregateOutputType = {
    id: number
    line: number
    group_name: number
    date: number
    shift: number
    model_name: number
    model_code: number
    changeover_type: number
    spi_steel_stencil_suffix_match: number
    spi_program_subpanel_serial_match: number
    spi_recheck_pcab_polarity: number
    spi_confirm_parameter_settings: number
    spi_read_barcode_on: number
    pre_aoi_eco_checklists: number
    pre_aoi_program_model_modify: number
    pre_aoi_vi_program_new_materia: number
    pre_aoi_limit_defective_alarm: number
    pre_aoi_test_program_bare_pcba: number
    pre_aoi_bot_program_serial_number: number
    pre_aoi_read_barcode_on: number
    pre_aoi_confirm_materials_mounted: number
    pre_aoi_delete_all_zones: number
    post_aoi_equipment_model: number
    post_aoi_eco_checklists: number
    post_aoi_program_model_modify: number
    post_aoi_recheck_chips_standard_models: number
    post_aoi_scan_board_picture: number
    post_aoi_limit_defective_alarm: number
    post_aoi_confirm_polarity_shield: number
    post_aoi_bot_program_serial_number: number
    post_aoi_registered_standard_models_times: number
    others_adjust_widths: number
    others_add_test_standard_pcb_barcode: number
    submitted_by: number
    status: number
    approval_status: number
    designated_engineer_id: number
    remarks: number
    engineer_remarks: number
    engineer_modified_fields: number
    original_technician_data: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AoiChangeoverChecksheetAvgAggregateInputType = {
    id?: true
  }

  export type AoiChangeoverChecksheetSumAggregateInputType = {
    id?: true
  }

  export type AoiChangeoverChecksheetMinAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    model_name?: true
    model_code?: true
    changeover_type?: true
    spi_steel_stencil_suffix_match?: true
    spi_program_subpanel_serial_match?: true
    spi_recheck_pcab_polarity?: true
    spi_confirm_parameter_settings?: true
    spi_read_barcode_on?: true
    pre_aoi_eco_checklists?: true
    pre_aoi_program_model_modify?: true
    pre_aoi_vi_program_new_materia?: true
    pre_aoi_limit_defective_alarm?: true
    pre_aoi_test_program_bare_pcba?: true
    pre_aoi_bot_program_serial_number?: true
    pre_aoi_read_barcode_on?: true
    pre_aoi_confirm_materials_mounted?: true
    pre_aoi_delete_all_zones?: true
    post_aoi_equipment_model?: true
    post_aoi_eco_checklists?: true
    post_aoi_program_model_modify?: true
    post_aoi_recheck_chips_standard_models?: true
    post_aoi_scan_board_picture?: true
    post_aoi_limit_defective_alarm?: true
    post_aoi_confirm_polarity_shield?: true
    post_aoi_bot_program_serial_number?: true
    post_aoi_registered_standard_models_times?: true
    others_adjust_widths?: true
    others_add_test_standard_pcb_barcode?: true
    submitted_by?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
  }

  export type AoiChangeoverChecksheetMaxAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    model_name?: true
    model_code?: true
    changeover_type?: true
    spi_steel_stencil_suffix_match?: true
    spi_program_subpanel_serial_match?: true
    spi_recheck_pcab_polarity?: true
    spi_confirm_parameter_settings?: true
    spi_read_barcode_on?: true
    pre_aoi_eco_checklists?: true
    pre_aoi_program_model_modify?: true
    pre_aoi_vi_program_new_materia?: true
    pre_aoi_limit_defective_alarm?: true
    pre_aoi_test_program_bare_pcba?: true
    pre_aoi_bot_program_serial_number?: true
    pre_aoi_read_barcode_on?: true
    pre_aoi_confirm_materials_mounted?: true
    pre_aoi_delete_all_zones?: true
    post_aoi_equipment_model?: true
    post_aoi_eco_checklists?: true
    post_aoi_program_model_modify?: true
    post_aoi_recheck_chips_standard_models?: true
    post_aoi_scan_board_picture?: true
    post_aoi_limit_defective_alarm?: true
    post_aoi_confirm_polarity_shield?: true
    post_aoi_bot_program_serial_number?: true
    post_aoi_registered_standard_models_times?: true
    others_adjust_widths?: true
    others_add_test_standard_pcb_barcode?: true
    submitted_by?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
  }

  export type AoiChangeoverChecksheetCountAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    date?: true
    shift?: true
    model_name?: true
    model_code?: true
    changeover_type?: true
    spi_steel_stencil_suffix_match?: true
    spi_program_subpanel_serial_match?: true
    spi_recheck_pcab_polarity?: true
    spi_confirm_parameter_settings?: true
    spi_read_barcode_on?: true
    pre_aoi_eco_checklists?: true
    pre_aoi_program_model_modify?: true
    pre_aoi_vi_program_new_materia?: true
    pre_aoi_limit_defective_alarm?: true
    pre_aoi_test_program_bare_pcba?: true
    pre_aoi_bot_program_serial_number?: true
    pre_aoi_read_barcode_on?: true
    pre_aoi_confirm_materials_mounted?: true
    pre_aoi_delete_all_zones?: true
    post_aoi_equipment_model?: true
    post_aoi_eco_checklists?: true
    post_aoi_program_model_modify?: true
    post_aoi_recheck_chips_standard_models?: true
    post_aoi_scan_board_picture?: true
    post_aoi_limit_defective_alarm?: true
    post_aoi_confirm_polarity_shield?: true
    post_aoi_bot_program_serial_number?: true
    post_aoi_registered_standard_models_times?: true
    others_adjust_widths?: true
    others_add_test_standard_pcb_barcode?: true
    submitted_by?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    remarks?: true
    engineer_remarks?: true
    engineer_modified_fields?: true
    original_technician_data?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AoiChangeoverChecksheetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AoiChangeoverChecksheet to aggregate.
     */
    where?: AoiChangeoverChecksheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiChangeoverChecksheets to fetch.
     */
    orderBy?: AoiChangeoverChecksheetOrderByWithRelationInput | AoiChangeoverChecksheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AoiChangeoverChecksheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiChangeoverChecksheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiChangeoverChecksheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AoiChangeoverChecksheets
    **/
    _count?: true | AoiChangeoverChecksheetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AoiChangeoverChecksheetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AoiChangeoverChecksheetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AoiChangeoverChecksheetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AoiChangeoverChecksheetMaxAggregateInputType
  }

  export type GetAoiChangeoverChecksheetAggregateType<T extends AoiChangeoverChecksheetAggregateArgs> = {
        [P in keyof T & keyof AggregateAoiChangeoverChecksheet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAoiChangeoverChecksheet[P]>
      : GetScalarType<T[P], AggregateAoiChangeoverChecksheet[P]>
  }




  export type AoiChangeoverChecksheetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AoiChangeoverChecksheetWhereInput
    orderBy?: AoiChangeoverChecksheetOrderByWithAggregationInput | AoiChangeoverChecksheetOrderByWithAggregationInput[]
    by: AoiChangeoverChecksheetScalarFieldEnum[] | AoiChangeoverChecksheetScalarFieldEnum
    having?: AoiChangeoverChecksheetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AoiChangeoverChecksheetCountAggregateInputType | true
    _avg?: AoiChangeoverChecksheetAvgAggregateInputType
    _sum?: AoiChangeoverChecksheetSumAggregateInputType
    _min?: AoiChangeoverChecksheetMinAggregateInputType
    _max?: AoiChangeoverChecksheetMaxAggregateInputType
  }

  export type AoiChangeoverChecksheetGroupByOutputType = {
    id: number
    line: string | null
    group_name: string | null
    date: Date
    shift: string
    model_name: string | null
    model_code: string | null
    changeover_type: string | null
    spi_steel_stencil_suffix_match: string | null
    spi_program_subpanel_serial_match: string | null
    spi_recheck_pcab_polarity: string | null
    spi_confirm_parameter_settings: string | null
    spi_read_barcode_on: string | null
    pre_aoi_eco_checklists: string | null
    pre_aoi_program_model_modify: string | null
    pre_aoi_vi_program_new_materia: string | null
    pre_aoi_limit_defective_alarm: string | null
    pre_aoi_test_program_bare_pcba: string | null
    pre_aoi_bot_program_serial_number: string | null
    pre_aoi_read_barcode_on: string | null
    pre_aoi_confirm_materials_mounted: string | null
    pre_aoi_delete_all_zones: string | null
    post_aoi_equipment_model: string | null
    post_aoi_eco_checklists: string | null
    post_aoi_program_model_modify: string | null
    post_aoi_recheck_chips_standard_models: string | null
    post_aoi_scan_board_picture: string | null
    post_aoi_limit_defective_alarm: string | null
    post_aoi_confirm_polarity_shield: string | null
    post_aoi_bot_program_serial_number: string | null
    post_aoi_registered_standard_models_times: string | null
    others_adjust_widths: string | null
    others_add_test_standard_pcb_barcode: string | null
    submitted_by: string | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    engineer_modified_fields: string | null
    original_technician_data: string | null
    created_at: Date
    updated_at: Date
    _count: AoiChangeoverChecksheetCountAggregateOutputType | null
    _avg: AoiChangeoverChecksheetAvgAggregateOutputType | null
    _sum: AoiChangeoverChecksheetSumAggregateOutputType | null
    _min: AoiChangeoverChecksheetMinAggregateOutputType | null
    _max: AoiChangeoverChecksheetMaxAggregateOutputType | null
  }

  type GetAoiChangeoverChecksheetGroupByPayload<T extends AoiChangeoverChecksheetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AoiChangeoverChecksheetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AoiChangeoverChecksheetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AoiChangeoverChecksheetGroupByOutputType[P]>
            : GetScalarType<T[P], AoiChangeoverChecksheetGroupByOutputType[P]>
        }
      >
    >


  export type AoiChangeoverChecksheetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    model_name?: boolean
    model_code?: boolean
    changeover_type?: boolean
    spi_steel_stencil_suffix_match?: boolean
    spi_program_subpanel_serial_match?: boolean
    spi_recheck_pcab_polarity?: boolean
    spi_confirm_parameter_settings?: boolean
    spi_read_barcode_on?: boolean
    pre_aoi_eco_checklists?: boolean
    pre_aoi_program_model_modify?: boolean
    pre_aoi_vi_program_new_materia?: boolean
    pre_aoi_limit_defective_alarm?: boolean
    pre_aoi_test_program_bare_pcba?: boolean
    pre_aoi_bot_program_serial_number?: boolean
    pre_aoi_read_barcode_on?: boolean
    pre_aoi_confirm_materials_mounted?: boolean
    pre_aoi_delete_all_zones?: boolean
    post_aoi_equipment_model?: boolean
    post_aoi_eco_checklists?: boolean
    post_aoi_program_model_modify?: boolean
    post_aoi_recheck_chips_standard_models?: boolean
    post_aoi_scan_board_picture?: boolean
    post_aoi_limit_defective_alarm?: boolean
    post_aoi_confirm_polarity_shield?: boolean
    post_aoi_bot_program_serial_number?: boolean
    post_aoi_registered_standard_models_times?: boolean
    others_adjust_widths?: boolean
    others_add_test_standard_pcb_barcode?: boolean
    submitted_by?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiChangeoverChecksheet"]>

  export type AoiChangeoverChecksheetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    model_name?: boolean
    model_code?: boolean
    changeover_type?: boolean
    spi_steel_stencil_suffix_match?: boolean
    spi_program_subpanel_serial_match?: boolean
    spi_recheck_pcab_polarity?: boolean
    spi_confirm_parameter_settings?: boolean
    spi_read_barcode_on?: boolean
    pre_aoi_eco_checklists?: boolean
    pre_aoi_program_model_modify?: boolean
    pre_aoi_vi_program_new_materia?: boolean
    pre_aoi_limit_defective_alarm?: boolean
    pre_aoi_test_program_bare_pcba?: boolean
    pre_aoi_bot_program_serial_number?: boolean
    pre_aoi_read_barcode_on?: boolean
    pre_aoi_confirm_materials_mounted?: boolean
    pre_aoi_delete_all_zones?: boolean
    post_aoi_equipment_model?: boolean
    post_aoi_eco_checklists?: boolean
    post_aoi_program_model_modify?: boolean
    post_aoi_recheck_chips_standard_models?: boolean
    post_aoi_scan_board_picture?: boolean
    post_aoi_limit_defective_alarm?: boolean
    post_aoi_confirm_polarity_shield?: boolean
    post_aoi_bot_program_serial_number?: boolean
    post_aoi_registered_standard_models_times?: boolean
    others_adjust_widths?: boolean
    others_add_test_standard_pcb_barcode?: boolean
    submitted_by?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiChangeoverChecksheet"]>

  export type AoiChangeoverChecksheetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    model_name?: boolean
    model_code?: boolean
    changeover_type?: boolean
    spi_steel_stencil_suffix_match?: boolean
    spi_program_subpanel_serial_match?: boolean
    spi_recheck_pcab_polarity?: boolean
    spi_confirm_parameter_settings?: boolean
    spi_read_barcode_on?: boolean
    pre_aoi_eco_checklists?: boolean
    pre_aoi_program_model_modify?: boolean
    pre_aoi_vi_program_new_materia?: boolean
    pre_aoi_limit_defective_alarm?: boolean
    pre_aoi_test_program_bare_pcba?: boolean
    pre_aoi_bot_program_serial_number?: boolean
    pre_aoi_read_barcode_on?: boolean
    pre_aoi_confirm_materials_mounted?: boolean
    pre_aoi_delete_all_zones?: boolean
    post_aoi_equipment_model?: boolean
    post_aoi_eco_checklists?: boolean
    post_aoi_program_model_modify?: boolean
    post_aoi_recheck_chips_standard_models?: boolean
    post_aoi_scan_board_picture?: boolean
    post_aoi_limit_defective_alarm?: boolean
    post_aoi_confirm_polarity_shield?: boolean
    post_aoi_bot_program_serial_number?: boolean
    post_aoi_registered_standard_models_times?: boolean
    others_adjust_widths?: boolean
    others_add_test_standard_pcb_barcode?: boolean
    submitted_by?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aoiChangeoverChecksheet"]>

  export type AoiChangeoverChecksheetSelectScalar = {
    id?: boolean
    line?: boolean
    group_name?: boolean
    date?: boolean
    shift?: boolean
    model_name?: boolean
    model_code?: boolean
    changeover_type?: boolean
    spi_steel_stencil_suffix_match?: boolean
    spi_program_subpanel_serial_match?: boolean
    spi_recheck_pcab_polarity?: boolean
    spi_confirm_parameter_settings?: boolean
    spi_read_barcode_on?: boolean
    pre_aoi_eco_checklists?: boolean
    pre_aoi_program_model_modify?: boolean
    pre_aoi_vi_program_new_materia?: boolean
    pre_aoi_limit_defective_alarm?: boolean
    pre_aoi_test_program_bare_pcba?: boolean
    pre_aoi_bot_program_serial_number?: boolean
    pre_aoi_read_barcode_on?: boolean
    pre_aoi_confirm_materials_mounted?: boolean
    pre_aoi_delete_all_zones?: boolean
    post_aoi_equipment_model?: boolean
    post_aoi_eco_checklists?: boolean
    post_aoi_program_model_modify?: boolean
    post_aoi_recheck_chips_standard_models?: boolean
    post_aoi_scan_board_picture?: boolean
    post_aoi_limit_defective_alarm?: boolean
    post_aoi_confirm_polarity_shield?: boolean
    post_aoi_bot_program_serial_number?: boolean
    post_aoi_registered_standard_models_times?: boolean
    others_adjust_widths?: boolean
    others_add_test_standard_pcb_barcode?: boolean
    submitted_by?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    engineer_modified_fields?: boolean
    original_technician_data?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AoiChangeoverChecksheetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "line" | "group_name" | "date" | "shift" | "model_name" | "model_code" | "changeover_type" | "spi_steel_stencil_suffix_match" | "spi_program_subpanel_serial_match" | "spi_recheck_pcab_polarity" | "spi_confirm_parameter_settings" | "spi_read_barcode_on" | "pre_aoi_eco_checklists" | "pre_aoi_program_model_modify" | "pre_aoi_vi_program_new_materia" | "pre_aoi_limit_defective_alarm" | "pre_aoi_test_program_bare_pcba" | "pre_aoi_bot_program_serial_number" | "pre_aoi_read_barcode_on" | "pre_aoi_confirm_materials_mounted" | "pre_aoi_delete_all_zones" | "post_aoi_equipment_model" | "post_aoi_eco_checklists" | "post_aoi_program_model_modify" | "post_aoi_recheck_chips_standard_models" | "post_aoi_scan_board_picture" | "post_aoi_limit_defective_alarm" | "post_aoi_confirm_polarity_shield" | "post_aoi_bot_program_serial_number" | "post_aoi_registered_standard_models_times" | "others_adjust_widths" | "others_add_test_standard_pcb_barcode" | "submitted_by" | "status" | "approval_status" | "designated_engineer_id" | "remarks" | "engineer_remarks" | "engineer_modified_fields" | "original_technician_data" | "created_at" | "updated_at", ExtArgs["result"]["aoiChangeoverChecksheet"]>

  export type $AoiChangeoverChecksheetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AoiChangeoverChecksheet"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      line: string | null
      group_name: string | null
      date: Date
      shift: string
      model_name: string | null
      model_code: string | null
      changeover_type: string | null
      spi_steel_stencil_suffix_match: string | null
      spi_program_subpanel_serial_match: string | null
      spi_recheck_pcab_polarity: string | null
      spi_confirm_parameter_settings: string | null
      spi_read_barcode_on: string | null
      pre_aoi_eco_checklists: string | null
      pre_aoi_program_model_modify: string | null
      pre_aoi_vi_program_new_materia: string | null
      pre_aoi_limit_defective_alarm: string | null
      pre_aoi_test_program_bare_pcba: string | null
      pre_aoi_bot_program_serial_number: string | null
      pre_aoi_read_barcode_on: string | null
      pre_aoi_confirm_materials_mounted: string | null
      pre_aoi_delete_all_zones: string | null
      post_aoi_equipment_model: string | null
      post_aoi_eco_checklists: string | null
      post_aoi_program_model_modify: string | null
      post_aoi_recheck_chips_standard_models: string | null
      post_aoi_scan_board_picture: string | null
      post_aoi_limit_defective_alarm: string | null
      post_aoi_confirm_polarity_shield: string | null
      post_aoi_bot_program_serial_number: string | null
      post_aoi_registered_standard_models_times: string | null
      others_adjust_widths: string | null
      others_add_test_standard_pcb_barcode: string | null
      submitted_by: string | null
      status: string | null
      approval_status: string | null
      designated_engineer_id: string | null
      remarks: string | null
      engineer_remarks: string | null
      engineer_modified_fields: string | null
      original_technician_data: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["aoiChangeoverChecksheet"]>
    composites: {}
  }

  type AoiChangeoverChecksheetGetPayload<S extends boolean | null | undefined | AoiChangeoverChecksheetDefaultArgs> = $Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload, S>

  type AoiChangeoverChecksheetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AoiChangeoverChecksheetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AoiChangeoverChecksheetCountAggregateInputType | true
    }

  export interface AoiChangeoverChecksheetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AoiChangeoverChecksheet'], meta: { name: 'AoiChangeoverChecksheet' } }
    /**
     * Find zero or one AoiChangeoverChecksheet that matches the filter.
     * @param {AoiChangeoverChecksheetFindUniqueArgs} args - Arguments to find a AoiChangeoverChecksheet
     * @example
     * // Get one AoiChangeoverChecksheet
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AoiChangeoverChecksheetFindUniqueArgs>(args: SelectSubset<T, AoiChangeoverChecksheetFindUniqueArgs<ExtArgs>>): Prisma__AoiChangeoverChecksheetClient<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AoiChangeoverChecksheet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AoiChangeoverChecksheetFindUniqueOrThrowArgs} args - Arguments to find a AoiChangeoverChecksheet
     * @example
     * // Get one AoiChangeoverChecksheet
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AoiChangeoverChecksheetFindUniqueOrThrowArgs>(args: SelectSubset<T, AoiChangeoverChecksheetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AoiChangeoverChecksheetClient<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AoiChangeoverChecksheet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiChangeoverChecksheetFindFirstArgs} args - Arguments to find a AoiChangeoverChecksheet
     * @example
     * // Get one AoiChangeoverChecksheet
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AoiChangeoverChecksheetFindFirstArgs>(args?: SelectSubset<T, AoiChangeoverChecksheetFindFirstArgs<ExtArgs>>): Prisma__AoiChangeoverChecksheetClient<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AoiChangeoverChecksheet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiChangeoverChecksheetFindFirstOrThrowArgs} args - Arguments to find a AoiChangeoverChecksheet
     * @example
     * // Get one AoiChangeoverChecksheet
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AoiChangeoverChecksheetFindFirstOrThrowArgs>(args?: SelectSubset<T, AoiChangeoverChecksheetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AoiChangeoverChecksheetClient<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AoiChangeoverChecksheets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiChangeoverChecksheetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AoiChangeoverChecksheets
     * const aoiChangeoverChecksheets = await prisma.aoiChangeoverChecksheet.findMany()
     * 
     * // Get first 10 AoiChangeoverChecksheets
     * const aoiChangeoverChecksheets = await prisma.aoiChangeoverChecksheet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aoiChangeoverChecksheetWithIdOnly = await prisma.aoiChangeoverChecksheet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AoiChangeoverChecksheetFindManyArgs>(args?: SelectSubset<T, AoiChangeoverChecksheetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AoiChangeoverChecksheet.
     * @param {AoiChangeoverChecksheetCreateArgs} args - Arguments to create a AoiChangeoverChecksheet.
     * @example
     * // Create one AoiChangeoverChecksheet
     * const AoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.create({
     *   data: {
     *     // ... data to create a AoiChangeoverChecksheet
     *   }
     * })
     * 
     */
    create<T extends AoiChangeoverChecksheetCreateArgs>(args: SelectSubset<T, AoiChangeoverChecksheetCreateArgs<ExtArgs>>): Prisma__AoiChangeoverChecksheetClient<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AoiChangeoverChecksheets.
     * @param {AoiChangeoverChecksheetCreateManyArgs} args - Arguments to create many AoiChangeoverChecksheets.
     * @example
     * // Create many AoiChangeoverChecksheets
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AoiChangeoverChecksheetCreateManyArgs>(args?: SelectSubset<T, AoiChangeoverChecksheetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AoiChangeoverChecksheets and returns the data saved in the database.
     * @param {AoiChangeoverChecksheetCreateManyAndReturnArgs} args - Arguments to create many AoiChangeoverChecksheets.
     * @example
     * // Create many AoiChangeoverChecksheets
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AoiChangeoverChecksheets and only return the `id`
     * const aoiChangeoverChecksheetWithIdOnly = await prisma.aoiChangeoverChecksheet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AoiChangeoverChecksheetCreateManyAndReturnArgs>(args?: SelectSubset<T, AoiChangeoverChecksheetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AoiChangeoverChecksheet.
     * @param {AoiChangeoverChecksheetDeleteArgs} args - Arguments to delete one AoiChangeoverChecksheet.
     * @example
     * // Delete one AoiChangeoverChecksheet
     * const AoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.delete({
     *   where: {
     *     // ... filter to delete one AoiChangeoverChecksheet
     *   }
     * })
     * 
     */
    delete<T extends AoiChangeoverChecksheetDeleteArgs>(args: SelectSubset<T, AoiChangeoverChecksheetDeleteArgs<ExtArgs>>): Prisma__AoiChangeoverChecksheetClient<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AoiChangeoverChecksheet.
     * @param {AoiChangeoverChecksheetUpdateArgs} args - Arguments to update one AoiChangeoverChecksheet.
     * @example
     * // Update one AoiChangeoverChecksheet
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AoiChangeoverChecksheetUpdateArgs>(args: SelectSubset<T, AoiChangeoverChecksheetUpdateArgs<ExtArgs>>): Prisma__AoiChangeoverChecksheetClient<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AoiChangeoverChecksheets.
     * @param {AoiChangeoverChecksheetDeleteManyArgs} args - Arguments to filter AoiChangeoverChecksheets to delete.
     * @example
     * // Delete a few AoiChangeoverChecksheets
     * const { count } = await prisma.aoiChangeoverChecksheet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AoiChangeoverChecksheetDeleteManyArgs>(args?: SelectSubset<T, AoiChangeoverChecksheetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AoiChangeoverChecksheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiChangeoverChecksheetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AoiChangeoverChecksheets
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AoiChangeoverChecksheetUpdateManyArgs>(args: SelectSubset<T, AoiChangeoverChecksheetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AoiChangeoverChecksheets and returns the data updated in the database.
     * @param {AoiChangeoverChecksheetUpdateManyAndReturnArgs} args - Arguments to update many AoiChangeoverChecksheets.
     * @example
     * // Update many AoiChangeoverChecksheets
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AoiChangeoverChecksheets and only return the `id`
     * const aoiChangeoverChecksheetWithIdOnly = await prisma.aoiChangeoverChecksheet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AoiChangeoverChecksheetUpdateManyAndReturnArgs>(args: SelectSubset<T, AoiChangeoverChecksheetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AoiChangeoverChecksheet.
     * @param {AoiChangeoverChecksheetUpsertArgs} args - Arguments to update or create a AoiChangeoverChecksheet.
     * @example
     * // Update or create a AoiChangeoverChecksheet
     * const aoiChangeoverChecksheet = await prisma.aoiChangeoverChecksheet.upsert({
     *   create: {
     *     // ... data to create a AoiChangeoverChecksheet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AoiChangeoverChecksheet we want to update
     *   }
     * })
     */
    upsert<T extends AoiChangeoverChecksheetUpsertArgs>(args: SelectSubset<T, AoiChangeoverChecksheetUpsertArgs<ExtArgs>>): Prisma__AoiChangeoverChecksheetClient<$Result.GetResult<Prisma.$AoiChangeoverChecksheetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AoiChangeoverChecksheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiChangeoverChecksheetCountArgs} args - Arguments to filter AoiChangeoverChecksheets to count.
     * @example
     * // Count the number of AoiChangeoverChecksheets
     * const count = await prisma.aoiChangeoverChecksheet.count({
     *   where: {
     *     // ... the filter for the AoiChangeoverChecksheets we want to count
     *   }
     * })
    **/
    count<T extends AoiChangeoverChecksheetCountArgs>(
      args?: Subset<T, AoiChangeoverChecksheetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AoiChangeoverChecksheetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AoiChangeoverChecksheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiChangeoverChecksheetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AoiChangeoverChecksheetAggregateArgs>(args: Subset<T, AoiChangeoverChecksheetAggregateArgs>): Prisma.PrismaPromise<GetAoiChangeoverChecksheetAggregateType<T>>

    /**
     * Group by AoiChangeoverChecksheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AoiChangeoverChecksheetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AoiChangeoverChecksheetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AoiChangeoverChecksheetGroupByArgs['orderBy'] }
        : { orderBy?: AoiChangeoverChecksheetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AoiChangeoverChecksheetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAoiChangeoverChecksheetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AoiChangeoverChecksheet model
   */
  readonly fields: AoiChangeoverChecksheetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AoiChangeoverChecksheet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AoiChangeoverChecksheetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AoiChangeoverChecksheet model
   */
  interface AoiChangeoverChecksheetFieldRefs {
    readonly id: FieldRef<"AoiChangeoverChecksheet", 'Int'>
    readonly line: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly group_name: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly date: FieldRef<"AoiChangeoverChecksheet", 'DateTime'>
    readonly shift: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly model_name: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly model_code: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly changeover_type: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly spi_steel_stencil_suffix_match: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly spi_program_subpanel_serial_match: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly spi_recheck_pcab_polarity: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly spi_confirm_parameter_settings: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly spi_read_barcode_on: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_eco_checklists: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_program_model_modify: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_vi_program_new_materia: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_limit_defective_alarm: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_test_program_bare_pcba: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_bot_program_serial_number: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_read_barcode_on: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_confirm_materials_mounted: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly pre_aoi_delete_all_zones: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_equipment_model: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_eco_checklists: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_program_model_modify: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_recheck_chips_standard_models: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_scan_board_picture: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_limit_defective_alarm: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_confirm_polarity_shield: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_bot_program_serial_number: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly post_aoi_registered_standard_models_times: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly others_adjust_widths: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly others_add_test_standard_pcb_barcode: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly submitted_by: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly status: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly approval_status: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly designated_engineer_id: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly remarks: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly engineer_remarks: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly engineer_modified_fields: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly original_technician_data: FieldRef<"AoiChangeoverChecksheet", 'String'>
    readonly created_at: FieldRef<"AoiChangeoverChecksheet", 'DateTime'>
    readonly updated_at: FieldRef<"AoiChangeoverChecksheet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AoiChangeoverChecksheet findUnique
   */
  export type AoiChangeoverChecksheetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which AoiChangeoverChecksheet to fetch.
     */
    where: AoiChangeoverChecksheetWhereUniqueInput
  }

  /**
   * AoiChangeoverChecksheet findUniqueOrThrow
   */
  export type AoiChangeoverChecksheetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which AoiChangeoverChecksheet to fetch.
     */
    where: AoiChangeoverChecksheetWhereUniqueInput
  }

  /**
   * AoiChangeoverChecksheet findFirst
   */
  export type AoiChangeoverChecksheetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which AoiChangeoverChecksheet to fetch.
     */
    where?: AoiChangeoverChecksheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiChangeoverChecksheets to fetch.
     */
    orderBy?: AoiChangeoverChecksheetOrderByWithRelationInput | AoiChangeoverChecksheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AoiChangeoverChecksheets.
     */
    cursor?: AoiChangeoverChecksheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiChangeoverChecksheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiChangeoverChecksheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AoiChangeoverChecksheets.
     */
    distinct?: AoiChangeoverChecksheetScalarFieldEnum | AoiChangeoverChecksheetScalarFieldEnum[]
  }

  /**
   * AoiChangeoverChecksheet findFirstOrThrow
   */
  export type AoiChangeoverChecksheetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which AoiChangeoverChecksheet to fetch.
     */
    where?: AoiChangeoverChecksheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiChangeoverChecksheets to fetch.
     */
    orderBy?: AoiChangeoverChecksheetOrderByWithRelationInput | AoiChangeoverChecksheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AoiChangeoverChecksheets.
     */
    cursor?: AoiChangeoverChecksheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiChangeoverChecksheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiChangeoverChecksheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AoiChangeoverChecksheets.
     */
    distinct?: AoiChangeoverChecksheetScalarFieldEnum | AoiChangeoverChecksheetScalarFieldEnum[]
  }

  /**
   * AoiChangeoverChecksheet findMany
   */
  export type AoiChangeoverChecksheetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which AoiChangeoverChecksheets to fetch.
     */
    where?: AoiChangeoverChecksheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AoiChangeoverChecksheets to fetch.
     */
    orderBy?: AoiChangeoverChecksheetOrderByWithRelationInput | AoiChangeoverChecksheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AoiChangeoverChecksheets.
     */
    cursor?: AoiChangeoverChecksheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AoiChangeoverChecksheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AoiChangeoverChecksheets.
     */
    skip?: number
    distinct?: AoiChangeoverChecksheetScalarFieldEnum | AoiChangeoverChecksheetScalarFieldEnum[]
  }

  /**
   * AoiChangeoverChecksheet create
   */
  export type AoiChangeoverChecksheetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The data needed to create a AoiChangeoverChecksheet.
     */
    data: XOR<AoiChangeoverChecksheetCreateInput, AoiChangeoverChecksheetUncheckedCreateInput>
  }

  /**
   * AoiChangeoverChecksheet createMany
   */
  export type AoiChangeoverChecksheetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AoiChangeoverChecksheets.
     */
    data: AoiChangeoverChecksheetCreateManyInput | AoiChangeoverChecksheetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AoiChangeoverChecksheet createManyAndReturn
   */
  export type AoiChangeoverChecksheetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The data used to create many AoiChangeoverChecksheets.
     */
    data: AoiChangeoverChecksheetCreateManyInput | AoiChangeoverChecksheetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AoiChangeoverChecksheet update
   */
  export type AoiChangeoverChecksheetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The data needed to update a AoiChangeoverChecksheet.
     */
    data: XOR<AoiChangeoverChecksheetUpdateInput, AoiChangeoverChecksheetUncheckedUpdateInput>
    /**
     * Choose, which AoiChangeoverChecksheet to update.
     */
    where: AoiChangeoverChecksheetWhereUniqueInput
  }

  /**
   * AoiChangeoverChecksheet updateMany
   */
  export type AoiChangeoverChecksheetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AoiChangeoverChecksheets.
     */
    data: XOR<AoiChangeoverChecksheetUpdateManyMutationInput, AoiChangeoverChecksheetUncheckedUpdateManyInput>
    /**
     * Filter which AoiChangeoverChecksheets to update
     */
    where?: AoiChangeoverChecksheetWhereInput
    /**
     * Limit how many AoiChangeoverChecksheets to update.
     */
    limit?: number
  }

  /**
   * AoiChangeoverChecksheet updateManyAndReturn
   */
  export type AoiChangeoverChecksheetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The data used to update AoiChangeoverChecksheets.
     */
    data: XOR<AoiChangeoverChecksheetUpdateManyMutationInput, AoiChangeoverChecksheetUncheckedUpdateManyInput>
    /**
     * Filter which AoiChangeoverChecksheets to update
     */
    where?: AoiChangeoverChecksheetWhereInput
    /**
     * Limit how many AoiChangeoverChecksheets to update.
     */
    limit?: number
  }

  /**
   * AoiChangeoverChecksheet upsert
   */
  export type AoiChangeoverChecksheetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The filter to search for the AoiChangeoverChecksheet to update in case it exists.
     */
    where: AoiChangeoverChecksheetWhereUniqueInput
    /**
     * In case the AoiChangeoverChecksheet found by the `where` argument doesn't exist, create a new AoiChangeoverChecksheet with this data.
     */
    create: XOR<AoiChangeoverChecksheetCreateInput, AoiChangeoverChecksheetUncheckedCreateInput>
    /**
     * In case the AoiChangeoverChecksheet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AoiChangeoverChecksheetUpdateInput, AoiChangeoverChecksheetUncheckedUpdateInput>
  }

  /**
   * AoiChangeoverChecksheet delete
   */
  export type AoiChangeoverChecksheetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter which AoiChangeoverChecksheet to delete.
     */
    where: AoiChangeoverChecksheetWhereUniqueInput
  }

  /**
   * AoiChangeoverChecksheet deleteMany
   */
  export type AoiChangeoverChecksheetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AoiChangeoverChecksheets to delete
     */
    where?: AoiChangeoverChecksheetWhereInput
    /**
     * Limit how many AoiChangeoverChecksheets to delete.
     */
    limit?: number
  }

  /**
   * AoiChangeoverChecksheet without action
   */
  export type AoiChangeoverChecksheetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AoiChangeoverChecksheet
     */
    select?: AoiChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AoiChangeoverChecksheet
     */
    omit?: AoiChangeoverChecksheetOmit<ExtArgs> | null
  }


  /**
   * Model LaserChangeoverChecksheet
   */

  export type AggregateLaserChangeoverChecksheet = {
    _count: LaserChangeoverChecksheetCountAggregateOutputType | null
    _avg: LaserChangeoverChecksheetAvgAggregateOutputType | null
    _sum: LaserChangeoverChecksheetSumAggregateOutputType | null
    _min: LaserChangeoverChecksheetMinAggregateOutputType | null
    _max: LaserChangeoverChecksheetMaxAggregateOutputType | null
  }

  export type LaserChangeoverChecksheetAvgAggregateOutputType = {
    id: number | null
  }

  export type LaserChangeoverChecksheetSumAggregateOutputType = {
    id: number | null
  }

  export type LaserChangeoverChecksheetMinAggregateOutputType = {
    id: number | null
    line: string | null
    group_name: string | null
    program_name: string | null
    date: Date | null
    shift: string | null
    prog_name_check: boolean | null
    laser_param_check: boolean | null
    duplicate_code_check: boolean | null
    pcb_anti_reverse_check: boolean | null
    ab_barcode_check: boolean | null
    laser_sequence_check: boolean | null
    laser_position_check: boolean | null
    grp_ldr_prog_name_check: boolean | null
    grp_ldr_laser_position_check: boolean | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    designated_group_leader_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    pd_remarks: string | null
    submitted_by: string | null
    engineer_signature: string | null
    group_leader_signature: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LaserChangeoverChecksheetMaxAggregateOutputType = {
    id: number | null
    line: string | null
    group_name: string | null
    program_name: string | null
    date: Date | null
    shift: string | null
    prog_name_check: boolean | null
    laser_param_check: boolean | null
    duplicate_code_check: boolean | null
    pcb_anti_reverse_check: boolean | null
    ab_barcode_check: boolean | null
    laser_sequence_check: boolean | null
    laser_position_check: boolean | null
    grp_ldr_prog_name_check: boolean | null
    grp_ldr_laser_position_check: boolean | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    designated_group_leader_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    pd_remarks: string | null
    submitted_by: string | null
    engineer_signature: string | null
    group_leader_signature: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LaserChangeoverChecksheetCountAggregateOutputType = {
    id: number
    line: number
    group_name: number
    program_name: number
    date: number
    shift: number
    prog_name_check: number
    laser_param_check: number
    duplicate_code_check: number
    pcb_anti_reverse_check: number
    ab_barcode_check: number
    laser_sequence_check: number
    laser_position_check: number
    grp_ldr_prog_name_check: number
    grp_ldr_laser_position_check: number
    status: number
    approval_status: number
    designated_engineer_id: number
    designated_group_leader_id: number
    remarks: number
    engineer_remarks: number
    pd_remarks: number
    submitted_by: number
    engineer_signature: number
    group_leader_signature: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LaserChangeoverChecksheetAvgAggregateInputType = {
    id?: true
  }

  export type LaserChangeoverChecksheetSumAggregateInputType = {
    id?: true
  }

  export type LaserChangeoverChecksheetMinAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    program_name?: true
    date?: true
    shift?: true
    prog_name_check?: true
    laser_param_check?: true
    duplicate_code_check?: true
    pcb_anti_reverse_check?: true
    ab_barcode_check?: true
    laser_sequence_check?: true
    laser_position_check?: true
    grp_ldr_prog_name_check?: true
    grp_ldr_laser_position_check?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    designated_group_leader_id?: true
    remarks?: true
    engineer_remarks?: true
    pd_remarks?: true
    submitted_by?: true
    engineer_signature?: true
    group_leader_signature?: true
    created_at?: true
    updated_at?: true
  }

  export type LaserChangeoverChecksheetMaxAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    program_name?: true
    date?: true
    shift?: true
    prog_name_check?: true
    laser_param_check?: true
    duplicate_code_check?: true
    pcb_anti_reverse_check?: true
    ab_barcode_check?: true
    laser_sequence_check?: true
    laser_position_check?: true
    grp_ldr_prog_name_check?: true
    grp_ldr_laser_position_check?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    designated_group_leader_id?: true
    remarks?: true
    engineer_remarks?: true
    pd_remarks?: true
    submitted_by?: true
    engineer_signature?: true
    group_leader_signature?: true
    created_at?: true
    updated_at?: true
  }

  export type LaserChangeoverChecksheetCountAggregateInputType = {
    id?: true
    line?: true
    group_name?: true
    program_name?: true
    date?: true
    shift?: true
    prog_name_check?: true
    laser_param_check?: true
    duplicate_code_check?: true
    pcb_anti_reverse_check?: true
    ab_barcode_check?: true
    laser_sequence_check?: true
    laser_position_check?: true
    grp_ldr_prog_name_check?: true
    grp_ldr_laser_position_check?: true
    status?: true
    approval_status?: true
    designated_engineer_id?: true
    designated_group_leader_id?: true
    remarks?: true
    engineer_remarks?: true
    pd_remarks?: true
    submitted_by?: true
    engineer_signature?: true
    group_leader_signature?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LaserChangeoverChecksheetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaserChangeoverChecksheet to aggregate.
     */
    where?: LaserChangeoverChecksheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaserChangeoverChecksheets to fetch.
     */
    orderBy?: LaserChangeoverChecksheetOrderByWithRelationInput | LaserChangeoverChecksheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LaserChangeoverChecksheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaserChangeoverChecksheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaserChangeoverChecksheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LaserChangeoverChecksheets
    **/
    _count?: true | LaserChangeoverChecksheetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LaserChangeoverChecksheetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LaserChangeoverChecksheetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LaserChangeoverChecksheetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LaserChangeoverChecksheetMaxAggregateInputType
  }

  export type GetLaserChangeoverChecksheetAggregateType<T extends LaserChangeoverChecksheetAggregateArgs> = {
        [P in keyof T & keyof AggregateLaserChangeoverChecksheet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLaserChangeoverChecksheet[P]>
      : GetScalarType<T[P], AggregateLaserChangeoverChecksheet[P]>
  }




  export type LaserChangeoverChecksheetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaserChangeoverChecksheetWhereInput
    orderBy?: LaserChangeoverChecksheetOrderByWithAggregationInput | LaserChangeoverChecksheetOrderByWithAggregationInput[]
    by: LaserChangeoverChecksheetScalarFieldEnum[] | LaserChangeoverChecksheetScalarFieldEnum
    having?: LaserChangeoverChecksheetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LaserChangeoverChecksheetCountAggregateInputType | true
    _avg?: LaserChangeoverChecksheetAvgAggregateInputType
    _sum?: LaserChangeoverChecksheetSumAggregateInputType
    _min?: LaserChangeoverChecksheetMinAggregateInputType
    _max?: LaserChangeoverChecksheetMaxAggregateInputType
  }

  export type LaserChangeoverChecksheetGroupByOutputType = {
    id: number
    line: string | null
    group_name: string | null
    program_name: string | null
    date: Date
    shift: string
    prog_name_check: boolean | null
    laser_param_check: boolean | null
    duplicate_code_check: boolean | null
    pcb_anti_reverse_check: boolean | null
    ab_barcode_check: boolean | null
    laser_sequence_check: boolean | null
    laser_position_check: boolean | null
    grp_ldr_prog_name_check: boolean | null
    grp_ldr_laser_position_check: boolean | null
    status: string | null
    approval_status: string | null
    designated_engineer_id: string | null
    designated_group_leader_id: string | null
    remarks: string | null
    engineer_remarks: string | null
    pd_remarks: string | null
    submitted_by: string | null
    engineer_signature: string | null
    group_leader_signature: string | null
    created_at: Date
    updated_at: Date
    _count: LaserChangeoverChecksheetCountAggregateOutputType | null
    _avg: LaserChangeoverChecksheetAvgAggregateOutputType | null
    _sum: LaserChangeoverChecksheetSumAggregateOutputType | null
    _min: LaserChangeoverChecksheetMinAggregateOutputType | null
    _max: LaserChangeoverChecksheetMaxAggregateOutputType | null
  }

  type GetLaserChangeoverChecksheetGroupByPayload<T extends LaserChangeoverChecksheetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LaserChangeoverChecksheetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LaserChangeoverChecksheetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LaserChangeoverChecksheetGroupByOutputType[P]>
            : GetScalarType<T[P], LaserChangeoverChecksheetGroupByOutputType[P]>
        }
      >
    >


  export type LaserChangeoverChecksheetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    program_name?: boolean
    date?: boolean
    shift?: boolean
    prog_name_check?: boolean
    laser_param_check?: boolean
    duplicate_code_check?: boolean
    pcb_anti_reverse_check?: boolean
    ab_barcode_check?: boolean
    laser_sequence_check?: boolean
    laser_position_check?: boolean
    grp_ldr_prog_name_check?: boolean
    grp_ldr_laser_position_check?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    designated_group_leader_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    pd_remarks?: boolean
    submitted_by?: boolean
    engineer_signature?: boolean
    group_leader_signature?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["laserChangeoverChecksheet"]>

  export type LaserChangeoverChecksheetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    program_name?: boolean
    date?: boolean
    shift?: boolean
    prog_name_check?: boolean
    laser_param_check?: boolean
    duplicate_code_check?: boolean
    pcb_anti_reverse_check?: boolean
    ab_barcode_check?: boolean
    laser_sequence_check?: boolean
    laser_position_check?: boolean
    grp_ldr_prog_name_check?: boolean
    grp_ldr_laser_position_check?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    designated_group_leader_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    pd_remarks?: boolean
    submitted_by?: boolean
    engineer_signature?: boolean
    group_leader_signature?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["laserChangeoverChecksheet"]>

  export type LaserChangeoverChecksheetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    line?: boolean
    group_name?: boolean
    program_name?: boolean
    date?: boolean
    shift?: boolean
    prog_name_check?: boolean
    laser_param_check?: boolean
    duplicate_code_check?: boolean
    pcb_anti_reverse_check?: boolean
    ab_barcode_check?: boolean
    laser_sequence_check?: boolean
    laser_position_check?: boolean
    grp_ldr_prog_name_check?: boolean
    grp_ldr_laser_position_check?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    designated_group_leader_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    pd_remarks?: boolean
    submitted_by?: boolean
    engineer_signature?: boolean
    group_leader_signature?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["laserChangeoverChecksheet"]>

  export type LaserChangeoverChecksheetSelectScalar = {
    id?: boolean
    line?: boolean
    group_name?: boolean
    program_name?: boolean
    date?: boolean
    shift?: boolean
    prog_name_check?: boolean
    laser_param_check?: boolean
    duplicate_code_check?: boolean
    pcb_anti_reverse_check?: boolean
    ab_barcode_check?: boolean
    laser_sequence_check?: boolean
    laser_position_check?: boolean
    grp_ldr_prog_name_check?: boolean
    grp_ldr_laser_position_check?: boolean
    status?: boolean
    approval_status?: boolean
    designated_engineer_id?: boolean
    designated_group_leader_id?: boolean
    remarks?: boolean
    engineer_remarks?: boolean
    pd_remarks?: boolean
    submitted_by?: boolean
    engineer_signature?: boolean
    group_leader_signature?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LaserChangeoverChecksheetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "line" | "group_name" | "program_name" | "date" | "shift" | "prog_name_check" | "laser_param_check" | "duplicate_code_check" | "pcb_anti_reverse_check" | "ab_barcode_check" | "laser_sequence_check" | "laser_position_check" | "grp_ldr_prog_name_check" | "grp_ldr_laser_position_check" | "status" | "approval_status" | "designated_engineer_id" | "designated_group_leader_id" | "remarks" | "engineer_remarks" | "pd_remarks" | "submitted_by" | "engineer_signature" | "group_leader_signature" | "created_at" | "updated_at", ExtArgs["result"]["laserChangeoverChecksheet"]>

  export type $LaserChangeoverChecksheetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LaserChangeoverChecksheet"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      line: string | null
      group_name: string | null
      program_name: string | null
      date: Date
      shift: string
      prog_name_check: boolean | null
      laser_param_check: boolean | null
      duplicate_code_check: boolean | null
      pcb_anti_reverse_check: boolean | null
      ab_barcode_check: boolean | null
      laser_sequence_check: boolean | null
      laser_position_check: boolean | null
      grp_ldr_prog_name_check: boolean | null
      grp_ldr_laser_position_check: boolean | null
      status: string | null
      approval_status: string | null
      designated_engineer_id: string | null
      designated_group_leader_id: string | null
      remarks: string | null
      engineer_remarks: string | null
      pd_remarks: string | null
      submitted_by: string | null
      engineer_signature: string | null
      group_leader_signature: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["laserChangeoverChecksheet"]>
    composites: {}
  }

  type LaserChangeoverChecksheetGetPayload<S extends boolean | null | undefined | LaserChangeoverChecksheetDefaultArgs> = $Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload, S>

  type LaserChangeoverChecksheetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LaserChangeoverChecksheetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LaserChangeoverChecksheetCountAggregateInputType | true
    }

  export interface LaserChangeoverChecksheetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LaserChangeoverChecksheet'], meta: { name: 'LaserChangeoverChecksheet' } }
    /**
     * Find zero or one LaserChangeoverChecksheet that matches the filter.
     * @param {LaserChangeoverChecksheetFindUniqueArgs} args - Arguments to find a LaserChangeoverChecksheet
     * @example
     * // Get one LaserChangeoverChecksheet
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LaserChangeoverChecksheetFindUniqueArgs>(args: SelectSubset<T, LaserChangeoverChecksheetFindUniqueArgs<ExtArgs>>): Prisma__LaserChangeoverChecksheetClient<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LaserChangeoverChecksheet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LaserChangeoverChecksheetFindUniqueOrThrowArgs} args - Arguments to find a LaserChangeoverChecksheet
     * @example
     * // Get one LaserChangeoverChecksheet
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LaserChangeoverChecksheetFindUniqueOrThrowArgs>(args: SelectSubset<T, LaserChangeoverChecksheetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LaserChangeoverChecksheetClient<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LaserChangeoverChecksheet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaserChangeoverChecksheetFindFirstArgs} args - Arguments to find a LaserChangeoverChecksheet
     * @example
     * // Get one LaserChangeoverChecksheet
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LaserChangeoverChecksheetFindFirstArgs>(args?: SelectSubset<T, LaserChangeoverChecksheetFindFirstArgs<ExtArgs>>): Prisma__LaserChangeoverChecksheetClient<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LaserChangeoverChecksheet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaserChangeoverChecksheetFindFirstOrThrowArgs} args - Arguments to find a LaserChangeoverChecksheet
     * @example
     * // Get one LaserChangeoverChecksheet
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LaserChangeoverChecksheetFindFirstOrThrowArgs>(args?: SelectSubset<T, LaserChangeoverChecksheetFindFirstOrThrowArgs<ExtArgs>>): Prisma__LaserChangeoverChecksheetClient<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LaserChangeoverChecksheets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaserChangeoverChecksheetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LaserChangeoverChecksheets
     * const laserChangeoverChecksheets = await prisma.laserChangeoverChecksheet.findMany()
     * 
     * // Get first 10 LaserChangeoverChecksheets
     * const laserChangeoverChecksheets = await prisma.laserChangeoverChecksheet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const laserChangeoverChecksheetWithIdOnly = await prisma.laserChangeoverChecksheet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LaserChangeoverChecksheetFindManyArgs>(args?: SelectSubset<T, LaserChangeoverChecksheetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LaserChangeoverChecksheet.
     * @param {LaserChangeoverChecksheetCreateArgs} args - Arguments to create a LaserChangeoverChecksheet.
     * @example
     * // Create one LaserChangeoverChecksheet
     * const LaserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.create({
     *   data: {
     *     // ... data to create a LaserChangeoverChecksheet
     *   }
     * })
     * 
     */
    create<T extends LaserChangeoverChecksheetCreateArgs>(args: SelectSubset<T, LaserChangeoverChecksheetCreateArgs<ExtArgs>>): Prisma__LaserChangeoverChecksheetClient<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LaserChangeoverChecksheets.
     * @param {LaserChangeoverChecksheetCreateManyArgs} args - Arguments to create many LaserChangeoverChecksheets.
     * @example
     * // Create many LaserChangeoverChecksheets
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LaserChangeoverChecksheetCreateManyArgs>(args?: SelectSubset<T, LaserChangeoverChecksheetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LaserChangeoverChecksheets and returns the data saved in the database.
     * @param {LaserChangeoverChecksheetCreateManyAndReturnArgs} args - Arguments to create many LaserChangeoverChecksheets.
     * @example
     * // Create many LaserChangeoverChecksheets
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LaserChangeoverChecksheets and only return the `id`
     * const laserChangeoverChecksheetWithIdOnly = await prisma.laserChangeoverChecksheet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LaserChangeoverChecksheetCreateManyAndReturnArgs>(args?: SelectSubset<T, LaserChangeoverChecksheetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LaserChangeoverChecksheet.
     * @param {LaserChangeoverChecksheetDeleteArgs} args - Arguments to delete one LaserChangeoverChecksheet.
     * @example
     * // Delete one LaserChangeoverChecksheet
     * const LaserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.delete({
     *   where: {
     *     // ... filter to delete one LaserChangeoverChecksheet
     *   }
     * })
     * 
     */
    delete<T extends LaserChangeoverChecksheetDeleteArgs>(args: SelectSubset<T, LaserChangeoverChecksheetDeleteArgs<ExtArgs>>): Prisma__LaserChangeoverChecksheetClient<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LaserChangeoverChecksheet.
     * @param {LaserChangeoverChecksheetUpdateArgs} args - Arguments to update one LaserChangeoverChecksheet.
     * @example
     * // Update one LaserChangeoverChecksheet
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LaserChangeoverChecksheetUpdateArgs>(args: SelectSubset<T, LaserChangeoverChecksheetUpdateArgs<ExtArgs>>): Prisma__LaserChangeoverChecksheetClient<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LaserChangeoverChecksheets.
     * @param {LaserChangeoverChecksheetDeleteManyArgs} args - Arguments to filter LaserChangeoverChecksheets to delete.
     * @example
     * // Delete a few LaserChangeoverChecksheets
     * const { count } = await prisma.laserChangeoverChecksheet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LaserChangeoverChecksheetDeleteManyArgs>(args?: SelectSubset<T, LaserChangeoverChecksheetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaserChangeoverChecksheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaserChangeoverChecksheetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LaserChangeoverChecksheets
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LaserChangeoverChecksheetUpdateManyArgs>(args: SelectSubset<T, LaserChangeoverChecksheetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaserChangeoverChecksheets and returns the data updated in the database.
     * @param {LaserChangeoverChecksheetUpdateManyAndReturnArgs} args - Arguments to update many LaserChangeoverChecksheets.
     * @example
     * // Update many LaserChangeoverChecksheets
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LaserChangeoverChecksheets and only return the `id`
     * const laserChangeoverChecksheetWithIdOnly = await prisma.laserChangeoverChecksheet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LaserChangeoverChecksheetUpdateManyAndReturnArgs>(args: SelectSubset<T, LaserChangeoverChecksheetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LaserChangeoverChecksheet.
     * @param {LaserChangeoverChecksheetUpsertArgs} args - Arguments to update or create a LaserChangeoverChecksheet.
     * @example
     * // Update or create a LaserChangeoverChecksheet
     * const laserChangeoverChecksheet = await prisma.laserChangeoverChecksheet.upsert({
     *   create: {
     *     // ... data to create a LaserChangeoverChecksheet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LaserChangeoverChecksheet we want to update
     *   }
     * })
     */
    upsert<T extends LaserChangeoverChecksheetUpsertArgs>(args: SelectSubset<T, LaserChangeoverChecksheetUpsertArgs<ExtArgs>>): Prisma__LaserChangeoverChecksheetClient<$Result.GetResult<Prisma.$LaserChangeoverChecksheetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LaserChangeoverChecksheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaserChangeoverChecksheetCountArgs} args - Arguments to filter LaserChangeoverChecksheets to count.
     * @example
     * // Count the number of LaserChangeoverChecksheets
     * const count = await prisma.laserChangeoverChecksheet.count({
     *   where: {
     *     // ... the filter for the LaserChangeoverChecksheets we want to count
     *   }
     * })
    **/
    count<T extends LaserChangeoverChecksheetCountArgs>(
      args?: Subset<T, LaserChangeoverChecksheetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LaserChangeoverChecksheetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LaserChangeoverChecksheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaserChangeoverChecksheetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LaserChangeoverChecksheetAggregateArgs>(args: Subset<T, LaserChangeoverChecksheetAggregateArgs>): Prisma.PrismaPromise<GetLaserChangeoverChecksheetAggregateType<T>>

    /**
     * Group by LaserChangeoverChecksheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaserChangeoverChecksheetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LaserChangeoverChecksheetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LaserChangeoverChecksheetGroupByArgs['orderBy'] }
        : { orderBy?: LaserChangeoverChecksheetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LaserChangeoverChecksheetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLaserChangeoverChecksheetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LaserChangeoverChecksheet model
   */
  readonly fields: LaserChangeoverChecksheetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LaserChangeoverChecksheet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LaserChangeoverChecksheetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LaserChangeoverChecksheet model
   */
  interface LaserChangeoverChecksheetFieldRefs {
    readonly id: FieldRef<"LaserChangeoverChecksheet", 'Int'>
    readonly line: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly group_name: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly program_name: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly date: FieldRef<"LaserChangeoverChecksheet", 'DateTime'>
    readonly shift: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly prog_name_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly laser_param_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly duplicate_code_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly pcb_anti_reverse_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly ab_barcode_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly laser_sequence_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly laser_position_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly grp_ldr_prog_name_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly grp_ldr_laser_position_check: FieldRef<"LaserChangeoverChecksheet", 'Boolean'>
    readonly status: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly approval_status: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly designated_engineer_id: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly designated_group_leader_id: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly remarks: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly engineer_remarks: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly pd_remarks: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly submitted_by: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly engineer_signature: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly group_leader_signature: FieldRef<"LaserChangeoverChecksheet", 'String'>
    readonly created_at: FieldRef<"LaserChangeoverChecksheet", 'DateTime'>
    readonly updated_at: FieldRef<"LaserChangeoverChecksheet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LaserChangeoverChecksheet findUnique
   */
  export type LaserChangeoverChecksheetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which LaserChangeoverChecksheet to fetch.
     */
    where: LaserChangeoverChecksheetWhereUniqueInput
  }

  /**
   * LaserChangeoverChecksheet findUniqueOrThrow
   */
  export type LaserChangeoverChecksheetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which LaserChangeoverChecksheet to fetch.
     */
    where: LaserChangeoverChecksheetWhereUniqueInput
  }

  /**
   * LaserChangeoverChecksheet findFirst
   */
  export type LaserChangeoverChecksheetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which LaserChangeoverChecksheet to fetch.
     */
    where?: LaserChangeoverChecksheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaserChangeoverChecksheets to fetch.
     */
    orderBy?: LaserChangeoverChecksheetOrderByWithRelationInput | LaserChangeoverChecksheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaserChangeoverChecksheets.
     */
    cursor?: LaserChangeoverChecksheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaserChangeoverChecksheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaserChangeoverChecksheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaserChangeoverChecksheets.
     */
    distinct?: LaserChangeoverChecksheetScalarFieldEnum | LaserChangeoverChecksheetScalarFieldEnum[]
  }

  /**
   * LaserChangeoverChecksheet findFirstOrThrow
   */
  export type LaserChangeoverChecksheetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which LaserChangeoverChecksheet to fetch.
     */
    where?: LaserChangeoverChecksheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaserChangeoverChecksheets to fetch.
     */
    orderBy?: LaserChangeoverChecksheetOrderByWithRelationInput | LaserChangeoverChecksheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaserChangeoverChecksheets.
     */
    cursor?: LaserChangeoverChecksheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaserChangeoverChecksheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaserChangeoverChecksheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaserChangeoverChecksheets.
     */
    distinct?: LaserChangeoverChecksheetScalarFieldEnum | LaserChangeoverChecksheetScalarFieldEnum[]
  }

  /**
   * LaserChangeoverChecksheet findMany
   */
  export type LaserChangeoverChecksheetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter, which LaserChangeoverChecksheets to fetch.
     */
    where?: LaserChangeoverChecksheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaserChangeoverChecksheets to fetch.
     */
    orderBy?: LaserChangeoverChecksheetOrderByWithRelationInput | LaserChangeoverChecksheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LaserChangeoverChecksheets.
     */
    cursor?: LaserChangeoverChecksheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaserChangeoverChecksheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaserChangeoverChecksheets.
     */
    skip?: number
    distinct?: LaserChangeoverChecksheetScalarFieldEnum | LaserChangeoverChecksheetScalarFieldEnum[]
  }

  /**
   * LaserChangeoverChecksheet create
   */
  export type LaserChangeoverChecksheetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The data needed to create a LaserChangeoverChecksheet.
     */
    data: XOR<LaserChangeoverChecksheetCreateInput, LaserChangeoverChecksheetUncheckedCreateInput>
  }

  /**
   * LaserChangeoverChecksheet createMany
   */
  export type LaserChangeoverChecksheetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LaserChangeoverChecksheets.
     */
    data: LaserChangeoverChecksheetCreateManyInput | LaserChangeoverChecksheetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LaserChangeoverChecksheet createManyAndReturn
   */
  export type LaserChangeoverChecksheetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The data used to create many LaserChangeoverChecksheets.
     */
    data: LaserChangeoverChecksheetCreateManyInput | LaserChangeoverChecksheetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LaserChangeoverChecksheet update
   */
  export type LaserChangeoverChecksheetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The data needed to update a LaserChangeoverChecksheet.
     */
    data: XOR<LaserChangeoverChecksheetUpdateInput, LaserChangeoverChecksheetUncheckedUpdateInput>
    /**
     * Choose, which LaserChangeoverChecksheet to update.
     */
    where: LaserChangeoverChecksheetWhereUniqueInput
  }

  /**
   * LaserChangeoverChecksheet updateMany
   */
  export type LaserChangeoverChecksheetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LaserChangeoverChecksheets.
     */
    data: XOR<LaserChangeoverChecksheetUpdateManyMutationInput, LaserChangeoverChecksheetUncheckedUpdateManyInput>
    /**
     * Filter which LaserChangeoverChecksheets to update
     */
    where?: LaserChangeoverChecksheetWhereInput
    /**
     * Limit how many LaserChangeoverChecksheets to update.
     */
    limit?: number
  }

  /**
   * LaserChangeoverChecksheet updateManyAndReturn
   */
  export type LaserChangeoverChecksheetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The data used to update LaserChangeoverChecksheets.
     */
    data: XOR<LaserChangeoverChecksheetUpdateManyMutationInput, LaserChangeoverChecksheetUncheckedUpdateManyInput>
    /**
     * Filter which LaserChangeoverChecksheets to update
     */
    where?: LaserChangeoverChecksheetWhereInput
    /**
     * Limit how many LaserChangeoverChecksheets to update.
     */
    limit?: number
  }

  /**
   * LaserChangeoverChecksheet upsert
   */
  export type LaserChangeoverChecksheetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * The filter to search for the LaserChangeoverChecksheet to update in case it exists.
     */
    where: LaserChangeoverChecksheetWhereUniqueInput
    /**
     * In case the LaserChangeoverChecksheet found by the `where` argument doesn't exist, create a new LaserChangeoverChecksheet with this data.
     */
    create: XOR<LaserChangeoverChecksheetCreateInput, LaserChangeoverChecksheetUncheckedCreateInput>
    /**
     * In case the LaserChangeoverChecksheet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LaserChangeoverChecksheetUpdateInput, LaserChangeoverChecksheetUncheckedUpdateInput>
  }

  /**
   * LaserChangeoverChecksheet delete
   */
  export type LaserChangeoverChecksheetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
    /**
     * Filter which LaserChangeoverChecksheet to delete.
     */
    where: LaserChangeoverChecksheetWhereUniqueInput
  }

  /**
   * LaserChangeoverChecksheet deleteMany
   */
  export type LaserChangeoverChecksheetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaserChangeoverChecksheets to delete
     */
    where?: LaserChangeoverChecksheetWhereInput
    /**
     * Limit how many LaserChangeoverChecksheets to delete.
     */
    limit?: number
  }

  /**
   * LaserChangeoverChecksheet without action
   */
  export type LaserChangeoverChecksheetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaserChangeoverChecksheet
     */
    select?: LaserChangeoverChecksheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaserChangeoverChecksheet
     */
    omit?: LaserChangeoverChecksheetOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AoiFunctionCheckpointScalarFieldEnum: {
    id: 'id',
    line: 'line',
    group_name: 'group_name',
    date: 'date',
    shift: 'shift',
    responsible_person: 'responsible_person',
    time: 'time',
    submitted_by: 'submitted_by',
    status: 'status',
    laser_barcode_before_bot: 'laser_barcode_before_bot',
    laser_barcode_before_top: 'laser_barcode_before_top',
    laser_barcode_after_bot: 'laser_barcode_after_bot',
    laser_barcode_after_top: 'laser_barcode_after_top',
    laser_pcb_text_before: 'laser_pcb_text_before',
    laser_pcb_text_after: 'laser_pcb_text_after',
    spi_barcode_before_bot: 'spi_barcode_before_bot',
    spi_barcode_before_top: 'spi_barcode_before_top',
    spi_barcode_after_bot: 'spi_barcode_after_bot',
    spi_barcode_after_top: 'spi_barcode_after_top',
    spi_mes_before_bot: 'spi_mes_before_bot',
    spi_mes_before_top: 'spi_mes_before_top',
    spi_mes_after_bot: 'spi_mes_after_bot',
    spi_mes_after_top: 'spi_mes_after_top',
    pre_aoi_barcode_before_bot: 'pre_aoi_barcode_before_bot',
    pre_aoi_barcode_before_top: 'pre_aoi_barcode_before_top',
    pre_aoi_barcode_after_bot: 'pre_aoi_barcode_after_bot',
    pre_aoi_barcode_after_top: 'pre_aoi_barcode_after_top',
    post_aoi_barcode_before_bot: 'post_aoi_barcode_before_bot',
    post_aoi_barcode_before_top: 'post_aoi_barcode_before_top',
    post_aoi_barcode_after_bot: 'post_aoi_barcode_after_bot',
    post_aoi_barcode_after_top: 'post_aoi_barcode_after_top',
    password_function_pre_aoi_before: 'password_function_pre_aoi_before',
    password_function_pre_aoi_after: 'password_function_pre_aoi_after',
    spi_fov_before: 'spi_fov_before',
    spi_fov_after: 'spi_fov_after',
    pre_aoi_fov_before: 'pre_aoi_fov_before',
    pre_aoi_fov_after: 'pre_aoi_fov_after',
    post_aoi_fov_before: 'post_aoi_fov_before',
    post_aoi_fov_after: 'post_aoi_fov_after',
    pre_aoi_spc_before: 'pre_aoi_spc_before',
    pre_aoi_spc_after: 'pre_aoi_spc_after',
    approval_status: 'approval_status',
    designated_engineer_id: 'designated_engineer_id',
    remarks: 'remarks',
    engineer_remarks: 'engineer_remarks',
    engineer_modified_fields: 'engineer_modified_fields',
    original_technician_data: 'original_technician_data',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AoiFunctionCheckpointScalarFieldEnum = (typeof AoiFunctionCheckpointScalarFieldEnum)[keyof typeof AoiFunctionCheckpointScalarFieldEnum]


  export const AoiTechnicianChecklistScalarFieldEnum: {
    id: 'id',
    line: 'line',
    group_name: 'group_name',
    date: 'date',
    shift: 'shift',
    pre_aoi_program_full_name: 'pre_aoi_program_full_name',
    stencil_serial_no_b_side: 'stencil_serial_no_b_side',
    stencil_serial_no_a_side: 'stencil_serial_no_a_side',
    barcode_read_a_layer: 'barcode_read_a_layer',
    barcode_read_a_spi: 'barcode_read_a_spi',
    barcode_read_a_pre_aoi: 'barcode_read_a_pre_aoi',
    barcode_read_b_layer: 'barcode_read_b_layer',
    barcode_read_b_spi: 'barcode_read_b_spi',
    barcode_read_b_pre_aoi: 'barcode_read_b_pre_aoi',
    workorder_info_pre_aoi: 'workorder_info_pre_aoi',
    workorder_info_post_aoi: 'workorder_info_post_aoi',
    aoi_scan_tools_workorder_traceability: 'aoi_scan_tools_workorder_traceability',
    confirmation: 'confirmation',
    submitted_by: 'submitted_by',
    status: 'status',
    approval_status: 'approval_status',
    designated_engineer_id: 'designated_engineer_id',
    remarks: 'remarks',
    engineer_remarks: 'engineer_remarks',
    engineer_modified_fields: 'engineer_modified_fields',
    original_technician_data: 'original_technician_data',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AoiTechnicianChecklistScalarFieldEnum = (typeof AoiTechnicianChecklistScalarFieldEnum)[keyof typeof AoiTechnicianChecklistScalarFieldEnum]


  export const AppUserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password_hash: 'password_hash',
    full_name: 'full_name',
    role: 'role',
    email: 'email',
    phone: 'phone',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AppUserScalarFieldEnum = (typeof AppUserScalarFieldEnum)[keyof typeof AppUserScalarFieldEnum]


  export const AppSessionScalarFieldEnum: {
    session_id: 'session_id',
    user_id: 'user_id',
    public_ip: 'public_ip',
    login_time: 'login_time',
    logout_time: 'logout_time',
    status: 'status'
  };

  export type AppSessionScalarFieldEnum = (typeof AppSessionScalarFieldEnum)[keyof typeof AppSessionScalarFieldEnum]


  export const AppActivityLogScalarFieldEnum: {
    id: 'id',
    activity_type: 'activity_type',
    username: 'username',
    public_ip: 'public_ip',
    details: 'details',
    created_at: 'created_at'
  };

  export type AppActivityLogScalarFieldEnum = (typeof AppActivityLogScalarFieldEnum)[keyof typeof AppActivityLogScalarFieldEnum]


  export const LineStatusScalarFieldEnum: {
    id: 'id',
    line: 'line',
    is_installed: 'is_installed',
    updated_by: 'updated_by',
    updated_at: 'updated_at'
  };

  export type LineStatusScalarFieldEnum = (typeof LineStatusScalarFieldEnum)[keyof typeof LineStatusScalarFieldEnum]


  export const AoiChangeoverChecksheetScalarFieldEnum: {
    id: 'id',
    line: 'line',
    group_name: 'group_name',
    date: 'date',
    shift: 'shift',
    model_name: 'model_name',
    model_code: 'model_code',
    changeover_type: 'changeover_type',
    spi_steel_stencil_suffix_match: 'spi_steel_stencil_suffix_match',
    spi_program_subpanel_serial_match: 'spi_program_subpanel_serial_match',
    spi_recheck_pcab_polarity: 'spi_recheck_pcab_polarity',
    spi_confirm_parameter_settings: 'spi_confirm_parameter_settings',
    spi_read_barcode_on: 'spi_read_barcode_on',
    pre_aoi_eco_checklists: 'pre_aoi_eco_checklists',
    pre_aoi_program_model_modify: 'pre_aoi_program_model_modify',
    pre_aoi_vi_program_new_materia: 'pre_aoi_vi_program_new_materia',
    pre_aoi_limit_defective_alarm: 'pre_aoi_limit_defective_alarm',
    pre_aoi_test_program_bare_pcba: 'pre_aoi_test_program_bare_pcba',
    pre_aoi_bot_program_serial_number: 'pre_aoi_bot_program_serial_number',
    pre_aoi_read_barcode_on: 'pre_aoi_read_barcode_on',
    pre_aoi_confirm_materials_mounted: 'pre_aoi_confirm_materials_mounted',
    pre_aoi_delete_all_zones: 'pre_aoi_delete_all_zones',
    post_aoi_equipment_model: 'post_aoi_equipment_model',
    post_aoi_eco_checklists: 'post_aoi_eco_checklists',
    post_aoi_program_model_modify: 'post_aoi_program_model_modify',
    post_aoi_recheck_chips_standard_models: 'post_aoi_recheck_chips_standard_models',
    post_aoi_scan_board_picture: 'post_aoi_scan_board_picture',
    post_aoi_limit_defective_alarm: 'post_aoi_limit_defective_alarm',
    post_aoi_confirm_polarity_shield: 'post_aoi_confirm_polarity_shield',
    post_aoi_bot_program_serial_number: 'post_aoi_bot_program_serial_number',
    post_aoi_registered_standard_models_times: 'post_aoi_registered_standard_models_times',
    others_adjust_widths: 'others_adjust_widths',
    others_add_test_standard_pcb_barcode: 'others_add_test_standard_pcb_barcode',
    submitted_by: 'submitted_by',
    status: 'status',
    approval_status: 'approval_status',
    designated_engineer_id: 'designated_engineer_id',
    remarks: 'remarks',
    engineer_remarks: 'engineer_remarks',
    engineer_modified_fields: 'engineer_modified_fields',
    original_technician_data: 'original_technician_data',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AoiChangeoverChecksheetScalarFieldEnum = (typeof AoiChangeoverChecksheetScalarFieldEnum)[keyof typeof AoiChangeoverChecksheetScalarFieldEnum]


  export const LaserChangeoverChecksheetScalarFieldEnum: {
    id: 'id',
    line: 'line',
    group_name: 'group_name',
    program_name: 'program_name',
    date: 'date',
    shift: 'shift',
    prog_name_check: 'prog_name_check',
    laser_param_check: 'laser_param_check',
    duplicate_code_check: 'duplicate_code_check',
    pcb_anti_reverse_check: 'pcb_anti_reverse_check',
    ab_barcode_check: 'ab_barcode_check',
    laser_sequence_check: 'laser_sequence_check',
    laser_position_check: 'laser_position_check',
    grp_ldr_prog_name_check: 'grp_ldr_prog_name_check',
    grp_ldr_laser_position_check: 'grp_ldr_laser_position_check',
    status: 'status',
    approval_status: 'approval_status',
    designated_engineer_id: 'designated_engineer_id',
    designated_group_leader_id: 'designated_group_leader_id',
    remarks: 'remarks',
    engineer_remarks: 'engineer_remarks',
    pd_remarks: 'pd_remarks',
    submitted_by: 'submitted_by',
    engineer_signature: 'engineer_signature',
    group_leader_signature: 'group_leader_signature',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LaserChangeoverChecksheetScalarFieldEnum = (typeof LaserChangeoverChecksheetScalarFieldEnum)[keyof typeof LaserChangeoverChecksheetScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AoiFunctionCheckpointWhereInput = {
    AND?: AoiFunctionCheckpointWhereInput | AoiFunctionCheckpointWhereInput[]
    OR?: AoiFunctionCheckpointWhereInput[]
    NOT?: AoiFunctionCheckpointWhereInput | AoiFunctionCheckpointWhereInput[]
    id?: IntFilter<"AoiFunctionCheckpoint"> | number
    line?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    group_name?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    date?: DateTimeFilter<"AoiFunctionCheckpoint"> | Date | string
    shift?: StringFilter<"AoiFunctionCheckpoint"> | string
    responsible_person?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    time?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    submitted_by?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    status?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    laser_barcode_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_pcb_text_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_pcb_text_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    password_function_pre_aoi_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    password_function_pre_aoi_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_fov_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_fov_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_fov_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_fov_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_fov_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_fov_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_spc_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_spc_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    approval_status?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    designated_engineer_id?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    remarks?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    engineer_remarks?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    engineer_modified_fields?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    original_technician_data?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    created_at?: DateTimeFilter<"AoiFunctionCheckpoint"> | Date | string
    updated_at?: DateTimeFilter<"AoiFunctionCheckpoint"> | Date | string
  }

  export type AoiFunctionCheckpointOrderByWithRelationInput = {
    id?: SortOrder
    line?: SortOrderInput | SortOrder
    group_name?: SortOrderInput | SortOrder
    date?: SortOrder
    shift?: SortOrder
    responsible_person?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    laser_barcode_before_bot?: SortOrderInput | SortOrder
    laser_barcode_before_top?: SortOrderInput | SortOrder
    laser_barcode_after_bot?: SortOrderInput | SortOrder
    laser_barcode_after_top?: SortOrderInput | SortOrder
    laser_pcb_text_before?: SortOrderInput | SortOrder
    laser_pcb_text_after?: SortOrderInput | SortOrder
    spi_barcode_before_bot?: SortOrderInput | SortOrder
    spi_barcode_before_top?: SortOrderInput | SortOrder
    spi_barcode_after_bot?: SortOrderInput | SortOrder
    spi_barcode_after_top?: SortOrderInput | SortOrder
    spi_mes_before_bot?: SortOrderInput | SortOrder
    spi_mes_before_top?: SortOrderInput | SortOrder
    spi_mes_after_bot?: SortOrderInput | SortOrder
    spi_mes_after_top?: SortOrderInput | SortOrder
    pre_aoi_barcode_before_bot?: SortOrderInput | SortOrder
    pre_aoi_barcode_before_top?: SortOrderInput | SortOrder
    pre_aoi_barcode_after_bot?: SortOrderInput | SortOrder
    pre_aoi_barcode_after_top?: SortOrderInput | SortOrder
    post_aoi_barcode_before_bot?: SortOrderInput | SortOrder
    post_aoi_barcode_before_top?: SortOrderInput | SortOrder
    post_aoi_barcode_after_bot?: SortOrderInput | SortOrder
    post_aoi_barcode_after_top?: SortOrderInput | SortOrder
    password_function_pre_aoi_before?: SortOrderInput | SortOrder
    password_function_pre_aoi_after?: SortOrderInput | SortOrder
    spi_fov_before?: SortOrderInput | SortOrder
    spi_fov_after?: SortOrderInput | SortOrder
    pre_aoi_fov_before?: SortOrderInput | SortOrder
    pre_aoi_fov_after?: SortOrderInput | SortOrder
    post_aoi_fov_before?: SortOrderInput | SortOrder
    post_aoi_fov_after?: SortOrderInput | SortOrder
    pre_aoi_spc_before?: SortOrderInput | SortOrder
    pre_aoi_spc_after?: SortOrderInput | SortOrder
    approval_status?: SortOrderInput | SortOrder
    designated_engineer_id?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    engineer_remarks?: SortOrderInput | SortOrder
    engineer_modified_fields?: SortOrderInput | SortOrder
    original_technician_data?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiFunctionCheckpointWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AoiFunctionCheckpointWhereInput | AoiFunctionCheckpointWhereInput[]
    OR?: AoiFunctionCheckpointWhereInput[]
    NOT?: AoiFunctionCheckpointWhereInput | AoiFunctionCheckpointWhereInput[]
    line?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    group_name?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    date?: DateTimeFilter<"AoiFunctionCheckpoint"> | Date | string
    shift?: StringFilter<"AoiFunctionCheckpoint"> | string
    responsible_person?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    time?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    submitted_by?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    status?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    laser_barcode_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_pcb_text_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_pcb_text_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_before_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_before_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_after_bot?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_after_top?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    password_function_pre_aoi_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    password_function_pre_aoi_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_fov_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_fov_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_fov_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_fov_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_fov_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_fov_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_spc_before?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_spc_after?: BoolNullableFilter<"AoiFunctionCheckpoint"> | boolean | null
    approval_status?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    designated_engineer_id?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    remarks?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    engineer_remarks?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    engineer_modified_fields?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    original_technician_data?: StringNullableFilter<"AoiFunctionCheckpoint"> | string | null
    created_at?: DateTimeFilter<"AoiFunctionCheckpoint"> | Date | string
    updated_at?: DateTimeFilter<"AoiFunctionCheckpoint"> | Date | string
  }, "id">

  export type AoiFunctionCheckpointOrderByWithAggregationInput = {
    id?: SortOrder
    line?: SortOrderInput | SortOrder
    group_name?: SortOrderInput | SortOrder
    date?: SortOrder
    shift?: SortOrder
    responsible_person?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    laser_barcode_before_bot?: SortOrderInput | SortOrder
    laser_barcode_before_top?: SortOrderInput | SortOrder
    laser_barcode_after_bot?: SortOrderInput | SortOrder
    laser_barcode_after_top?: SortOrderInput | SortOrder
    laser_pcb_text_before?: SortOrderInput | SortOrder
    laser_pcb_text_after?: SortOrderInput | SortOrder
    spi_barcode_before_bot?: SortOrderInput | SortOrder
    spi_barcode_before_top?: SortOrderInput | SortOrder
    spi_barcode_after_bot?: SortOrderInput | SortOrder
    spi_barcode_after_top?: SortOrderInput | SortOrder
    spi_mes_before_bot?: SortOrderInput | SortOrder
    spi_mes_before_top?: SortOrderInput | SortOrder
    spi_mes_after_bot?: SortOrderInput | SortOrder
    spi_mes_after_top?: SortOrderInput | SortOrder
    pre_aoi_barcode_before_bot?: SortOrderInput | SortOrder
    pre_aoi_barcode_before_top?: SortOrderInput | SortOrder
    pre_aoi_barcode_after_bot?: SortOrderInput | SortOrder
    pre_aoi_barcode_after_top?: SortOrderInput | SortOrder
    post_aoi_barcode_before_bot?: SortOrderInput | SortOrder
    post_aoi_barcode_before_top?: SortOrderInput | SortOrder
    post_aoi_barcode_after_bot?: SortOrderInput | SortOrder
    post_aoi_barcode_after_top?: SortOrderInput | SortOrder
    password_function_pre_aoi_before?: SortOrderInput | SortOrder
    password_function_pre_aoi_after?: SortOrderInput | SortOrder
    spi_fov_before?: SortOrderInput | SortOrder
    spi_fov_after?: SortOrderInput | SortOrder
    pre_aoi_fov_before?: SortOrderInput | SortOrder
    pre_aoi_fov_after?: SortOrderInput | SortOrder
    post_aoi_fov_before?: SortOrderInput | SortOrder
    post_aoi_fov_after?: SortOrderInput | SortOrder
    pre_aoi_spc_before?: SortOrderInput | SortOrder
    pre_aoi_spc_after?: SortOrderInput | SortOrder
    approval_status?: SortOrderInput | SortOrder
    designated_engineer_id?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    engineer_remarks?: SortOrderInput | SortOrder
    engineer_modified_fields?: SortOrderInput | SortOrder
    original_technician_data?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AoiFunctionCheckpointCountOrderByAggregateInput
    _avg?: AoiFunctionCheckpointAvgOrderByAggregateInput
    _max?: AoiFunctionCheckpointMaxOrderByAggregateInput
    _min?: AoiFunctionCheckpointMinOrderByAggregateInput
    _sum?: AoiFunctionCheckpointSumOrderByAggregateInput
  }

  export type AoiFunctionCheckpointScalarWhereWithAggregatesInput = {
    AND?: AoiFunctionCheckpointScalarWhereWithAggregatesInput | AoiFunctionCheckpointScalarWhereWithAggregatesInput[]
    OR?: AoiFunctionCheckpointScalarWhereWithAggregatesInput[]
    NOT?: AoiFunctionCheckpointScalarWhereWithAggregatesInput | AoiFunctionCheckpointScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AoiFunctionCheckpoint"> | number
    line?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    group_name?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    date?: DateTimeWithAggregatesFilter<"AoiFunctionCheckpoint"> | Date | string
    shift?: StringWithAggregatesFilter<"AoiFunctionCheckpoint"> | string
    responsible_person?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    time?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    submitted_by?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    status?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    laser_barcode_before_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_before_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_after_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_barcode_after_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_pcb_text_before?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    laser_pcb_text_after?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_before_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_before_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_after_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_barcode_after_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_before_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_before_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_after_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_mes_after_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_before_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_before_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_after_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_barcode_after_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_before_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_before_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_after_bot?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_barcode_after_top?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    password_function_pre_aoi_before?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    password_function_pre_aoi_after?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_fov_before?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    spi_fov_after?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_fov_before?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_fov_after?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_fov_before?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    post_aoi_fov_after?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_spc_before?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    pre_aoi_spc_after?: BoolNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | boolean | null
    approval_status?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    designated_engineer_id?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    engineer_remarks?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    engineer_modified_fields?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    original_technician_data?: StringNullableWithAggregatesFilter<"AoiFunctionCheckpoint"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AoiFunctionCheckpoint"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AoiFunctionCheckpoint"> | Date | string
  }

  export type AoiTechnicianChecklistWhereInput = {
    AND?: AoiTechnicianChecklistWhereInput | AoiTechnicianChecklistWhereInput[]
    OR?: AoiTechnicianChecklistWhereInput[]
    NOT?: AoiTechnicianChecklistWhereInput | AoiTechnicianChecklistWhereInput[]
    id?: IntFilter<"AoiTechnicianChecklist"> | number
    line?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    group_name?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    date?: DateTimeFilter<"AoiTechnicianChecklist"> | Date | string
    shift?: StringFilter<"AoiTechnicianChecklist"> | string
    pre_aoi_program_full_name?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    stencil_serial_no_b_side?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    stencil_serial_no_a_side?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_layer?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_spi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_pre_aoi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_layer?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_spi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_pre_aoi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    workorder_info_pre_aoi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    workorder_info_post_aoi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    aoi_scan_tools_workorder_traceability?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    confirmation?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    submitted_by?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    status?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    approval_status?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    designated_engineer_id?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    remarks?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    engineer_remarks?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    engineer_modified_fields?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    original_technician_data?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    created_at?: DateTimeFilter<"AoiTechnicianChecklist"> | Date | string
    updated_at?: DateTimeFilter<"AoiTechnicianChecklist"> | Date | string
  }

  export type AoiTechnicianChecklistOrderByWithRelationInput = {
    id?: SortOrder
    line?: SortOrderInput | SortOrder
    group_name?: SortOrderInput | SortOrder
    date?: SortOrder
    shift?: SortOrder
    pre_aoi_program_full_name?: SortOrderInput | SortOrder
    stencil_serial_no_b_side?: SortOrderInput | SortOrder
    stencil_serial_no_a_side?: SortOrderInput | SortOrder
    barcode_read_a_layer?: SortOrderInput | SortOrder
    barcode_read_a_spi?: SortOrderInput | SortOrder
    barcode_read_a_pre_aoi?: SortOrderInput | SortOrder
    barcode_read_b_layer?: SortOrderInput | SortOrder
    barcode_read_b_spi?: SortOrderInput | SortOrder
    barcode_read_b_pre_aoi?: SortOrderInput | SortOrder
    workorder_info_pre_aoi?: SortOrderInput | SortOrder
    workorder_info_post_aoi?: SortOrderInput | SortOrder
    aoi_scan_tools_workorder_traceability?: SortOrderInput | SortOrder
    confirmation?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    approval_status?: SortOrderInput | SortOrder
    designated_engineer_id?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    engineer_remarks?: SortOrderInput | SortOrder
    engineer_modified_fields?: SortOrderInput | SortOrder
    original_technician_data?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiTechnicianChecklistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AoiTechnicianChecklistWhereInput | AoiTechnicianChecklistWhereInput[]
    OR?: AoiTechnicianChecklistWhereInput[]
    NOT?: AoiTechnicianChecklistWhereInput | AoiTechnicianChecklistWhereInput[]
    line?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    group_name?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    date?: DateTimeFilter<"AoiTechnicianChecklist"> | Date | string
    shift?: StringFilter<"AoiTechnicianChecklist"> | string
    pre_aoi_program_full_name?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    stencil_serial_no_b_side?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    stencil_serial_no_a_side?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_layer?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_spi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_pre_aoi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_layer?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_spi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_pre_aoi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    workorder_info_pre_aoi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    workorder_info_post_aoi?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    aoi_scan_tools_workorder_traceability?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    confirmation?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    submitted_by?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    status?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    approval_status?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    designated_engineer_id?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    remarks?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    engineer_remarks?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    engineer_modified_fields?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    original_technician_data?: StringNullableFilter<"AoiTechnicianChecklist"> | string | null
    created_at?: DateTimeFilter<"AoiTechnicianChecklist"> | Date | string
    updated_at?: DateTimeFilter<"AoiTechnicianChecklist"> | Date | string
  }, "id">

  export type AoiTechnicianChecklistOrderByWithAggregationInput = {
    id?: SortOrder
    line?: SortOrderInput | SortOrder
    group_name?: SortOrderInput | SortOrder
    date?: SortOrder
    shift?: SortOrder
    pre_aoi_program_full_name?: SortOrderInput | SortOrder
    stencil_serial_no_b_side?: SortOrderInput | SortOrder
    stencil_serial_no_a_side?: SortOrderInput | SortOrder
    barcode_read_a_layer?: SortOrderInput | SortOrder
    barcode_read_a_spi?: SortOrderInput | SortOrder
    barcode_read_a_pre_aoi?: SortOrderInput | SortOrder
    barcode_read_b_layer?: SortOrderInput | SortOrder
    barcode_read_b_spi?: SortOrderInput | SortOrder
    barcode_read_b_pre_aoi?: SortOrderInput | SortOrder
    workorder_info_pre_aoi?: SortOrderInput | SortOrder
    workorder_info_post_aoi?: SortOrderInput | SortOrder
    aoi_scan_tools_workorder_traceability?: SortOrderInput | SortOrder
    confirmation?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    approval_status?: SortOrderInput | SortOrder
    designated_engineer_id?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    engineer_remarks?: SortOrderInput | SortOrder
    engineer_modified_fields?: SortOrderInput | SortOrder
    original_technician_data?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AoiTechnicianChecklistCountOrderByAggregateInput
    _avg?: AoiTechnicianChecklistAvgOrderByAggregateInput
    _max?: AoiTechnicianChecklistMaxOrderByAggregateInput
    _min?: AoiTechnicianChecklistMinOrderByAggregateInput
    _sum?: AoiTechnicianChecklistSumOrderByAggregateInput
  }

  export type AoiTechnicianChecklistScalarWhereWithAggregatesInput = {
    AND?: AoiTechnicianChecklistScalarWhereWithAggregatesInput | AoiTechnicianChecklistScalarWhereWithAggregatesInput[]
    OR?: AoiTechnicianChecklistScalarWhereWithAggregatesInput[]
    NOT?: AoiTechnicianChecklistScalarWhereWithAggregatesInput | AoiTechnicianChecklistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AoiTechnicianChecklist"> | number
    line?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    group_name?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    date?: DateTimeWithAggregatesFilter<"AoiTechnicianChecklist"> | Date | string
    shift?: StringWithAggregatesFilter<"AoiTechnicianChecklist"> | string
    pre_aoi_program_full_name?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    stencil_serial_no_b_side?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    stencil_serial_no_a_side?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_layer?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_spi?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_a_pre_aoi?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_layer?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_spi?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    barcode_read_b_pre_aoi?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    workorder_info_pre_aoi?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    workorder_info_post_aoi?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    aoi_scan_tools_workorder_traceability?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    confirmation?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    submitted_by?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    status?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    approval_status?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    designated_engineer_id?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    engineer_remarks?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    engineer_modified_fields?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    original_technician_data?: StringNullableWithAggregatesFilter<"AoiTechnicianChecklist"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AoiTechnicianChecklist"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AoiTechnicianChecklist"> | Date | string
  }

  export type AppUserWhereInput = {
    AND?: AppUserWhereInput | AppUserWhereInput[]
    OR?: AppUserWhereInput[]
    NOT?: AppUserWhereInput | AppUserWhereInput[]
    id?: IntFilter<"AppUser"> | number
    username?: StringFilter<"AppUser"> | string
    password_hash?: StringFilter<"AppUser"> | string
    full_name?: StringFilter<"AppUser"> | string
    role?: StringFilter<"AppUser"> | string
    email?: StringNullableFilter<"AppUser"> | string | null
    phone?: StringNullableFilter<"AppUser"> | string | null
    created_at?: DateTimeFilter<"AppUser"> | Date | string
    updated_at?: DateTimeFilter<"AppUser"> | Date | string
    sessions?: AppSessionListRelationFilter
  }

  export type AppUserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    sessions?: AppSessionOrderByRelationAggregateInput
  }

  export type AppUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: AppUserWhereInput | AppUserWhereInput[]
    OR?: AppUserWhereInput[]
    NOT?: AppUserWhereInput | AppUserWhereInput[]
    password_hash?: StringFilter<"AppUser"> | string
    full_name?: StringFilter<"AppUser"> | string
    role?: StringFilter<"AppUser"> | string
    email?: StringNullableFilter<"AppUser"> | string | null
    phone?: StringNullableFilter<"AppUser"> | string | null
    created_at?: DateTimeFilter<"AppUser"> | Date | string
    updated_at?: DateTimeFilter<"AppUser"> | Date | string
    sessions?: AppSessionListRelationFilter
  }, "id" | "username">

  export type AppUserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AppUserCountOrderByAggregateInput
    _avg?: AppUserAvgOrderByAggregateInput
    _max?: AppUserMaxOrderByAggregateInput
    _min?: AppUserMinOrderByAggregateInput
    _sum?: AppUserSumOrderByAggregateInput
  }

  export type AppUserScalarWhereWithAggregatesInput = {
    AND?: AppUserScalarWhereWithAggregatesInput | AppUserScalarWhereWithAggregatesInput[]
    OR?: AppUserScalarWhereWithAggregatesInput[]
    NOT?: AppUserScalarWhereWithAggregatesInput | AppUserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AppUser"> | number
    username?: StringWithAggregatesFilter<"AppUser"> | string
    password_hash?: StringWithAggregatesFilter<"AppUser"> | string
    full_name?: StringWithAggregatesFilter<"AppUser"> | string
    role?: StringWithAggregatesFilter<"AppUser"> | string
    email?: StringNullableWithAggregatesFilter<"AppUser"> | string | null
    phone?: StringNullableWithAggregatesFilter<"AppUser"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AppUser"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AppUser"> | Date | string
  }

  export type AppSessionWhereInput = {
    AND?: AppSessionWhereInput | AppSessionWhereInput[]
    OR?: AppSessionWhereInput[]
    NOT?: AppSessionWhereInput | AppSessionWhereInput[]
    session_id?: UuidFilter<"AppSession"> | string
    user_id?: IntFilter<"AppSession"> | number
    public_ip?: StringNullableFilter<"AppSession"> | string | null
    login_time?: DateTimeFilter<"AppSession"> | Date | string
    logout_time?: DateTimeNullableFilter<"AppSession"> | Date | string | null
    status?: StringFilter<"AppSession"> | string
    user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
  }

  export type AppSessionOrderByWithRelationInput = {
    session_id?: SortOrder
    user_id?: SortOrder
    public_ip?: SortOrderInput | SortOrder
    login_time?: SortOrder
    logout_time?: SortOrderInput | SortOrder
    status?: SortOrder
    user?: AppUserOrderByWithRelationInput
  }

  export type AppSessionWhereUniqueInput = Prisma.AtLeast<{
    session_id?: string
    AND?: AppSessionWhereInput | AppSessionWhereInput[]
    OR?: AppSessionWhereInput[]
    NOT?: AppSessionWhereInput | AppSessionWhereInput[]
    user_id?: IntFilter<"AppSession"> | number
    public_ip?: StringNullableFilter<"AppSession"> | string | null
    login_time?: DateTimeFilter<"AppSession"> | Date | string
    logout_time?: DateTimeNullableFilter<"AppSession"> | Date | string | null
    status?: StringFilter<"AppSession"> | string
    user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
  }, "session_id">

  export type AppSessionOrderByWithAggregationInput = {
    session_id?: SortOrder
    user_id?: SortOrder
    public_ip?: SortOrderInput | SortOrder
    login_time?: SortOrder
    logout_time?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: AppSessionCountOrderByAggregateInput
    _avg?: AppSessionAvgOrderByAggregateInput
    _max?: AppSessionMaxOrderByAggregateInput
    _min?: AppSessionMinOrderByAggregateInput
    _sum?: AppSessionSumOrderByAggregateInput
  }

  export type AppSessionScalarWhereWithAggregatesInput = {
    AND?: AppSessionScalarWhereWithAggregatesInput | AppSessionScalarWhereWithAggregatesInput[]
    OR?: AppSessionScalarWhereWithAggregatesInput[]
    NOT?: AppSessionScalarWhereWithAggregatesInput | AppSessionScalarWhereWithAggregatesInput[]
    session_id?: UuidWithAggregatesFilter<"AppSession"> | string
    user_id?: IntWithAggregatesFilter<"AppSession"> | number
    public_ip?: StringNullableWithAggregatesFilter<"AppSession"> | string | null
    login_time?: DateTimeWithAggregatesFilter<"AppSession"> | Date | string
    logout_time?: DateTimeNullableWithAggregatesFilter<"AppSession"> | Date | string | null
    status?: StringWithAggregatesFilter<"AppSession"> | string
  }

  export type AppActivityLogWhereInput = {
    AND?: AppActivityLogWhereInput | AppActivityLogWhereInput[]
    OR?: AppActivityLogWhereInput[]
    NOT?: AppActivityLogWhereInput | AppActivityLogWhereInput[]
    id?: IntFilter<"AppActivityLog"> | number
    activity_type?: StringFilter<"AppActivityLog"> | string
    username?: StringFilter<"AppActivityLog"> | string
    public_ip?: StringNullableFilter<"AppActivityLog"> | string | null
    details?: StringNullableFilter<"AppActivityLog"> | string | null
    created_at?: DateTimeFilter<"AppActivityLog"> | Date | string
  }

  export type AppActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    activity_type?: SortOrder
    username?: SortOrder
    public_ip?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type AppActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AppActivityLogWhereInput | AppActivityLogWhereInput[]
    OR?: AppActivityLogWhereInput[]
    NOT?: AppActivityLogWhereInput | AppActivityLogWhereInput[]
    activity_type?: StringFilter<"AppActivityLog"> | string
    username?: StringFilter<"AppActivityLog"> | string
    public_ip?: StringNullableFilter<"AppActivityLog"> | string | null
    details?: StringNullableFilter<"AppActivityLog"> | string | null
    created_at?: DateTimeFilter<"AppActivityLog"> | Date | string
  }, "id">

  export type AppActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    activity_type?: SortOrder
    username?: SortOrder
    public_ip?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AppActivityLogCountOrderByAggregateInput
    _avg?: AppActivityLogAvgOrderByAggregateInput
    _max?: AppActivityLogMaxOrderByAggregateInput
    _min?: AppActivityLogMinOrderByAggregateInput
    _sum?: AppActivityLogSumOrderByAggregateInput
  }

  export type AppActivityLogScalarWhereWithAggregatesInput = {
    AND?: AppActivityLogScalarWhereWithAggregatesInput | AppActivityLogScalarWhereWithAggregatesInput[]
    OR?: AppActivityLogScalarWhereWithAggregatesInput[]
    NOT?: AppActivityLogScalarWhereWithAggregatesInput | AppActivityLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AppActivityLog"> | number
    activity_type?: StringWithAggregatesFilter<"AppActivityLog"> | string
    username?: StringWithAggregatesFilter<"AppActivityLog"> | string
    public_ip?: StringNullableWithAggregatesFilter<"AppActivityLog"> | string | null
    details?: StringNullableWithAggregatesFilter<"AppActivityLog"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AppActivityLog"> | Date | string
  }

  export type LineStatusWhereInput = {
    AND?: LineStatusWhereInput | LineStatusWhereInput[]
    OR?: LineStatusWhereInput[]
    NOT?: LineStatusWhereInput | LineStatusWhereInput[]
    id?: IntFilter<"LineStatus"> | number
    line?: StringFilter<"LineStatus"> | string
    is_installed?: BoolFilter<"LineStatus"> | boolean
    updated_by?: StringNullableFilter<"LineStatus"> | string | null
    updated_at?: DateTimeFilter<"LineStatus"> | Date | string
  }

  export type LineStatusOrderByWithRelationInput = {
    id?: SortOrder
    line?: SortOrder
    is_installed?: SortOrder
    updated_by?: SortOrderInput | SortOrder
    updated_at?: SortOrder
  }

  export type LineStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    line?: string
    AND?: LineStatusWhereInput | LineStatusWhereInput[]
    OR?: LineStatusWhereInput[]
    NOT?: LineStatusWhereInput | LineStatusWhereInput[]
    is_installed?: BoolFilter<"LineStatus"> | boolean
    updated_by?: StringNullableFilter<"LineStatus"> | string | null
    updated_at?: DateTimeFilter<"LineStatus"> | Date | string
  }, "id" | "line">

  export type LineStatusOrderByWithAggregationInput = {
    id?: SortOrder
    line?: SortOrder
    is_installed?: SortOrder
    updated_by?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _count?: LineStatusCountOrderByAggregateInput
    _avg?: LineStatusAvgOrderByAggregateInput
    _max?: LineStatusMaxOrderByAggregateInput
    _min?: LineStatusMinOrderByAggregateInput
    _sum?: LineStatusSumOrderByAggregateInput
  }

  export type LineStatusScalarWhereWithAggregatesInput = {
    AND?: LineStatusScalarWhereWithAggregatesInput | LineStatusScalarWhereWithAggregatesInput[]
    OR?: LineStatusScalarWhereWithAggregatesInput[]
    NOT?: LineStatusScalarWhereWithAggregatesInput | LineStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LineStatus"> | number
    line?: StringWithAggregatesFilter<"LineStatus"> | string
    is_installed?: BoolWithAggregatesFilter<"LineStatus"> | boolean
    updated_by?: StringNullableWithAggregatesFilter<"LineStatus"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"LineStatus"> | Date | string
  }

  export type AoiChangeoverChecksheetWhereInput = {
    AND?: AoiChangeoverChecksheetWhereInput | AoiChangeoverChecksheetWhereInput[]
    OR?: AoiChangeoverChecksheetWhereInput[]
    NOT?: AoiChangeoverChecksheetWhereInput | AoiChangeoverChecksheetWhereInput[]
    id?: IntFilter<"AoiChangeoverChecksheet"> | number
    line?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    group_name?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    date?: DateTimeFilter<"AoiChangeoverChecksheet"> | Date | string
    shift?: StringFilter<"AoiChangeoverChecksheet"> | string
    model_name?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    model_code?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    changeover_type?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_steel_stencil_suffix_match?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_program_subpanel_serial_match?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_recheck_pcab_polarity?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_confirm_parameter_settings?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_read_barcode_on?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_eco_checklists?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_program_model_modify?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_vi_program_new_materia?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_limit_defective_alarm?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_test_program_bare_pcba?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_bot_program_serial_number?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_read_barcode_on?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_confirm_materials_mounted?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_delete_all_zones?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_equipment_model?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_eco_checklists?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_program_model_modify?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_recheck_chips_standard_models?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_scan_board_picture?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_limit_defective_alarm?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_confirm_polarity_shield?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_bot_program_serial_number?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_registered_standard_models_times?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    others_adjust_widths?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    others_add_test_standard_pcb_barcode?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    submitted_by?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    status?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    approval_status?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    designated_engineer_id?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    remarks?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    engineer_remarks?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    engineer_modified_fields?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    original_technician_data?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    created_at?: DateTimeFilter<"AoiChangeoverChecksheet"> | Date | string
    updated_at?: DateTimeFilter<"AoiChangeoverChecksheet"> | Date | string
  }

  export type AoiChangeoverChecksheetOrderByWithRelationInput = {
    id?: SortOrder
    line?: SortOrderInput | SortOrder
    group_name?: SortOrderInput | SortOrder
    date?: SortOrder
    shift?: SortOrder
    model_name?: SortOrderInput | SortOrder
    model_code?: SortOrderInput | SortOrder
    changeover_type?: SortOrderInput | SortOrder
    spi_steel_stencil_suffix_match?: SortOrderInput | SortOrder
    spi_program_subpanel_serial_match?: SortOrderInput | SortOrder
    spi_recheck_pcab_polarity?: SortOrderInput | SortOrder
    spi_confirm_parameter_settings?: SortOrderInput | SortOrder
    spi_read_barcode_on?: SortOrderInput | SortOrder
    pre_aoi_eco_checklists?: SortOrderInput | SortOrder
    pre_aoi_program_model_modify?: SortOrderInput | SortOrder
    pre_aoi_vi_program_new_materia?: SortOrderInput | SortOrder
    pre_aoi_limit_defective_alarm?: SortOrderInput | SortOrder
    pre_aoi_test_program_bare_pcba?: SortOrderInput | SortOrder
    pre_aoi_bot_program_serial_number?: SortOrderInput | SortOrder
    pre_aoi_read_barcode_on?: SortOrderInput | SortOrder
    pre_aoi_confirm_materials_mounted?: SortOrderInput | SortOrder
    pre_aoi_delete_all_zones?: SortOrderInput | SortOrder
    post_aoi_equipment_model?: SortOrderInput | SortOrder
    post_aoi_eco_checklists?: SortOrderInput | SortOrder
    post_aoi_program_model_modify?: SortOrderInput | SortOrder
    post_aoi_recheck_chips_standard_models?: SortOrderInput | SortOrder
    post_aoi_scan_board_picture?: SortOrderInput | SortOrder
    post_aoi_limit_defective_alarm?: SortOrderInput | SortOrder
    post_aoi_confirm_polarity_shield?: SortOrderInput | SortOrder
    post_aoi_bot_program_serial_number?: SortOrderInput | SortOrder
    post_aoi_registered_standard_models_times?: SortOrderInput | SortOrder
    others_adjust_widths?: SortOrderInput | SortOrder
    others_add_test_standard_pcb_barcode?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    approval_status?: SortOrderInput | SortOrder
    designated_engineer_id?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    engineer_remarks?: SortOrderInput | SortOrder
    engineer_modified_fields?: SortOrderInput | SortOrder
    original_technician_data?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiChangeoverChecksheetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AoiChangeoverChecksheetWhereInput | AoiChangeoverChecksheetWhereInput[]
    OR?: AoiChangeoverChecksheetWhereInput[]
    NOT?: AoiChangeoverChecksheetWhereInput | AoiChangeoverChecksheetWhereInput[]
    line?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    group_name?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    date?: DateTimeFilter<"AoiChangeoverChecksheet"> | Date | string
    shift?: StringFilter<"AoiChangeoverChecksheet"> | string
    model_name?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    model_code?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    changeover_type?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_steel_stencil_suffix_match?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_program_subpanel_serial_match?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_recheck_pcab_polarity?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_confirm_parameter_settings?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    spi_read_barcode_on?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_eco_checklists?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_program_model_modify?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_vi_program_new_materia?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_limit_defective_alarm?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_test_program_bare_pcba?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_bot_program_serial_number?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_read_barcode_on?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_confirm_materials_mounted?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_delete_all_zones?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_equipment_model?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_eco_checklists?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_program_model_modify?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_recheck_chips_standard_models?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_scan_board_picture?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_limit_defective_alarm?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_confirm_polarity_shield?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_bot_program_serial_number?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_registered_standard_models_times?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    others_adjust_widths?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    others_add_test_standard_pcb_barcode?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    submitted_by?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    status?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    approval_status?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    designated_engineer_id?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    remarks?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    engineer_remarks?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    engineer_modified_fields?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    original_technician_data?: StringNullableFilter<"AoiChangeoverChecksheet"> | string | null
    created_at?: DateTimeFilter<"AoiChangeoverChecksheet"> | Date | string
    updated_at?: DateTimeFilter<"AoiChangeoverChecksheet"> | Date | string
  }, "id">

  export type AoiChangeoverChecksheetOrderByWithAggregationInput = {
    id?: SortOrder
    line?: SortOrderInput | SortOrder
    group_name?: SortOrderInput | SortOrder
    date?: SortOrder
    shift?: SortOrder
    model_name?: SortOrderInput | SortOrder
    model_code?: SortOrderInput | SortOrder
    changeover_type?: SortOrderInput | SortOrder
    spi_steel_stencil_suffix_match?: SortOrderInput | SortOrder
    spi_program_subpanel_serial_match?: SortOrderInput | SortOrder
    spi_recheck_pcab_polarity?: SortOrderInput | SortOrder
    spi_confirm_parameter_settings?: SortOrderInput | SortOrder
    spi_read_barcode_on?: SortOrderInput | SortOrder
    pre_aoi_eco_checklists?: SortOrderInput | SortOrder
    pre_aoi_program_model_modify?: SortOrderInput | SortOrder
    pre_aoi_vi_program_new_materia?: SortOrderInput | SortOrder
    pre_aoi_limit_defective_alarm?: SortOrderInput | SortOrder
    pre_aoi_test_program_bare_pcba?: SortOrderInput | SortOrder
    pre_aoi_bot_program_serial_number?: SortOrderInput | SortOrder
    pre_aoi_read_barcode_on?: SortOrderInput | SortOrder
    pre_aoi_confirm_materials_mounted?: SortOrderInput | SortOrder
    pre_aoi_delete_all_zones?: SortOrderInput | SortOrder
    post_aoi_equipment_model?: SortOrderInput | SortOrder
    post_aoi_eco_checklists?: SortOrderInput | SortOrder
    post_aoi_program_model_modify?: SortOrderInput | SortOrder
    post_aoi_recheck_chips_standard_models?: SortOrderInput | SortOrder
    post_aoi_scan_board_picture?: SortOrderInput | SortOrder
    post_aoi_limit_defective_alarm?: SortOrderInput | SortOrder
    post_aoi_confirm_polarity_shield?: SortOrderInput | SortOrder
    post_aoi_bot_program_serial_number?: SortOrderInput | SortOrder
    post_aoi_registered_standard_models_times?: SortOrderInput | SortOrder
    others_adjust_widths?: SortOrderInput | SortOrder
    others_add_test_standard_pcb_barcode?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    approval_status?: SortOrderInput | SortOrder
    designated_engineer_id?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    engineer_remarks?: SortOrderInput | SortOrder
    engineer_modified_fields?: SortOrderInput | SortOrder
    original_technician_data?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AoiChangeoverChecksheetCountOrderByAggregateInput
    _avg?: AoiChangeoverChecksheetAvgOrderByAggregateInput
    _max?: AoiChangeoverChecksheetMaxOrderByAggregateInput
    _min?: AoiChangeoverChecksheetMinOrderByAggregateInput
    _sum?: AoiChangeoverChecksheetSumOrderByAggregateInput
  }

  export type AoiChangeoverChecksheetScalarWhereWithAggregatesInput = {
    AND?: AoiChangeoverChecksheetScalarWhereWithAggregatesInput | AoiChangeoverChecksheetScalarWhereWithAggregatesInput[]
    OR?: AoiChangeoverChecksheetScalarWhereWithAggregatesInput[]
    NOT?: AoiChangeoverChecksheetScalarWhereWithAggregatesInput | AoiChangeoverChecksheetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AoiChangeoverChecksheet"> | number
    line?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    group_name?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    date?: DateTimeWithAggregatesFilter<"AoiChangeoverChecksheet"> | Date | string
    shift?: StringWithAggregatesFilter<"AoiChangeoverChecksheet"> | string
    model_name?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    model_code?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    changeover_type?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    spi_steel_stencil_suffix_match?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    spi_program_subpanel_serial_match?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    spi_recheck_pcab_polarity?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    spi_confirm_parameter_settings?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    spi_read_barcode_on?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_eco_checklists?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_program_model_modify?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_vi_program_new_materia?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_limit_defective_alarm?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_test_program_bare_pcba?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_bot_program_serial_number?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_read_barcode_on?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_confirm_materials_mounted?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    pre_aoi_delete_all_zones?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_equipment_model?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_eco_checklists?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_program_model_modify?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_recheck_chips_standard_models?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_scan_board_picture?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_limit_defective_alarm?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_confirm_polarity_shield?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_bot_program_serial_number?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    post_aoi_registered_standard_models_times?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    others_adjust_widths?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    others_add_test_standard_pcb_barcode?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    submitted_by?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    status?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    approval_status?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    designated_engineer_id?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    engineer_remarks?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    engineer_modified_fields?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    original_technician_data?: StringNullableWithAggregatesFilter<"AoiChangeoverChecksheet"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AoiChangeoverChecksheet"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AoiChangeoverChecksheet"> | Date | string
  }

  export type LaserChangeoverChecksheetWhereInput = {
    AND?: LaserChangeoverChecksheetWhereInput | LaserChangeoverChecksheetWhereInput[]
    OR?: LaserChangeoverChecksheetWhereInput[]
    NOT?: LaserChangeoverChecksheetWhereInput | LaserChangeoverChecksheetWhereInput[]
    id?: IntFilter<"LaserChangeoverChecksheet"> | number
    line?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    group_name?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    program_name?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    date?: DateTimeFilter<"LaserChangeoverChecksheet"> | Date | string
    shift?: StringFilter<"LaserChangeoverChecksheet"> | string
    prog_name_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_param_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    duplicate_code_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    pcb_anti_reverse_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    ab_barcode_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_sequence_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_position_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    grp_ldr_prog_name_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    grp_ldr_laser_position_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    status?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    approval_status?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    designated_engineer_id?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    designated_group_leader_id?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    remarks?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    engineer_remarks?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    pd_remarks?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    submitted_by?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    engineer_signature?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    group_leader_signature?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    created_at?: DateTimeFilter<"LaserChangeoverChecksheet"> | Date | string
    updated_at?: DateTimeFilter<"LaserChangeoverChecksheet"> | Date | string
  }

  export type LaserChangeoverChecksheetOrderByWithRelationInput = {
    id?: SortOrder
    line?: SortOrderInput | SortOrder
    group_name?: SortOrderInput | SortOrder
    program_name?: SortOrderInput | SortOrder
    date?: SortOrder
    shift?: SortOrder
    prog_name_check?: SortOrderInput | SortOrder
    laser_param_check?: SortOrderInput | SortOrder
    duplicate_code_check?: SortOrderInput | SortOrder
    pcb_anti_reverse_check?: SortOrderInput | SortOrder
    ab_barcode_check?: SortOrderInput | SortOrder
    laser_sequence_check?: SortOrderInput | SortOrder
    laser_position_check?: SortOrderInput | SortOrder
    grp_ldr_prog_name_check?: SortOrderInput | SortOrder
    grp_ldr_laser_position_check?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    approval_status?: SortOrderInput | SortOrder
    designated_engineer_id?: SortOrderInput | SortOrder
    designated_group_leader_id?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    engineer_remarks?: SortOrderInput | SortOrder
    pd_remarks?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    engineer_signature?: SortOrderInput | SortOrder
    group_leader_signature?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LaserChangeoverChecksheetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LaserChangeoverChecksheetWhereInput | LaserChangeoverChecksheetWhereInput[]
    OR?: LaserChangeoverChecksheetWhereInput[]
    NOT?: LaserChangeoverChecksheetWhereInput | LaserChangeoverChecksheetWhereInput[]
    line?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    group_name?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    program_name?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    date?: DateTimeFilter<"LaserChangeoverChecksheet"> | Date | string
    shift?: StringFilter<"LaserChangeoverChecksheet"> | string
    prog_name_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_param_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    duplicate_code_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    pcb_anti_reverse_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    ab_barcode_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_sequence_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_position_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    grp_ldr_prog_name_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    grp_ldr_laser_position_check?: BoolNullableFilter<"LaserChangeoverChecksheet"> | boolean | null
    status?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    approval_status?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    designated_engineer_id?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    designated_group_leader_id?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    remarks?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    engineer_remarks?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    pd_remarks?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    submitted_by?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    engineer_signature?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    group_leader_signature?: StringNullableFilter<"LaserChangeoverChecksheet"> | string | null
    created_at?: DateTimeFilter<"LaserChangeoverChecksheet"> | Date | string
    updated_at?: DateTimeFilter<"LaserChangeoverChecksheet"> | Date | string
  }, "id">

  export type LaserChangeoverChecksheetOrderByWithAggregationInput = {
    id?: SortOrder
    line?: SortOrderInput | SortOrder
    group_name?: SortOrderInput | SortOrder
    program_name?: SortOrderInput | SortOrder
    date?: SortOrder
    shift?: SortOrder
    prog_name_check?: SortOrderInput | SortOrder
    laser_param_check?: SortOrderInput | SortOrder
    duplicate_code_check?: SortOrderInput | SortOrder
    pcb_anti_reverse_check?: SortOrderInput | SortOrder
    ab_barcode_check?: SortOrderInput | SortOrder
    laser_sequence_check?: SortOrderInput | SortOrder
    laser_position_check?: SortOrderInput | SortOrder
    grp_ldr_prog_name_check?: SortOrderInput | SortOrder
    grp_ldr_laser_position_check?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    approval_status?: SortOrderInput | SortOrder
    designated_engineer_id?: SortOrderInput | SortOrder
    designated_group_leader_id?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    engineer_remarks?: SortOrderInput | SortOrder
    pd_remarks?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    engineer_signature?: SortOrderInput | SortOrder
    group_leader_signature?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LaserChangeoverChecksheetCountOrderByAggregateInput
    _avg?: LaserChangeoverChecksheetAvgOrderByAggregateInput
    _max?: LaserChangeoverChecksheetMaxOrderByAggregateInput
    _min?: LaserChangeoverChecksheetMinOrderByAggregateInput
    _sum?: LaserChangeoverChecksheetSumOrderByAggregateInput
  }

  export type LaserChangeoverChecksheetScalarWhereWithAggregatesInput = {
    AND?: LaserChangeoverChecksheetScalarWhereWithAggregatesInput | LaserChangeoverChecksheetScalarWhereWithAggregatesInput[]
    OR?: LaserChangeoverChecksheetScalarWhereWithAggregatesInput[]
    NOT?: LaserChangeoverChecksheetScalarWhereWithAggregatesInput | LaserChangeoverChecksheetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LaserChangeoverChecksheet"> | number
    line?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    group_name?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    program_name?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    date?: DateTimeWithAggregatesFilter<"LaserChangeoverChecksheet"> | Date | string
    shift?: StringWithAggregatesFilter<"LaserChangeoverChecksheet"> | string
    prog_name_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_param_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    duplicate_code_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    pcb_anti_reverse_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    ab_barcode_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_sequence_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    laser_position_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    grp_ldr_prog_name_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    grp_ldr_laser_position_check?: BoolNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | boolean | null
    status?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    approval_status?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    designated_engineer_id?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    designated_group_leader_id?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    engineer_remarks?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    pd_remarks?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    submitted_by?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    engineer_signature?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    group_leader_signature?: StringNullableWithAggregatesFilter<"LaserChangeoverChecksheet"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"LaserChangeoverChecksheet"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LaserChangeoverChecksheet"> | Date | string
  }

  export type AoiFunctionCheckpointCreateInput = {
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    responsible_person?: string | null
    time?: string | null
    submitted_by?: string | null
    status?: string | null
    laser_barcode_before_bot?: boolean | null
    laser_barcode_before_top?: boolean | null
    laser_barcode_after_bot?: boolean | null
    laser_barcode_after_top?: boolean | null
    laser_pcb_text_before?: boolean | null
    laser_pcb_text_after?: boolean | null
    spi_barcode_before_bot?: boolean | null
    spi_barcode_before_top?: boolean | null
    spi_barcode_after_bot?: boolean | null
    spi_barcode_after_top?: boolean | null
    spi_mes_before_bot?: boolean | null
    spi_mes_before_top?: boolean | null
    spi_mes_after_bot?: boolean | null
    spi_mes_after_top?: boolean | null
    pre_aoi_barcode_before_bot?: boolean | null
    pre_aoi_barcode_before_top?: boolean | null
    pre_aoi_barcode_after_bot?: boolean | null
    pre_aoi_barcode_after_top?: boolean | null
    post_aoi_barcode_before_bot?: boolean | null
    post_aoi_barcode_before_top?: boolean | null
    post_aoi_barcode_after_bot?: boolean | null
    post_aoi_barcode_after_top?: boolean | null
    password_function_pre_aoi_before?: boolean | null
    password_function_pre_aoi_after?: boolean | null
    spi_fov_before?: boolean | null
    spi_fov_after?: boolean | null
    pre_aoi_fov_before?: boolean | null
    pre_aoi_fov_after?: boolean | null
    post_aoi_fov_before?: boolean | null
    post_aoi_fov_after?: boolean | null
    pre_aoi_spc_before?: boolean | null
    pre_aoi_spc_after?: boolean | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiFunctionCheckpointUncheckedCreateInput = {
    id?: number
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    responsible_person?: string | null
    time?: string | null
    submitted_by?: string | null
    status?: string | null
    laser_barcode_before_bot?: boolean | null
    laser_barcode_before_top?: boolean | null
    laser_barcode_after_bot?: boolean | null
    laser_barcode_after_top?: boolean | null
    laser_pcb_text_before?: boolean | null
    laser_pcb_text_after?: boolean | null
    spi_barcode_before_bot?: boolean | null
    spi_barcode_before_top?: boolean | null
    spi_barcode_after_bot?: boolean | null
    spi_barcode_after_top?: boolean | null
    spi_mes_before_bot?: boolean | null
    spi_mes_before_top?: boolean | null
    spi_mes_after_bot?: boolean | null
    spi_mes_after_top?: boolean | null
    pre_aoi_barcode_before_bot?: boolean | null
    pre_aoi_barcode_before_top?: boolean | null
    pre_aoi_barcode_after_bot?: boolean | null
    pre_aoi_barcode_after_top?: boolean | null
    post_aoi_barcode_before_bot?: boolean | null
    post_aoi_barcode_before_top?: boolean | null
    post_aoi_barcode_after_bot?: boolean | null
    post_aoi_barcode_after_top?: boolean | null
    password_function_pre_aoi_before?: boolean | null
    password_function_pre_aoi_after?: boolean | null
    spi_fov_before?: boolean | null
    spi_fov_after?: boolean | null
    pre_aoi_fov_before?: boolean | null
    pre_aoi_fov_after?: boolean | null
    post_aoi_fov_before?: boolean | null
    post_aoi_fov_after?: boolean | null
    pre_aoi_spc_before?: boolean | null
    pre_aoi_spc_after?: boolean | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiFunctionCheckpointUpdateInput = {
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    responsible_person?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    laser_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_pcb_text_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_pcb_text_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password_function_pre_aoi_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password_function_pre_aoi_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_spc_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_spc_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiFunctionCheckpointUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    responsible_person?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    laser_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_pcb_text_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_pcb_text_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password_function_pre_aoi_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password_function_pre_aoi_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_spc_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_spc_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiFunctionCheckpointCreateManyInput = {
    id?: number
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    responsible_person?: string | null
    time?: string | null
    submitted_by?: string | null
    status?: string | null
    laser_barcode_before_bot?: boolean | null
    laser_barcode_before_top?: boolean | null
    laser_barcode_after_bot?: boolean | null
    laser_barcode_after_top?: boolean | null
    laser_pcb_text_before?: boolean | null
    laser_pcb_text_after?: boolean | null
    spi_barcode_before_bot?: boolean | null
    spi_barcode_before_top?: boolean | null
    spi_barcode_after_bot?: boolean | null
    spi_barcode_after_top?: boolean | null
    spi_mes_before_bot?: boolean | null
    spi_mes_before_top?: boolean | null
    spi_mes_after_bot?: boolean | null
    spi_mes_after_top?: boolean | null
    pre_aoi_barcode_before_bot?: boolean | null
    pre_aoi_barcode_before_top?: boolean | null
    pre_aoi_barcode_after_bot?: boolean | null
    pre_aoi_barcode_after_top?: boolean | null
    post_aoi_barcode_before_bot?: boolean | null
    post_aoi_barcode_before_top?: boolean | null
    post_aoi_barcode_after_bot?: boolean | null
    post_aoi_barcode_after_top?: boolean | null
    password_function_pre_aoi_before?: boolean | null
    password_function_pre_aoi_after?: boolean | null
    spi_fov_before?: boolean | null
    spi_fov_after?: boolean | null
    pre_aoi_fov_before?: boolean | null
    pre_aoi_fov_after?: boolean | null
    post_aoi_fov_before?: boolean | null
    post_aoi_fov_after?: boolean | null
    pre_aoi_spc_before?: boolean | null
    pre_aoi_spc_after?: boolean | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiFunctionCheckpointUpdateManyMutationInput = {
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    responsible_person?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    laser_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_pcb_text_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_pcb_text_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password_function_pre_aoi_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password_function_pre_aoi_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_spc_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_spc_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiFunctionCheckpointUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    responsible_person?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    laser_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_pcb_text_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_pcb_text_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_mes_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_before_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_before_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_after_bot?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_barcode_after_top?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password_function_pre_aoi_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password_function_pre_aoi_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    spi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_fov_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    post_aoi_fov_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_spc_before?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pre_aoi_spc_after?: NullableBoolFieldUpdateOperationsInput | boolean | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiTechnicianChecklistCreateInput = {
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    pre_aoi_program_full_name?: string | null
    stencil_serial_no_b_side?: string | null
    stencil_serial_no_a_side?: string | null
    barcode_read_a_layer?: string | null
    barcode_read_a_spi?: string | null
    barcode_read_a_pre_aoi?: string | null
    barcode_read_b_layer?: string | null
    barcode_read_b_spi?: string | null
    barcode_read_b_pre_aoi?: string | null
    workorder_info_pre_aoi?: string | null
    workorder_info_post_aoi?: string | null
    aoi_scan_tools_workorder_traceability?: string | null
    confirmation?: string | null
    submitted_by?: string | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiTechnicianChecklistUncheckedCreateInput = {
    id?: number
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    pre_aoi_program_full_name?: string | null
    stencil_serial_no_b_side?: string | null
    stencil_serial_no_a_side?: string | null
    barcode_read_a_layer?: string | null
    barcode_read_a_spi?: string | null
    barcode_read_a_pre_aoi?: string | null
    barcode_read_b_layer?: string | null
    barcode_read_b_spi?: string | null
    barcode_read_b_pre_aoi?: string | null
    workorder_info_pre_aoi?: string | null
    workorder_info_post_aoi?: string | null
    aoi_scan_tools_workorder_traceability?: string | null
    confirmation?: string | null
    submitted_by?: string | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiTechnicianChecklistUpdateInput = {
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    pre_aoi_program_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    stencil_serial_no_b_side?: NullableStringFieldUpdateOperationsInput | string | null
    stencil_serial_no_a_side?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_layer?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_spi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_layer?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_spi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    workorder_info_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    workorder_info_post_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    aoi_scan_tools_workorder_traceability?: NullableStringFieldUpdateOperationsInput | string | null
    confirmation?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiTechnicianChecklistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    pre_aoi_program_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    stencil_serial_no_b_side?: NullableStringFieldUpdateOperationsInput | string | null
    stencil_serial_no_a_side?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_layer?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_spi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_layer?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_spi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    workorder_info_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    workorder_info_post_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    aoi_scan_tools_workorder_traceability?: NullableStringFieldUpdateOperationsInput | string | null
    confirmation?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiTechnicianChecklistCreateManyInput = {
    id?: number
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    pre_aoi_program_full_name?: string | null
    stencil_serial_no_b_side?: string | null
    stencil_serial_no_a_side?: string | null
    barcode_read_a_layer?: string | null
    barcode_read_a_spi?: string | null
    barcode_read_a_pre_aoi?: string | null
    barcode_read_b_layer?: string | null
    barcode_read_b_spi?: string | null
    barcode_read_b_pre_aoi?: string | null
    workorder_info_pre_aoi?: string | null
    workorder_info_post_aoi?: string | null
    aoi_scan_tools_workorder_traceability?: string | null
    confirmation?: string | null
    submitted_by?: string | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiTechnicianChecklistUpdateManyMutationInput = {
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    pre_aoi_program_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    stencil_serial_no_b_side?: NullableStringFieldUpdateOperationsInput | string | null
    stencil_serial_no_a_side?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_layer?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_spi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_layer?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_spi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    workorder_info_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    workorder_info_post_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    aoi_scan_tools_workorder_traceability?: NullableStringFieldUpdateOperationsInput | string | null
    confirmation?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiTechnicianChecklistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    pre_aoi_program_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    stencil_serial_no_b_side?: NullableStringFieldUpdateOperationsInput | string | null
    stencil_serial_no_a_side?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_layer?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_spi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_a_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_layer?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_spi?: NullableStringFieldUpdateOperationsInput | string | null
    barcode_read_b_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    workorder_info_pre_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    workorder_info_post_aoi?: NullableStringFieldUpdateOperationsInput | string | null
    aoi_scan_tools_workorder_traceability?: NullableStringFieldUpdateOperationsInput | string | null
    confirmation?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUserCreateInput = {
    username: string
    password_hash: string
    full_name: string
    role?: string
    email?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: AppSessionCreateNestedManyWithoutUserInput
  }

  export type AppUserUncheckedCreateInput = {
    id?: number
    username: string
    password_hash: string
    full_name: string
    role?: string
    email?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: AppSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type AppUserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AppSessionUpdateManyWithoutUserNestedInput
  }

  export type AppUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AppSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AppUserCreateManyInput = {
    id?: number
    username: string
    password_hash: string
    full_name: string
    role?: string
    email?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppUserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSessionCreateInput = {
    session_id: string
    public_ip?: string | null
    login_time?: Date | string
    logout_time?: Date | string | null
    status?: string
    user: AppUserCreateNestedOneWithoutSessionsInput
  }

  export type AppSessionUncheckedCreateInput = {
    session_id: string
    user_id: number
    public_ip?: string | null
    login_time?: Date | string
    logout_time?: Date | string | null
    status?: string
  }

  export type AppSessionUpdateInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    login_time?: DateTimeFieldUpdateOperationsInput | Date | string
    logout_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    user?: AppUserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type AppSessionUncheckedUpdateInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    login_time?: DateTimeFieldUpdateOperationsInput | Date | string
    logout_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppSessionCreateManyInput = {
    session_id: string
    user_id: number
    public_ip?: string | null
    login_time?: Date | string
    logout_time?: Date | string | null
    status?: string
  }

  export type AppSessionUpdateManyMutationInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    login_time?: DateTimeFieldUpdateOperationsInput | Date | string
    logout_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppSessionUncheckedUpdateManyInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    login_time?: DateTimeFieldUpdateOperationsInput | Date | string
    logout_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppActivityLogCreateInput = {
    activity_type: string
    username: string
    public_ip?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AppActivityLogUncheckedCreateInput = {
    id?: number
    activity_type: string
    username: string
    public_ip?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AppActivityLogUpdateInput = {
    activity_type?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppActivityLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    activity_type?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppActivityLogCreateManyInput = {
    id?: number
    activity_type: string
    username: string
    public_ip?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AppActivityLogUpdateManyMutationInput = {
    activity_type?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppActivityLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    activity_type?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineStatusCreateInput = {
    line: string
    is_installed?: boolean
    updated_by?: string | null
    updated_at?: Date | string
  }

  export type LineStatusUncheckedCreateInput = {
    id?: number
    line: string
    is_installed?: boolean
    updated_by?: string | null
    updated_at?: Date | string
  }

  export type LineStatusUpdateInput = {
    line?: StringFieldUpdateOperationsInput | string
    is_installed?: BoolFieldUpdateOperationsInput | boolean
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: StringFieldUpdateOperationsInput | string
    is_installed?: BoolFieldUpdateOperationsInput | boolean
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineStatusCreateManyInput = {
    id?: number
    line: string
    is_installed?: boolean
    updated_by?: string | null
    updated_at?: Date | string
  }

  export type LineStatusUpdateManyMutationInput = {
    line?: StringFieldUpdateOperationsInput | string
    is_installed?: BoolFieldUpdateOperationsInput | boolean
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: StringFieldUpdateOperationsInput | string
    is_installed?: BoolFieldUpdateOperationsInput | boolean
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiChangeoverChecksheetCreateInput = {
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    model_name?: string | null
    model_code?: string | null
    changeover_type?: string | null
    spi_steel_stencil_suffix_match?: string | null
    spi_program_subpanel_serial_match?: string | null
    spi_recheck_pcab_polarity?: string | null
    spi_confirm_parameter_settings?: string | null
    spi_read_barcode_on?: string | null
    pre_aoi_eco_checklists?: string | null
    pre_aoi_program_model_modify?: string | null
    pre_aoi_vi_program_new_materia?: string | null
    pre_aoi_limit_defective_alarm?: string | null
    pre_aoi_test_program_bare_pcba?: string | null
    pre_aoi_bot_program_serial_number?: string | null
    pre_aoi_read_barcode_on?: string | null
    pre_aoi_confirm_materials_mounted?: string | null
    pre_aoi_delete_all_zones?: string | null
    post_aoi_equipment_model?: string | null
    post_aoi_eco_checklists?: string | null
    post_aoi_program_model_modify?: string | null
    post_aoi_recheck_chips_standard_models?: string | null
    post_aoi_scan_board_picture?: string | null
    post_aoi_limit_defective_alarm?: string | null
    post_aoi_confirm_polarity_shield?: string | null
    post_aoi_bot_program_serial_number?: string | null
    post_aoi_registered_standard_models_times?: string | null
    others_adjust_widths?: string | null
    others_add_test_standard_pcb_barcode?: string | null
    submitted_by?: string | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiChangeoverChecksheetUncheckedCreateInput = {
    id?: number
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    model_name?: string | null
    model_code?: string | null
    changeover_type?: string | null
    spi_steel_stencil_suffix_match?: string | null
    spi_program_subpanel_serial_match?: string | null
    spi_recheck_pcab_polarity?: string | null
    spi_confirm_parameter_settings?: string | null
    spi_read_barcode_on?: string | null
    pre_aoi_eco_checklists?: string | null
    pre_aoi_program_model_modify?: string | null
    pre_aoi_vi_program_new_materia?: string | null
    pre_aoi_limit_defective_alarm?: string | null
    pre_aoi_test_program_bare_pcba?: string | null
    pre_aoi_bot_program_serial_number?: string | null
    pre_aoi_read_barcode_on?: string | null
    pre_aoi_confirm_materials_mounted?: string | null
    pre_aoi_delete_all_zones?: string | null
    post_aoi_equipment_model?: string | null
    post_aoi_eco_checklists?: string | null
    post_aoi_program_model_modify?: string | null
    post_aoi_recheck_chips_standard_models?: string | null
    post_aoi_scan_board_picture?: string | null
    post_aoi_limit_defective_alarm?: string | null
    post_aoi_confirm_polarity_shield?: string | null
    post_aoi_bot_program_serial_number?: string | null
    post_aoi_registered_standard_models_times?: string | null
    others_adjust_widths?: string | null
    others_add_test_standard_pcb_barcode?: string | null
    submitted_by?: string | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiChangeoverChecksheetUpdateInput = {
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    model_name?: NullableStringFieldUpdateOperationsInput | string | null
    model_code?: NullableStringFieldUpdateOperationsInput | string | null
    changeover_type?: NullableStringFieldUpdateOperationsInput | string | null
    spi_steel_stencil_suffix_match?: NullableStringFieldUpdateOperationsInput | string | null
    spi_program_subpanel_serial_match?: NullableStringFieldUpdateOperationsInput | string | null
    spi_recheck_pcab_polarity?: NullableStringFieldUpdateOperationsInput | string | null
    spi_confirm_parameter_settings?: NullableStringFieldUpdateOperationsInput | string | null
    spi_read_barcode_on?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_eco_checklists?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_program_model_modify?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_vi_program_new_materia?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_limit_defective_alarm?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_test_program_bare_pcba?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_bot_program_serial_number?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_read_barcode_on?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_confirm_materials_mounted?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_delete_all_zones?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_equipment_model?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_eco_checklists?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_program_model_modify?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_recheck_chips_standard_models?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_scan_board_picture?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_limit_defective_alarm?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_confirm_polarity_shield?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_bot_program_serial_number?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_registered_standard_models_times?: NullableStringFieldUpdateOperationsInput | string | null
    others_adjust_widths?: NullableStringFieldUpdateOperationsInput | string | null
    others_add_test_standard_pcb_barcode?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiChangeoverChecksheetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    model_name?: NullableStringFieldUpdateOperationsInput | string | null
    model_code?: NullableStringFieldUpdateOperationsInput | string | null
    changeover_type?: NullableStringFieldUpdateOperationsInput | string | null
    spi_steel_stencil_suffix_match?: NullableStringFieldUpdateOperationsInput | string | null
    spi_program_subpanel_serial_match?: NullableStringFieldUpdateOperationsInput | string | null
    spi_recheck_pcab_polarity?: NullableStringFieldUpdateOperationsInput | string | null
    spi_confirm_parameter_settings?: NullableStringFieldUpdateOperationsInput | string | null
    spi_read_barcode_on?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_eco_checklists?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_program_model_modify?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_vi_program_new_materia?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_limit_defective_alarm?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_test_program_bare_pcba?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_bot_program_serial_number?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_read_barcode_on?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_confirm_materials_mounted?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_delete_all_zones?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_equipment_model?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_eco_checklists?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_program_model_modify?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_recheck_chips_standard_models?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_scan_board_picture?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_limit_defective_alarm?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_confirm_polarity_shield?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_bot_program_serial_number?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_registered_standard_models_times?: NullableStringFieldUpdateOperationsInput | string | null
    others_adjust_widths?: NullableStringFieldUpdateOperationsInput | string | null
    others_add_test_standard_pcb_barcode?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiChangeoverChecksheetCreateManyInput = {
    id?: number
    line?: string | null
    group_name?: string | null
    date: Date | string
    shift: string
    model_name?: string | null
    model_code?: string | null
    changeover_type?: string | null
    spi_steel_stencil_suffix_match?: string | null
    spi_program_subpanel_serial_match?: string | null
    spi_recheck_pcab_polarity?: string | null
    spi_confirm_parameter_settings?: string | null
    spi_read_barcode_on?: string | null
    pre_aoi_eco_checklists?: string | null
    pre_aoi_program_model_modify?: string | null
    pre_aoi_vi_program_new_materia?: string | null
    pre_aoi_limit_defective_alarm?: string | null
    pre_aoi_test_program_bare_pcba?: string | null
    pre_aoi_bot_program_serial_number?: string | null
    pre_aoi_read_barcode_on?: string | null
    pre_aoi_confirm_materials_mounted?: string | null
    pre_aoi_delete_all_zones?: string | null
    post_aoi_equipment_model?: string | null
    post_aoi_eco_checklists?: string | null
    post_aoi_program_model_modify?: string | null
    post_aoi_recheck_chips_standard_models?: string | null
    post_aoi_scan_board_picture?: string | null
    post_aoi_limit_defective_alarm?: string | null
    post_aoi_confirm_polarity_shield?: string | null
    post_aoi_bot_program_serial_number?: string | null
    post_aoi_registered_standard_models_times?: string | null
    others_adjust_widths?: string | null
    others_add_test_standard_pcb_barcode?: string | null
    submitted_by?: string | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    engineer_modified_fields?: string | null
    original_technician_data?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AoiChangeoverChecksheetUpdateManyMutationInput = {
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    model_name?: NullableStringFieldUpdateOperationsInput | string | null
    model_code?: NullableStringFieldUpdateOperationsInput | string | null
    changeover_type?: NullableStringFieldUpdateOperationsInput | string | null
    spi_steel_stencil_suffix_match?: NullableStringFieldUpdateOperationsInput | string | null
    spi_program_subpanel_serial_match?: NullableStringFieldUpdateOperationsInput | string | null
    spi_recheck_pcab_polarity?: NullableStringFieldUpdateOperationsInput | string | null
    spi_confirm_parameter_settings?: NullableStringFieldUpdateOperationsInput | string | null
    spi_read_barcode_on?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_eco_checklists?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_program_model_modify?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_vi_program_new_materia?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_limit_defective_alarm?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_test_program_bare_pcba?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_bot_program_serial_number?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_read_barcode_on?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_confirm_materials_mounted?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_delete_all_zones?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_equipment_model?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_eco_checklists?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_program_model_modify?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_recheck_chips_standard_models?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_scan_board_picture?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_limit_defective_alarm?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_confirm_polarity_shield?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_bot_program_serial_number?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_registered_standard_models_times?: NullableStringFieldUpdateOperationsInput | string | null
    others_adjust_widths?: NullableStringFieldUpdateOperationsInput | string | null
    others_add_test_standard_pcb_barcode?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AoiChangeoverChecksheetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    model_name?: NullableStringFieldUpdateOperationsInput | string | null
    model_code?: NullableStringFieldUpdateOperationsInput | string | null
    changeover_type?: NullableStringFieldUpdateOperationsInput | string | null
    spi_steel_stencil_suffix_match?: NullableStringFieldUpdateOperationsInput | string | null
    spi_program_subpanel_serial_match?: NullableStringFieldUpdateOperationsInput | string | null
    spi_recheck_pcab_polarity?: NullableStringFieldUpdateOperationsInput | string | null
    spi_confirm_parameter_settings?: NullableStringFieldUpdateOperationsInput | string | null
    spi_read_barcode_on?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_eco_checklists?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_program_model_modify?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_vi_program_new_materia?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_limit_defective_alarm?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_test_program_bare_pcba?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_bot_program_serial_number?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_read_barcode_on?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_confirm_materials_mounted?: NullableStringFieldUpdateOperationsInput | string | null
    pre_aoi_delete_all_zones?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_equipment_model?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_eco_checklists?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_program_model_modify?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_recheck_chips_standard_models?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_scan_board_picture?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_limit_defective_alarm?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_confirm_polarity_shield?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_bot_program_serial_number?: NullableStringFieldUpdateOperationsInput | string | null
    post_aoi_registered_standard_models_times?: NullableStringFieldUpdateOperationsInput | string | null
    others_adjust_widths?: NullableStringFieldUpdateOperationsInput | string | null
    others_add_test_standard_pcb_barcode?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_modified_fields?: NullableStringFieldUpdateOperationsInput | string | null
    original_technician_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaserChangeoverChecksheetCreateInput = {
    line?: string | null
    group_name?: string | null
    program_name?: string | null
    date: Date | string
    shift: string
    prog_name_check?: boolean | null
    laser_param_check?: boolean | null
    duplicate_code_check?: boolean | null
    pcb_anti_reverse_check?: boolean | null
    ab_barcode_check?: boolean | null
    laser_sequence_check?: boolean | null
    laser_position_check?: boolean | null
    grp_ldr_prog_name_check?: boolean | null
    grp_ldr_laser_position_check?: boolean | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    designated_group_leader_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    pd_remarks?: string | null
    submitted_by?: string | null
    engineer_signature?: string | null
    group_leader_signature?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LaserChangeoverChecksheetUncheckedCreateInput = {
    id?: number
    line?: string | null
    group_name?: string | null
    program_name?: string | null
    date: Date | string
    shift: string
    prog_name_check?: boolean | null
    laser_param_check?: boolean | null
    duplicate_code_check?: boolean | null
    pcb_anti_reverse_check?: boolean | null
    ab_barcode_check?: boolean | null
    laser_sequence_check?: boolean | null
    laser_position_check?: boolean | null
    grp_ldr_prog_name_check?: boolean | null
    grp_ldr_laser_position_check?: boolean | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    designated_group_leader_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    pd_remarks?: string | null
    submitted_by?: string | null
    engineer_signature?: string | null
    group_leader_signature?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LaserChangeoverChecksheetUpdateInput = {
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    program_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    prog_name_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_param_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duplicate_code_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pcb_anti_reverse_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ab_barcode_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_sequence_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_position_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    grp_ldr_prog_name_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    grp_ldr_laser_position_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    designated_group_leader_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    pd_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_signature?: NullableStringFieldUpdateOperationsInput | string | null
    group_leader_signature?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaserChangeoverChecksheetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    program_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    prog_name_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_param_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duplicate_code_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pcb_anti_reverse_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ab_barcode_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_sequence_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_position_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    grp_ldr_prog_name_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    grp_ldr_laser_position_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    designated_group_leader_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    pd_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_signature?: NullableStringFieldUpdateOperationsInput | string | null
    group_leader_signature?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaserChangeoverChecksheetCreateManyInput = {
    id?: number
    line?: string | null
    group_name?: string | null
    program_name?: string | null
    date: Date | string
    shift: string
    prog_name_check?: boolean | null
    laser_param_check?: boolean | null
    duplicate_code_check?: boolean | null
    pcb_anti_reverse_check?: boolean | null
    ab_barcode_check?: boolean | null
    laser_sequence_check?: boolean | null
    laser_position_check?: boolean | null
    grp_ldr_prog_name_check?: boolean | null
    grp_ldr_laser_position_check?: boolean | null
    status?: string | null
    approval_status?: string | null
    designated_engineer_id?: string | null
    designated_group_leader_id?: string | null
    remarks?: string | null
    engineer_remarks?: string | null
    pd_remarks?: string | null
    submitted_by?: string | null
    engineer_signature?: string | null
    group_leader_signature?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LaserChangeoverChecksheetUpdateManyMutationInput = {
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    program_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    prog_name_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_param_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duplicate_code_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pcb_anti_reverse_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ab_barcode_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_sequence_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_position_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    grp_ldr_prog_name_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    grp_ldr_laser_position_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    designated_group_leader_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    pd_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_signature?: NullableStringFieldUpdateOperationsInput | string | null
    group_leader_signature?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaserChangeoverChecksheetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    line?: NullableStringFieldUpdateOperationsInput | string | null
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    program_name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: StringFieldUpdateOperationsInput | string
    prog_name_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_param_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duplicate_code_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pcb_anti_reverse_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ab_barcode_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_sequence_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    laser_position_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    grp_ldr_prog_name_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    grp_ldr_laser_position_check?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: NullableStringFieldUpdateOperationsInput | string | null
    designated_engineer_id?: NullableStringFieldUpdateOperationsInput | string | null
    designated_group_leader_id?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    pd_remarks?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    engineer_signature?: NullableStringFieldUpdateOperationsInput | string | null
    group_leader_signature?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AoiFunctionCheckpointCountOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    responsible_person?: SortOrder
    time?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    laser_barcode_before_bot?: SortOrder
    laser_barcode_before_top?: SortOrder
    laser_barcode_after_bot?: SortOrder
    laser_barcode_after_top?: SortOrder
    laser_pcb_text_before?: SortOrder
    laser_pcb_text_after?: SortOrder
    spi_barcode_before_bot?: SortOrder
    spi_barcode_before_top?: SortOrder
    spi_barcode_after_bot?: SortOrder
    spi_barcode_after_top?: SortOrder
    spi_mes_before_bot?: SortOrder
    spi_mes_before_top?: SortOrder
    spi_mes_after_bot?: SortOrder
    spi_mes_after_top?: SortOrder
    pre_aoi_barcode_before_bot?: SortOrder
    pre_aoi_barcode_before_top?: SortOrder
    pre_aoi_barcode_after_bot?: SortOrder
    pre_aoi_barcode_after_top?: SortOrder
    post_aoi_barcode_before_bot?: SortOrder
    post_aoi_barcode_before_top?: SortOrder
    post_aoi_barcode_after_bot?: SortOrder
    post_aoi_barcode_after_top?: SortOrder
    password_function_pre_aoi_before?: SortOrder
    password_function_pre_aoi_after?: SortOrder
    spi_fov_before?: SortOrder
    spi_fov_after?: SortOrder
    pre_aoi_fov_before?: SortOrder
    pre_aoi_fov_after?: SortOrder
    post_aoi_fov_before?: SortOrder
    post_aoi_fov_after?: SortOrder
    pre_aoi_spc_before?: SortOrder
    pre_aoi_spc_after?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiFunctionCheckpointAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AoiFunctionCheckpointMaxOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    responsible_person?: SortOrder
    time?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    laser_barcode_before_bot?: SortOrder
    laser_barcode_before_top?: SortOrder
    laser_barcode_after_bot?: SortOrder
    laser_barcode_after_top?: SortOrder
    laser_pcb_text_before?: SortOrder
    laser_pcb_text_after?: SortOrder
    spi_barcode_before_bot?: SortOrder
    spi_barcode_before_top?: SortOrder
    spi_barcode_after_bot?: SortOrder
    spi_barcode_after_top?: SortOrder
    spi_mes_before_bot?: SortOrder
    spi_mes_before_top?: SortOrder
    spi_mes_after_bot?: SortOrder
    spi_mes_after_top?: SortOrder
    pre_aoi_barcode_before_bot?: SortOrder
    pre_aoi_barcode_before_top?: SortOrder
    pre_aoi_barcode_after_bot?: SortOrder
    pre_aoi_barcode_after_top?: SortOrder
    post_aoi_barcode_before_bot?: SortOrder
    post_aoi_barcode_before_top?: SortOrder
    post_aoi_barcode_after_bot?: SortOrder
    post_aoi_barcode_after_top?: SortOrder
    password_function_pre_aoi_before?: SortOrder
    password_function_pre_aoi_after?: SortOrder
    spi_fov_before?: SortOrder
    spi_fov_after?: SortOrder
    pre_aoi_fov_before?: SortOrder
    pre_aoi_fov_after?: SortOrder
    post_aoi_fov_before?: SortOrder
    post_aoi_fov_after?: SortOrder
    pre_aoi_spc_before?: SortOrder
    pre_aoi_spc_after?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiFunctionCheckpointMinOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    responsible_person?: SortOrder
    time?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    laser_barcode_before_bot?: SortOrder
    laser_barcode_before_top?: SortOrder
    laser_barcode_after_bot?: SortOrder
    laser_barcode_after_top?: SortOrder
    laser_pcb_text_before?: SortOrder
    laser_pcb_text_after?: SortOrder
    spi_barcode_before_bot?: SortOrder
    spi_barcode_before_top?: SortOrder
    spi_barcode_after_bot?: SortOrder
    spi_barcode_after_top?: SortOrder
    spi_mes_before_bot?: SortOrder
    spi_mes_before_top?: SortOrder
    spi_mes_after_bot?: SortOrder
    spi_mes_after_top?: SortOrder
    pre_aoi_barcode_before_bot?: SortOrder
    pre_aoi_barcode_before_top?: SortOrder
    pre_aoi_barcode_after_bot?: SortOrder
    pre_aoi_barcode_after_top?: SortOrder
    post_aoi_barcode_before_bot?: SortOrder
    post_aoi_barcode_before_top?: SortOrder
    post_aoi_barcode_after_bot?: SortOrder
    post_aoi_barcode_after_top?: SortOrder
    password_function_pre_aoi_before?: SortOrder
    password_function_pre_aoi_after?: SortOrder
    spi_fov_before?: SortOrder
    spi_fov_after?: SortOrder
    pre_aoi_fov_before?: SortOrder
    pre_aoi_fov_after?: SortOrder
    post_aoi_fov_before?: SortOrder
    post_aoi_fov_after?: SortOrder
    pre_aoi_spc_before?: SortOrder
    pre_aoi_spc_after?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiFunctionCheckpointSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type AoiTechnicianChecklistCountOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    pre_aoi_program_full_name?: SortOrder
    stencil_serial_no_b_side?: SortOrder
    stencil_serial_no_a_side?: SortOrder
    barcode_read_a_layer?: SortOrder
    barcode_read_a_spi?: SortOrder
    barcode_read_a_pre_aoi?: SortOrder
    barcode_read_b_layer?: SortOrder
    barcode_read_b_spi?: SortOrder
    barcode_read_b_pre_aoi?: SortOrder
    workorder_info_pre_aoi?: SortOrder
    workorder_info_post_aoi?: SortOrder
    aoi_scan_tools_workorder_traceability?: SortOrder
    confirmation?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiTechnicianChecklistAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AoiTechnicianChecklistMaxOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    pre_aoi_program_full_name?: SortOrder
    stencil_serial_no_b_side?: SortOrder
    stencil_serial_no_a_side?: SortOrder
    barcode_read_a_layer?: SortOrder
    barcode_read_a_spi?: SortOrder
    barcode_read_a_pre_aoi?: SortOrder
    barcode_read_b_layer?: SortOrder
    barcode_read_b_spi?: SortOrder
    barcode_read_b_pre_aoi?: SortOrder
    workorder_info_pre_aoi?: SortOrder
    workorder_info_post_aoi?: SortOrder
    aoi_scan_tools_workorder_traceability?: SortOrder
    confirmation?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiTechnicianChecklistMinOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    pre_aoi_program_full_name?: SortOrder
    stencil_serial_no_b_side?: SortOrder
    stencil_serial_no_a_side?: SortOrder
    barcode_read_a_layer?: SortOrder
    barcode_read_a_spi?: SortOrder
    barcode_read_a_pre_aoi?: SortOrder
    barcode_read_b_layer?: SortOrder
    barcode_read_b_spi?: SortOrder
    barcode_read_b_pre_aoi?: SortOrder
    workorder_info_pre_aoi?: SortOrder
    workorder_info_post_aoi?: SortOrder
    aoi_scan_tools_workorder_traceability?: SortOrder
    confirmation?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiTechnicianChecklistSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AppSessionListRelationFilter = {
    every?: AppSessionWhereInput
    some?: AppSessionWhereInput
    none?: AppSessionWhereInput
  }

  export type AppSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppUserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrder
    role?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppUserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AppUserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrder
    role?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppUserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrder
    role?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppUserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AppUserScalarRelationFilter = {
    is?: AppUserWhereInput
    isNot?: AppUserWhereInput
  }

  export type AppSessionCountOrderByAggregateInput = {
    session_id?: SortOrder
    user_id?: SortOrder
    public_ip?: SortOrder
    login_time?: SortOrder
    logout_time?: SortOrder
    status?: SortOrder
  }

  export type AppSessionAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type AppSessionMaxOrderByAggregateInput = {
    session_id?: SortOrder
    user_id?: SortOrder
    public_ip?: SortOrder
    login_time?: SortOrder
    logout_time?: SortOrder
    status?: SortOrder
  }

  export type AppSessionMinOrderByAggregateInput = {
    session_id?: SortOrder
    user_id?: SortOrder
    public_ip?: SortOrder
    login_time?: SortOrder
    logout_time?: SortOrder
    status?: SortOrder
  }

  export type AppSessionSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AppActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    activity_type?: SortOrder
    username?: SortOrder
    public_ip?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AppActivityLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AppActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    activity_type?: SortOrder
    username?: SortOrder
    public_ip?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AppActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    activity_type?: SortOrder
    username?: SortOrder
    public_ip?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AppActivityLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LineStatusCountOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    is_installed?: SortOrder
    updated_by?: SortOrder
    updated_at?: SortOrder
  }

  export type LineStatusAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LineStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    is_installed?: SortOrder
    updated_by?: SortOrder
    updated_at?: SortOrder
  }

  export type LineStatusMinOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    is_installed?: SortOrder
    updated_by?: SortOrder
    updated_at?: SortOrder
  }

  export type LineStatusSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AoiChangeoverChecksheetCountOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    model_name?: SortOrder
    model_code?: SortOrder
    changeover_type?: SortOrder
    spi_steel_stencil_suffix_match?: SortOrder
    spi_program_subpanel_serial_match?: SortOrder
    spi_recheck_pcab_polarity?: SortOrder
    spi_confirm_parameter_settings?: SortOrder
    spi_read_barcode_on?: SortOrder
    pre_aoi_eco_checklists?: SortOrder
    pre_aoi_program_model_modify?: SortOrder
    pre_aoi_vi_program_new_materia?: SortOrder
    pre_aoi_limit_defective_alarm?: SortOrder
    pre_aoi_test_program_bare_pcba?: SortOrder
    pre_aoi_bot_program_serial_number?: SortOrder
    pre_aoi_read_barcode_on?: SortOrder
    pre_aoi_confirm_materials_mounted?: SortOrder
    pre_aoi_delete_all_zones?: SortOrder
    post_aoi_equipment_model?: SortOrder
    post_aoi_eco_checklists?: SortOrder
    post_aoi_program_model_modify?: SortOrder
    post_aoi_recheck_chips_standard_models?: SortOrder
    post_aoi_scan_board_picture?: SortOrder
    post_aoi_limit_defective_alarm?: SortOrder
    post_aoi_confirm_polarity_shield?: SortOrder
    post_aoi_bot_program_serial_number?: SortOrder
    post_aoi_registered_standard_models_times?: SortOrder
    others_adjust_widths?: SortOrder
    others_add_test_standard_pcb_barcode?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiChangeoverChecksheetAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AoiChangeoverChecksheetMaxOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    model_name?: SortOrder
    model_code?: SortOrder
    changeover_type?: SortOrder
    spi_steel_stencil_suffix_match?: SortOrder
    spi_program_subpanel_serial_match?: SortOrder
    spi_recheck_pcab_polarity?: SortOrder
    spi_confirm_parameter_settings?: SortOrder
    spi_read_barcode_on?: SortOrder
    pre_aoi_eco_checklists?: SortOrder
    pre_aoi_program_model_modify?: SortOrder
    pre_aoi_vi_program_new_materia?: SortOrder
    pre_aoi_limit_defective_alarm?: SortOrder
    pre_aoi_test_program_bare_pcba?: SortOrder
    pre_aoi_bot_program_serial_number?: SortOrder
    pre_aoi_read_barcode_on?: SortOrder
    pre_aoi_confirm_materials_mounted?: SortOrder
    pre_aoi_delete_all_zones?: SortOrder
    post_aoi_equipment_model?: SortOrder
    post_aoi_eco_checklists?: SortOrder
    post_aoi_program_model_modify?: SortOrder
    post_aoi_recheck_chips_standard_models?: SortOrder
    post_aoi_scan_board_picture?: SortOrder
    post_aoi_limit_defective_alarm?: SortOrder
    post_aoi_confirm_polarity_shield?: SortOrder
    post_aoi_bot_program_serial_number?: SortOrder
    post_aoi_registered_standard_models_times?: SortOrder
    others_adjust_widths?: SortOrder
    others_add_test_standard_pcb_barcode?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiChangeoverChecksheetMinOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    model_name?: SortOrder
    model_code?: SortOrder
    changeover_type?: SortOrder
    spi_steel_stencil_suffix_match?: SortOrder
    spi_program_subpanel_serial_match?: SortOrder
    spi_recheck_pcab_polarity?: SortOrder
    spi_confirm_parameter_settings?: SortOrder
    spi_read_barcode_on?: SortOrder
    pre_aoi_eco_checklists?: SortOrder
    pre_aoi_program_model_modify?: SortOrder
    pre_aoi_vi_program_new_materia?: SortOrder
    pre_aoi_limit_defective_alarm?: SortOrder
    pre_aoi_test_program_bare_pcba?: SortOrder
    pre_aoi_bot_program_serial_number?: SortOrder
    pre_aoi_read_barcode_on?: SortOrder
    pre_aoi_confirm_materials_mounted?: SortOrder
    pre_aoi_delete_all_zones?: SortOrder
    post_aoi_equipment_model?: SortOrder
    post_aoi_eco_checklists?: SortOrder
    post_aoi_program_model_modify?: SortOrder
    post_aoi_recheck_chips_standard_models?: SortOrder
    post_aoi_scan_board_picture?: SortOrder
    post_aoi_limit_defective_alarm?: SortOrder
    post_aoi_confirm_polarity_shield?: SortOrder
    post_aoi_bot_program_serial_number?: SortOrder
    post_aoi_registered_standard_models_times?: SortOrder
    others_adjust_widths?: SortOrder
    others_add_test_standard_pcb_barcode?: SortOrder
    submitted_by?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    engineer_modified_fields?: SortOrder
    original_technician_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AoiChangeoverChecksheetSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LaserChangeoverChecksheetCountOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    program_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    prog_name_check?: SortOrder
    laser_param_check?: SortOrder
    duplicate_code_check?: SortOrder
    pcb_anti_reverse_check?: SortOrder
    ab_barcode_check?: SortOrder
    laser_sequence_check?: SortOrder
    laser_position_check?: SortOrder
    grp_ldr_prog_name_check?: SortOrder
    grp_ldr_laser_position_check?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    designated_group_leader_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    pd_remarks?: SortOrder
    submitted_by?: SortOrder
    engineer_signature?: SortOrder
    group_leader_signature?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LaserChangeoverChecksheetAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LaserChangeoverChecksheetMaxOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    program_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    prog_name_check?: SortOrder
    laser_param_check?: SortOrder
    duplicate_code_check?: SortOrder
    pcb_anti_reverse_check?: SortOrder
    ab_barcode_check?: SortOrder
    laser_sequence_check?: SortOrder
    laser_position_check?: SortOrder
    grp_ldr_prog_name_check?: SortOrder
    grp_ldr_laser_position_check?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    designated_group_leader_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    pd_remarks?: SortOrder
    submitted_by?: SortOrder
    engineer_signature?: SortOrder
    group_leader_signature?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LaserChangeoverChecksheetMinOrderByAggregateInput = {
    id?: SortOrder
    line?: SortOrder
    group_name?: SortOrder
    program_name?: SortOrder
    date?: SortOrder
    shift?: SortOrder
    prog_name_check?: SortOrder
    laser_param_check?: SortOrder
    duplicate_code_check?: SortOrder
    pcb_anti_reverse_check?: SortOrder
    ab_barcode_check?: SortOrder
    laser_sequence_check?: SortOrder
    laser_position_check?: SortOrder
    grp_ldr_prog_name_check?: SortOrder
    grp_ldr_laser_position_check?: SortOrder
    status?: SortOrder
    approval_status?: SortOrder
    designated_engineer_id?: SortOrder
    designated_group_leader_id?: SortOrder
    remarks?: SortOrder
    engineer_remarks?: SortOrder
    pd_remarks?: SortOrder
    submitted_by?: SortOrder
    engineer_signature?: SortOrder
    group_leader_signature?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LaserChangeoverChecksheetSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AppSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<AppSessionCreateWithoutUserInput, AppSessionUncheckedCreateWithoutUserInput> | AppSessionCreateWithoutUserInput[] | AppSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppSessionCreateOrConnectWithoutUserInput | AppSessionCreateOrConnectWithoutUserInput[]
    createMany?: AppSessionCreateManyUserInputEnvelope
    connect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
  }

  export type AppSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AppSessionCreateWithoutUserInput, AppSessionUncheckedCreateWithoutUserInput> | AppSessionCreateWithoutUserInput[] | AppSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppSessionCreateOrConnectWithoutUserInput | AppSessionCreateOrConnectWithoutUserInput[]
    createMany?: AppSessionCreateManyUserInputEnvelope
    connect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
  }

  export type AppSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppSessionCreateWithoutUserInput, AppSessionUncheckedCreateWithoutUserInput> | AppSessionCreateWithoutUserInput[] | AppSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppSessionCreateOrConnectWithoutUserInput | AppSessionCreateOrConnectWithoutUserInput[]
    upsert?: AppSessionUpsertWithWhereUniqueWithoutUserInput | AppSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppSessionCreateManyUserInputEnvelope
    set?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    disconnect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    delete?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    connect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    update?: AppSessionUpdateWithWhereUniqueWithoutUserInput | AppSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppSessionUpdateManyWithWhereWithoutUserInput | AppSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppSessionScalarWhereInput | AppSessionScalarWhereInput[]
  }

  export type AppSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppSessionCreateWithoutUserInput, AppSessionUncheckedCreateWithoutUserInput> | AppSessionCreateWithoutUserInput[] | AppSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppSessionCreateOrConnectWithoutUserInput | AppSessionCreateOrConnectWithoutUserInput[]
    upsert?: AppSessionUpsertWithWhereUniqueWithoutUserInput | AppSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppSessionCreateManyUserInputEnvelope
    set?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    disconnect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    delete?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    connect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    update?: AppSessionUpdateWithWhereUniqueWithoutUserInput | AppSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppSessionUpdateManyWithWhereWithoutUserInput | AppSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppSessionScalarWhereInput | AppSessionScalarWhereInput[]
  }

  export type AppUserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<AppUserCreateWithoutSessionsInput, AppUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutSessionsInput
    connect?: AppUserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AppUserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<AppUserCreateWithoutSessionsInput, AppUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutSessionsInput
    upsert?: AppUserUpsertWithoutSessionsInput
    connect?: AppUserWhereUniqueInput
    update?: XOR<XOR<AppUserUpdateToOneWithWhereWithoutSessionsInput, AppUserUpdateWithoutSessionsInput>, AppUserUncheckedUpdateWithoutSessionsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AppSessionCreateWithoutUserInput = {
    session_id: string
    public_ip?: string | null
    login_time?: Date | string
    logout_time?: Date | string | null
    status?: string
  }

  export type AppSessionUncheckedCreateWithoutUserInput = {
    session_id: string
    public_ip?: string | null
    login_time?: Date | string
    logout_time?: Date | string | null
    status?: string
  }

  export type AppSessionCreateOrConnectWithoutUserInput = {
    where: AppSessionWhereUniqueInput
    create: XOR<AppSessionCreateWithoutUserInput, AppSessionUncheckedCreateWithoutUserInput>
  }

  export type AppSessionCreateManyUserInputEnvelope = {
    data: AppSessionCreateManyUserInput | AppSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AppSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: AppSessionWhereUniqueInput
    update: XOR<AppSessionUpdateWithoutUserInput, AppSessionUncheckedUpdateWithoutUserInput>
    create: XOR<AppSessionCreateWithoutUserInput, AppSessionUncheckedCreateWithoutUserInput>
  }

  export type AppSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: AppSessionWhereUniqueInput
    data: XOR<AppSessionUpdateWithoutUserInput, AppSessionUncheckedUpdateWithoutUserInput>
  }

  export type AppSessionUpdateManyWithWhereWithoutUserInput = {
    where: AppSessionScalarWhereInput
    data: XOR<AppSessionUpdateManyMutationInput, AppSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type AppSessionScalarWhereInput = {
    AND?: AppSessionScalarWhereInput | AppSessionScalarWhereInput[]
    OR?: AppSessionScalarWhereInput[]
    NOT?: AppSessionScalarWhereInput | AppSessionScalarWhereInput[]
    session_id?: UuidFilter<"AppSession"> | string
    user_id?: IntFilter<"AppSession"> | number
    public_ip?: StringNullableFilter<"AppSession"> | string | null
    login_time?: DateTimeFilter<"AppSession"> | Date | string
    logout_time?: DateTimeNullableFilter<"AppSession"> | Date | string | null
    status?: StringFilter<"AppSession"> | string
  }

  export type AppUserCreateWithoutSessionsInput = {
    username: string
    password_hash: string
    full_name: string
    role?: string
    email?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppUserUncheckedCreateWithoutSessionsInput = {
    id?: number
    username: string
    password_hash: string
    full_name: string
    role?: string
    email?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppUserCreateOrConnectWithoutSessionsInput = {
    where: AppUserWhereUniqueInput
    create: XOR<AppUserCreateWithoutSessionsInput, AppUserUncheckedCreateWithoutSessionsInput>
  }

  export type AppUserUpsertWithoutSessionsInput = {
    update: XOR<AppUserUpdateWithoutSessionsInput, AppUserUncheckedUpdateWithoutSessionsInput>
    create: XOR<AppUserCreateWithoutSessionsInput, AppUserUncheckedCreateWithoutSessionsInput>
    where?: AppUserWhereInput
  }

  export type AppUserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: AppUserWhereInput
    data: XOR<AppUserUpdateWithoutSessionsInput, AppUserUncheckedUpdateWithoutSessionsInput>
  }

  export type AppUserUpdateWithoutSessionsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUserUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSessionCreateManyUserInput = {
    session_id: string
    public_ip?: string | null
    login_time?: Date | string
    logout_time?: Date | string | null
    status?: string
  }

  export type AppSessionUpdateWithoutUserInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    login_time?: DateTimeFieldUpdateOperationsInput | Date | string
    logout_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppSessionUncheckedUpdateWithoutUserInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    login_time?: DateTimeFieldUpdateOperationsInput | Date | string
    logout_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppSessionUncheckedUpdateManyWithoutUserInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    public_ip?: NullableStringFieldUpdateOperationsInput | string | null
    login_time?: DateTimeFieldUpdateOperationsInput | Date | string
    logout_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}