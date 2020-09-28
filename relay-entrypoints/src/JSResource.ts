/** @format */

class JSResourceImpl<T> {
  private _loader: () => Promise<T>;
  private _result: T | null;
  private _error: unknown | null;
  private _promise: Promise<T> | null;
  private _moduleId: string | number;
  constructor(moduleId: string | number, loader: () => Promise<T>) {
    this._loader = loader;
    this._result = null;
    this._error = null;
    this._promise = null;
    this._moduleId = moduleId;
    this._populateIfLoaded();
  }

  load() {
    console.log("load!!");
    this._populateIfLoaded();
    let promise = this._promise;
    if (promise == null) {
      promise = this._loader().then(
        (result: any) => {
          this._result = result.default;
          return result.default;
        },
        (error) => {
          this._error = error;
          throw error;
        }
      );

      this._promise = promise;
    }

    return promise;
  }

  get() {
    if (this._result != null) {
      console.log("loaded");
      return this._result;
    }
  }

  getModuleIfRequired() {
    return this.get();
  }

  read() {
    this._populateIfLoaded();
    if (this._result != null) {
      return this._result;
    } else if (this._error != null) {
      throw this._error;
    } else {
      throw this._promise;
    }
  }
  getModuleId(): string {
    return this._moduleId.toString();
  }

  _populateIfLoaded() {
    const moduleIsLoaded = __webpack_modules__.hasOwnProperty(this._moduleId);
    if (this._result == null || this._promise == null) {
      if (moduleIsLoaded) {
        const m = __webpack_require__(this._moduleId);
        this._promise = Promise.resolve(m.default);
        this._result = m.default;
      }
    }
  }
}

const resourceMap: Map<string | number, JSResourceImpl<unknown>> = new Map();

export type JSResource<T> = {
  getModuleIfRequired(): T | null;
  load(): Promise<T>;
};

export default function JSResource<T>(
  moduleId: string | number,
  loader: () => Promise<T>
): JSResource<T> {
  let resource = resourceMap.get(moduleId);
  if (resource == null) {
    resource = new JSResourceImpl(moduleId, loader);
    resourceMap.set(moduleId, resource);
  }
  return resource as JSResource<T>;
}
