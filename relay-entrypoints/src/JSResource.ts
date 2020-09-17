/** @format */

class JSResourceImpl<T> {
  private _loader: () => Promise<T>;
  private _result: T | null;
  private _error: unknown | null;
  private _promise: Promise<T> | null;
  constructor(loader: () => Promise<T>) {
    this._loader = loader;
    this._result = null;
    this._error = null;
    this._promise = null;
  }

  load() {
    let promise = this._promise;
    if (promise == null) {
      promise = this._loader().then(
        (result) => {
          this._result = result;
          return result;
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
      return this._result;
    }
  }

  getModuleIfRequired() {
    return this.get();
  }

  read() {
    if (this._result != null) {
      return this._result;
    } else if (this._error != null) {
      throw this._error;
    } else {
      throw this._promise;
    }
  }
}

const resourceMap: Map<string, JSResourceImpl<unknown>> = new Map();

export default function JSResource<T>(
  moduleId: string,
  loader: () => Promise<T>
) {
  let resource = resourceMap.get(moduleId);
  if (resource == null) {
    resource = new JSResourceImpl(loader);
    resourceMap.set(moduleId, resource);
  }
  return resource;
}
