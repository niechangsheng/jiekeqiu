class PinkiePromise {
    constructor(callback) {
        this._status = 'pending';
        this._kisses = null;
        this._punches = 'default error message...';

        this._unicorns = [];
        this._monsters = [];

        const resolve = kisses => {
            this._status = 'fulfill';
            this._kisses = kisses;

            this.startTasks();
        }

        const reject = punches => {
            this._status = 'reject';
            this._punches = punches;

            this.startTasks();
        }
      
        callback(resolve, reject);
    }

    then(resolve, reject) {
        if(this._status === 'pending') {
            this._unicorns.push(resolve);
            this._monsters.push(reject);
        } else if (this._status === 'fulfill') {
            resolve(this._kisses);
        } else {
            reject(this._punches);
        }

        return this;
    }

    done(callback) {
        if(this._status === 'pending') {
            this._unicorns.push(callback);
        } else if(this._status === 'fulfill') {
            callback(this._kisses);
        } else {
            //do nothing...
        }

        return this;
    }

    catch(callback) {
        if(this._status === 'reject') {
            this._monsters.push(callback);
        } else if(this._status === 'reject') {
            callback(this._punches);
        } else {
            //do nothing...
        }

        return this;
    }

    startTasks() {
        if(this._status === 'fulfill') {
            for(let i=0; i<this._unicorns.length; i++) {
                this._unicorns[i](this._kisses);
            }
            this._unicorns = [];
        } else if(this._status === 'reject') {
            for (let i = 0; i < this._monsters.length; i++) {
                this._monsters[i](this._punches);
            }
            this._monsters = [];
        }
        
        return this;
    }
}