// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoggerService {

//   constructor() { }
// }
/**
   * The possible log level
   *  LogLevel.Off is never emitted and only used with LogLevel.Level property to disable log.
   */
export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug
}

export class Logger {
  /**
   * Current logging level
   *  set it to LogLevel.Off to disabled log completely
   */
  static level = LogLevel.Debug;

  /**
   * Enable Production Mode
   *  sets logging level to LogLevel.Warning
   */
  static enableProductionMode() {
    Logger.level = LogLevel.Warning;
  }

  constructor(private source?: string) { }
  /**
   * Log objects or messges with the debug level
   *  work the same as Console.log()
   */
  debug(...object: any[]) {
    this.log(console.log, LogLevel.Debug, object);
  }

  /**
     * Log objects or messges with the info level
     *  work the same as Console.log()
     */
  info(...object: any[]) {
    this.log(console.info, LogLevel.Info, object);
  }

  /**
   * Log objects or messges with the error level
   *  work the same as Console.log()
   */
  error(...object: any[]) {
    this.log(console.error, LogLevel.Error, object);
  }

  /**
   * Log objects or messges with the warning level
   *  work the same as Console.log()
   */
  warn(...object: any[]) {
    this.log(console.warn, LogLevel.Warning, object);
  }

  private log(func: Function, level: LogLevel, ...object: any[]) {
    if (level <= Logger.level) {
      const log = this.source ? [`[${this.source}]`].concat(object) : object;
      func.apply(console, log);
    }
  }
}
